import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatetrackerreportComponent } from './candidatetrackerreport.component';

describe('CandidatetrackerreportComponent', () => {
  let component: CandidatetrackerreportComponent;
  let fixture: ComponentFixture<CandidatetrackerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatetrackerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatetrackerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
