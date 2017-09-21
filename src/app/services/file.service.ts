import {
  Injectable,
  NgZone,
} from '@angular/core';

import * as fromRoot from '../reducers';

import { EditorStateService } from './editor-state.service';
import { Mother32StateService } from './mother32-state.service';
import { CableStateService } from './cable-state.service';

import { Patch } from '../models';

import {
  stateToPatch,
  serializePatch,
  deserializePatch,
  loadPatch,
} from '../util/patch';

import {
  showOpenDialog,
  showSaveDialog,
  readFile,
  writeFile,
} from '../util/file';

import { getValue } from '../util/observable';


@Injectable()
export class FileService {

  constructor(private editorState: EditorStateService,
              private mother32State: Mother32StateService,
              private cableState: CableStateService,
              private zone: NgZone) { }

  async openPatch(): Promise<void> {
    const options = {
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32'],
      }],
      properties: ['openFile'],
    };
    showOpenDialog(options)
      .then((filename) => {
        return readFile(filename[0]);
      })
      .then((data) => {
        const patch = deserializePatch(data.toString());
        this.loadPatch(patch);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  private loadPatch(patch: Patch) {
    this.zone.run(() => {
      loadPatch(patch, this.editorState, this.mother32State, this.cableState);
    });
  }

  savePatchAs() {
    const options = {
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32'],
      }],
    };
    showSaveDialog(options)
      .then((filename) => {
        const patch = stateToPatch(this.editorState, this.mother32State, this.cableState);
        const serialized = serializePatch(patch);
        return writeFile(filename, serialized);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  }

}
