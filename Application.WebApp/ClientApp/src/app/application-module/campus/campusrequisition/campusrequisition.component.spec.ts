import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusrequisitionComponent } from './campusrequisition.component';

describe('CampusrequisitionComponent', () => {
  let component: CampusrequisitionComponent;
  let fixture: ComponentFixture<CampusrequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusrequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusrequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
