import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfnoticeperiodbuyoutreimComponent } from './pdfnoticeperiodbuyoutreim.component';

describe('PdfnoticeperiodbuyoutreimComponent', () => {
  let component: PdfnoticeperiodbuyoutreimComponent;
  let fixture: ComponentFixture<PdfnoticeperiodbuyoutreimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfnoticeperiodbuyoutreimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfnoticeperiodbuyoutreimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
