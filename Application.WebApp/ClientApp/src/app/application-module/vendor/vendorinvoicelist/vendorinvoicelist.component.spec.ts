import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorinvoicelistComponent } from './vendorinvoicelist.component';

describe('VendorinvoicelistComponent', () => {
  let component: VendorinvoicelistComponent;
  let fixture: ComponentFixture<VendorinvoicelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorinvoicelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorinvoicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
