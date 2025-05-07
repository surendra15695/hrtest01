import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcviewmedicalreimbursementdetailsComponent } from './ocviewmedicalreimbursementdetails.component';

describe('OcviewmedicalreimbursementdetailsComponent', () => {
  let component: OcviewmedicalreimbursementdetailsComponent;
  let fixture: ComponentFixture<OcviewmedicalreimbursementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcviewmedicalreimbursementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcviewmedicalreimbursementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
