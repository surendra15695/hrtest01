import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcviewcandidatelistComponent } from './pcviewcandidatelist.component';

describe('PcviewcandidatelistComponent', () => {
  let component: PcviewcandidatelistComponent;
  let fixture: ComponentFixture<PcviewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcviewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcviewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
