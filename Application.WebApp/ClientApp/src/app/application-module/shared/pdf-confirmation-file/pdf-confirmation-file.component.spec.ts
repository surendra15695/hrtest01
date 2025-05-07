import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConfirmationFileComponent } from './pdf-confirmation-file.component';

describe('PdfConfirmationFileComponent', () => {
  let component: PdfConfirmationFileComponent;
  let fixture: ComponentFixture<PdfConfirmationFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfConfirmationFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfConfirmationFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
