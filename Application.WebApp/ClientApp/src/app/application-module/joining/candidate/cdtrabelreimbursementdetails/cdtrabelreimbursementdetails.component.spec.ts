import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdtrabelreimbursementdetailsComponent } from './cdtrabelreimbursementdetails.component';

describe('CdtrabelreimbursementdetailsComponent', () => {
  let component: CdtrabelreimbursementdetailsComponent;
  let fixture: ComponentFixture<CdtrabelreimbursementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdtrabelreimbursementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdtrabelreimbursementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
