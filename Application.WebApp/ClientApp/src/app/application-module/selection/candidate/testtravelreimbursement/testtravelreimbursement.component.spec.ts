import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttravelreimbursementComponent } from './testtravelreimbursement.component';

describe('TesttravelreimbursementComponent', () => {
  let component: TesttravelreimbursementComponent;
  let fixture: ComponentFixture<TesttravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
