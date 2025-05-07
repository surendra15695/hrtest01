import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferacceptanceComponent } from './offeracceptance.component';

describe('OfferacceptanceComponent', () => {
  let component: OfferacceptanceComponent;
  let fixture: ComponentFixture<OfferacceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferacceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferacceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
