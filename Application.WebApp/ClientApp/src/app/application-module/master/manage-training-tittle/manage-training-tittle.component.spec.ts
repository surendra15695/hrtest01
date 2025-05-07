import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainingTittleComponent } from './manage-training-tittle.component';

describe('ManageTrainingTittleComponent', () => {
  let component: ManageTrainingTittleComponent;
  let fixture: ComponentFixture<ManageTrainingTittleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTrainingTittleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainingTittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
