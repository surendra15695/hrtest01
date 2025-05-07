import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagereligionComponent } from './managereligion.component';

describe('ManagereligionComponent', () => {
  let component: ManagereligionComponent;
  let fixture: ComponentFixture<ManagereligionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagereligionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagereligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
