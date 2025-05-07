import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmViewcandidateMycalenderComponent } from './rm-viewcandidate-mycalender.component';

describe('RmViewcandidateMycalenderComponent', () => {
  let component: RmViewcandidateMycalenderComponent;
  let fixture: ComponentFixture<RmViewcandidateMycalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmViewcandidateMycalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmViewcandidateMycalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
