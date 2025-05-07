import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleslistenreviewlistComponent } from './saleslistenreviewlist.component';

describe('SaleslistenreviewlistComponent', () => {
  let component: SaleslistenreviewlistComponent;
  let fixture: ComponentFixture<SaleslistenreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleslistenreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleslistenreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
