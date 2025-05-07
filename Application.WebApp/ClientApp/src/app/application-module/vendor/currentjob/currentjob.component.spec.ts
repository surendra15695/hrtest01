import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentjobComponent } from './currentjob.component';

describe('CurrentjobComponent', () => {
  let component: CurrentjobComponent;
  let fixture: ComponentFixture<CurrentjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
