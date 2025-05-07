import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCampusVerticalFunctionComponent } from './manage-campus-vertical-function.component';

describe('ManageCampusVerticalFunctionComponent', () => {
  let component: ManageCampusVerticalFunctionComponent;
  let fixture: ComponentFixture<ManageCampusVerticalFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCampusVerticalFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCampusVerticalFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
