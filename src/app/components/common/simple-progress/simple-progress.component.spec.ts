import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleProgressComponent } from './simple-progress.component';

describe('SimpleProgressComponent', () => {
  let component: SimpleProgressComponent;
  let fixture: ComponentFixture<SimpleProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleProgressComponent]
    });
    fixture = TestBed.createComponent(SimpleProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
