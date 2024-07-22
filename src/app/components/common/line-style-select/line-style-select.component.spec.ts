import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineStyleSelectComponent } from './line-style-select.component';

describe('LineStyleSelectComponent', () => {
  let component: LineStyleSelectComponent;
  let fixture: ComponentFixture<LineStyleSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineStyleSelectComponent]
    });
    fixture = TestBed.createComponent(LineStyleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
