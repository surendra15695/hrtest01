import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleaseresignationplantComponent } from './holdreleaseresignationplant.component';

describe('HoldreleaseresignationplantComponent', () => {
  let component: HoldreleaseresignationplantComponent;
  let fixture: ComponentFixture<HoldreleaseresignationplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleaseresignationplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleaseresignationplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
