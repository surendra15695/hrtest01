import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationlistComponent } from './accommodationlist.component';

describe('AccommodationlistComponent', () => {
  let component: AccommodationlistComponent;
  let fixture: ComponentFixture<AccommodationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
