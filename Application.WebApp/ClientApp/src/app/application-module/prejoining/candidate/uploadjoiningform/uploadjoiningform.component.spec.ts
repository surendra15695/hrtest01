import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadjoiningformComponent } from './uploadjoiningform.component';

describe('UploadjoiningformComponent', () => {
  let component: UploadjoiningformComponent;
  let fixture: ComponentFixture<UploadjoiningformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadjoiningformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadjoiningformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
