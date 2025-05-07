import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusregistrationComponent } from './campusregistration.component';

describe('CampusregistrationComponent', () => {
  let component: CampusregistrationComponent;
  let fixture: ComponentFixture<CampusregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
