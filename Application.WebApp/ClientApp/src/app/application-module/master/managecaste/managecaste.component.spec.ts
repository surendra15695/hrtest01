import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecasteComponent } from './managecaste.component';

describe('ManagecasteComponent', () => {
  let component: ManagecasteComponent;
  let fixture: ComponentFixture<ManagecasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
