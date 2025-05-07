import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageindustryComponent } from './manageindustry.component';

describe('ManageindustryComponent', () => {
  let component: ManageindustryComponent;
  let fixture: ComponentFixture<ManageindustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageindustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageindustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
