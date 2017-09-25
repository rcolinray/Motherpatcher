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
  showFiles$: Observable<boolean>;
  showInspector$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.scale$ = this.store.select(fromRoot.getEditorScale);
    this.filename$ = this.store.select(fromRoot.getEditorFilename);
    this.name$ = this.store.select(fromRoot.getEditorName);
    this.notes$ = this.store.select(fromRoot.getEditorNotes);
    this.showFiles$ = this.store.select(fromRoot.getEditorShowFiles);
    this.showInspector$ = this.store.select(fromRoot.getEditorShowInspector);
  }

  init() {
    const setNameAction = new fromEditor.SetNameAction('Empty Patch');
    this.store.dispatch(setNameAction);
    const setNotesAction = new fromEditor.SetNotesAction('');
    this.store.dispatch(setNotesAction);
  }

  zoomIn() {
    const scale = getValue(this.scale$);
    if (scale < 5) {
      this.setScale(scale + 1);
    }
  }

  zoomOut() {
    const scale = getValue(this.scale$);
    if (scale > 1) {
      this.setScale(scale - 1);
    }
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

  toggleFiles() {
    const action = new fromEditor.ToggleFilesAction();
    this.store.dispatch(action);
  }

  toggleInspector() {
    const action = new fromEditor.ToggleInspectorAction();
    this.store.dispatch(action);
  }
}
