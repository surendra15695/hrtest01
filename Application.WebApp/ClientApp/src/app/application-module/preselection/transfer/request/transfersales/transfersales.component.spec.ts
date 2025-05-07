import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersalesComponent } from './transfersales.component';

describe('TransfersalesComponent', () => {
  let component: TransfersalesComponent;
  let fixture: ComponentFixture<TransfersalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfersalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
