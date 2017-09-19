import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { environment } from 'environments';

import * as fromMother32 from './mother32';
import * as fromEditor from './editor';
import * as fromCable from './cable';

import { ConnectionPair } from '../models';

export interface State {
  mother32: fromMother32.State,
  editor: fromEditor.State,
  cable: fromCable.State,
}

export const reducers: ActionReducerMap<State> = {
  mother32: fromMother32.reducer,
  editor: fromEditor.reducer,
  cable: fromCable.reducer,
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

export const getCable = createFeatureSelector<fromCable.State>('cable');

export const getAllCables = createSelector(
  getCable,
  fromCable.getAllCables,
);

export const getConnections = createSelector(
  getCable,
  fromCable.getConnections,
);

export const getAllConnections = createSelector(
  getCable,
  fromCable.getAllConnections,
);

export const getConnectionPairs = createSelector(
  getCable,
  fromCable.getConnectionPairs,
);

export const getUnpairedConnection = createSelector(
  getCable,
  fromCable.getUnpairedConnection,
);

export const getMother32Connections = function(mother32Id: string) {
  return createSelector(getAllConnections, (connections) => {
    return connections.filter(connection => connection.mother32Id === mother32Id);
  });
}
