import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDoctypeComponent } from './manage-doctype.component';

describe('ManageDoctypeComponent', () => {
  let component: ManageDoctypeComponent;
  let fixture: ComponentFixture<ManageDoctypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDoctypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDoctypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
