import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiclistenreviewcandidatelistComponent } from './aiclistenreviewcandidatelist.component';

describe('AiclistenreviewcandidatelistComponent', () => {
  let component: AiclistenreviewcandidatelistComponent;
  let fixture: ComponentFixture<AiclistenreviewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiclistenreviewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiclistenreviewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
