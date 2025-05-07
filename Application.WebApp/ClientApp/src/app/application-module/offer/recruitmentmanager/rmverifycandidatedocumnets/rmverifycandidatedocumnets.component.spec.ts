import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmverifycandidatedocumnetsComponent } from './rmverifycandidatedocumnets.component';

describe('RmverifycandidatedocumnetsComponent', () => {
  let component: RmverifycandidatedocumnetsComponent;
  let fixture: ComponentFixture<RmverifycandidatedocumnetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmverifycandidatedocumnetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmverifycandidatedocumnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
