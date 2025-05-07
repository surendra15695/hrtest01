import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinerbatchWiseCandidateComponent } from './newjoinerbatch-wise-candidate.component';

describe('NewjoinerbatchWiseCandidateComponent', () => {
  let component: NewjoinerbatchWiseCandidateComponent;
  let fixture: ComponentFixture<NewjoinerbatchWiseCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinerbatchWiseCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinerbatchWiseCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
