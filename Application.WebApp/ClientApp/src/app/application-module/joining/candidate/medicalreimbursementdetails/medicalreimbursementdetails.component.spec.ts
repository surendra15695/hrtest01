import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalreimbursementdetailsComponent } from './medicalreimbursementdetails.component';

describe('MedicalreimbursementdetailsComponent', () => {
  let component: MedicalreimbursementdetailsComponent;
  let fixture: ComponentFixture<MedicalreimbursementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalreimbursementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalreimbursementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
