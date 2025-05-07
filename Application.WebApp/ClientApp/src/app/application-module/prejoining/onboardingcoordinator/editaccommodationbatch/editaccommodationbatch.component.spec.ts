import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccommodationbatchComponent } from './editaccommodationbatch.component';

describe('EditaccommodationbatchComponent', () => {
  let component: EditaccommodationbatchComponent;
  let fixture: ComponentFixture<EditaccommodationbatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaccommodationbatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaccommodationbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
