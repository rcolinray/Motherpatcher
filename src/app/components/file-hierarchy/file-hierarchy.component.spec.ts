import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHierarchyComponent } from './file-hierarchy.component';

describe('FileHierarchyComponent', () => {
  let component: FileHierarchyComponent;
  let fixture: ComponentFixture<FileHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
