import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfallhandholdingformsComponent } from './pdfallhandholdingforms.component';

describe('PdfallhandholdingformsComponent', () => {
  let component: PdfallhandholdingformsComponent;
  let fixture: ComponentFixture<PdfallhandholdingformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfallhandholdingformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfallhandholdingformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
