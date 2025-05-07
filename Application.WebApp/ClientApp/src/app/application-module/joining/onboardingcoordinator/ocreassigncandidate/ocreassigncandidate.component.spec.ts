import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcreassigncandidateComponent } from './ocreassigncandidate.component';

describe('OcreassigncandidateComponent', () => {
  let component: OcreassigncandidateComponent;
  let fixture: ComponentFixture<OcreassigncandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcreassigncandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcreassigncandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
