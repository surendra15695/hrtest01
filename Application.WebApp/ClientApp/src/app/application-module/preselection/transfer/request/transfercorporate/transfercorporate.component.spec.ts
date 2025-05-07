import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfercorporateComponent } from './transfercorporate.component';

describe('TransfercorporateComponent', () => {
  let component: TransfercorporateComponent;
  let fixture: ComponentFixture<TransfercorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfercorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfercorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
