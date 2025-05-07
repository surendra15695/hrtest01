import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverresignationlistComponent } from './approverresignationlist.component';

describe('ApproverresignationlistComponent', () => {
  let component: ApproverresignationlistComponent;
  let fixture: ComponentFixture<ApproverresignationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverresignationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverresignationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
