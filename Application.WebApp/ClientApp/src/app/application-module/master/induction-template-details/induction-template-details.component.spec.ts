import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionTemplateDetailsComponent } from './induction-template-details.component';

describe('InductionTemplateDetailsComponent', () => {
  let component: InductionTemplateDetailsComponent;
  let fixture: ComponentFixture<InductionTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InductionTemplateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InductionTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
