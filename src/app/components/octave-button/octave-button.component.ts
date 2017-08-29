import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: '[app-octave-button]',
  templateUrl: './octave-button.component.html',
  styleUrls: ['./octave-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OctaveButtonComponent implements OnInit {

  @HostBinding('attr.pointer-events') pointerEvents = 'bounding-box';

  @Input() entityId: string;
  @Input() type: 'up' | 'down';

  get isUpType(): boolean {
    return this.type === 'up';
  }

  constructor() { }

  ngOnInit() {
  }

}
