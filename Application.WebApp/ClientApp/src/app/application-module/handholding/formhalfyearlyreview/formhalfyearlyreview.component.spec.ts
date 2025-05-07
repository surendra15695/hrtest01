import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhalfyearlyreviewComponent } from './formhalfyearlyreview.component';

describe('FormhalfyearlyreviewComponent', () => {
  let component: FormhalfyearlyreviewComponent;
  let fixture: ComponentFixture<FormhalfyearlyreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormhalfyearlyreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormhalfyearlyreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
