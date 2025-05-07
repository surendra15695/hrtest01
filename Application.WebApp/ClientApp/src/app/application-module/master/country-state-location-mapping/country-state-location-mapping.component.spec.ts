import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStateLocationMappingComponent } from './country-state-location-mapping.component';

describe('CountryStateLocationMappingComponent', () => {
  let component: CountryStateLocationMappingComponent;
  let fixture: ComponentFixture<CountryStateLocationMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStateLocationMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStateLocationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
