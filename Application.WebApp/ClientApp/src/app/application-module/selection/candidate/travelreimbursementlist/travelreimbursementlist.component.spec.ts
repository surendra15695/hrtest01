import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelreimbursementlistComponent } from './travelreimbursementlist.component';

describe('TravelreimbursementlistComponent', () => {
  let component: TravelreimbursementlistComponent;
  let fixture: ComponentFixture<TravelreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
