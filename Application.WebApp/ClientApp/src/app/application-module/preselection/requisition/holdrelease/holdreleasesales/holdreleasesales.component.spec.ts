import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasesalesComponent } from './holdreleasesales.component';

describe('HoldreleasesalesComponent', () => {
  let component: HoldreleasesalesComponent;
  let fixture: ComponentFixture<HoldreleasesalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasesalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasesalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
