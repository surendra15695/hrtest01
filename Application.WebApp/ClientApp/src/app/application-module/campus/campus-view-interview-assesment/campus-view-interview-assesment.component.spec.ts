import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusViewInterviewAssesmentComponent } from './campus-view-interview-assesment.component';

describe('CampusViewInterviewAssesmentComponent', () => {
  let component: CampusViewInterviewAssesmentComponent;
  let fixture: ComponentFixture<CampusViewInterviewAssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusViewInterviewAssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusViewInterviewAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
