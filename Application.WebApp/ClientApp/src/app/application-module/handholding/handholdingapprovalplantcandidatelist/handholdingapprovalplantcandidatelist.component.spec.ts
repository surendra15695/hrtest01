import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingapprovalplantcandidatelistComponent } from './handholdingapprovalplantcandidatelist.component';

describe('HandholdingapprovalplantcandidatelistComponent', () => {
  let component: HandholdingapprovalplantcandidatelistComponent;
  let fixture: ComponentFixture<HandholdingapprovalplantcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingapprovalplantcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingapprovalplantcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
