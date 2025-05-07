import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferaddcandidateComponent } from './referaddcandidate.component';

describe('ReferaddcandidateComponent', () => {
  let component: ReferaddcandidateComponent;
  let fixture: ComponentFixture<ReferaddcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferaddcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferaddcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
