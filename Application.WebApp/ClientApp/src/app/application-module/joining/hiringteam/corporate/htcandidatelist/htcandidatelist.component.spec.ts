import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtcandidatelistComponent } from './htcandidatelist.component';

describe('HtcandidatelistComponent', () => {
  let component: HtcandidatelistComponent;
  let fixture: ComponentFixture<HtcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
