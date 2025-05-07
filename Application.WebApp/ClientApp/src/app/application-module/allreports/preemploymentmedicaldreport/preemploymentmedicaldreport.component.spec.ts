import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreemploymentmedicaldreportComponent } from './preemploymentmedicaldreport.component';

describe('PreemploymentmedicaldreportComponent', () => {
  let component: PreemploymentmedicaldreportComponent;
  let fixture: ComponentFixture<PreemploymentmedicaldreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreemploymentmedicaldreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreemploymentmedicaldreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
