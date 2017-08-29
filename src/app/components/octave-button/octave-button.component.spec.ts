import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OctaveButtonComponent } from './octave-button.component';

describe('OctaveButtonComponent', () => {
  let component: OctaveButtonComponent;
  let fixture: ComponentFixture<OctaveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OctaveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OctaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
