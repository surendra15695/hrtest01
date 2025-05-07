import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferredcandidatereportComponent } from './referredcandidatereport.component';

describe('ReferredcandidatereportComponent', () => {
  let component: ReferredcandidatereportComponent;
  let fixture: ComponentFixture<ReferredcandidatereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferredcandidatereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferredcandidatereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
