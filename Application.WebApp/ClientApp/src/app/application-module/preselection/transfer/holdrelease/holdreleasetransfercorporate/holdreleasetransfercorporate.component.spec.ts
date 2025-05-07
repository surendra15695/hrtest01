import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasetransfercorporateComponent } from './holdreleasetransfercorporate.component';

describe('HoldreleasetransfercorporateComponent', () => {
  let component: HoldreleasetransfercorporateComponent;
  let fixture: ComponentFixture<HoldreleasetransfercorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasetransfercorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasetransfercorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
