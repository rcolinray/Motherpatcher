import { Action } from '@ngrx/store';

export const SET_SCALE = '[Editor] Set Scale';
export const SET_FILENAME = '[Editor] Set Filename';
export const SET_NAME = '[Editor] Set Name';
export const SET_NOTES = '[Editor] Set Notes';
export const TOGGLE_FILES = '[Editor] Toggle Files';
export const TOGGLE_INSPECTOR = '[Editor] Toggle Inspector';

export class SetScaleAction implements Action {
  readonly type = SET_SCALE;

  constructor(public payload: number) {
  }
}

export class SetFilenameAction implements Action {
  readonly type = SET_FILENAME;

  constructor(public payload: string) {
  }
}

export class SetNameAction implements Action {
  readonly type = SET_NAME;

  constructor(public payload: string) {
  }
}

export class SetNotesAction implements Action {
  readonly type = SET_NOTES;

  constructor(public payload: string) {
  }
}

export class ToggleFilesAction implements Action {
  readonly type = TOGGLE_FILES;
}

export class ToggleInspectorAction implements Action {
  readonly type = TOGGLE_INSPECTOR;
}

export type Actions = SetScaleAction
                    | SetFilenameAction
                    | SetNameAction
                    | SetNotesAction
                    | ToggleFilesAction
                    | ToggleInspectorAction;
