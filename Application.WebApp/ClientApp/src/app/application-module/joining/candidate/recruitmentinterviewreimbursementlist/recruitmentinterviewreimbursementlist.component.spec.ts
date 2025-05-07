import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentinterviewreimbursementlistComponent } from './recruitmentinterviewreimbursementlist.component';

describe('RecruitmentinterviewreimbursementlistComponent', () => {
  let component: RecruitmentinterviewreimbursementlistComponent;
  let fixture: ComponentFixture<RecruitmentinterviewreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentinterviewreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentinterviewreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
