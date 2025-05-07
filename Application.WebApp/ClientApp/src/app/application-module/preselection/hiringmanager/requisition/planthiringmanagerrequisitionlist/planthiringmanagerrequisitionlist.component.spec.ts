import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanthiringmanagerrequisitionlistComponent } from './planthiringmanagerrequisitionlist.component';

describe('PlanthiringmanagerrequisitionlistComponent', () => {
  let component: PlanthiringmanagerrequisitionlistComponent;
  let fixture: ComponentFixture<PlanthiringmanagerrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanthiringmanagerrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanthiringmanagerrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
