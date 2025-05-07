import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalcurrentjobsComponent } from './externalcurrentjobs.component';

describe('ExternalcurrentjobsComponent', () => {
  let component: ExternalcurrentjobsComponent;
  let fixture: ComponentFixture<ExternalcurrentjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalcurrentjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalcurrentjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
