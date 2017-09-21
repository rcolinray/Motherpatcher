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
