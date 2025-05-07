import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatehiringmanagerrequisitionlistComponent } from './corporatehiringmanagerrequisitionlist.component';

describe('CorporatehiringmanagerrequisitionlistComponent', () => {
  let component: CorporatehiringmanagerrequisitionlistComponent;
  let fixture: ComponentFixture<CorporatehiringmanagerrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatehiringmanagerrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatehiringmanagerrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
