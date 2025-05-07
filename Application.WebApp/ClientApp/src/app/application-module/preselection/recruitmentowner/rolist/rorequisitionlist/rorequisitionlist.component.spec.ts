import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RorequisitionlistComponent } from './rorequisitionlist.component';

describe('RorequisitionlistComponent', () => {
  let component: RorequisitionlistComponent;
  let fixture: ComponentFixture<RorequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RorequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RorequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
