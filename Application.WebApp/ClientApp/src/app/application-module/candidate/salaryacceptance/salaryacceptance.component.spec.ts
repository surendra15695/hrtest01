import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryacceptanceComponent } from './salaryacceptance.component';

describe('SalaryacceptanceComponent', () => {
  let component: SalaryacceptanceComponent;
  let fixture: ComponentFixture<SalaryacceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryacceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryacceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
