import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesoffCampusrequisitionlistComponent } from './salesoff-campusrequisitionlist.component';

describe('SalesoffCampusrequisitionlistComponent', () => {
  let component: SalesoffCampusrequisitionlistComponent;
  let fixture: ComponentFixture<SalesoffCampusrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesoffCampusrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesoffCampusrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
