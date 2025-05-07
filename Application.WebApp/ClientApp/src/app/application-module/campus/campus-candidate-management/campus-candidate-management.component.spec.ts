import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCandidateManagementComponent } from './campus-candidate-management.component';

describe('CampusCandidateManagementComponent', () => {
  let component: CampusCandidateManagementComponent;
  let fixture: ComponentFixture<CampusCandidateManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCandidateManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCandidateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
