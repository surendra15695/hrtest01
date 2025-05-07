import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedomainComponent } from './managedomain.component';

describe('ManagedomainComponent', () => {
  let component: ManagedomainComponent;
  let fixture: ComponentFixture<ManagedomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
