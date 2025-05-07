import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosuccessionplanlistComponent } from './rosuccessionplanlist.component';

describe('RosuccessionplanlistComponent', () => {
  let component: RosuccessionplanlistComponent;
  let fixture: ComponentFixture<RosuccessionplanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosuccessionplanlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosuccessionplanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
