import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCreditnoteforROComponent } from './process-creditnotefor-ro.component';

describe('ProcessCreditnoteforROComponent', () => {
  let component: ProcessCreditnoteforROComponent;
  let fixture: ComponentFixture<ProcessCreditnoteforROComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessCreditnoteforROComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCreditnoteforROComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
