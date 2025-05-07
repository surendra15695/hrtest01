import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateapplicationformbComponent } from './createapplicationformb.component';

describe('CreateapplicationformbComponent', () => {
  let component: CreateapplicationformbComponent;
  let fixture: ComponentFixture<CreateapplicationformbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateapplicationformbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateapplicationformbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
