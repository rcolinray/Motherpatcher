import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpairedCableOverlayComponent } from './unpaired-cable-overlay.component';

describe('UnpairedCableOverlayComponent', () => {
  let component: UnpairedCableOverlayComponent;
  let fixture: ComponentFixture<UnpairedCableOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpairedCableOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpairedCableOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
