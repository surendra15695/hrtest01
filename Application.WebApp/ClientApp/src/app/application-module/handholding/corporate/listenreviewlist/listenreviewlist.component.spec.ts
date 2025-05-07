import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenreviewlistComponent } from './listenreviewlist.component';

describe('ListenreviewlistComponent', () => {
  let component: ListenreviewlistComponent;
  let fixture: ComponentFixture<ListenreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
