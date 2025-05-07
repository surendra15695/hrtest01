import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantemployeemanagementComponent } from './plantemployeemanagement.component';

describe('PlantemployeemanagementComponent', () => {
  let component: PlantemployeemanagementComponent;
  let fixture: ComponentFixture<PlantemployeemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantemployeemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantemployeemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
