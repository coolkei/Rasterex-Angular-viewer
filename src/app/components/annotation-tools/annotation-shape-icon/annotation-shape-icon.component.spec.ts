import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationShapeIconComponent } from './annotation-shape-icon.component';

describe('AnnotationShapeIconComponent', () => {
  let component: AnnotationShapeIconComponent;
  let fixture: ComponentFixture<AnnotationShapeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnotationShapeIconComponent]
    });
    fixture = TestBed.createComponent(AnnotationShapeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
