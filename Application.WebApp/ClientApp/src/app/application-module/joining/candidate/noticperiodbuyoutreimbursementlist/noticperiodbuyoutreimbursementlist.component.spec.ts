import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticperiodbuyoutreimbursementlistComponent } from './noticperiodbuyoutreimbursementlist.component';

describe('NoticperiodbuyoutreimbursementlistComponent', () => {
  let component: NoticperiodbuyoutreimbursementlistComponent;
  let fixture: ComponentFixture<NoticperiodbuyoutreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticperiodbuyoutreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticperiodbuyoutreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
