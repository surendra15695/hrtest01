import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManangesalarytypeComponent } from './manangesalarytype.component';

describe('ManangesalarytypeComponent', () => {
  let component: ManangesalarytypeComponent;
  let fixture: ComponentFixture<ManangesalarytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManangesalarytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManangesalarytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
