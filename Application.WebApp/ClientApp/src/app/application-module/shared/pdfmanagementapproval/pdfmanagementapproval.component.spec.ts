import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmanagementapprovalComponent } from './pdfmanagementapproval.component';

describe('PdfmanagementapprovalComponent', () => {
  let component: PdfmanagementapprovalComponent;
  let fixture: ComponentFixture<PdfmanagementapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfmanagementapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfmanagementapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
