import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtsalescandidatelistComponent } from './htsalescandidatelist.component';

describe('HtsalescandidatelistComponent', () => {
  let component: HtsalescandidatelistComponent;
  let fixture: ComponentFixture<HtsalescandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtsalescandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtsalescandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
