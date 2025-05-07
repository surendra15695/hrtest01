import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhandbookComponent } from './viewhandbook.component';

describe('ViewhandbookComponent', () => {
  let component: ViewhandbookComponent;
  let fixture: ComponentFixture<ViewhandbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhandbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhandbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
