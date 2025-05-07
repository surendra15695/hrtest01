import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyrequisitioncandidatelistComponent } from './dummyrequisitioncandidatelist.component';

describe('DummyrequisitioncandidatelistComponent', () => {
  let component: DummyrequisitioncandidatelistComponent;
  let fixture: ComponentFixture<DummyrequisitioncandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyrequisitioncandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyrequisitioncandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
