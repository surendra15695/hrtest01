import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfyearlyreviewapprovalComponent } from './halfyearlyreviewapproval.component';

describe('HalfyearlyreviewapprovalComponent', () => {
  let component: HalfyearlyreviewapprovalComponent;
  let fixture: ComponentFixture<HalfyearlyreviewapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfyearlyreviewapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfyearlyreviewapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
