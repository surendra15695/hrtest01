import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantResignationListComponent } from './plant-resignation-list.component';

describe('PlantResignationListComponent', () => {
  let component: PlantResignationListComponent;
  let fixture: ComponentFixture<PlantResignationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantResignationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantResignationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
