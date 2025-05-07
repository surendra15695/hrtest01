import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingallocationcandidatelistComponent } from './handholdingallocationcandidatelist.component';

describe('HandholdingallocationcandidatelistComponent', () => {
  let component: HandholdingallocationcandidatelistComponent;
  let fixture: ComponentFixture<HandholdingallocationcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingallocationcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingallocationcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
