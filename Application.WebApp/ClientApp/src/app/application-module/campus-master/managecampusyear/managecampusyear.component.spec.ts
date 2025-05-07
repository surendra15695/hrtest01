import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampusyearComponent } from './managecampusyear.component';

describe('ManagecampusyearComponent', () => {
  let component: ManagecampusyearComponent;
  let fixture: ComponentFixture<ManagecampusyearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecampusyearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecampusyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
