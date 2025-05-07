import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BGVStatusreportComponent } from './bgvstatusreport.component';

describe('BGVStatusreportComponent', () => {
  let component: BGVStatusreportComponent;
  let fixture: ComponentFixture<BGVStatusreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BGVStatusreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BGVStatusreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
