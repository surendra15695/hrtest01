import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepositionComponent } from './manageposition.component';

describe('ManagepositionComponent', () => {
  let component: ManagepositionComponent;
  let fixture: ComponentFixture<ManagepositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagepositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
