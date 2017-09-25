import { remote } from 'electron';

import * as fs from 'fs';
import * as path from 'path';

export async function mkdir(path): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

export async function access(path: string, mode: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.access(path, mode, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

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

export async function readDir(path: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(files);
      }
    });
  });
}

export async function lstat(path: string): Promise<fs.Stats> {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(stats);
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

export interface File {
  type: 'file';
  path: string;
}

export interface Directory {
  type: 'directory';
  path: string;
  children: Node[];
}

export type Node = File | Directory;

export async function readTree(root: string, extension?: string): Promise<Node | null> {
  const stats = await lstat(root);
  if (!stats.isDirectory()) {
    return {
      type: 'file',
      path: root,
    };
  }

  const children = [];
  const files = await readDir(root);
  for (let file of files) {
    if (extension && path.extname(file) !== extension) {
      continue;
    }

    const fullPath = path.join(root, file);
    const node = await readTree(fullPath);
    if (node === null) {
      continue;
    }

    children.push(node);
  }
  return {
    type: 'directory',
    path: root,
    children,
  };
}
