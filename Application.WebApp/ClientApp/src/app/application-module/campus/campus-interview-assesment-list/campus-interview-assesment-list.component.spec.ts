import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusInterviewAssesmentListComponent } from './campus-interview-assesment-list.component';

describe('CampusInterviewAssesmentListComponent', () => {
  let component: CampusInterviewAssesmentListComponent;
  let fixture: ComponentFixture<CampusInterviewAssesmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusInterviewAssesmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusInterviewAssesmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
