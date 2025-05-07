import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverrequisitionlistComponent } from './approverrequisitionlist.component';

describe('ApproverrequisitionlistComponent', () => {
  let component: ApproverrequisitionlistComponent;
  let fixture: ComponentFixture<ApproverrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
