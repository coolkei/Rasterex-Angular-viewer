import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextEditorComponent } from './context-editor.component';

describe('ContextEditorComponent', () => {
  let component: ContextEditorComponent;
  let fixture: ComponentFixture<ContextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
