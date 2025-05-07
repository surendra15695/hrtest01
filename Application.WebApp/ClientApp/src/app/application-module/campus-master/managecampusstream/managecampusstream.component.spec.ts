import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampusstreamComponent } from './managecampusstream.component';

describe('ManagecampusstreamComponent', () => {
  let component: ManagecampusstreamComponent;
  let fixture: ComponentFixture<ManagecampusstreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagecampusstreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecampusstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
