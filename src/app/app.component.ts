import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { v4 as uuid } from 'uuid';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32StateService } from './services/mother32-state.service';
import { EditorStateService } from './services/editor-state.service';

import { Mother32, initMother32 } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  mother32s$: Observable<Mother32[]>;
  scale$: Observable<number>;

  constructor(private mother32State: Mother32StateService,
              private editorState: EditorStateService) {
    this.mother32s$ = this.mother32State.mother32s$;
    this.scale$ = this.editorState.scale$;
  }

  ngOnInit() {
    this.addMother32();
  }

  setScale(event: Event) {
    this.editorState.setScale((event.target as any).value);
  }

  addMother32() {
    const entity = initMother32(uuid());
    this.mother32State.add(entity);
  }

  removeMother32() {
    this.mother32s$.take(1).subscribe((mother32s) => {
      this.mother32State.remove(mother32s[0].id);
    });
  }

}
