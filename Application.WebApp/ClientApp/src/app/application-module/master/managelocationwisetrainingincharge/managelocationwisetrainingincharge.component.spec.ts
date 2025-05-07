import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelocationwisetraininginchargeComponent } from './managelocationwisetrainingincharge.component';

describe('ManagelocationwisetraininginchargeComponent', () => {
  let component: ManagelocationwisetraininginchargeComponent;
  let fixture: ComponentFixture<ManagelocationwisetraininginchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagelocationwisetraininginchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelocationwisetraininginchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
