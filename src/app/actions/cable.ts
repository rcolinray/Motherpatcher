import { Action } from '@ngrx/store';

import { Input, Output } from '../models/cable';

export const TOGGLE_SHOW_CABLES = '[Cable] Toggle Show Cables';
export const CONNECT_INPUT = '[Cable] Connect Input';
export const CONNECT_OUTPUT = '[Cable] Connect Output';
export const CANCEL_CABLE = '[Cable] Cancel Cable';
export const REMOVE_CABLE = '[Cable] Remove Cable';

export class ToggleShowCablesAction implements Action {
  readonly type = TOGGLE_SHOW_CABLES;
}

export class ConnectInputAction implements Action {
  readonly type = CONNECT_INPUT;

  constructor(public payload: { inputMother32Id: string, input: Input, inputX: number, inputY: number}) {}
}

export class ConnectOutputAction implements Action {
  readonly type = CONNECT_OUTPUT;

  constructor(public payload: { outputMother32Id: string, output: Output, outputX: number, outputY: number}) {}
}

export class CancelCableAction implements Action {
  readonly type = CANCEL_CABLE;
}

export class RemoveCableAction implements Action {
  readonly type = REMOVE_CABLE;

  constructor(public payload: string) {}
}

export type Actions = ToggleShowCablesAction
                    | ConnectInputAction
                    | ConnectOutputAction
                    | CancelCableAction
                    | RemoveCableAction;
