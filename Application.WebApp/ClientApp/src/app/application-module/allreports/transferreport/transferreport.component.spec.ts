import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferreportComponent } from './transferreport.component';

describe('TransferreportComponent', () => {
  let component: TransferreportComponent;
  let fixture: ComponentFixture<TransferreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
