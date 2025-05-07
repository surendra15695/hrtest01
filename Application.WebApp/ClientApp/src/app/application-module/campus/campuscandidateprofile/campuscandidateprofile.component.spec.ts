import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampuscandidateprofileComponent } from './campuscandidateprofile.component';

describe('CampuscandidateprofileComponent', () => {
  let component: CampuscandidateprofileComponent;
  let fixture: ComponentFixture<CampuscandidateprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampuscandidateprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampuscandidateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
