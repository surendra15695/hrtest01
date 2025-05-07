import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcsalesassessmentlistComponent } from './pcsalesassessmentlist.component';

describe('PcsalesassessmentlistComponent', () => {
  let component: PcsalesassessmentlistComponent;
  let fixture: ComponentFixture<PcsalesassessmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcsalesassessmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcsalesassessmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
