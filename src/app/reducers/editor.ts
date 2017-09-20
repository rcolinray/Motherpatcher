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
