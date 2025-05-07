import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormconfirmationreviewComponent } from './formconfirmationreview.component';

describe('FormconfirmationreviewComponent', () => {
  let component: FormconfirmationreviewComponent;
  let fixture: ComponentFixture<FormconfirmationreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormconfirmationreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormconfirmationreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
