import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcuploadassessmentevaluationComponent } from './pcuploadassessmentevaluation.component';

describe('PcuploadassessmentevaluationComponent', () => {
  let component: PcuploadassessmentevaluationComponent;
  let fixture: ComponentFixture<PcuploadassessmentevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcuploadassessmentevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcuploadassessmentevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
