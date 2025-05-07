import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AichalfyearlyreviewcandidatelistComponent } from './aichalfyearlyreviewcandidatelist.component';

describe('AichalfyearlyreviewcandidatelistComponent', () => {
  let component: AichalfyearlyreviewcandidatelistComponent;
  let fixture: ComponentFixture<AichalfyearlyreviewcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AichalfyearlyreviewcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AichalfyearlyreviewcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
