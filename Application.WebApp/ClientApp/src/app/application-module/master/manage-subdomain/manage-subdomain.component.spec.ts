import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubdomainComponent } from './manage-subdomain.component';

describe('ManageSubdomainComponent', () => {
  let component: ManageSubdomainComponent;
  let fixture: ComponentFixture<ManageSubdomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSubdomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
