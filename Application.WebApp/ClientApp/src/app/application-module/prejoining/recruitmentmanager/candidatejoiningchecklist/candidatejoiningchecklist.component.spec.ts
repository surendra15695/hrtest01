import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatejoiningchecklistComponent } from './candidatejoiningchecklist.component';

describe('CandidatejoiningchecklistComponent', () => {
  let component: CandidatejoiningchecklistComponent;
  let fixture: ComponentFixture<CandidatejoiningchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatejoiningchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatejoiningchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
