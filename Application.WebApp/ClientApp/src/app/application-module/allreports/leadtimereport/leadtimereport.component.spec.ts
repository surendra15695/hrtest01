import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadtimereportComponent } from './leadtimereport.component';

describe('LeadtimereportComponent', () => {
  let component: LeadtimereportComponent;
  let fixture: ComponentFixture<LeadtimereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadtimereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadtimereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
