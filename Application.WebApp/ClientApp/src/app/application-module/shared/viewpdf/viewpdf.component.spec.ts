import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpdfComponent } from './viewpdf.component';

describe('ViewpdfComponent', () => {
  let component: ViewpdfComponent;
  let fixture: ComponentFixture<ViewpdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
