import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchBayComponent } from './patch-bay.component';

describe('PatchBayComponent', () => {
  let component: PatchBayComponent;
  let fixture: ComponentFixture<PatchBayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchBayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
