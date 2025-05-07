import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccandidatemedicalreimbursementlistComponent } from './occandidatemedicalreimbursementlist.component';

describe('OccandidatemedicalreimbursementlistComponent', () => {
  let component: OccandidatemedicalreimbursementlistComponent;
  let fixture: ComponentFixture<OccandidatemedicalreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccandidatemedicalreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccandidatemedicalreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
