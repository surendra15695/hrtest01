import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcsalesandmarketingjoinerslistComponent } from './ocsalesandmarketingjoinerslist.component';

describe('OcsalesandmarketingjoinerslistComponent', () => {
  let component: OcsalesandmarketingjoinerslistComponent;
  let fixture: ComponentFixture<OcsalesandmarketingjoinerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcsalesandmarketingjoinerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcsalesandmarketingjoinerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
