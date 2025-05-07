import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCandidateSelectionAcknowledgementComponent } from './campus-candidate-selection-acknowledgement.component';

describe('CampusCandidateSelectionAcknowledgementComponent', () => {
  let component: CampusCandidateSelectionAcknowledgementComponent;
  let fixture: ComponentFixture<CampusCandidateSelectionAcknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCandidateSelectionAcknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCandidateSelectionAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
