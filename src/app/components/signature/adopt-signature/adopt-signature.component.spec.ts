import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptSignatureComponent } from './adopt-signature.component';

describe('AdoptSignatureComponent', () => {
  let component: AdoptSignatureComponent;
  let fixture: ComponentFixture<AdoptSignatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptSignatureComponent]
    });
    fixture = TestBed.createComponent(AdoptSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
