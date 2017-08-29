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

import {
  Mother32,
  Knob,
  Switch,
} from '../../models';

import { MouseRotator } from '../../util/mouse-rotator';
import { getMother32HeightPx, getMother32WidthPx } from '../../util/scale';

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

  constructor(private mother32State: Mother32StateService) { }

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

}
