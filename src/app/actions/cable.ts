import { Action } from '@ngrx/store';

import {
  Cable,
  Connection,
} from '../models/cable';

export const ADD_CABLE = '[Cable] Add Cable';
export const REMOVE_CABLE = '[Cable] Remove Cable';
export const ADD_UNPAIRED_CONNECTION = '[Cable] Add Unpaired Connection';
export const CANCEL_CONNECTION = '[Cable] Cancel Connection';
export const ADD_PAIRED_CONNECTION = '[Cable] Add Paired Connection';
export const REMOVE_CONNECTION = '[Cable] Remove Connection';

export class AddCableAction implements Action {
  readonly type = ADD_CABLE;

  constructor(public payload: Cable) {}
}

export class RemoveCableAction implements Action {
  readonly type = REMOVE_CABLE;

  constructor(public payload: string) {}
}

export class AddUnpairedConnectionAction implements Action {
  readonly type = ADD_UNPAIRED_CONNECTION;

  constructor(public payload: Connection) {}
}

export class AddPairedConnectionAction implements Action {
  readonly type = ADD_PAIRED_CONNECTION;

  constructor(public payload: Connection) {}
}

export class RemoveConnectionAction implements Action {
  readonly type = REMOVE_CONNECTION;

  constructor(public payload: string) {}
}

export type Actions = AddCableAction
                    | RemoveCableAction
                    | AddUnpairedConnectionAction
                    | AddPairedConnectionAction
                    | RemoveConnectionAction;
