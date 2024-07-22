import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComparisonComponent } from './create-comparison.component';

describe('CompareModalComponent', () => {
  let component: CreateComparisonComponent;
  let fixture: ComponentFixture<CreateComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComparisonComponent]
    });
    fixture = TestBed.createComponent(CreateComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
