import {
  Injectable,
  NgZone,
} from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromRoot from '../reducers';

import { Mother32StateService } from './mother32-state.service';
import { CableStateService } from './cable-state.service';

import { getValue } from '../util/observable';

import { remote } from 'electron';

import * as fs from 'fs';

@Injectable()
export class FileService {

  constructor(private store: Store<fromRoot.State>,
              private mother32State: Mother32StateService,
              private cableState: CableStateService,
              private zone: NgZone) { }

  openPatch() {
    remote.dialog.showOpenDialog({
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32patch'],
      }],
      properties: ['openFile'],
    }, (filePaths: string[]) => {
      if (!filePaths || filePaths.length !== 1) {
        return;
      }

      fs.readFile(filePaths[0], (err, data) => {
        if (err) {
          console.error(err);
        }
        else {
          try {
            const state = JSON.parse(data.toString());
            this.loadPatch(state);
          }
          catch (ex) {
            console.error(ex);
          }
        }
      });
    });
  }

  private loadPatch(state: fromRoot.State) {
    this.zone.run(() => {
      // Remove existing Mother-32s (should remove all cables and connections as well)
      const mother32s = getValue(this.mother32State.mother32s$);
      for (let mother32 of mother32s) {
        this.mother32State.remove(mother32.id);
      }

      for (let id of state.mother32.ids) {
        this.mother32State.add(state.mother32.entities[id]);
      }

      for (let id of state.cable.connectionIds) {
        this.cableState.addConnection(state.cable.connections[id]);
      }
    });
  }

  savePatchAs() {
    remote.dialog.showSaveDialog({
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32patch'],
      }],
    }, (filename: string) => {
      if (!filename) {
        return;
      }
      const state = getValue(this.store);
      const serialized = JSON.stringify(state, null, '\t');
      fs.writeFile(filename, serialized, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }


}
