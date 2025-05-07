import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardewiseDocmapListComponent } from './gardewise-docmap-list.component';

describe('GardewiseDocmapListComponent', () => {
  let component: GardewiseDocmapListComponent;
  let fixture: ComponentFixture<GardewiseDocmapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardewiseDocmapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardewiseDocmapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
