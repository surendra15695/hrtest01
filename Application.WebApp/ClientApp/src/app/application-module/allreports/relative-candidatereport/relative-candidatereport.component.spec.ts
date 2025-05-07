import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeCandidatereportComponent } from './relative-candidatereport.component';

describe('RelativeCandidatereportComponent', () => {
  let component: RelativeCandidatereportComponent;
  let fixture: ComponentFixture<RelativeCandidatereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativeCandidatereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeCandidatereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
