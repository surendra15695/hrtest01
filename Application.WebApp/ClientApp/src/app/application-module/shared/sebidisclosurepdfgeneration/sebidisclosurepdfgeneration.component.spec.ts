import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SebidisclosurepdfgenerationComponent } from './sebidisclosurepdfgeneration.component';

describe('SebidisclosurepdfgenerationComponent', () => {
  let component: SebidisclosurepdfgenerationComponent;
  let fixture: ComponentFixture<SebidisclosurepdfgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SebidisclosurepdfgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SebidisclosurepdfgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
