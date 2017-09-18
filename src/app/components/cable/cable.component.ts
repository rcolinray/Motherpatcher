import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/skip';

import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  NgZone,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { Point } from '../../models';

import { mouseMoveObserver } from '../../util/mouse-move-observer';

@Component({
  selector: '[app-cable]',
  templateUrl: './cable.component.html',
  styleUrls: ['./cable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CableComponent implements OnInit, OnDestroy {

  @Input() value: [Point, Point];
  @Input() state: 'paired' | 'unpaired' = 'paired';

  @ViewChild('outline') outlineRef: ElementRef;
  @ViewChild('fill') fillRef: ElementRef;

  get desc(): string {
    return this.formatDesc(this.value[0], this.value[1]);
  }

  private destroySource = new Subject();

  constructor(private zone: NgZone) { }

  ngOnInit() {
    if (this.state === 'unpaired') {
      this.zone.runOutsideAngular(() => {
        const outlineEl = this.outlineRef.nativeElement as SVGPathElement;
        const fillEl = this.fillRef.nativeElement as SVGPathElement;
        const rootEl = outlineEl.ownerSVGElement;
        let point = rootEl.createSVGPoint();

        const mouseMove = mouseMoveObserver(this.destroySource.asObservable());

        mouseMove.subscribe((event) => {
          point.x = event.clientX;
          point.y = event.clientY;
          point = point.matrixTransform(rootEl.getScreenCTM().inverse());

          outlineEl.setAttribute('d', this.formatDesc(this.value[0], point));
          fillEl.setAttribute('d', this.formatDesc(this.value[0], point));
        });
      });
    }
  }

  ngOnDestroy() {
    this.destroySource.next();
  }

  private formatDesc(a: Point, b: Point): string {
    return `M ${a.x}, ${a.y} L ${b.x}, ${b.y}`
  }

}
