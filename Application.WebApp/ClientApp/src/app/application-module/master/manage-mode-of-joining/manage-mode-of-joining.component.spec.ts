import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModeOfJoiningComponent } from './manage-mode-of-joining.component';

describe('ManageModeOfJoiningComponent', () => {
  let component: ManageModeOfJoiningComponent;
  let fixture: ComponentFixture<ManageModeOfJoiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModeOfJoiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModeOfJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
