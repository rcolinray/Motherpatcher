import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { getMother32WidthPx, getMother32HeightPx } from '../../util/scale';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent implements OnInit {

  @Input() scale: number;

  get width(): string {
    return getMother32WidthPx(this.scale);
  }

  get height(): string {
    return getMother32HeightPx(this.scale);
  }

  constructor() { }

  ngOnInit() {
  }

}
