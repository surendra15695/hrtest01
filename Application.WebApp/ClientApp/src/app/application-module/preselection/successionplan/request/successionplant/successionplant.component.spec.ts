import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessionplantComponent } from './successionplant.component';

describe('SuccessionplantComponent', () => {
  let component: SuccessionplantComponent;
  let fixture: ComponentFixture<SuccessionplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessionplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessionplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
