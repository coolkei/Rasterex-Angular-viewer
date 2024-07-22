import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErasePanelComponent } from './erase-panel.component';

describe('ErasePanelComponent', () => {
  let component: ErasePanelComponent;
  let fixture: ComponentFixture<ErasePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErasePanelComponent]
    });
    fixture = TestBed.createComponent(ErasePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
