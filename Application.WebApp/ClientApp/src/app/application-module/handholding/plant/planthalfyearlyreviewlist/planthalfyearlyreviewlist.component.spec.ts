import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanthalfyearlyreviewlistComponent } from './planthalfyearlyreviewlist.component';

describe('PlanthalfyearlyreviewlistComponent', () => {
  let component: PlanthalfyearlyreviewlistComponent;
  let fixture: ComponentFixture<PlanthalfyearlyreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanthalfyearlyreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanthalfyearlyreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
