import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatejoiningformComponent } from './candidatejoiningform.component';

describe('CandidatejoiningformComponent', () => {
  let component: CandidatejoiningformComponent;
  let fixture: ComponentFixture<CandidatejoiningformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatejoiningformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatejoiningformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
