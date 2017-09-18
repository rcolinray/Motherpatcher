import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import {
  reducers,
  metaReducers,
} from './reducers';

import { Mother32StateService } from './services/mother32-state.service';
import { EditorStateService } from './services/editor-state.service';
import { CableStateService } from './services/cable-state.service';

import { AppComponent } from './app.component';
import { Mother32Component } from './components/mother32/mother32.component';
import { KnobComponent } from './components/knob/knob.component';
import { SwitchComponent } from './components/switch/switch.component';
import { PatchPointComponent } from './components/patch-point/patch-point.component';
import { OctaveLedComponent } from './components/octave-led/octave-led.component';
import { OctaveButtonComponent } from './components/octave-button/octave-button.component';
import { BackgroundComponent } from './components/background/background.component';
import { ControlsComponent } from './components/controls/controls.component';
import { CableOverlayComponent } from './components/cable-overlay/cable-overlay.component';
import { CableComponent } from './components/cable/cable.component';
import { PatchPointOverlayComponent } from './components/patch-point-overlay/patch-point-overlay.component';
import { PatchBayComponent } from './components/patch-bay/patch-bay.component';

@NgModule({
  declarations: [
    AppComponent,
    Mother32Component,
    KnobComponent,
    SwitchComponent,
    PatchPointComponent,
    OctaveLedComponent,
    OctaveButtonComponent,
    BackgroundComponent,
    ControlsComponent,
    CableOverlayComponent,
    CableComponent,
    PatchPointOverlayComponent,
    PatchBayComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    Mother32StateService,
    EditorStateService,
    CableStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
