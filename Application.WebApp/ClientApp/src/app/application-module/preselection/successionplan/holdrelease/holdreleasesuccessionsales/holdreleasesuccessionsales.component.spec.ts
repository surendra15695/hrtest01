import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasesuccessionsalesComponent } from './holdreleasesuccessionsales.component';

describe('HoldreleasesuccessionsalesComponent', () => {
  let component: HoldreleasesuccessionsalesComponent;
  let fixture: ComponentFixture<HoldreleasesuccessionsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasesuccessionsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasesuccessionsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
