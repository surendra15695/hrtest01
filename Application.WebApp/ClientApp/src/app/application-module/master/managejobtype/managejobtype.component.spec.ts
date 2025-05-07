import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagejobtypeComponent } from './managejobtype.component';

describe('ManagejobtypeComponent', () => {
  let component: ManagejobtypeComponent;
  let fixture: ComponentFixture<ManagejobtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagejobtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagejobtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
