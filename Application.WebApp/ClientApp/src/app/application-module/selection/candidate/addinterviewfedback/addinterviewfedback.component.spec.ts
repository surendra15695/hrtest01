import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinterviewfedbackComponent } from './addinterviewfedback.component';

describe('AddinterviewfedbackComponent', () => {
  let component: AddinterviewfedbackComponent;
  let fixture: ComponentFixture<AddinterviewfedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinterviewfedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinterviewfedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
