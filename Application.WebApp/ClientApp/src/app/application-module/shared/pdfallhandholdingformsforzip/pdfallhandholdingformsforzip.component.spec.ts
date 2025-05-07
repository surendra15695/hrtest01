import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfallhandholdingformsforzipComponent } from './pdfallhandholdingformsforzip.component';

describe('PdfallhandholdingformsforzipComponent', () => {
  let component: PdfallhandholdingformsforzipComponent;
  let fixture: ComponentFixture<PdfallhandholdingformsforzipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfallhandholdingformsforzipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfallhandholdingformsforzipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
