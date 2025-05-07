import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcampuscandidatedocumentComponent } from './uploadcampuscandidatedocument.component';

describe('UploadcampuscandidatedocumentComponent', () => {
  let component: UploadcampuscandidatedocumentComponent;
  let fixture: ComponentFixture<UploadcampuscandidatedocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadcampuscandidatedocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcampuscandidatedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
