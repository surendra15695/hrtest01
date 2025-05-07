import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFunctionPositionComponent } from './manage-function-position.component';

describe('ManageFunctionPositionComponent', () => {
  let component: ManageFunctionPositionComponent;
  let fixture: ComponentFixture<ManageFunctionPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFunctionPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFunctionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
