import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfUploadMedicalDocumentComponent } from './pdf-upload-medical-document.component';

describe('PdfUploadMedicalDocumentComponent', () => {
  let component: PdfUploadMedicalDocumentComponent;
  let fixture: ComponentFixture<PdfUploadMedicalDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfUploadMedicalDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfUploadMedicalDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
