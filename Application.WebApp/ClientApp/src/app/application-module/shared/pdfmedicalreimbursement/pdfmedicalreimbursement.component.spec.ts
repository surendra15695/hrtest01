import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmedicalreimbursementComponent } from './pdfmedicalreimbursement.component';

describe('PdfmedicalreimbursementComponent', () => {
  let component: PdfmedicalreimbursementComponent;
  let fixture: ComponentFixture<PdfmedicalreimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfmedicalreimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfmedicalreimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
