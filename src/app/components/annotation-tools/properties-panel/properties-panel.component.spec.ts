import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesPanelComponent } from './properties-panel.component';

describe('PropertiesPanelComponent', () => {
  let component: PropertiesPanelComponent;
  let fixture: ComponentFixture<PropertiesPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesPanelComponent]
    });
    fixture = TestBed.createComponent(PropertiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
