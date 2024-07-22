import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStyleSelectComponent } from './text-style-select.component';

describe('TextStyleSelectComponent', () => {
  let component: TextStyleSelectComponent;
  let fixture: ComponentFixture<TextStyleSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextStyleSelectComponent]
    });
    fixture = TestBed.createComponent(TextStyleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
