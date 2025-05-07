import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcplantassessmentlistComponent } from './pcplantassessmentlist.component';

describe('PcplantassessmentlistComponent', () => {
  let component: PcplantassessmentlistComponent;
  let fixture: ComponentFixture<PcplantassessmentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcplantassessmentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcplantassessmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
