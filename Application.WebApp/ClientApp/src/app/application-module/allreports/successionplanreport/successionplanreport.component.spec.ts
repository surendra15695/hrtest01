import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessionplanreportComponent } from './successionplanreport.component';

describe('SuccessionplanreportComponent', () => {
  let component: SuccessionplanreportComponent;
  let fixture: ComponentFixture<SuccessionplanreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessionplanreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessionplanreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
