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

export async function showOpenDialog(options): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    remote.dialog.showOpenDialog(options, (filePaths?: string[]) => {
      if (!filePaths) {
        reject();
      }
      else {
        resolve(filePaths);
      }
    });
  });
}

export async function showSaveDialog(options): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    remote.dialog.showSaveDialog(options, (filename?: string) => {
      if (!filename) {
        reject();
      }
      else {
        resolve(filename);
      }
    });
  });
}

export async function readFile(filename: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

export async function writeFile(filename: string, data: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

@Injectable()
export class FileService {

  constructor(private store: Store<fromRoot.State>,
              private mother32State: Mother32StateService,
              private cableState: CableStateService,
              private zone: NgZone) { }

  async openPatch(): Promise<void> {
    const options = {
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32patch'],
      }],
      properties: ['openFile'],
    };
    showOpenDialog(options)
      .then((filename) => {
        return readFile(filename[0]);
      })
      .then((data) => {
        const state = JSON.parse(data.toString());
        this.loadPatch(state);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
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
    const options = {
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32patch'],
      }],
    };
    showSaveDialog(options)
      .then((filename) => {
        const state = getValue(this.store);
        const serialized = JSON.stringify(state, null, '\t');
        return writeFile(filename, serialized);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }


}
