import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFamilyRelationShipComponent } from './manage-family-relation-ship.component';

describe('ManageFamilyRelationShipComponent', () => {
  let component: ManageFamilyRelationShipComponent;
  let fixture: ComponentFixture<ManageFamilyRelationShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFamilyRelationShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFamilyRelationShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
