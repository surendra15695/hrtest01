import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterresignationlistComponent } from './requesterresignationlist.component';

describe('RequesterresignationlistComponent', () => {
  let component: RequesterresignationlistComponent;
  let fixture: ComponentFixture<RequesterresignationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesterresignationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterresignationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
