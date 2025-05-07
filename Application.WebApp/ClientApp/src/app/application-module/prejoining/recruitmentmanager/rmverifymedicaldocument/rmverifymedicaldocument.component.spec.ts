import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmverifymedicaldocumentComponent } from './rmverifymedicaldocument.component';

describe('RmverifymedicaldocumentComponent', () => {
  let component: RmverifymedicaldocumentComponent;
  let fixture: ComponentFixture<RmverifymedicaldocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmverifymedicaldocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmverifymedicaldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
