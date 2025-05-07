import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccandidatetravelreimbursementlistComponent } from './occandidatetravelreimbursementlist.component';

describe('OccandidatetravelreimbursementlistComponent', () => {
  let component: OccandidatetravelreimbursementlistComponent;
  let fixture: ComponentFixture<OccandidatetravelreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccandidatetravelreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccandidatetravelreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
