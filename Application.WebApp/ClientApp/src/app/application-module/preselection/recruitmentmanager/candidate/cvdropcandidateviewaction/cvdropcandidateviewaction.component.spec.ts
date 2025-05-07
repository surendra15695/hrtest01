import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvdropcandidateviewactionComponent } from './cvdropcandidateviewaction.component';

describe('CvdropcandidateviewactionComponent', () => {
  let component: CvdropcandidateviewactionComponent;
  let fixture: ComponentFixture<CvdropcandidateviewactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvdropcandidateviewactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvdropcandidateviewactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
