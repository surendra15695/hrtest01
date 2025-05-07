import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifycandidateComponent } from './verifycandidate.component';

describe('VerifycandidateComponent', () => {
  let component: VerifycandidateComponent;
  let fixture: ComponentFixture<VerifycandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifycandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifycandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
