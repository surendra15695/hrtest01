import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhrreviewComponent } from './formhrreview.component';

describe('FormhrreviewComponent', () => {
  let component: FormhrreviewComponent;
  let fixture: ComponentFixture<FormhrreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormhrreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormhrreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
