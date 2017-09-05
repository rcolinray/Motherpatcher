import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Cable } from '../../models';

@Component({
  selector: '[app-cable]',
  templateUrl: './cable.component.html',
  styleUrls: ['./cable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CableComponent implements OnInit {

  @Input() value: Cable;

  get desc(): string {
    return `M ${this.value.outputX}, ${this.value.outputY} L ${this.value.inputX}, ${this.value.inputY}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
