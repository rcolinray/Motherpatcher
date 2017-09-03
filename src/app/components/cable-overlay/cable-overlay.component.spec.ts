import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CableOverlayComponent } from './cable-overlay.component';

describe('CableOverlayComponent', () => {
  let component: CableOverlayComponent;
  let fixture: ComponentFixture<CableOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CableOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CableOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
