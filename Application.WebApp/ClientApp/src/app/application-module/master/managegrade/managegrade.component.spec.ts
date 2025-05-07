import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagegradeComponent } from './managegrade.component';

describe('ManagegradeComponent', () => {
  let component: ManagegradeComponent;
  let fixture: ComponentFixture<ManagegradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagegradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagegradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
