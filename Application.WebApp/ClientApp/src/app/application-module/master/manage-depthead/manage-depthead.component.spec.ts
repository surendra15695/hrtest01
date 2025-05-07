import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeptheadComponent } from './manage-depthead.component';

describe('ManageDeptheadComponent', () => {
  let component: ManageDeptheadComponent;
  let fixture: ComponentFixture<ManageDeptheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDeptheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeptheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
