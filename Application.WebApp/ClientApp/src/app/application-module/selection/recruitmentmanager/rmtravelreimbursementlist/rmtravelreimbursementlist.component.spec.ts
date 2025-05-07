import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmtravelreimbursementlistComponent } from './rmtravelreimbursementlist.component';

describe('RmtravelreimbursementlistComponent', () => {
  let component: RmtravelreimbursementlistComponent;
  let fixture: ComponentFixture<RmtravelreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmtravelreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmtravelreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
