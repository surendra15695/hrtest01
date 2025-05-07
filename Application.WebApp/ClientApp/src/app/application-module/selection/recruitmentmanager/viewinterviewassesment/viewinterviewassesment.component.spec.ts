import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinterviewassesmentComponent } from './viewinterviewassesment.component';

describe('ViewinterviewassesmentComponent', () => {
  let component: ViewinterviewassesmentComponent;
  let fixture: ComponentFixture<ViewinterviewassesmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewinterviewassesmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinterviewassesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
