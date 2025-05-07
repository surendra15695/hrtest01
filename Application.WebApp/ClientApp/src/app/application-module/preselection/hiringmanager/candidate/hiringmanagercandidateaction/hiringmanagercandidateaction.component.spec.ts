import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringmanagercandidateactionComponent } from './hiringmanagercandidateaction.component';

describe('HiringmanagercandidateactionComponent', () => {
  let component: HiringmanagercandidateactionComponent;
  let fixture: ComponentFixture<HiringmanagercandidateactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringmanagercandidateactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringmanagercandidateactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
