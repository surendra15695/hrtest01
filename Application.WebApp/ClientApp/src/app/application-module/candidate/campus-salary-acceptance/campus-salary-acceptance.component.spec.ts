import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusSalaryAcceptanceComponent } from './campus-salary-acceptance.component';

describe('CampusSalaryAcceptanceComponent', () => {
  let component: CampusSalaryAcceptanceComponent;
  let fixture: ComponentFixture<CampusSalaryAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusSalaryAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusSalaryAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
