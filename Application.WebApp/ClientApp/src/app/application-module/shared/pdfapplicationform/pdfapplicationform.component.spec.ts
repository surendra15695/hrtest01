import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfapplicationformComponent } from './pdfapplicationform.component';

describe('PdfapplicationformComponent', () => {
  let component: PdfapplicationformComponent;
  let fixture: ComponentFixture<PdfapplicationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfapplicationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfapplicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
