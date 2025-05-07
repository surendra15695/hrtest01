import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmjoiningchecklistComponent } from './rmjoiningchecklist.component';

describe('RmjoiningchecklistComponent', () => {
  let component: RmjoiningchecklistComponent;
  let fixture: ComponentFixture<RmjoiningchecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmjoiningchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmjoiningchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
