import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInterviewpanelComponent } from './manage-interviewpanel.component';

describe('ManageInterviewpanelComponent', () => {
  let component: ManageInterviewpanelComponent;
  let fixture: ComponentFixture<ManageInterviewpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInterviewpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInterviewpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
