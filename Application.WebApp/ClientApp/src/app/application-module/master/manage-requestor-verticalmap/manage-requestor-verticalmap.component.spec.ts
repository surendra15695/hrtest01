import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestorVerticalmapComponent } from './manage-requestor-verticalmap.component';

describe('ManageRequestorVerticalmapComponent', () => {
  let component: ManageRequestorVerticalmapComponent;
  let fixture: ComponentFixture<ManageRequestorVerticalmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRequestorVerticalmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRequestorVerticalmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
