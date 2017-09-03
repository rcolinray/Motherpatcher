import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';

import * as fromMother32 from '../actions/mother32';

import {
  Mother32,
  initMother32,
  Knob,
  Switch,
} from '../models/mother32';

@Injectable()
export class Mother32StateService {

  mother32s$: Observable<Mother32[]>;
  numMother32s$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.mother32s$ = this.store.select(fromRoot.getAllMother32s);
    this.numMother32s$ = this.mother32s$.map(mother32s => mother32s.length);
  }

  add(mother32: Mother32) {
    const action = new fromMother32.AddMother32Action(mother32);
    this.store.dispatch(action);
  }

  remove(id: string) {
    const action = new fromMother32.RemoveMother32Action(id);
    this.store.dispatch(action);
  }

  turnKnob(entityId: string, knobName: Knob, angle: number) {
    const action = new fromMother32.TurnKnobAction({
      entityId,
      knobName,
      angle,
    });
    this.store.dispatch(action);
  }

  toggleSwitch(entityId: string, switchName: Switch) {
    const action = new fromMother32.ToggleSwitchAction({
      entityId,
      switchName,
    });
    this.store.dispatch(action);
  }

  octaveUp(entityId: string) {
    const action = new fromMother32.OctaveUpAction(entityId);
    this.store.dispatch(action);
  }

  octaveDown(entityId: string) {
    const action = new fromMother32.OctaveDownAction(entityId);
    this.store.dispatch(action);
  }

}
