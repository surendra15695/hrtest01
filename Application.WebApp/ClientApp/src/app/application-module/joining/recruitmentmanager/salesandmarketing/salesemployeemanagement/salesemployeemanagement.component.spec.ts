import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesemployeemanagementComponent } from './salesemployeemanagement.component';

describe('SalesemployeemanagementComponent', () => {
  let component: SalesemployeemanagementComponent;
  let fixture: ComponentFixture<SalesemployeemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesemployeemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesemployeemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
