import * as fromEditor from '../actions/editor';

export interface State {
  scale: number;
}

export const initialState: State = {
  scale: 1.0,
};

export function reducer(state: State = initialState, action: fromEditor.Actions): State {
  switch (action.type) {
    case fromEditor.SET_SCALE: {
      const newState = action.payload;
      if (newState < 1.0 || newState > 5.0) {
        return state;
      }
      return {
        ...state,
        scale: newState,
      };
    }
    default: {
      return state;
    }
  }
}

export const getScale = (state: State) => state.scale;
