import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OctaveLedComponent } from './octave-led.component';

describe('OctaveLedComponent', () => {
  let component: OctaveLedComponent;
  let fixture: ComponentFixture<OctaveLedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OctaveLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OctaveLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
