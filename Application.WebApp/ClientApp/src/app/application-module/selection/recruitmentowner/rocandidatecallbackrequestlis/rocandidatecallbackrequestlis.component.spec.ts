import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RocandidatecallbackrequestlisComponent } from './rocandidatecallbackrequestlis.component';

describe('RocandidatecallbackrequestlisComponent', () => {
  let component: RocandidatecallbackrequestlisComponent;
  let fixture: ComponentFixture<RocandidatecallbackrequestlisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RocandidatecallbackrequestlisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocandidatecallbackrequestlisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
