import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusRequisionSalesAndMarketingComponent } from './off-campus-requision-sales-and-marketing.component';

describe('OffCampusRequisionSalesAndMarketingComponent', () => {
  let component: OffCampusRequisionSalesAndMarketingComponent;
  let fixture: ComponentFixture<OffCampusRequisionSalesAndMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusRequisionSalesAndMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusRequisionSalesAndMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
