import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGaleryComponent } from './file-galery.component';

describe('FileGaleryComponent', () => {
  let component: FileGaleryComponent;
  let fixture: ComponentFixture<FileGaleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileGaleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileGaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
