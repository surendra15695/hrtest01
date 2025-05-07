import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductiveSalaryComponent } from './inductive-salary.component';

describe('InductiveSalaryComponent', () => {
  let component: InductiveSalaryComponent;
  let fixture: ComponentFixture<InductiveSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductiveSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductiveSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// Sayandeep
