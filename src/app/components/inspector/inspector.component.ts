import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorComponent implements OnInit {

  @Input() name: string;
  @Input() numMother32s: number;
  @Input() notes: string;

  @Output() addMother32 = new EventEmitter();
  @Output() removeMother32 = new EventEmitter();
  @Output() nameChange = new EventEmitter<string>();
  @Output() notesChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
