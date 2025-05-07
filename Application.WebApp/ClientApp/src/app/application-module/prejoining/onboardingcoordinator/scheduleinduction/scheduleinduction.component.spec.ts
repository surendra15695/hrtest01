import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleinductionComponent } from './scheduleinduction.component';

describe('ScheduleinductionComponent', () => {
  let component: ScheduleinductionComponent;
  let fixture: ComponentFixture<ScheduleinductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleinductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleinductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
