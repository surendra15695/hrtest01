import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapAndDigitalVarianceComponent } from './sap-and-digital-variance.component';

describe('SapAndDigitalVarianceComponent', () => {
  let component: SapAndDigitalVarianceComponent;
  let fixture: ComponentFixture<SapAndDigitalVarianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapAndDigitalVarianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapAndDigitalVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
