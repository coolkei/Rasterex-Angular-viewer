import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedPartsComponent } from './threed-parts.component';

describe('ThreedPartsComponent', () => {
  let component: ThreedPartsComponent;
  let fixture: ComponentFixture<ThreedPartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreedPartsComponent]
    });
    fixture = TestBed.createComponent(ThreedPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
