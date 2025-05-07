import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusrequisitionlinkComponent } from './campusrequisitionlink.component';

describe('CampusrequisitionlinkComponent', () => {
  let component: CampusrequisitionlinkComponent;
  let fixture: ComponentFixture<CampusrequisitionlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusrequisitionlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusrequisitionlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
