import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternaladdcandidateComponent } from './externaladdcandidate.component';

describe('ExternaladdcandidateComponent', () => {
  let component: ExternaladdcandidateComponent;
  let fixture: ComponentFixture<ExternaladdcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternaladdcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternaladdcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
