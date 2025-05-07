import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampussubmittestresultComponent } from './campussubmittestresult.component';

describe('CampussubmittestresultComponent', () => {
  let component: CampussubmittestresultComponent;
  let fixture: ComponentFixture<CampussubmittestresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampussubmittestresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampussubmittestresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
