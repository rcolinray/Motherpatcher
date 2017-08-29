import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mother32Component } from './mother32.component';

describe('Mother32Component', () => {
  let component: Mother32Component;
  let fixture: ComponentFixture<Mother32Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mother32Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mother32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
