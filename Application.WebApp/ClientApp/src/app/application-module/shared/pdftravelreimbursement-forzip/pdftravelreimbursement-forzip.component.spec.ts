import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftravelreimbursementForzipComponent } from './pdftravelreimbursement-forzip.component';

describe('PdftravelreimbursementForzipComponent', () => {
  let component: PdftravelreimbursementForzipComponent;
  let fixture: ComponentFixture<PdftravelreimbursementForzipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdftravelreimbursementForzipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdftravelreimbursementForzipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
