import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesandmarketingHrHandHoldingComponent } from './salesandmarketing-hr-hand-holding.component';

describe('SalesandmarketingHrHandHoldingComponent', () => {
  let component: SalesandmarketingHrHandHoldingComponent;
  let fixture: ComponentFixture<SalesandmarketingHrHandHoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesandmarketingHrHandHoldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesandmarketingHrHandHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
