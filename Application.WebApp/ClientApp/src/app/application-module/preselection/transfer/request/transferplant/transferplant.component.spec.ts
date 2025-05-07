import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferplantComponent } from './transferplant.component';

describe('TransferplantComponent', () => {
  let component: TransferplantComponent;
  let fixture: ComponentFixture<TransferplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
