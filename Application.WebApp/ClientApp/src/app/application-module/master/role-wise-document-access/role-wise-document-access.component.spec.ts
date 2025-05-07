import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWiseDocumentAccessComponent } from './role-wise-document-access.component';

describe('RoleWiseDocumentAccessComponent', () => {
  let component: RoleWiseDocumentAccessComponent;
  let fixture: ComponentFixture<RoleWiseDocumentAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleWiseDocumentAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleWiseDocumentAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
