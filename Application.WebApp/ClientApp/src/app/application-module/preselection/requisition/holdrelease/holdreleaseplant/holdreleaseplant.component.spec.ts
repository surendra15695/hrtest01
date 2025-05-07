import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleaseplantComponent } from './holdreleaseplant.component';

describe('HoldreleaseplantComponent', () => {
  let component: HoldreleaseplantComponent;
  let fixture: ComponentFixture<HoldreleaseplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleaseplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleaseplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
