import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageoccupationComponent } from './manageoccupation.component';

describe('ManageoccupationComponent', () => {
  let component: ManageoccupationComponent;
  let fixture: ComponentFixture<ManageoccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageoccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageoccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
