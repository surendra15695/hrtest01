import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhcandidatelistComponent } from './ohcandidatelist.component';

describe('OhcandidatelistComponent', () => {
  let component: OhcandidatelistComponent;
  let fixture: ComponentFixture<OhcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
