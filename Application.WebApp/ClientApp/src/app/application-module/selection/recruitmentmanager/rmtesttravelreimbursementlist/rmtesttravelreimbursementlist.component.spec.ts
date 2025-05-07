import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmtesttravelreimbursementlistComponent } from './rmtesttravelreimbursementlist.component';

describe('RmtesttravelreimbursementlistComponent', () => {
  let component: RmtesttravelreimbursementlistComponent;
  let fixture: ComponentFixture<RmtesttravelreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmtesttravelreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmtesttravelreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
