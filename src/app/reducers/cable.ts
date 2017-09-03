import { v4 as uuid } from 'uuid';

import { createSelector } from '@ngrx/store';

import * as fromCable from '../actions/cable';

import { Cable, initCable } from '../models/cable';

export interface State {
  ids: string[];
  entities: {
    [id: string]: Cable,
  };
  showCables: boolean;
  incompleteCable: Cable | null;
}

export const initialState: State = {
  showCables: true,
  ids: [],
  entities: {},
  incompleteCable: null,
};

export function reducer(state: State = initialState, action: fromCable.Actions): State {
  switch (action.type) {
    case fromCable.TOGGLE_SHOW_CABLES: {
      return {
        ...state,
        showCables: !state.showCables,
      };
    }

    case fromCable.CONNECT_INPUT:
    case fromCable.CONNECT_OUTPUT: {
      const complete = state.incompleteCable !== null;
      const cable = {
        ...(state.incompleteCable || initCable(uuid())),
        ...action.payload,
      };

      if (complete) {
        return {
          ...state,
          ids: [...state.ids, cable.id],
          entities: {
            ...state.entities,
            [cable.id]: cable,
          },
          incompleteCable: null,
        };
      }
      else {
        return {
          ...state,
          incompleteCable: cable,
        };
      }
    }

    case fromCable.REMOVE_CABLE: {
      const entityId = action.payload;
      const newIds = state.ids.filter((id) => {
        return id !== entityId;
      });
      const newEntities = newIds.reduce((entities, id) => {
        return {
          ...entities,
          [id]: state.entities[id],
        };
      }, {});
      return {
        ...state,
        ids: newIds,
        entities: newEntities,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIncompleteCable = (state: State) => state.incompleteCable;

export const getIds = (state: State) => state.ids;

export const getEntities = (state: State) => state.entities;

export const getAll = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
});
