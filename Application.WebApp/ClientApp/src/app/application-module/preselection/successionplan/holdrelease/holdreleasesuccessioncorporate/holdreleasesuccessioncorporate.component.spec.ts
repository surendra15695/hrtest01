import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasesuccessioncorporateComponent } from './holdreleasesuccessioncorporate.component';

describe('HoldreleasesuccessioncorporateComponent', () => {
  let component: HoldreleasesuccessioncorporateComponent;
  let fixture: ComponentFixture<HoldreleasesuccessioncorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasesuccessioncorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasesuccessioncorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
