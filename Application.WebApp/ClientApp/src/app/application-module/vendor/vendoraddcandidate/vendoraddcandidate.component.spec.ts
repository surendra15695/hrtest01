import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoraddcandidateComponent } from './vendoraddcandidate.component';

describe('VendoraddcandidateComponent', () => {
  let component: VendoraddcandidateComponent;
  let fixture: ComponentFixture<VendoraddcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendoraddcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendoraddcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
