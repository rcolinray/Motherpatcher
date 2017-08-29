import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: '[app-octave-led]',
  templateUrl: './octave-led.component.html',
  styleUrls: ['./octave-led.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OctaveLedComponent implements OnInit {

  @HostBinding('attr.pointer-events') pointerEvents = 'bounding-box';

  @Input() on: string;
  @Input() value: number;

  get isOn(): boolean {
    return this.onValue === this.value;
  }

  get fill(): string | null {
    return this.isOn ? 'black' : null;
  }

  private onValue: number;

  constructor() { }

  ngOnInit() {
    this.onValue = parseInt(this.on, 10);
  }

}
