import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AicjobshadowreviewcandidatelistComponent } from './aicjobshadowreviewcandidatelist.component';

describe('AicjobshadowreviewcandidatelistComponent', () => {
  let component: AicjobshadowreviewcandidatelistComponent;
  let fixture: ComponentFixture<AicjobshadowreviewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AicjobshadowreviewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AicjobshadowreviewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
