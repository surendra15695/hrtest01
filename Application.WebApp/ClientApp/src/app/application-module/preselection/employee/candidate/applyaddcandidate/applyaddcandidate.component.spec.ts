import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyaddcandidateComponent } from './applyaddcandidate.component';

describe('ApplyaddcandidateComponent', () => {
  let component: ApplyaddcandidateComponent;
  let fixture: ComponentFixture<ApplyaddcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyaddcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyaddcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
