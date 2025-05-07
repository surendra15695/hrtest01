import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaccommodationdetailsbatchComponent } from './viewaccommodationdetailsbatch.component';

describe('ViewaccommodationdetailsbatchComponent', () => {
  let component: ViewaccommodationdetailsbatchComponent;
  let fixture: ComponentFixture<ViewaccommodationdetailsbatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewaccommodationdetailsbatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewaccommodationdetailsbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
