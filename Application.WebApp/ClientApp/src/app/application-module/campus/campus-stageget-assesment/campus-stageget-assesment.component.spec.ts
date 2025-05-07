import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusStagegetAssesmentComponent } from './campus-stageget-assesment.component';

describe('CampusStagegetAssesmentComponent', () => {
  let component: CampusStagegetAssesmentComponent;
  let fixture: ComponentFixture<CampusStagegetAssesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusStagegetAssesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusStagegetAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
