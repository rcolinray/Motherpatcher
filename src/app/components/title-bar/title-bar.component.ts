import { Observable } from 'rxjs/Observable';

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { MdSliderChange } from '@angular/material';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent implements OnInit {

  @Input() title: string;
  @Input() scale: number;

  get scaleDesc(): string {
    return `${this.scale * 100}%`;
  }

  @Output() initPatch = new EventEmitter();
  @Output() savePatch = new EventEmitter();
  @Output() openPatch = new EventEmitter();
  @Output() zoomIn = new EventEmitter();
  @Output() zoomOut = new EventEmitter();
  // @Output() toggleFiles = new EventEmitter();
  @Output() toggleInspector = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
