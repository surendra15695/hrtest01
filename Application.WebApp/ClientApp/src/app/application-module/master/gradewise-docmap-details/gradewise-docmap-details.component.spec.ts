import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradewiseDocmapDetailsComponent } from './gradewise-docmap-details.component';

describe('GradewiseDocmapDetailsComponent', () => {
  let component: GradewiseDocmapDetailsComponent;
  let fixture: ComponentFixture<GradewiseDocmapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradewiseDocmapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradewiseDocmapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
