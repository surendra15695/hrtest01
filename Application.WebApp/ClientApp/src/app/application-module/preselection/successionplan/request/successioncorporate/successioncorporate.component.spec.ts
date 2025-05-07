import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessioncorporateComponent } from './successioncorporate.component';

describe('SuccessioncorporateComponent', () => {
  let component: SuccessioncorporateComponent;
  let fixture: ComponentFixture<SuccessioncorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessioncorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessioncorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
