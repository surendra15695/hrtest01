import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitioncandidateviewComponent } from './requisitioncandidateview.component';

describe('RequisitioncandidateviewComponent', () => {
  let component: RequisitioncandidateviewComponent;
  let fixture: ComponentFixture<RequisitioncandidateviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitioncandidateviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitioncandidateviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
