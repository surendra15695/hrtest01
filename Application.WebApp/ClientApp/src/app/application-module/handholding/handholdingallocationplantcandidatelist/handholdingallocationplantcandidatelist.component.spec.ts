import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandholdingallocationplantcandidatelistComponent } from './handholdingallocationplantcandidatelist.component';

describe('HandholdingallocationplantcandidatelistComponent', () => {
  let component: HandholdingallocationplantcandidatelistComponent;
  let fixture: ComponentFixture<HandholdingallocationplantcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandholdingallocationplantcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandholdingallocationplantcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
