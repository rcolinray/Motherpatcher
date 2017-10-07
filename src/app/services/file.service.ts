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

import * as path from 'path';

@Injectable()
export class FileService {

  constructor(private editorState: EditorStateService,
              private mother32State: Mother32StateService,
              private cableState: CableStateService,
              private zone: NgZone) {
  }

  private async readPatch(filepath: string): Promise<void> {
    try {
      const data = await readFile(filepath);
      const patch = deserializePatch(data.toString());
      this.loadPatch(filepath, patch);
    }
    catch (err) {
      console.log(err);
    }
  }

  private async writePatch(filepath: string): Promise<void> {
    const patch = stateToPatch(this.editorState, this.mother32State, this.cableState);
    const serialized = serializePatch(patch);
    await writeFile(filepath, serialized);
  }

  async importPatch(): Promise<void> {
    const options = {
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32'],
      }],
      properties: ['openFile'],
    };
    try {
      const filename = await showOpenDialog(options);
      await this.readPatch(filename[0]);
    }
    catch (err) {
      console.log(err);
    }
  }

  private loadPatch(filename: string, patch: Patch) {
    this.zone.run(() => {
      loadPatch(filename, patch, this.editorState, this.mother32State, this.cableState);
    });
  }

  async exportPatch(): Promise<void> {
    const options = {
      filters: [{
        name: 'Mother-32 Patch',
        extensions: ['m32'],
      }],
    };
    try {
      const filename = await showSaveDialog(options);
      await this.writePatch(filename);
    }
    catch (err) {
      console.log(err);
    }
  }

}
