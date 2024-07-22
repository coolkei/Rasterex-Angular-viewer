import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndZoneComponent } from './dnd-zone.component';

describe('DndZoneComponent', () => {
  let component: DndZoneComponent;
  let fixture: ComponentFixture<DndZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DndZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DndZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
