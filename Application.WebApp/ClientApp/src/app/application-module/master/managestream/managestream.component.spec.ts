import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagestreamComponent } from './managestream.component';

describe('ManagestreamComponent', () => {
  let component: ManagestreamComponent;
  let fixture: ComponentFixture<ManagestreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagestreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
