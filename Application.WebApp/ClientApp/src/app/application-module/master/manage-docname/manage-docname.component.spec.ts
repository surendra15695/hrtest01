import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocnameComponent } from './manage-docname.component';

describe('ManageDocnameComponent', () => {
  let component: ManageDocnameComponent;
  let fixture: ComponentFixture<ManageDocnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
