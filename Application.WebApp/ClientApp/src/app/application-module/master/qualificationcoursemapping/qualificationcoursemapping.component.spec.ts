import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationcoursemappingComponent } from './qualificationcoursemapping.component';

describe('QualificationcoursemappingComponent', () => {
  let component: QualificationcoursemappingComponent;
  let fixture: ComponentFixture<QualificationcoursemappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationcoursemappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationcoursemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
