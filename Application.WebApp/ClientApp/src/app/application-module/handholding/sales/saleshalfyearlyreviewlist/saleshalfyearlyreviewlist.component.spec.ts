import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleshalfyearlyreviewlistComponent } from './saleshalfyearlyreviewlist.component';

describe('SaleshalfyearlyreviewlistComponent', () => {
  let component: SaleshalfyearlyreviewlistComponent;
  let fixture: ComponentFixture<SaleshalfyearlyreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleshalfyearlyreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleshalfyearlyreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
