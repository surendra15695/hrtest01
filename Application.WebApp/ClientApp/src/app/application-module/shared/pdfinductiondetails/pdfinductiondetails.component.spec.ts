import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfinductiondetailsComponent } from './pdfinductiondetails.component';

describe('PdfinductiondetailsComponent', () => {
  let component: PdfinductiondetailsComponent;
  let fixture: ComponentFixture<PdfinductiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfinductiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfinductiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
