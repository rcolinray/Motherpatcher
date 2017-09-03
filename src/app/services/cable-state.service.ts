import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import {
  Cable,
  Input,
  Output,
} from '../models';

import * as fromRoot from '../reducers';

import * as fromCable from '../actions/cable';

@Injectable()
export class CableStateService {

  cables$: Observable<Cable[]>;
  incompleteCable$: Observable<Cable | null>;

  constructor(private store: Store<fromRoot.State>) {
    this.cables$ = this.store.select(fromRoot.getAllCables);
    this.incompleteCable$ = this.store.select(fromRoot.getIncompleteCable);
  }

  connectInput(inputMother32Id: string, input: Input, inputX: number, inputY: number) {
    this.incompleteCable$.take(1).subscribe((cable) => {
      if (cable === null || cable.input === null) {
        const action = new fromCable.ConnectInputAction({
          inputMother32Id,
          input,
          inputX,
          inputY,
        });
        this.store.dispatch(action);
      }
    });
  }

  connectOutput(outputMother32Id: string, output: Output, outputX: number, outputY: number) {
    this.incompleteCable$.take(1).subscribe((cable) => {
      if (cable === null || cable.output === null) {
        const action = new fromCable.ConnectOutputAction({
          outputMother32Id,
          output,
          outputX,
          outputY,
        });
        this.store.dispatch(action);
      }
    });
  }

  removeCable(id: string) {
    const action = new fromCable.RemoveCableAction(id);
    this.store.dispatch(action);
  }

  removeConnectedCables(mother32Id: string) {
    this.cables$.take(1).subscribe((cables) => {
      for (let cable of cables) {
        if (cable.inputMother32Id === mother32Id || cable.outputMother32Id === mother32Id) {
          const action = new fromCable.RemoveCableAction(cable.id);
          this.store.dispatch(action);
        }
      }
    });
  }

}
