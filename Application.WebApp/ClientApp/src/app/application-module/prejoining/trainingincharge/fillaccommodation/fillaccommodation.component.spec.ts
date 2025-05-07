import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillaccommodationComponent } from './fillaccommodation.component';

describe('FillaccommodationComponent', () => {
  let component: FillaccommodationComponent;
  let fixture: ComponentFixture<FillaccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillaccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillaccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
