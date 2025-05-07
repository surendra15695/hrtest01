import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesandmarketingallocationlistComponent } from './salesandmarketingallocationlist.component';

describe('SalesandmarketingallocationlistComponent', () => {
  let component: SalesandmarketingallocationlistComponent;
  let fixture: ComponentFixture<SalesandmarketingallocationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesandmarketingallocationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesandmarketingallocationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
