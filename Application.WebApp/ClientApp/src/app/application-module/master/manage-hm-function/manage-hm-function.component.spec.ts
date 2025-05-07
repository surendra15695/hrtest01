import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHmFunctionComponent } from './manage-hm-function.component';

describe('ManageHmFunctionComponent', () => {
  let component: ManageHmFunctionComponent;
  let fixture: ComponentFixture<ManageHmFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHmFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHmFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
