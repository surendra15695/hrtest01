import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantlistenreviewlistComponent } from './plantlistenreviewlist.component';

describe('PlantlistenreviewlistComponent', () => {
  let component: PlantlistenreviewlistComponent;
  let fixture: ComponentFixture<PlantlistenreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantlistenreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantlistenreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
