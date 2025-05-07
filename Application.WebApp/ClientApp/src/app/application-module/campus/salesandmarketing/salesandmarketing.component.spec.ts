import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesandmarketingComponent } from './salesandmarketing.component';

describe('SalesandmarketingComponent', () => {
  let component: SalesandmarketingComponent;
  let fixture: ComponentFixture<SalesandmarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesandmarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesandmarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
