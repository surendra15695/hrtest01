import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagequalificationComponent } from './managequalification.component';

describe('ManagequalificationComponent', () => {
  let component: ManagequalificationComponent;
  let fixture: ComponentFixture<ManagequalificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagequalificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagequalificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
