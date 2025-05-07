import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlistenreviewComponent } from './formlistenreview.component';

describe('FormlistenreviewComponent', () => {
  let component: FormlistenreviewComponent;
  let fixture: ComponentFixture<FormlistenreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlistenreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlistenreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
