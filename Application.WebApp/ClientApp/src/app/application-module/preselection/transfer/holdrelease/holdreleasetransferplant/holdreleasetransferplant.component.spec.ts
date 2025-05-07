import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasetransferplantComponent } from './holdreleasetransferplant.component';

describe('HoldreleasetransferplantComponent', () => {
  let component: HoldreleasetransferplantComponent;
  let fixture: ComponentFixture<HoldreleasetransferplantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasetransferplantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasetransferplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
