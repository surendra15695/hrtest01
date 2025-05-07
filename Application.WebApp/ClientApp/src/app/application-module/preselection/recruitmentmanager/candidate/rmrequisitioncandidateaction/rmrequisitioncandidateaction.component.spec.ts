import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrequisitioncandidateactionComponent } from './rmrequisitioncandidateaction.component';

describe('RmrequisitioncandidateactionComponent', () => {
  let component: RmrequisitioncandidateactionComponent;
  let fixture: ComponentFixture<RmrequisitioncandidateactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrequisitioncandidateactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrequisitioncandidateactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
