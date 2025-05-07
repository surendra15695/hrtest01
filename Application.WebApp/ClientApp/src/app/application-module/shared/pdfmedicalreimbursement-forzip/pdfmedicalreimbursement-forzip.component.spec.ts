import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmedicalreimbursementForzipComponent } from './pdfmedicalreimbursement-forzip.component';

describe('PdfmedicalreimbursementForzipComponent', () => {
  let component: PdfmedicalreimbursementForzipComponent;
  let fixture: ComponentFixture<PdfmedicalreimbursementForzipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfmedicalreimbursementForzipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfmedicalreimbursementForzipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
