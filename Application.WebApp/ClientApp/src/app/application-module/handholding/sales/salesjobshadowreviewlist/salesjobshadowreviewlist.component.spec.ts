import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesjobshadowreviewlistComponent } from './salesjobshadowreviewlist.component';

describe('SalesjobshadowreviewlistComponent', () => {
  let component: SalesjobshadowreviewlistComponent;
  let fixture: ComponentFixture<SalesjobshadowreviewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesjobshadowreviewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesjobshadowreviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
