import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantconfirmationreviewlistComponent } from './plantconfirmationreviewlist.component';

describe('PlantconfirmationreviewlistComponent', () => {
  let component: PlantconfirmationreviewlistComponent;
  let fixture: ComponentFixture<PlantconfirmationreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantconfirmationreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantconfirmationreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
