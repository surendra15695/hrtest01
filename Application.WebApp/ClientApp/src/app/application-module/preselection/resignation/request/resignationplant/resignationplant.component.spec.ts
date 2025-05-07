import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationplantComponent } from './resignationplant.component';

describe('ResignationplantComponent', () => {
  let component: ResignationplantComponent;
  let fixture: ComponentFixture<ResignationplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
