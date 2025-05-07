import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarytemplateComponent } from './salarytemplate.component';

describe('SalarytemplateComponent', () => {
  let component: SalarytemplateComponent;
  let fixture: ComponentFixture<SalarytemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarytemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarytemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
