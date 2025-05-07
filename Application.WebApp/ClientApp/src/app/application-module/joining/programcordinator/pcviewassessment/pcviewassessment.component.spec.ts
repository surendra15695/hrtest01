import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcviewassessmentComponent } from './pcviewassessment.component';

describe('PcviewassessmentComponent', () => {
  let component: PcviewassessmentComponent;
  let fixture: ComponentFixture<PcviewassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcviewassessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcviewassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
