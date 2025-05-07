import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvdropcandidateactionComponent } from './cvdropcandidateaction.component';

describe('CvdropcandidateactionComponent', () => {
  let component: CvdropcandidateactionComponent;
  let fixture: ComponentFixture<CvdropcandidateactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvdropcandidateactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvdropcandidateactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
