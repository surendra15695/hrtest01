import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcviewnoticeperiodbuyoutdetailsComponent } from './ocviewnoticeperiodbuyoutdetails.component';

describe('OcviewnoticeperiodbuyoutdetailsComponent', () => {
  let component: OcviewnoticeperiodbuyoutdetailsComponent;
  let fixture: ComponentFixture<OcviewnoticeperiodbuyoutdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcviewnoticeperiodbuyoutdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcviewnoticeperiodbuyoutdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
