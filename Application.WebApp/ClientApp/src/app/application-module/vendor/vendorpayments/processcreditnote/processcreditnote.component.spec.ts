import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesscreditnoteComponent } from './processcreditnote.component';

describe('ProcesscreditnoteComponent', () => {
  let component: ProcesscreditnoteComponent;
  let fixture: ComponentFixture<ProcesscreditnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesscreditnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesscreditnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
