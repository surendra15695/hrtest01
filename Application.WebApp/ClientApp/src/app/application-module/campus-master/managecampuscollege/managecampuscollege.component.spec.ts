import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampuscollegeComponent } from './managecampuscollege.component';

describe('ManagecampuscollegeComponent', () => {
  let component: ManagecampuscollegeComponent;
  let fixture: ComponentFixture<ManagecampuscollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecampuscollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecampuscollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
