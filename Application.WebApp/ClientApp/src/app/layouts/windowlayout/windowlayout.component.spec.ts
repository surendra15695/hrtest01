import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowlayoutComponent } from './windowlayout.component';

describe('WindowlayoutComponent', () => {
  let component: WindowlayoutComponent;
  let fixture: ComponentFixture<WindowlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
