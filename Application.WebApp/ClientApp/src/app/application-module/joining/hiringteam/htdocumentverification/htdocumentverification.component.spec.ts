import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtdocumentverificationComponent } from './htdocumentverification.component';

describe('HtdocumentverificationComponent', () => {
  let component: HtdocumentverificationComponent;
  let fixture: ComponentFixture<HtdocumentverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtdocumentverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtdocumentverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
