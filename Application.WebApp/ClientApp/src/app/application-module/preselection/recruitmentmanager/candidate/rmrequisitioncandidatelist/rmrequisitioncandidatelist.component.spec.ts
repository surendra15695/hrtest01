import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrequisitioncandidatelistComponent } from './rmrequisitioncandidatelist.component';

describe('RmrequisitioncandidatelistComponent', () => {
  let component: RmrequisitioncandidatelistComponent;
  let fixture: ComponentFixture<RmrequisitioncandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrequisitioncandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrequisitioncandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
