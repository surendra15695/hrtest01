import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusrequisitionlistComponent } from './campusrequisitionlist.component';

describe('CampusrequisitionlistComponent', () => {
  let component: CampusrequisitionlistComponent;
  let fixture: ComponentFixture<CampusrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
