import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInvoiceComponent } from './process-invoice.component';

describe('ProcessInvoiceComponent', () => {
  let component: ProcessInvoiceComponent;
  let fixture: ComponentFixture<ProcessInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
