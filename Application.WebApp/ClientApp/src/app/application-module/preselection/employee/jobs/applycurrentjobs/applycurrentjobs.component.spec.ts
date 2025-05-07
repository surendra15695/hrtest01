import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplycurrentjobsComponent } from './applycurrentjobs.component';

describe('ApplycurrentjobsComponent', () => {
  let component: ApplycurrentjobsComponent;
  let fixture: ComponentFixture<ApplycurrentjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplycurrentjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplycurrentjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
