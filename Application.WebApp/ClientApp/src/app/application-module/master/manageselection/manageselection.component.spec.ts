import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageselectionComponent } from './manageselection.component';

describe('ManageselectionComponent', () => {
  let component: ManageselectionComponent;
  let fixture: ComponentFixture<ManageselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
