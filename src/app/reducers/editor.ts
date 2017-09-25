import * as fromEditor from '../actions/editor';

export interface State {
  scale: number;
  filename: string | null;
  name: string;
  notes: string;
  showFiles: boolean;
  showInspector: boolean;
}

export const initialState: State = {
  scale: 2.0,
  filename: null,
  name: "Empty Patch",
  notes: "",
  showFiles: true,
  showInspector: false,
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

    case fromEditor.TOGGLE_FILES: {
      return {
        ...state,
        showFiles: !state.showFiles,
      };
    }

    case fromEditor.TOGGLE_INSPECTOR: {
      return {
        ...state,
        showInspector: !state.showInspector,
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

export const getShowFiles = (state: State) => state.showFiles;

export const getShowInspector = (state: State) => state.showInspector;
