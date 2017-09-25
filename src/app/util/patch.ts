import { Mother32StateService } from '../services/mother32-state.service';
import { EditorStateService } from '../services/editor-state.service';
import { CableStateService } from '../services/cable-state.service';

import { Patch } from '../models';

import { getValue } from './observable';

export function stateToPatch(editorState: EditorStateService,
                             mother32State: Mother32StateService,
                             cableState: CableStateService): Patch {
  return {
    name: getValue(editorState.name$),
    notes: getValue(editorState.notes$),
    mother32s: getValue(mother32State.mother32s$),
    connections: getValue(cableState.connectionPairs$),
  };
}

export function serializePatch(patch: Patch) {
  return JSON.stringify(patch, null, '\t');
}

export function deserializePatch(data: string): Patch | null {
  try {
    return JSON.parse(data);
  }
  catch (err) {
    console.log(err);
    return null;
  }
}

export function loadPatch(filename: string,
                          patch: Patch,
                          editorState: EditorStateService,
                          mother32State: Mother32StateService,
                          cableState: CableStateService) {
  // Remove existing Mother-32s (should remove all cables and connections as well)
  const mother32s = getValue(mother32State.mother32s$);
  for (let mother32 of mother32s) {
    mother32State.remove(mother32.id);
  }

  editorState.setFilename(filename);
  editorState.setName(patch.name);
  editorState.setNotes(patch.notes);

  for (let mother32 of patch.mother32s) {
    mother32State.add(mother32);
  }

  for (let pair of patch.connections) {
    cableState.addConnection(pair[0]);
    cableState.addConnection(pair[1]);
  }
}
