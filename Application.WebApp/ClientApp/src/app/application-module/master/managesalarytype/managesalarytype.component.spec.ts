import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesalarytypeComponent } from './managesalarytype.component';

describe('ManagesalarytypeComponent', () => {
  let component: ManagesalarytypeComponent;
  let fixture: ComponentFixture<ManagesalarytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesalarytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesalarytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
