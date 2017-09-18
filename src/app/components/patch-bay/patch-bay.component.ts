import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32StateService } from '../../services/mother32-state.service';
import { CableStateService } from '../../services/cable-state.service';

import {
  Mother32,
  Input as InputPatchPoint,
  Output as OutputPatchPoint,
} from '../../models';

import { getValue } from '../../util/observable';
import { MOTHER32_SVG_HEIGHT } from '../../util/scale';
import { Point } from '../../util/point';

export type ShowPatchPoint = 'input' | 'output' | 'all';

@Component({
  selector: '[app-patch-bay]',
  templateUrl: './patch-bay.component.html',
  styleUrls: ['./patch-bay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatchBayComponent implements OnInit {

  @Input() value: Mother32;
  @Input() show: ShowPatchPoint = 'all';

  get showInput(): boolean {
    return this.show !== 'output';
  }

  get showOutput(): boolean {
    return this.show !== 'input';
  }

  constructor(private mother32State: Mother32StateService,
              private cableState: CableStateService) { }

  ngOnInit() {
  }

  connectInput(event: MouseEvent, patchPoint: InputPatchPoint) {
    const { x, y } = this.calcXY(event);
    this.cableState.connectInput(this.value.id, patchPoint, x, y);
  }

  connectOutput(event: MouseEvent, patchPoint: OutputPatchPoint) {
    const { x, y } = this.calcXY(event);
    this.cableState.connectOutput(this.value.id, patchPoint, x, y);
  }

  private calcXY(event: MouseEvent): Point {
    const mother32s = getValue(this.mother32State.mother32s$);
    const index = mother32s.findIndex((mother32) => this.value.id === mother32.id);

    const el = event.currentTarget as SVGGElement;
    const transform = el.transform.baseVal.getItem(0);
    const { e: xOffset, f: yOffset } = transform.matrix;
    const { width, height } = el.getBBox();
    const x = xOffset + width / 2.0;
    const y = index * MOTHER32_SVG_HEIGHT + yOffset + height / 2.0;
    return { x, y };
  }


}
