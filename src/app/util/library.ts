import { remote } from 'electron';

import * as path from 'path';

import {
  mkdir,
  readDir,
  lstat,
  readTree,
  Node,
} from './file';

const libraryDirName = 'Patches';
const patchExt = '.m32';

export async function ensureLibraryExists(): Promise<void> {
  try {
    const libraryPath = getLibraryPath();
    await mkdir(libraryPath);
  }
  catch (err) {
  }
}

export function getLibraryPath(): string {
  const userDataPath = remote.app.getPath('userData');
  return path.join(userDataPath, libraryDirName);
}

export async function getLibrary(): Promise<Node> {
  const libraryPath = getLibraryPath();
  return await readTree(libraryPath, patchExt);
}
