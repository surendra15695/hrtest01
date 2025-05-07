import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampuscourseComponent } from './managecampuscourse.component';

describe('ManagecampuscourseComponent', () => {
  let component: ManagecampuscourseComponent;
  let fixture: ComponentFixture<ManagecampuscourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecampuscourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecampuscourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
