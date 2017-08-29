import { Action } from '@ngrx/store';

import { Mother32, Knob, Switch } from '../models';

export const ADD_MOTHER32 = '[Mother32] Add Mother32';
export const REMOVE_MOTHER32 = '[Mother32] Remove Mother32';
export const TURN_KNOB = '[Mother32] Turn Knob';
export const TOGGLE_SWITCH = '[Mother32] Toggle Switch';
export const OCTAVE_UP = '[Mother32] Octave Up';
export const OCTAVE_DOWN = '[Mother32] Octave Down';

export class AddMother32Action implements Action {
  readonly type = ADD_MOTHER32;

  constructor(public payload: Mother32) {}
}

export class RemoveMother32Action implements Action {
  readonly type = REMOVE_MOTHER32;

  constructor(public payload: string) {}
}

export class TurnKnobAction implements Action {
  readonly type = TURN_KNOB;

  constructor(public payload: { entityId: string, knobName: Knob, angle: number }) {}
}

export class ToggleSwitchAction implements Action {
  readonly type = TOGGLE_SWITCH;

  constructor(public payload: { entityId: string, switchName: Switch }) {}
}

export class OctaveUpAction implements Action {
  readonly type = OCTAVE_UP;

  constructor(public payload: string) {}
}

export class OctaveDownAction implements Action {
  readonly type = OCTAVE_DOWN;

  constructor(public payload: string) {}
}

export type Actions = AddMother32Action
                    | RemoveMother32Action
                    | TurnKnobAction
                    | ToggleSwitchAction
                    | OctaveUpAction
                    | OctaveDownAction;
