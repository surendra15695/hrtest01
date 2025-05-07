import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingallocationsalescandidatelistComponent } from './handholdingallocationsalescandidatelist.component';

describe('HandholdingallocationsalescandidatelistComponent', () => {
  let component: HandholdingallocationsalescandidatelistComponent;
  let fixture: ComponentFixture<HandholdingallocationsalescandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingallocationsalescandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingallocationsalescandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
