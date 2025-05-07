import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeperiodbuyoutreimbursementdetailsComponent } from './noticeperiodbuyoutreimbursementdetails.component';

describe('NoticeperiodbuyoutreimbursementdetailsComponent', () => {
  let component: NoticeperiodbuyoutreimbursementdetailsComponent;
  let fixture: ComponentFixture<NoticeperiodbuyoutreimbursementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeperiodbuyoutreimbursementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeperiodbuyoutreimbursementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
