import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtrelocationreimbursementdetailsComponent } from './htrelocationreimbursementdetails.component';

describe('HtrelocationreimbursementdetailsComponent', () => {
  let component: HtrelocationreimbursementdetailsComponent;
  let fixture: ComponentFixture<HtrelocationreimbursementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtrelocationreimbursementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtrelocationreimbursementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
