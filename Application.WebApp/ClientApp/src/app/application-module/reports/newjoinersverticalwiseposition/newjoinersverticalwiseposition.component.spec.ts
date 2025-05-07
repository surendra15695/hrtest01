import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjoinersverticalwisepositionComponent } from './newjoinersverticalwiseposition.component';

describe('NewjoinersverticalwisepositionComponent', () => {
  let component: NewjoinersverticalwisepositionComponent;
  let fixture: ComponentFixture<NewjoinersverticalwisepositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjoinersverticalwisepositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjoinersverticalwisepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
