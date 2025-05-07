import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcsalesdiscontinuedcandidatelistComponent } from './ocsalesdiscontinuedcandidatelist.component';

describe('OcsalesdiscontinuedcandidatelistComponent', () => {
  let component: OcsalesdiscontinuedcandidatelistComponent;
  let fixture: ComponentFixture<OcsalesdiscontinuedcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcsalesdiscontinuedcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcsalesdiscontinuedcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
