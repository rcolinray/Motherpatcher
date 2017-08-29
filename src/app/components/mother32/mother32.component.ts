import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32 } from '../../models';

@Component({
  selector: 'app-mother32',
  templateUrl: './mother32.component.html',
  styleUrls: ['./mother32.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Mother32Component implements OnInit {

  @Input() value: Mother32;

  constructor() { }

  ngOnInit() {
  }

}
