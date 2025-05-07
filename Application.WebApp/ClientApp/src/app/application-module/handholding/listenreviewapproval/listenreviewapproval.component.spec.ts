import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenreviewapprovalComponent } from './listenreviewapproval.component';

describe('ListenreviewapprovalComponent', () => {
  let component: ListenreviewapprovalComponent;
  let fixture: ComponentFixture<ListenreviewapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenreviewapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenreviewapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
