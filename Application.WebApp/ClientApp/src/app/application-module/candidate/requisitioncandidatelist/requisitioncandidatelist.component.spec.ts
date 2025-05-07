import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitioncandidatelistComponent } from './requisitioncandidatelist.component';

describe('RequisitioncandidatelistComponent', () => {
  let component: RequisitioncandidatelistComponent;
  let fixture: ComponentFixture<RequisitioncandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitioncandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitioncandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
