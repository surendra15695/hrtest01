import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationcoursestreammappingComponent } from './qualificationcoursestreammapping.component';

describe('QualificationcoursestreammappingComponent', () => {
  let component: QualificationcoursestreammappingComponent;
  let fixture: ComponentFixture<QualificationcoursestreammappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationcoursestreammappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationcoursestreammappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
