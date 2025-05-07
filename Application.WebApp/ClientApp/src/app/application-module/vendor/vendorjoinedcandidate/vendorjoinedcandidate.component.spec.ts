import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorjoinedcandidateComponent } from './vendorjoinedcandidate.component';

describe('VendorjoinedcandidateComponent', () => {
  let component: VendorjoinedcandidateComponent;
  let fixture: ComponentFixture<VendorjoinedcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorjoinedcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorjoinedcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
