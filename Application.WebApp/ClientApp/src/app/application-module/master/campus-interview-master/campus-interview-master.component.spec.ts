import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusInterviewMasterComponent } from './campus-interview-master.component';

describe('CampusInterviewMasterComponent', () => {
  let component: CampusInterviewMasterComponent;
  let fixture: ComponentFixture<CampusInterviewMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusInterviewMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusInterviewMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
