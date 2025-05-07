import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcandidateComponent } from './vendorcandidate.component';

describe('VendorcandidateComponent', () => {
  let component: VendorcandidateComponent;
  let fixture: ComponentFixture<VendorcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
