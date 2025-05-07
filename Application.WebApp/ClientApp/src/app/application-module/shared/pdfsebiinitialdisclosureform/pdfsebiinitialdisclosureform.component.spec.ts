import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsebiinitialdisclosureformComponent } from './pdfsebiinitialdisclosureform.component';

describe('PdfsebiinitialdisclosureformComponent', () => {
  let component: PdfsebiinitialdisclosureformComponent;
  let fixture: ComponentFixture<PdfsebiinitialdisclosureformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfsebiinitialdisclosureformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfsebiinitialdisclosureformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
