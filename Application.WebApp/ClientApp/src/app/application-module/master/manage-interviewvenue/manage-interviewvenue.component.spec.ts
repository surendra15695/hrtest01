import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInterviewvenueComponent } from './manage-interviewvenue.component';

describe('ManageInterviewvenueComponent', () => {
  let component: ManageInterviewvenueComponent;
  let fixture: ComponentFixture<ManageInterviewvenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInterviewvenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInterviewvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
