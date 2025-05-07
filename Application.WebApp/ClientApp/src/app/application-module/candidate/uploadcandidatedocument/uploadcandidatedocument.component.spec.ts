import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcandidatedocumentComponent } from './uploadcandidatedocument.component';

describe('UploadcandidatedocumentComponent', () => {
  let component: UploadcandidatedocumentComponent;
  let fixture: ComponentFixture<UploadcandidatedocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadcandidatedocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcandidatedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
