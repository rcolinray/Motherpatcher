import { Action } from '@ngrx/store';

export const SET_SCALE = '[Editor] Set Scale';

export class SetScaleAction implements Action {
  readonly type = SET_SCALE;

  constructor(public payload: number) {
  }
}

export type Actions = SetScaleAction;
