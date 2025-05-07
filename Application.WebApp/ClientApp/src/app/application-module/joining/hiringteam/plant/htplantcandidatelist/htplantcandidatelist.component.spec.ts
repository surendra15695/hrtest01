import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtplantcandidatelistComponent } from './htplantcandidatelist.component';

describe('HtplantcandidatelistComponent', () => {
  let component: HtplantcandidatelistComponent;
  let fixture: ComponentFixture<HtplantcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtplantcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtplantcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
