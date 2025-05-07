import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesconfirmationreviewlistComponent } from './salesconfirmationreviewlist.component';

describe('SalesconfirmationreviewlistComponent', () => {
  let component: SalesconfirmationreviewlistComponent;
  let fixture: ComponentFixture<SalesconfirmationreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesconfirmationreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesconfirmationreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
