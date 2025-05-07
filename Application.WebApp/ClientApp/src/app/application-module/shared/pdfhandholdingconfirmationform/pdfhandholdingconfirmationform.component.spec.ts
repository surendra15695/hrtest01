import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfhandholdingconfirmationformComponent } from './pdfhandholdingconfirmationform.component';

describe('PdfhandholdingconfirmationformComponent', () => {
  let component: PdfhandholdingconfirmationformComponent;
  let fixture: ComponentFixture<PdfhandholdingconfirmationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfhandholdingconfirmationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfhandholdingconfirmationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
