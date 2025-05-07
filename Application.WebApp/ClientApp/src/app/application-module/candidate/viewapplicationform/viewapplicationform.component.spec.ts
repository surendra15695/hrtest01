import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapplicationformComponent } from './viewapplicationform.component';

describe('ViewapplicationformComponent', () => {
  let component: ViewapplicationformComponent;
  let fixture: ComponentFixture<ViewapplicationformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewapplicationformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewapplicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
