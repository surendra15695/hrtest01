import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedcandidatereportComponent } from './offeredcandidatereport.component';

describe('OfferedcandidatereportComponent', () => {
  let component: OfferedcandidatereportComponent;
  let fixture: ComponentFixture<OfferedcandidatereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedcandidatereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedcandidatereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
