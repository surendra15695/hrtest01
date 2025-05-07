import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSelectionGuideComponent } from './manage-selection-guide.component';

describe('ManageSelectionGuideComponent', () => {
  let component: ManageSelectionGuideComponent;
  let fixture: ComponentFixture<ManageSelectionGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSelectionGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSelectionGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
