import { createSelector } from '@ngrx/store';

import * as fromMother32 from '../actions/mother32';

import { Mother32, isOffsetKnob } from '../models';
import { clamp } from '../util/math';

export interface State {
  ids: string[];
  entities: {
    [id: string]: Mother32,
  };
}

export const initialState: State = {
  ids: [],
  entities: {},
}

export function reducer(state: State = initialState, action: fromMother32.Actions): State {
  switch (action.type) {

    case fromMother32.ADD_MOTHER32: {
      const entity = action.payload;
      return {
        ...state,
        ids: [...state.ids, entity.id],
        entities: {
          ...state.entities,
          [entity.id]: entity,
        }
      };
    }

    case fromMother32.REMOVE_MOTHER32: {
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

    case fromMother32.TURN_KNOB: {
      const entity = state.entities[action.payload.entityId];
      return {
        ...state,
        entities: {
          ...state.entities,
          [entity.id]: {
            ...entity,
            [action.payload.knobName]: action.payload.angle,
          }
        }
      };
    }

    case fromMother32.TOGGLE_SWITCH: {
      const entity = state.entities[action.payload.entityId];
      const prevState = entity[action.payload.switchName];
      return {
        ...state,
        entities: {
          ...state.entities,
          [entity.id]: {
            ...entity,
            [action.payload.switchName]: !prevState,
          }
        }
      }
    }

    case fromMother32.OCTAVE_UP: {
      const entityId = action.payload;
      const entity = state.entities[entityId];
      if (entity.octave < 8) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [entityId]: {
              ...entity,
              octave: entity.octave + 1,
            }
          }
        };
      }
      return state;
    }

    case fromMother32.OCTAVE_DOWN: {
      const entityId = action.payload;
      const entity = state.entities[entityId];
      if (entity.octave > 1) {
        return {
          ...state,
          entities: {
            ...state.entities,
            [entityId]: {
              ...entity,
              octave: entity.octave - 1,
            }
          }
        };
      }
      return state;
    }

    default: {
      return state;
    }

  }
}

export const getIds = (state: State) => state.ids;

export const getEntities = (state: State) => state.entities;

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
