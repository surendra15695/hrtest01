import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfpersonalaccidentinsuranceformComponent } from './pdfpersonalaccidentinsuranceform.component';

describe('PdfpersonalaccidentinsuranceformComponent', () => {
  let component: PdfpersonalaccidentinsuranceformComponent;
  let fixture: ComponentFixture<PdfpersonalaccidentinsuranceformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfpersonalaccidentinsuranceformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfpersonalaccidentinsuranceformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
