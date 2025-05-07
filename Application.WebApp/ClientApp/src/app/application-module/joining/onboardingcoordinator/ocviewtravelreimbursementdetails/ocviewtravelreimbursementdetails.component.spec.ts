import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcviewtravelreimbursementdetailsComponent } from './ocviewtravelreimbursementdetails.component';

describe('OcviewtravelreimbursementdetailsComponent', () => {
  let component: OcviewtravelreimbursementdetailsComponent;
  let fixture: ComponentFixture<OcviewtravelreimbursementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcviewtravelreimbursementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcviewtravelreimbursementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
