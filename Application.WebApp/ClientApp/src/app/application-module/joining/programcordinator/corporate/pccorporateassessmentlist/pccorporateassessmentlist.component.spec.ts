import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PccorporateassessmentlistComponent } from './pccorporateassessmentlist.component';

describe('PccorporateassessmentlistComponent', () => {
  let component: PccorporateassessmentlistComponent;
  let fixture: ComponentFixture<PccorporateassessmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PccorporateassessmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccorporateassessmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
