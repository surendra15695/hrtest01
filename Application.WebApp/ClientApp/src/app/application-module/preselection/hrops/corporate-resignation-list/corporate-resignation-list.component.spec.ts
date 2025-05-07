import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateResignationListComponent } from './corporate-resignation-list.component';

describe('CorporateResignationListComponent', () => {
  let component: CorporateResignationListComponent;
  let fixture: ComponentFixture<CorporateResignationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateResignationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateResignationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
