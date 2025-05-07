import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobshadowreviewapprovalComponent } from './jobshadowreviewapproval.component';

describe('JobshadowreviewapprovalComponent', () => {
  let component: JobshadowreviewapprovalComponent;
  let fixture: ComponentFixture<JobshadowreviewapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobshadowreviewapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobshadowreviewapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
