import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AicconfirmreviewcandidatelistComponent } from './aicconfirmreviewcandidatelist.component';

describe('AicconfirmreviewcandidatelistComponent', () => {
  let component: AicconfirmreviewcandidatelistComponent;
  let fixture: ComponentFixture<AicconfirmreviewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AicconfirmreviewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AicconfirmreviewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
