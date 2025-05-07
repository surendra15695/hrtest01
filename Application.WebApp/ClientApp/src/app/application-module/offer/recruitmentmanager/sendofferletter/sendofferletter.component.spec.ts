import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendofferletterComponent } from './sendofferletter.component';

describe('SendofferletterComponent', () => {
  let component: SendofferletterComponent;
  let fixture: ComponentFixture<SendofferletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendofferletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendofferletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
