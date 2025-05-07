import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdtravelreimbursementlistComponent } from './cdtravelreimbursementlist.component';

describe('CdtravelreimbursementlistComponent', () => {
  let component: CdtravelreimbursementlistComponent;
  let fixture: ComponentFixture<CdtravelreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdtravelreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdtravelreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
