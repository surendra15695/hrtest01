import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusSubmittedResultComponent } from './off-campus-submitted-result.component';

describe('OffCampusSubmittedResultComponent', () => {
  let component: OffCampusSubmittedResultComponent;
  let fixture: ComponentFixture<OffCampusSubmittedResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusSubmittedResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusSubmittedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
