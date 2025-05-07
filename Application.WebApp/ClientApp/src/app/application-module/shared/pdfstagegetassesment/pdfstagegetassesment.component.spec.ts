import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfstagegetassesmentComponent } from './pdfstagegetassesment.component';

describe('PdfstagegetassesmentComponent', () => {
  let component: PdfstagegetassesmentComponent;
  let fixture: ComponentFixture<PdfstagegetassesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfstagegetassesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfstagegetassesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
