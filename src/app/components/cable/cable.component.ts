import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Point } from '../../models';

@Component({
  selector: '[app-cable]',
  templateUrl: './cable.component.html',
  styleUrls: ['./cable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CableComponent implements OnInit {

  @Input() value: [Point, Point];

  get desc(): string {
    return `M ${this.value[0].x}, ${this.value[0].y} L ${this.value[1].x}, ${this.value[1].y}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
