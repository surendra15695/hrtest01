import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringmanagercandidatelistComponent } from './hiringmanagercandidatelist.component';

describe('HiringmanagercandidatelistComponent', () => {
  let component: HiringmanagercandidatelistComponent;
  let fixture: ComponentFixture<HiringmanagercandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringmanagercandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringmanagercandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
