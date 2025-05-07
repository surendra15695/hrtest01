import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HraddcandidateComponent } from './hraddcandidate.component';

describe('HraddcandidateComponent', () => {
  let component: HraddcandidateComponent;
  let fixture: ComponentFixture<HraddcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HraddcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HraddcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
