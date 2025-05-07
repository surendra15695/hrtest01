import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusinterviewassessmentComponent } from './campusinterviewassessment.component';

describe('CampusinterviewassessmentComponent', () => {
  let component: CampusinterviewassessmentComponent;
  let fixture: ComponentFixture<CampusinterviewassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusinterviewassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusinterviewassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
