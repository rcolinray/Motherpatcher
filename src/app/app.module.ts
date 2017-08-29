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

import { AppComponent } from './app.component';
import { Mother32Component } from './components/mother32/mother32.component';
import { KnobComponent } from './components/knob/knob.component';
import { SwitchComponent } from './components/switch/switch.component';
import { PatchPointComponent } from './components/patch-point/patch-point.component';
import { OctaveLedComponent } from './components/octave-led/octave-led.component';
import { OctaveButtonComponent } from './components/octave-button/octave-button.component';
import { BackgroundComponent } from './components/background/background.component';
import { ControlsComponent } from './components/controls/controls.component';

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
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [Mother32StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
