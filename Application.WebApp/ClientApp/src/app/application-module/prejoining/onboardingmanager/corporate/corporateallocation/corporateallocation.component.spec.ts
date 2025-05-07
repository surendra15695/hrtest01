import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateallocationComponent } from './corporateallocation.component';

describe('CorporateallocationComponent', () => {
  let component: CorporateallocationComponent;
  let fixture: ComponentFixture<CorporateallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
