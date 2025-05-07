import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInductionModeComponent } from './manage-induction-mode.component';

describe('ManageInductionModeComponent', () => {
  let component: ManageInductionModeComponent;
  let fixture: ComponentFixture<ManageInductionModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInductionModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInductionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
