import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovertransferlistComponent } from './approvertransferlist.component';

describe('ApprovertransferlistComponent', () => {
  let component: ApprovertransferlistComponent;
  let fixture: ComponentFixture<ApprovertransferlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovertransferlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovertransferlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
