import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePDFMasterComponent } from './manage-pdfmaster.component';

describe('ManagePDFMasterComponent', () => {
  let component: ManagePDFMasterComponent;
  let fixture: ComponentFixture<ManagePDFMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePDFMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePDFMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
