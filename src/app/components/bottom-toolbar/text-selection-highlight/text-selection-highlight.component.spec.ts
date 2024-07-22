import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSelectionHighlightComponent } from './text-selection-highlight.component';

describe('TextSelectionHighlightComponent', () => {
  let component: TextSelectionHighlightComponent;
  let fixture: ComponentFixture<TextSelectionHighlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextSelectionHighlightComponent]
    });
    fixture = TestBed.createComponent(TextSelectionHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
