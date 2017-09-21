import { createSelector } from '@ngrx/store';

import * as fromCable from '../actions/cable';

import {
  Cable,
  Connection,
  ConnectionPair,
} from '../models/cable';

export interface State {
  cableIds: string[];
  cables: {
    [id: string]: Cable,
  };
  connectionIds: string[];
  connections: {
    [id: string]: Connection,
  },
  unpairedId: string | null;
}

export const initialState: State = {
  cableIds: [],
  cables: {},
  connectionIds: [],
  connections: {},
  unpairedId: null,
};

export function reducer(state: State = initialState, action: fromCable.Actions): State {
  switch (action.type) {
    case fromCable.ADD_CABLE: {
      const cable = action.payload;
      return {
        ...state,
        cableIds: [...state.cableIds, cable.id],
        cables: {
          ...state.cables,
          [cable.id]: cable,
        },
      };
    }

    case fromCable.REMOVE_CABLE: {
      const entityId = action.payload;
      const newIds = state.cableIds.filter((id) => {
        return id !== entityId;
      });
      const newEntities = newIds.reduce((entities, id) => {
        return {
          ...entities,
          [id]: state.cables[id],
        };
      }, {});
      return {
        ...state,
        cableIds: newIds,
        cables: newEntities,
      };
    }

    case fromCable.ADD_UNPAIRED_CONNECTION: {
      const connection = action.payload;
      return {
        ...state,
        connectionIds: [...state.connectionIds, connection.id],
        connections: {
          ...state.connections,
          [connection.id]: connection,
        },
        unpairedId: connection.id,
      };
    }

    case fromCable.ADD_PAIRED_CONNECTION: {
      const connection = action.payload;
      return {
        ...state,
        connectionIds: [...state.connectionIds, connection.id],
        connections: {
          ...state.connections,
          [connection.id]: connection,
        },
        unpairedId: null,
      };
    }

    case fromCable.REMOVE_CONNECTION: {
      const entityId = action.payload;
      const newIds = state.connectionIds.filter((id) => {
        return id !== entityId;
      });
      const newEntities = newIds.reduce((entities, id) => {
        return {
          ...entities,
          [id]: state.connections[id],
        };
      }, {});
      const unpairedId = state.unpairedId === entityId ? null : state.unpairedId;

      return {
        ...state,
        connectionIds: newIds,
        connections: newEntities,
        unpairedId,
      };
    }

    default: {
      return state;
    }
  }
}

export const getCableIds = (state: State) => state.cableIds;

export const getCables = (state: State) => state.cables;

export const getAllCables = createSelector(getCableIds, getCables, (ids, entities) => {
  return ids.map(id => entities[id]);
});

export const getConnectionIds = (state: State) => state.connectionIds;

export const getConnections = (state: State) => state.connections;

export const getAllConnections = createSelector(getConnectionIds, getConnections, (ids, entities) => {
  return ids.map(id => entities[id]);
});

export const getConnectionPairs = createSelector(getAllCables, getConnections, (cables, connections) => {
  return cables.map((cable) => {
    return [connections[cable.connectionIds[0]], connections[cable.connectionIds[1]]] as ConnectionPair;
  });
});

export const getUnpairedId = (state: State) => state.unpairedId;

export const getUnpairedConnection = createSelector(getUnpairedId, getConnections, (id, entities) => {
  return id !== null ? entities[id] : null;
});
