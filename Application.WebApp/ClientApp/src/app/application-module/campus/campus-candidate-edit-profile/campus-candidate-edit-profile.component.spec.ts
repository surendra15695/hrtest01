import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCandidateEditProfileComponent } from './campus-candidate-edit-profile.component';

describe('CampusCandidateEditProfileComponent', () => {
  let component: CampusCandidateEditProfileComponent;
  let fixture: ComponentFixture<CampusCandidateEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCandidateEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCandidateEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
