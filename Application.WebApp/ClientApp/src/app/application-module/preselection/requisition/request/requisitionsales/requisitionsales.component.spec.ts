import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionsalesComponent } from './requisitionsales.component';

describe('RequisitionsalesComponent', () => {
  let component: RequisitionsalesComponent;
  let fixture: ComponentFixture<RequisitionsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
