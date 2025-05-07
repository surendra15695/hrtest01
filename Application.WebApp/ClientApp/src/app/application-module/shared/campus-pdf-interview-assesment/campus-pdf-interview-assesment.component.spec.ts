import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusPdfInterviewAssesmentComponent } from './campus-pdf-interview-assesment.component';

describe('CampusPdfInterviewAssesmentComponent', () => {
  let component: CampusPdfInterviewAssesmentComponent;
  let fixture: ComponentFixture<CampusPdfInterviewAssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusPdfInterviewAssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusPdfInterviewAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
