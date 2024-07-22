import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePopoverComponent } from './note-popover.component';

describe('NotePopoverComponent', () => {
  let component: NotePopoverComponent;
  let fixture: ComponentFixture<NotePopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotePopoverComponent]
    });
    fixture = TestBed.createComponent(NotePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
