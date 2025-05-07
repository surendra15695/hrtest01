import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageverticalpositionComponent } from './manageverticalposition.component';

describe('ManageverticalpositionComponent', () => {
  let component: ManageverticalpositionComponent;
  let fixture: ComponentFixture<ManageverticalpositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageverticalpositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageverticalpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
