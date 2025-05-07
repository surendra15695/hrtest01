import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtjoiningchecklistComponentComponent } from './htjoiningchecklist-component.component';

describe('HtjoiningchecklistComponentComponent', () => {
  let component: HtjoiningchecklistComponentComponent;
  let fixture: ComponentFixture<HtjoiningchecklistComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtjoiningchecklistComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtjoiningchecklistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
