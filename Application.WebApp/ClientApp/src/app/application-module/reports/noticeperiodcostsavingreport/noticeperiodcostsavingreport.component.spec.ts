import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeperiodcostsavingreportComponent } from './noticeperiodcostsavingreport.component';

describe('NoticeperiodcostsavingreportComponent', () => {
  let component: NoticeperiodcostsavingreportComponent;
  let fixture: ComponentFixture<NoticeperiodcostsavingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeperiodcostsavingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeperiodcostsavingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
