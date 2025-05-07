import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmedicaldocumentComponent } from './uploadmedicaldocument.component';

describe('UploadmedicaldocumentComponent', () => {
  let component: UploadmedicaldocumentComponent;
  let fixture: ComponentFixture<UploadmedicaldocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadmedicaldocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmedicaldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
