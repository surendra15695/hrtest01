import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationreportComponent } from './resignationreport.component';

describe('ResignationreportComponent', () => {
  let component: ResignationreportComponent;
  let fixture: ComponentFixture<ResignationreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
