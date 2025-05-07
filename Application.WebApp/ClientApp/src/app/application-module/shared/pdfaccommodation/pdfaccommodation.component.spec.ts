import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfaccommodationComponent } from './pdfaccommodation.component';

describe('PdfaccommodationComponent', () => {
  let component: PdfaccommodationComponent;
  let fixture: ComponentFixture<PdfaccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfaccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfaccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
