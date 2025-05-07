import { TestBed } from '@angular/core/testing';

import { InterviewcalendaractionService } from './interviewcalendaraction.service';

describe('InterviewcalendaractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewcalendaractionService = TestBed.get(InterviewcalendaractionService);
    expect(service).toBeTruthy();
  });
});
