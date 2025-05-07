import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCampusMycalenderComponent } from './rm-campus-mycalender.component';

describe('RmCampusMycalenderComponent', () => {
  let component: RmCampusMycalenderComponent;
  let fixture: ComponentFixture<RmCampusMycalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmCampusMycalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCampusMycalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
