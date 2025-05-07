import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfyearlyreviewlistComponent } from './halfyearlyreviewlist.component';

describe('HalfyearlyreviewlistComponent', () => {
  let component: HalfyearlyreviewlistComponent;
  let fixture: ComponentFixture<HalfyearlyreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfyearlyreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfyearlyreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
