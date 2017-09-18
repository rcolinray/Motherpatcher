import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchPointOverlayComponent } from './patch-point-overlay.component';

describe('PatchPointOverlayComponent', () => {
  let component: PatchPointOverlayComponent;
  let fixture: ComponentFixture<PatchPointOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchPointOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchPointOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
