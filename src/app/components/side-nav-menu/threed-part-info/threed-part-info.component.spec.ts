import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedPartInfoComponent } from './threed-part-info.component';

describe('ThreedPartInfoComponent', () => {
  let component: ThreedPartInfoComponent;
  let fixture: ComponentFixture<ThreedPartInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreedPartInfoComponent]
    });
    fixture = TestBed.createComponent(ThreedPartInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
