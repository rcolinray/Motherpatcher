import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchPointComponent } from './patch-point.component';

describe('PatchPointComponent', () => {
  let component: PatchPointComponent;
  let fixture: ComponentFixture<PatchPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatchPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
