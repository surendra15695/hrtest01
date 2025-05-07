import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormjobshadowreviewComponent } from './formjobshadowreview.component';

describe('FormjobshadowreviewComponent', () => {
  let component: FormjobshadowreviewComponent;
  let fixture: ComponentFixture<FormjobshadowreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormjobshadowreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormjobshadowreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
