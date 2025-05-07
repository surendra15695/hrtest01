import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantjobshadowreviewlistComponent } from './plantjobshadowreviewlist.component';

describe('PlantjobshadowreviewlistComponent', () => {
  let component: PlantjobshadowreviewlistComponent;
  let fixture: ComponentFixture<PlantjobshadowreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantjobshadowreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantjobshadowreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
