import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsmpusCandidateSalaryFitmentComponent } from './csmpus-candidate-salary-fitment.component';

describe('CsmpusCandidateSalaryFitmentComponent', () => {
  let component: CsmpusCandidateSalaryFitmentComponent;
  let fixture: ComponentFixture<CsmpusCandidateSalaryFitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsmpusCandidateSalaryFitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsmpusCandidateSalaryFitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
