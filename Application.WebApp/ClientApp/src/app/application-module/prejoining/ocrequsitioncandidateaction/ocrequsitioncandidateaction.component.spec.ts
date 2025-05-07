import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrequsitioncandidateactionComponent } from './ocrequsitioncandidateaction.component';

describe('OcrequsitioncandidateactionComponent', () => {
  let component: OcrequsitioncandidateactionComponent;
  let fixture: ComponentFixture<OcrequsitioncandidateactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrequsitioncandidateactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrequsitioncandidateactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
