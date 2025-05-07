import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasecorporateComponent } from './holdreleasecorporate.component';

describe('HoldreleasecorporateComponent', () => {
  let component: HoldreleasecorporateComponent;
  let fixture: ComponentFixture<HoldreleasecorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasecorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasecorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
