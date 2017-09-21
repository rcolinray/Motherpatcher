import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromEditor from '../actions/editor';

import { getValue } from '../util/observable';

@Injectable()
export class EditorStateService {

  scale$: Observable<number>;
  filename$: Observable<string>;
  name$: Observable<string>;
  notes$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.scale$ = this.store.select(fromRoot.getEditorScale);
    this.filename$ = this.store.select(fromRoot.getEditorFilename);
    this.name$ = this.store.select(fromRoot.getEditorName);
    this.notes$ = this.store.select(fromRoot.getEditorNotes);
  }

  setScale(scale: number) {
    const oldScale = getValue(this.scale$);
    if (scale === oldScale) {
      return;
    }
    const action = new fromEditor.SetScaleAction(scale);
    this.store.dispatch(action);
  }

  setFilename(filename: string) {
    const action = new fromEditor.SetFilenameAction(filename);
    this.store.dispatch(action);
  }

  setName(name: string) {
    const oldName = getValue(this.name$);
    if (name === oldName) {
      return;
    }
    const action = new fromEditor.SetNameAction(name);
    this.store.dispatch(action);
  }

  setNotes(notes: string) {
    const action = new fromEditor.SetNotesAction(notes);
    this.store.dispatch(action);
  }

}
