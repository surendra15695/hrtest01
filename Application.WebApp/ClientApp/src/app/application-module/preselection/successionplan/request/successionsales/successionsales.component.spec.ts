import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessionsalesComponent } from './successionsales.component';

describe('SuccessionsalesComponent', () => {
  let component: SuccessionsalesComponent;
  let fixture: ComponentFixture<SuccessionsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessionsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessionsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
