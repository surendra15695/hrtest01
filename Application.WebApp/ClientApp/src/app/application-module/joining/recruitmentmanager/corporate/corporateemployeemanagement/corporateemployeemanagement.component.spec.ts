import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateemployeemanagementComponent } from './corporateemployeemanagement.component';

describe('CorporateemployeemanagementComponent', () => {
  let component: CorporateemployeemanagementComponent;
  let fixture: ComponentFixture<CorporateemployeemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateemployeemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateemployeemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
