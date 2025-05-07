import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampushrreviewComponent } from './campushrreview.component';

describe('CampushrreviewComponent', () => {
  let component: CampushrreviewComponent;
  let fixture: ComponentFixture<CampushrreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampushrreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampushrreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
