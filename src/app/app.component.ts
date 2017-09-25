import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32StateService } from './services/mother32-state.service';
import { EditorStateService } from './services/editor-state.service';
import { CableStateService } from './services/cable-state.service';
import { FileService } from './services/file.service';

import {
  Mother32,
  Connection,
} from './models';

import { getValue } from './util/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  name$: Observable<string>;
  notes$: Observable<string>;
  mother32s$: Observable<Mother32[]>;
  numMother32s$: Observable<number>;
  scale$: Observable<number>;
  unpairedConnection$: Observable<Connection | null>;
  patching$: Observable<boolean>;
  showFiles$: Observable<boolean>;
  showInspector$: Observable<boolean>;

  constructor(private mother32State: Mother32StateService,
              private editorState: EditorStateService,
              private cableState: CableStateService,
              private file: FileService) {

    this.name$ = this.editorState.name$;
    this.notes$ = this.editorState.notes$;
    this.mother32s$ = this.mother32State.mother32s$;
    this.numMother32s$ = this.mother32s$.map((mother32s) => mother32s.length);
    this.scale$ = this.editorState.scale$;
    this.unpairedConnection$ = this.cableState.unpairedConnection$;
    this.showFiles$ = this.editorState.showFiles$;
    this.showInspector$ = this.editorState.showInspector$;
  }

  ngOnInit() {
    this.initPatch();
  }

  zoomIn() {
    this.editorState.zoomIn();
  }

  zoomOut() {
    this.editorState.zoomOut();
  }

  setScale(value: number) {
    this.editorState.setScale(value);
  }

  toggleFiles() {
    this.editorState.toggleFiles();
  }

  toggleInspector() {
    this.editorState.toggleInspector();
  }

  setName(name: string) {
    this.editorState.setName(name);
  }

  setNotes(notes: string) {
    this.editorState.setNotes(notes);
  }

  initPatch() {
    this.editorState.init();
    this.mother32State.init();
  }

  importPatch() {
    this.file.importPatch();
  }

  exportPatch() {
    this.file.exportPatch();
  }

  addMother32() {
    this.mother32State.addNew();
  }

  removeMother32() {
    this.mother32State.removeExisting();
  }

}
