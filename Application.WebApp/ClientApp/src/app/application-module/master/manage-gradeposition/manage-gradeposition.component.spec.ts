import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGradepositionComponent } from './manage-gradeposition.component';

describe('ManageGradepositionComponent', () => {
  let component: ManageGradepositionComponent;
  let fixture: ComponentFixture<ManageGradepositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGradepositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGradepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
