import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVerticalrmComponent } from './manage-verticalrm.component';

describe('ManageVerticalrmComponent', () => {
  let component: ManageVerticalrmComponent;
  let fixture: ComponentFixture<ManageVerticalrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVerticalrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVerticalrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
