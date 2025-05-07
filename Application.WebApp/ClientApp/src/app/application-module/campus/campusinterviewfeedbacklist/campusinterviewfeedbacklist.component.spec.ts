import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusinterviewfeedbacklistComponent } from './campusinterviewfeedbacklist.component';

describe('CampusinterviewfeedbacklistComponent', () => {
  let component: CampusinterviewfeedbacklistComponent;
  let fixture: ComponentFixture<CampusinterviewfeedbacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusinterviewfeedbacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusinterviewfeedbacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
