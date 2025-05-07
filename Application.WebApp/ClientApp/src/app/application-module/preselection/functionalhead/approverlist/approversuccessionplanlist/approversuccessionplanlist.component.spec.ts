import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproversuccessionplanlistComponent } from './approversuccessionplanlist.component';

describe('ApproversuccessionplanlistComponent', () => {
  let component: ApproversuccessionplanlistComponent;
  let fixture: ComponentFixture<ApproversuccessionplanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproversuccessionplanlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproversuccessionplanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
