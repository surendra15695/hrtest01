import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolewiseUserverticalfunctionmapComponent } from './rolewise-userverticalfunctionmap.component';

describe('RolewiseUserverticalfunctionmapComponent', () => {
  let component: RolewiseUserverticalfunctionmapComponent;
  let fixture: ComponentFixture<RolewiseUserverticalfunctionmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolewiseUserverticalfunctionmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolewiseUserverticalfunctionmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
