import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampuscoursestreamComponent } from './managecampuscoursestream.component';

describe('ManagecampuscoursestreamComponent', () => {
  let component: ManagecampuscoursestreamComponent;
  let fixture: ComponentFixture<ManagecampuscoursestreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecampuscoursestreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecampuscoursestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
