import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationreviewlistComponent } from './confirmationreviewlist.component';

describe('ConfirmationreviewlistComponent', () => {
  let component: ConfirmationreviewlistComponent;
  let fixture: ComponentFixture<ConfirmationreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
