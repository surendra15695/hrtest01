import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittestresultComponent } from './submittestresult.component';

describe('SubmittestresultComponent', () => {
  let component: SubmittestresultComponent;
  let fixture: ComponentFixture<SubmittestresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittestresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittestresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
