import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfnoticeperiodbuyoutforzipComponent } from './pdfnoticeperiodbuyoutforzip.component';

describe('PdfnoticeperiodbuyoutforzipComponent', () => {
  let component: PdfnoticeperiodbuyoutforzipComponent;
  let fixture: ComponentFixture<PdfnoticeperiodbuyoutforzipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfnoticeperiodbuyoutforzipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfnoticeperiodbuyoutforzipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
