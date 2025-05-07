import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfinterviewassessmentComponent } from './pdfinterviewassessment.component';

describe('PdfinterviewassessmentComponent', () => {
  let component: PdfinterviewassessmentComponent;
  let fixture: ComponentFixture<PdfinterviewassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfinterviewassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfinterviewassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
