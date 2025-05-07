import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolewiseUserComponent } from './rolewise-user.component';

describe('RolewiseUserComponent', () => {
  let component: RolewiseUserComponent;
  let fixture: ComponentFixture<RolewiseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolewiseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolewiseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
