import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploademployeemasterComponent } from './uploademployeemaster.component';

describe('UploademployeemasterComponent', () => {
  let component: UploademployeemasterComponent;
  let fixture: ComponentFixture<UploademployeemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploademployeemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploademployeemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
