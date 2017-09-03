import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import { KnobComponent } from '../knob/knob.component';

import { Mother32StateService } from '../../services/mother32-state.service';
import { CableStateService } from '../../services/cable-state.service';

import {
  Mother32,
  Knob,
  Switch,
  Input as InputPatchPoint,
  Output as OutputPatchPoint,
} from '../../models';

import { MouseRotator } from '../../util/mouse-rotator';
import { getMother32HeightPx, getMother32WidthPx, MOTHER32_SVG_HEIGHT} from '../../util/scale';
import { getValue } from '../../util/observable';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent implements OnInit {

  @Input() value: Mother32;
  @Input() scale: number;

  get width(): string {
    return getMother32WidthPx(this.scale);
  }

  get height(): string {
    return getMother32HeightPx(this.scale);
  }

  constructor(private mother32State: Mother32StateService,
              private cableState: CableStateService) { }

  ngOnInit() {
  }

  toggle(switchName: Switch) {
    this.mother32State.toggleSwitch(this.value.id, switchName);
  }

  octaveUp() {
    this.mother32State.octaveUp(this.value.id);
  }

  octaveDown() {
    this.mother32State.octaveDown(this.value.id);
  }

  rotateKnob(knobName: Knob, angle: number) {
    this.mother32State.turnKnob(this.value.id, knobName, angle);
  }

  connectInput(event: MouseEvent, input: InputPatchPoint) {
    const { x, y } = this.calcXY(event);
    this.cableState.connectInput(this.value.id, input, x, y);
  }

  connectOutput(event: MouseEvent, output: OutputPatchPoint) {
    const { x, y } = this.calcXY(event);
    this.cableState.connectOutput(this.value.id, output, x, y);
  }

  private calcXY(event: MouseEvent): { x: number, y: number } {
    const mother32s = getValue(this.mother32State.mother32s$);
    const index = mother32s.findIndex((mother32) => {
      return mother32.id === this.value.id;
    });

    const el = event.currentTarget as SVGGElement;
    const transform = el.transform.baseVal.getItem(0);
    const { e: xOffset, f: yOffset } = transform.matrix;
    const { width, height } = el.getBBox();
    const x = xOffset + width / 2.0;
    const y = index * MOTHER32_SVG_HEIGHT + yOffset + height / 2.0;
    return { x, y };
  }

}
