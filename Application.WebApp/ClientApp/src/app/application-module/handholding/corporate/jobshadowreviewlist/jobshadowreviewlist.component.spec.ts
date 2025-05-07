import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobshadowreviewlistComponent } from './jobshadowreviewlist.component';

describe('JobshadowreviewlistComponent', () => {
  let component: JobshadowreviewlistComponent;
  let fixture: ComponentFixture<JobshadowreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobshadowreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobshadowreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
