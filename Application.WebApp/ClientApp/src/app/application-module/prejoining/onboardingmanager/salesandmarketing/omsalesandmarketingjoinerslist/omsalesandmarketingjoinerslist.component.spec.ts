import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmsalesandmarketingjoinerslistComponent } from './omsalesandmarketingjoinerslist.component';

describe('OmsalesandmarketingjoinerslistComponent', () => {
  let component: OmsalesandmarketingjoinerslistComponent;
  let fixture: ComponentFixture<OmsalesandmarketingjoinerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmsalesandmarketingjoinerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmsalesandmarketingjoinerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
