import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleaseresignationcorporateComponent } from './holdreleaseresignationcorporate.component';

describe('HoldreleaseresignationcorporateComponent', () => {
  let component: HoldreleaseresignationcorporateComponent;
  let fixture: ComponentFixture<HoldreleaseresignationcorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleaseresignationcorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleaseresignationcorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
