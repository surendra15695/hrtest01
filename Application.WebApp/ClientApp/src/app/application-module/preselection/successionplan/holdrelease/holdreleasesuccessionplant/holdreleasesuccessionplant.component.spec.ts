import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasesuccessionplantComponent } from './holdreleasesuccessionplant.component';

describe('HoldreleasesuccessionplantComponent', () => {
  let component: HoldreleasesuccessionplantComponent;
  let fixture: ComponentFixture<HoldreleasesuccessionplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasesuccessionplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasesuccessionplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
