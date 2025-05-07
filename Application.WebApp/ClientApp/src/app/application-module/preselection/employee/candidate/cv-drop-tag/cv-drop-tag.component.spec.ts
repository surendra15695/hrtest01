import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDropTagComponent } from './cv-drop-tag.component';

describe('CvDropTagComponent', () => {
  let component: CvDropTagComponent;
  let fixture: ComponentFixture<CvDropTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvDropTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDropTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
