import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterrequisitionlistComponent } from './requesterrequisitionlist.component';

describe('RequesterrequisitionlistComponent', () => {
  let component: RequesterrequisitionlistComponent;
  let fixture: ComponentFixture<RequesterrequisitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequesterrequisitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterrequisitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
