import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCandidateManagementApporvalGenerateViewComponent } from './campus-candidate-management-apporval-generate-view.component';

describe('CampusCandidateManagementApporvalGenerateViewComponent', () => {
  let component: CampusCandidateManagementApporvalGenerateViewComponent;
  let fixture: ComponentFixture<CampusCandidateManagementApporvalGenerateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCandidateManagementApporvalGenerateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCandidateManagementApporvalGenerateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
