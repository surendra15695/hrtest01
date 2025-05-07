import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcviewcandidateassessmentsummaryComponent } from './pcviewcandidateassessmentsummary.component';

describe('PcviewcandidateassessmentsummaryComponent', () => {
  let component: PcviewcandidateassessmentsummaryComponent;
  let fixture: ComponentFixture<PcviewcandidateassessmentsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcviewcandidateassessmentsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcviewcandidateassessmentsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
