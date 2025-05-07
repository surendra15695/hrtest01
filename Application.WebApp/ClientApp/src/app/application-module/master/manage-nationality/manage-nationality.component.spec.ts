import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNationalityComponent } from './manage-nationality.component';

describe('ManageNationalityComponent', () => {
  let component: ManageNationalityComponent;
  let fixture: ComponentFixture<ManageNationalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNationalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
