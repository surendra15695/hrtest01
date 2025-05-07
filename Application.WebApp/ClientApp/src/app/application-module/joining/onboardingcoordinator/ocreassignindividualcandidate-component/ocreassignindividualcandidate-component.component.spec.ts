import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcreassignindividualcandidateComponentComponent } from './ocreassignindividualcandidate-component.component';

describe('OcreassignindividualcandidateComponentComponent', () => {
  let component: OcreassignindividualcandidateComponentComponent;
  let fixture: ComponentFixture<OcreassignindividualcandidateComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcreassignindividualcandidateComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcreassignindividualcandidateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
