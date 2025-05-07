import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorviewcandidateComponent } from './vendorviewcandidate.component';

describe('VendorviewcandidateComponent', () => {
  let component: VendorviewcandidateComponent;
  let fixture: ComponentFixture<VendorviewcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorviewcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorviewcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
