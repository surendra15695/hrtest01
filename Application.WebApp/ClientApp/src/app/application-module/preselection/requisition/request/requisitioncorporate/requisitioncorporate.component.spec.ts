import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitioncorporateComponent } from './requisitioncorporate.component';

describe('RequisitioncorporateComponent', () => {
  let component: RequisitioncorporateComponent;
  let fixture: ComponentFixture<RequisitioncorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitioncorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitioncorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
