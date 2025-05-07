import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadnaukriprofileComponent } from './uploadnaukriprofile.component';

describe('UploadnaukriprofileComponent', () => {
  let component: UploadnaukriprofileComponent;
  let fixture: ComponentFixture<UploadnaukriprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadnaukriprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadnaukriprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
