import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationreviewapprovalComponent } from './confirmationreviewapproval.component';

describe('ConfirmationreviewapprovalComponent', () => {
  let component: ConfirmationreviewapprovalComponent;
  let fixture: ComponentFixture<ConfirmationreviewapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationreviewapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationreviewapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
