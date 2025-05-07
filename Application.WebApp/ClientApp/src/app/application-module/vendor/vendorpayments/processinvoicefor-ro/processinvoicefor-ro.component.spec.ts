import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessinvoiceforROComponent } from './processinvoicefor-ro.component';

describe('ProcessinvoiceforROComponent', () => {
  let component: ProcessinvoiceforROComponent;
  let fixture: ComponentFixture<ProcessinvoiceforROComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessinvoiceforROComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessinvoiceforROComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
