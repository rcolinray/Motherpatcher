import { Observable } from 'rxjs/Observable';

import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ShowPatchPoint } from '../patch-bay/patch-bay.component';

import { CableStateService } from '../../services/cable-state.service';

import {
  Mother32,
  Connection,
  Input as InputPatchPoint,
  Output as OutputPatchPoint,
} from '../../models';

import {
  getMother32HeightPx,
  getMother32WidthPx,
  MOTHER32_SVG_WIDTH,
  MOTHER32_SVG_HEIGHT,
} from '../../util/scale';

@Component({
  selector: 'app-patch-point-overlay',
  templateUrl: './patch-point-overlay.component.html',
  styleUrls: ['./patch-point-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatchPointOverlayComponent implements OnInit {

  @Input() mother32s: number;
  @Input() scale: number;

  show$: Observable<ShowPatchPoint>;

  get viewBox(): string {
    return `0 0 ${MOTHER32_SVG_WIDTH} ${MOTHER32_SVG_HEIGHT}`;
  }

  get width(): string {
    return getMother32WidthPx(this.scale);
  }

  get height(): string {
    return getMother32HeightPx(this.scale);
  }

  constructor(private cableState: CableStateService) {
    this.show$ = this.cableState.unpairedConnection$.map((connection) => {
      if (connection === null) {
        return 'all';
      }
      else if (connection.type === 'input') {
        return 'output';
      }
      else if (connection.type === 'output') {
        return 'input';
      }
    });
  }

  ngOnInit() {
  }

  cancelConnection() {
    this.cableState.cancelConnection();
  }

}
