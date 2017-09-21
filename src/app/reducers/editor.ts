import * as fromEditor from '../actions/editor';

export interface State {
  scale: number;
  filename: string | null;
  name: string;
  notes: string;
}

export const initialState: State = {
  scale: 1.0,
  filename: null,
  name: "Init Patch",
  notes: "",
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

    case fromEditor.SET_FILENAME: {
      return {
        ...state,
        filename: action.payload,
      };
    }

    case fromEditor.SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    case fromEditor.SET_NOTES: {
      return {
        ...state,
        notes: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getScale = (state: State) => state.scale;

export const getFilename = (state: State) => state.filename;

export const getName = (state: State) => state.name;

export const getNotes = (state: State) => state.notes;
