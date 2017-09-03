import { Observable } from 'rxjs/Observable';

import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CableStateService } from '../../services/cable-state.service';

import { Cable } from '../../models';

import { getMother32Height, getMother32WidthPx, MOTHER32_SVG_WIDTH, MOTHER32_SVG_HEIGHT } from '../../util/scale';

@Component({
  selector: 'app-cable-overlay',
  templateUrl: './cable-overlay.component.html',
  styleUrls: ['./cable-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CableOverlayComponent implements OnInit {

  @Input() scale: number;
  @Input() numMother32s: number;

  cables$: Observable<Cable[]>;

  get viewBox(): string {
    return `0 0 ${MOTHER32_SVG_WIDTH} ${this.numMother32s * MOTHER32_SVG_HEIGHT}`;
  }

  get width(): string {
    return getMother32WidthPx(this.scale);
  }

  get height(): string {
    return `${this.numMother32s * getMother32Height(this.scale)}px`;
  }

  constructor(private cableState: CableStateService) {
    this.cables$ = this.cableState.cables$;
  }

  ngOnInit() {
  }

}
