import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfjoiningreportformComponent } from './pdfjoiningreportform.component';

describe('PdfjoiningreportformComponent', () => {
  let component: PdfjoiningreportformComponent;
  let fixture: ComponentFixture<PdfjoiningreportformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfjoiningreportformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfjoiningreportformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
