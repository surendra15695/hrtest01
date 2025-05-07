import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinterviewassessmentComponent } from './addinterviewassessment.component';

describe('AddinterviewassessmentComponent', () => {
  let component: AddinterviewassessmentComponent;
  let fixture: ComponentFixture<AddinterviewassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinterviewassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinterviewassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
