import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfinterviewtravelreimbursementComponent } from './pdfinterviewtravelreimbursement.component';

describe('PdfinterviewtravelreimbursementComponent', () => {
  let component: PdfinterviewtravelreimbursementComponent;
  let fixture: ComponentFixture<PdfinterviewtravelreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfinterviewtravelreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfinterviewtravelreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
