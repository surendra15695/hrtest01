import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocparticularComponent } from './manage-docparticular.component';

describe('ManageDocparticularComponent', () => {
  let component: ManageDocparticularComponent;
  let fixture: ComponentFixture<ManageDocparticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocparticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocparticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
