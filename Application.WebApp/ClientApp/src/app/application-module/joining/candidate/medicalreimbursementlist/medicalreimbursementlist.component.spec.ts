import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalreimbursementlistComponent } from './medicalreimbursementlist.component';

describe('MedicalreimbursementlistComponent', () => {
  let component: MedicalreimbursementlistComponent;
  let fixture: ComponentFixture<MedicalreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
