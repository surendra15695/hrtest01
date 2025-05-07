import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropcvComponent } from './dropcv.component';

describe('DropcvComponent', () => {
  let component: DropcvComponent;
  let fixture: ComponentFixture<DropcvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropcvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
