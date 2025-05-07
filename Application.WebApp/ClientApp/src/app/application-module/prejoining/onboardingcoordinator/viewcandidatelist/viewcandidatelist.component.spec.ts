import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcandidatelistComponent } from './viewcandidatelist.component';

describe('ViewcandidatelistComponent', () => {
  let component: ViewcandidatelistComponent;
  let fixture: ComponentFixture<ViewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
