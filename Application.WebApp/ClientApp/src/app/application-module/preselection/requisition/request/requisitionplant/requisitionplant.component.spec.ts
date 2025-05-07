import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionplantComponent } from './requisitionplant.component';

describe('RequisitionplantComponent', () => {
  let component: RequisitionplantComponent;
  let fixture: ComponentFixture<RequisitionplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
