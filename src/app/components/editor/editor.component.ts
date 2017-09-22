import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  Mother32,
  Connection,
} from '../../models';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() mother32s: Mother32[];
  @Input() scale: number;
  @Input() unpairedConnection: Connection | null;

  get numMother32s(): number {
    return this.mother32s.length;
  }

  get patching(): boolean {
    return this.unpairedConnection !== null;
  }

  constructor() { }

  ngOnInit() {
  }

}
