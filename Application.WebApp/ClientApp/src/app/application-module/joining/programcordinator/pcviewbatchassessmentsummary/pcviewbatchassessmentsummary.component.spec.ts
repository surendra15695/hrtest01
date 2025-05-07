import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcviewbatchassessmentsummaryComponent } from './pcviewbatchassessmentsummary.component';

describe('PcviewbatchassessmentsummaryComponent', () => {
  let component: PcviewbatchassessmentsummaryComponent;
  let fixture: ComponentFixture<PcviewbatchassessmentsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcviewbatchassessmentsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcviewbatchassessmentsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
