import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromEditor from '../actions/editor';

import { getValue } from '../util/observable';

@Injectable()
export class EditorStateService {

  scale$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.scale$ = this.store.select(fromRoot.getEditorScale);
  }

  setScale(scale: number) {
    const oldScale = getValue(this.scale$);
    if (scale === oldScale) {
      return;
    }
    const action = new fromEditor.SetScaleAction(scale);
    this.store.dispatch(action);
  }

}
