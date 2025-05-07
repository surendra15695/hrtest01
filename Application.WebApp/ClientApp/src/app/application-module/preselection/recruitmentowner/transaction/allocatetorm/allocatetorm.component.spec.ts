import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatetormComponent } from './allocatetorm.component';

describe('AllocatetormComponent', () => {
  let component: AllocatetormComponent;
  let fixture: ComponentFixture<AllocatetormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatetormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatetormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
