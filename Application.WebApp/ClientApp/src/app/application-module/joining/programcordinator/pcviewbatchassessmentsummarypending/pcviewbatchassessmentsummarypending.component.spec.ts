import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcviewbatchassessmentsummarypendingComponent } from './pcviewbatchassessmentsummarypending.component';

describe('PcviewbatchassessmentsummarypendingComponent', () => {
  let component: PcviewbatchassessmentsummarypendingComponent;
  let fixture: ComponentFixture<PcviewbatchassessmentsummarypendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcviewbatchassessmentsummarypendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcviewbatchassessmentsummarypendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
