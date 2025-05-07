import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesResignationListComponent } from './sales-resignation-list.component';

describe('SalesResignationListComponent', () => {
  let component: SalesResignationListComponent;
  let fixture: ComponentFixture<SalesResignationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesResignationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesResignationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
