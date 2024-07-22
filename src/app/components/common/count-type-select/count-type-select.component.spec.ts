import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountTypeSelectComponent } from './count-type-select.component';

describe('CountTypeSelectComponent', () => {
  let component: CountTypeSelectComponent;
  let fixture: ComponentFixture<CountTypeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountTypeSelectComponent]
    });
    fixture = TestBed.createComponent(CountTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
