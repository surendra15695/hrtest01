import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcreditnoteraiseComponent } from './vendorcreditnoteraise.component';

describe('VendorcreditnoteraiseComponent', () => {
  let component: VendorcreditnoteraiseComponent;
  let fixture: ComponentFixture<VendorcreditnoteraiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcreditnoteraiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcreditnoteraiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
