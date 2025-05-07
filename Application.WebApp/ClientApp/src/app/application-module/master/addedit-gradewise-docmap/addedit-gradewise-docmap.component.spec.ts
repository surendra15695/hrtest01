import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditGradewiseDocmapComponent } from './addedit-gradewise-docmap.component';

describe('AddeditGradewiseDocmapComponent', () => {
  let component: AddeditGradewiseDocmapComponent;
  let fixture: ComponentFixture<AddeditGradewiseDocmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditGradewiseDocmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditGradewiseDocmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
