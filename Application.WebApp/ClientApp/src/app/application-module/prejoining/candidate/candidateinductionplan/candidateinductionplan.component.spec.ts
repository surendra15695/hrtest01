import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateinductionplanComponent } from './candidateinductionplan.component';

describe('CandidateinductionplanComponent', () => {
  let component: CandidateinductionplanComponent;
  let fixture: ComponentFixture<CandidateinductionplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateinductionplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateinductionplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
