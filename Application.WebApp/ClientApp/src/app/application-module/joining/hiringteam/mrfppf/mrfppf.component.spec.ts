import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRFPPFComponent } from './mrfppf.component';

describe('MRFPPFComponent', () => {
  let component: MRFPPFComponent;
  let fixture: ComponentFixture<MRFPPFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRFPPFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRFPPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
