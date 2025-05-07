import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccorporatediscontinuedcandidatelistComponent } from './occorporatediscontinuedcandidatelist.component';

describe('OccorporatediscontinuedcandidatelistComponent', () => {
  let component: OccorporatediscontinuedcandidatelistComponent;
  let fixture: ComponentFixture<OccorporatediscontinuedcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccorporatediscontinuedcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccorporatediscontinuedcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
