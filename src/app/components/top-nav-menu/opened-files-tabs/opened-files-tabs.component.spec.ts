import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedFilesTabsComponent } from './opened-files-tabs.component';

describe('OpenedFilesTabsComponent', () => {
  let component: OpenedFilesTabsComponent;
  let fixture: ComponentFixture<OpenedFilesTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenedFilesTabsComponent]
    });
    fixture = TestBed.createComponent(OpenedFilesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
