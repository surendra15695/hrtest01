import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleshiringmanagerrequisitionlistComponent } from './saleshiringmanagerrequisitionlist.component';

describe('SaleshiringmanagerrequisitionlistComponent', () => {
  let component: SaleshiringmanagerrequisitionlistComponent;
  let fixture: ComponentFixture<SaleshiringmanagerrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleshiringmanagerrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleshiringmanagerrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
