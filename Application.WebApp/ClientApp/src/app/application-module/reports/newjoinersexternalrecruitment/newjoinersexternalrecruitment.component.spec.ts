import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinersexternalrecruitmentComponent } from './newjoinersexternalrecruitment.component';

describe('NewjoinersexternalrecruitmentComponent', () => {
  let component: NewjoinersexternalrecruitmentComponent;
  let fixture: ComponentFixture<NewjoinersexternalrecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinersexternalrecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinersexternalrecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
