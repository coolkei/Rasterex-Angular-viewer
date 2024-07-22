import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampPanelComponent } from './stamp-panel.component';

describe('StampPanelComponent', () => {
  let component: StampPanelComponent;
  let fixture: ComponentFixture<StampPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StampPanelComponent]
    });
    fixture = TestBed.createComponent(StampPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
