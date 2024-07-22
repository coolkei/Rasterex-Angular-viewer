import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorLayersComponent } from './vector-layers.component';

describe('VectorLayersComponent', () => {
  let component: VectorLayersComponent;
  let fixture: ComponentFixture<VectorLayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VectorLayersComponent]
    });
    fixture = TestBed.createComponent(VectorLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
