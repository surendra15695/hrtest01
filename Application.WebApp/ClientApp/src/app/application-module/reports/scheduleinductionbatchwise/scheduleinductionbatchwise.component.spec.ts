import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleinductionbatchwiseComponent } from './scheduleinductionbatchwise.component';

describe('ScheduleinductionbatchwiseComponent', () => {
  let component: ScheduleinductionbatchwiseComponent;
  let fixture: ComponentFixture<ScheduleinductionbatchwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleinductionbatchwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleinductionbatchwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
