import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusrequisitionlistComponentComponent } from './off-campusrequisitionlist-component.component';

describe('OffCampusrequisitionlistComponentComponent', () => {
  let component: OffCampusrequisitionlistComponentComponent;
  let fixture: ComponentFixture<OffCampusrequisitionlistComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusrequisitionlistComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusrequisitionlistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
