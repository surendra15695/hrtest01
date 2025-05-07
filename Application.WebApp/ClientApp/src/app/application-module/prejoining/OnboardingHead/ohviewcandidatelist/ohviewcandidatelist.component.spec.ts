import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhviewcandidatelistComponent } from './ohviewcandidatelist.component';

describe('OhviewcandidatelistComponent', () => {
  let component: OhviewcandidatelistComponent;
  let fixture: ComponentFixture<OhviewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhviewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhviewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
