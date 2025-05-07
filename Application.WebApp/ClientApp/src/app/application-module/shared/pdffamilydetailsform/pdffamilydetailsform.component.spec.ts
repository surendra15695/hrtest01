import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdffamilydetailsformComponent } from './pdffamilydetailsform.component';

describe('PdffamilydetailsformComponent', () => {
  let component: PdffamilydetailsformComponent;
  let fixture: ComponentFixture<PdffamilydetailsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdffamilydetailsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdffamilydetailsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
