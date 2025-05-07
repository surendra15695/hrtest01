import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusCorporateReviewComponent } from './campus-corporate-review.component';

describe('CampusCorporateReviewComponent', () => {
  let component: CampusCorporateReviewComponent;
  let fixture: ComponentFixture<CampusCorporateReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusCorporateReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusCorporateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
