import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapplicationformbComponent } from './viewapplicationformb.component';

describe('ViewapplicationformbComponent', () => {
  let component: ViewapplicationformbComponent;
  let fixture: ComponentFixture<ViewapplicationformbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewapplicationformbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewapplicationformbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
