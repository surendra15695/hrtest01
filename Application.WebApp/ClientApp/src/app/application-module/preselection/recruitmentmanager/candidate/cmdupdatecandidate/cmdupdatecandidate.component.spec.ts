import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdupdatecandidateComponent } from './cmdupdatecandidate.component';

describe('CmdupdatecandidateComponent', () => {
  let component: CmdupdatecandidateComponent;
  let fixture: ComponentFixture<CmdupdatecandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdupdatecandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdupdatecandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
