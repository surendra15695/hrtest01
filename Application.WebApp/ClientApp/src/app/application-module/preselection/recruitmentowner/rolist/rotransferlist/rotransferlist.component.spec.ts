import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotransferlistComponent } from './rotransferlist.component';

describe('RotransferlistComponent', () => {
  let component: RotransferlistComponent;
  let fixture: ComponentFixture<RotransferlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotransferlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotransferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
