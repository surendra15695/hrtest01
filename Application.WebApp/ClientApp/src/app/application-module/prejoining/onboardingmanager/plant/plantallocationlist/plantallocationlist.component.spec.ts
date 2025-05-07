import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantallocationlistComponent } from './plantallocationlist.component';

describe('PlantallocationlistComponent', () => {
  let component: PlantallocationlistComponent;
  let fixture: ComponentFixture<PlantallocationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantallocationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantallocationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
