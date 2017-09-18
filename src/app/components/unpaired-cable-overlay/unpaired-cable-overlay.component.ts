import { Observable } from 'rxjs/Observable';

import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Point } from '../../models';

import { getMother32Height, getMother32WidthPx, MOTHER32_SVG_WIDTH, MOTHER32_SVG_HEIGHT } from '../../util/scale';

@Component({
  selector: 'app-unpaired-cable-overlay',
  templateUrl: './unpaired-cable-overlay.component.html',
  styleUrls: ['./unpaired-cable-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnpairedCableOverlayComponent implements OnInit {

  @Input() value: Point;
  @Input() scale: number;
  @Input() numMother32s: number;

  get initialPoints(): [Point, Point] {
    return [this.value, this.value];
  }

  get viewBox(): string {
    return `0 0 ${MOTHER32_SVG_WIDTH} ${this.numMother32s * MOTHER32_SVG_HEIGHT}`;
  }

  get width(): string {
    return getMother32WidthPx(this.scale);
  }

  get height(): string {
    return `${this.numMother32s * getMother32Height(this.scale)}px`;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
