import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSignatureComponent } from './manage-signature.component';

describe('ManageSignatureComponent', () => {
  let component: ManageSignatureComponent;
  let fixture: ComponentFixture<ManageSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
