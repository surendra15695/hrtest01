import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusmycalenderdetailsComponent } from './campusmycalenderdetails.component';

describe('CampusmycalenderdetailsComponent', () => {
  let component: CampusmycalenderdetailsComponent;
  let fixture: ComponentFixture<CampusmycalenderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusmycalenderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusmycalenderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
