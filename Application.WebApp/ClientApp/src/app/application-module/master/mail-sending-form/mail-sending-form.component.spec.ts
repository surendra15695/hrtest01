import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSendingFormComponent } from './mail-sending-form.component';

describe('MailSendingFormComponent', () => {
  let component: MailSendingFormComponent;
  let fixture: ComponentFixture<MailSendingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSendingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
