import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';

@Component({
  selector: '[app-patch-point]',
  templateUrl: './patch-point.component.html',
  styleUrls: ['./patch-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatchPointComponent implements OnInit {

  @HostBinding('attr.pointer-events') pointerEvents = 'bounding-box';

  @Input() type: 'input' | 'output' | 'gateInput';

  get isGateInputType(): boolean {
    return this.type === 'gateInput';
  }

  constructor() { }

  ngOnInit() {
  }

}
