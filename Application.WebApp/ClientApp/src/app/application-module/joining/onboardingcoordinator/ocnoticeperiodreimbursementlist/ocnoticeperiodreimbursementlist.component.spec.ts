import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcnoticeperiodreimbursementlistComponent } from './ocnoticeperiodreimbursementlist.component';

describe('OcnoticeperiodreimbursementlistComponent', () => {
  let component: OcnoticeperiodreimbursementlistComponent;
  let fixture: ComponentFixture<OcnoticeperiodreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcnoticeperiodreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcnoticeperiodreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
