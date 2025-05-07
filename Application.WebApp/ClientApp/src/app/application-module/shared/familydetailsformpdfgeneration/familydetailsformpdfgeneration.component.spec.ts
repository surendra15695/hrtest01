import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilydetailsformpdfgenerationComponent } from './familydetailsformpdfgeneration.component';

describe('FamilydetailsformpdfgenerationComponent', () => {
  let component: FamilydetailsformpdfgenerationComponent;
  let fixture: ComponentFixture<FamilydetailsformpdfgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilydetailsformpdfgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilydetailsformpdfgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
