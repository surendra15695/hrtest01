import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccommodationComponent } from './editaccommodation.component';

describe('EditaccommodationComponent', () => {
  let component: EditaccommodationComponent;
  let fixture: ComponentFixture<EditaccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
