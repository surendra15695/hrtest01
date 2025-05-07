import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingapprovalcorporatecandidatelistComponent } from './handholdingapprovalcorporatecandidatelist.component';

describe('HandholdingapprovalcorporatecandidatelistComponent', () => {
  let component: HandholdingapprovalcorporatecandidatelistComponent;
  let fixture: ComponentFixture<HandholdingapprovalcorporatecandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingapprovalcorporatecandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingapprovalcorporatecandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
