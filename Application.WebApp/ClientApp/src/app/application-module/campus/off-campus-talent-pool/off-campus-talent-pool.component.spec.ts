import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffCampusTalentPoolComponent } from './off-campus-talent-pool.component';

describe('OffCampusTalentPoolComponent', () => {
  let component: OffCampusTalentPoolComponent;
  let fixture: ComponentFixture<OffCampusTalentPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffCampusTalentPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffCampusTalentPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
