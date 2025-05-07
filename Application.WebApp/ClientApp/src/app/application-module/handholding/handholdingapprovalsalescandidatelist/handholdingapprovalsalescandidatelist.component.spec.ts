import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingapprovalsalescandidatelistComponent } from './handholdingapprovalsalescandidatelist.component';

describe('HandholdingapprovalsalescandidatelistComponent', () => {
  let component: HandholdingapprovalsalescandidatelistComponent;
  let fixture: ComponentFixture<HandholdingapprovalsalescandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingapprovalsalescandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingapprovalsalescandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
