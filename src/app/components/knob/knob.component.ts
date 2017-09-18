import { noop } from 'rxjs/util/noop';
import 'rxjs/add/operator/last';

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { MouseRotator } from '../../util/mouse-rotator';

@Component({
  selector: '[app-knob]',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobComponent implements OnInit {

  @Input() type: 'amount' | 'offset' = 'amount';
  @Input() value: number;

  @Output() change = new EventEmitter<number>();

  @ViewChild('knob') knobRef: ElementRef;

  get transform(): string {
    const { x, y } = this.transformOffsets;
    return `rotate(${this.value} ${x} ${y})`;
  }

  get transformOffsets(): { x: number, y: number } {
    if (this.isAmountType) {
      return { x: 12.9, y: 13 };
    }
    else {
      return { x: 12.6, y: 14.75 };
    }
  }

  get minMaxAngles(): { minAngle: number, maxAngle: number } {
    if (this.isAmountType) {
      return {
        minAngle: 0,
        maxAngle: 300,
      };
    }
    else {
      return {
        minAngle: -152,
        maxAngle: 152,
      };
    }
  }

  get isAmountType(): boolean {
    return this.type === 'amount';
  }

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  rotate(event: MouseEvent) {
    const { minAngle, maxAngle } = this.minMaxAngles;
    const { x, y } = this.transformOffsets;

    const knobEl = this.knobRef.nativeElement as SVGGElement;

    this.zone.runOutsideAngular(() => {
      const rotator = new MouseRotator(event, this.value, minAngle, maxAngle);

      rotator.angle$.subscribe((angle) => {
        knobEl.transform.baseVal.getItem(0).setRotate(angle, x, y);
      });

      rotator.angle$.last().subscribe((angle) => {
        this.zone.run(() => {
          this.change.emit(angle);
        });
      }, noop);
    });
  }

}
