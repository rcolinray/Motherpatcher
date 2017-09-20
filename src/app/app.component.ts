import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { v4 as uuid } from 'uuid';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { MdSliderChange } from '@angular/material';

import { Mother32StateService } from './services/mother32-state.service';
import { EditorStateService } from './services/editor-state.service';
import { CableStateService } from './services/cable-state.service';
import { FileService } from './services/file.service';

import {
  Mother32,
  initMother32,
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

  mother32s$: Observable<Mother32[]>;
  numMother32s$: Observable<number>;
  scale$: Observable<number>;
  unpairedConnection$: Observable<Connection | null>;
  patching$: Observable<boolean>;

  constructor(private mother32State: Mother32StateService,
              private editorState: EditorStateService,
              private cableState: CableStateService,
              private file: FileService) {
    this.mother32s$ = this.mother32State.mother32s$;
    this.numMother32s$ = this.mother32State.numMother32s$;
    this.scale$ = this.editorState.scale$;
    this.unpairedConnection$ = this.cableState.unpairedConnection$;
    this.patching$ = this.unpairedConnection$.map((connection) => connection !== null);
  }

  ngOnInit() {
    this.addMother32();
  }

  setScale(event: MdSliderChange) {
    this.editorState.setScale(event.value);
  }

  initPatch() {
    const mother32s = getValue(this.mother32s$);
    for (let mother32 of mother32s) {
      this.mother32State.remove(mother32.id);
    }

    this.addMother32();
  }

  openPatch() {
    this.file.openPatch();
  }

  savePatchAs() {
    this.file.savePatchAs();
  }

  addMother32() {
    const mother32s = getValue(this.mother32s$);
    if (mother32s.length === 3) {
      return;
    }

    const entity = initMother32(uuid());
    this.mother32State.add(entity);
  }

  removeMother32() {
    const mother32s = getValue(this.mother32s$);
    if (mother32s.length === 1) {
      return;
    }

    const last = mother32s.length - 1;
    const mother32Id = mother32s[last].id;
    this.mother32State.remove(mother32Id);
  }

}
