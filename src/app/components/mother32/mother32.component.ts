import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32 } from '../../models';

import { getMother32HeightPx, getMother32WidthPx } from '../../util/scale';

@Component({
  selector: 'app-mother32',
  templateUrl: './mother32.component.html',
  styleUrls: ['./mother32.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Mother32Component implements OnInit {

  @Input() value: Mother32;
  @Input() scale: number;

  @HostBinding('style.width')
  get width(): string {
    return getMother32WidthPx(this.scale);
  }

  @HostBinding('style.height')
  get height(): string {
    return getMother32HeightPx(this.scale);
  }

  constructor() { }

  ngOnInit() {
  }

}
