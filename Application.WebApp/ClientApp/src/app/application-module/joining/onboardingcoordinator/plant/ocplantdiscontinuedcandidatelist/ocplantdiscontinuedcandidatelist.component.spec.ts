import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcplantdiscontinuedcandidatelistComponent } from './ocplantdiscontinuedcandidatelist.component';

describe('OcplantdiscontinuedcandidatelistComponent', () => {
  let component: OcplantdiscontinuedcandidatelistComponent;
  let fixture: ComponentFixture<OcplantdiscontinuedcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcplantdiscontinuedcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcplantdiscontinuedcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
