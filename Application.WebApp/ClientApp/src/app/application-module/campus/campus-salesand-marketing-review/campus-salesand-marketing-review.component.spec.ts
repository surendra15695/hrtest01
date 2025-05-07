import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusSalesandMarketingReviewComponent } from './campus-salesand-marketing-review.component';

describe('CampusSalesandMarketingReviewComponent', () => {
  let component: CampusSalesandMarketingReviewComponent;
  let fixture: ComponentFixture<CampusSalesandMarketingReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusSalesandMarketingReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusSalesandMarketingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
