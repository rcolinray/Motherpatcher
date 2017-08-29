import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: '[app-switch]',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent implements OnInit {

  @Input() value: boolean;

  get transform(): string | null {
    return this.value ? 'translate(0,12.15) scale(1,-1)' : null;
  }

  constructor() { }

  ngOnInit() {
  }

}
