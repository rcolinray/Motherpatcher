import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromMother32 from './mother32';
import * as fromEditor from './editor';

export interface State {
  mother32: fromMother32.State,
  editor: fromEditor.State,
}

export const reducers: ActionReducerMap<State> = {
  mother32: fromMother32.reducer,
  editor: fromEditor.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const getMother32 = createFeatureSelector<fromMother32.State>('mother32');

export const getAllMother32s = createSelector(
  getMother32,
  fromMother32.getAll,
)

export const getEditor = createFeatureSelector<fromEditor.State>('editor');

export const getEditorScale = createSelector(
  getEditor,
  fromEditor.getScale,
);
