import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationToolsComponent } from './annotation-tools.component';

describe('AnnotationsMenuComponent', () => {
  let component: AnnotationToolsComponent;
  let fixture: ComponentFixture<AnnotationToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnotationToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
