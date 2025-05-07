import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmenttestreimbursementlistComponent } from './recruitmenttestreimbursementlist.component';

describe('RecruitmenttestreimbursementlistComponent', () => {
  let component: RecruitmenttestreimbursementlistComponent;
  let fixture: ComponentFixture<RecruitmenttestreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmenttestreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmenttestreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
