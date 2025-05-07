import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusDummyRequisitionListComponent } from './campus-dummy-requisition-list.component';

describe('CampusDummyRequisitionListComponent', () => {
  let component: CampusDummyRequisitionListComponent;
  let fixture: ComponentFixture<CampusDummyRequisitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusDummyRequisitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusDummyRequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
