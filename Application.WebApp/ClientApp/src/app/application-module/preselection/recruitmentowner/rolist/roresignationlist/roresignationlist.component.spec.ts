import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoresignationlistComponent } from './roresignationlist.component';

describe('RoresignationlistComponent', () => {
  let component: RoresignationlistComponent;
  let fixture: ComponentFixture<RoresignationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoresignationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoresignationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
