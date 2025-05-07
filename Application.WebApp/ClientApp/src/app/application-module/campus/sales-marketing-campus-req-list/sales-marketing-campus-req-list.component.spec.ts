import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMarketingCampusReqListComponent } from './sales-marketing-campus-req-list.component';

describe('SalesMarketingCampusReqListComponent', () => {
  let component: SalesMarketingCampusReqListComponent;
  let fixture: ComponentFixture<SalesMarketingCampusReqListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesMarketingCampusReqListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesMarketingCampusReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
