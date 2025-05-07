import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEdmsAccessComponent } from './manage-edms-access.component';

describe('ManageEdmsAccessComponent', () => {
  let component: ManageEdmsAccessComponent;
  let fixture: ComponentFixture<ManageEdmsAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEdmsAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEdmsAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
