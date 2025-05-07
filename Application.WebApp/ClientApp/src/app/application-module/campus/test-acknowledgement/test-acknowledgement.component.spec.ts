import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAcknowledgementComponent } from './test-acknowledgement.component';

describe('TestAcknowledgementComponent', () => {
  let component: TestAcknowledgementComponent;
  let fixture: ComponentFixture<TestAcknowledgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAcknowledgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
