import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagejobdescriptionComponent } from './managejobdescription.component';

describe('ManagejobdescriptionComponent', () => {
  let component: ManagejobdescriptionComponent;
  let fixture: ComponentFixture<ManagejobdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagejobdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagejobdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
