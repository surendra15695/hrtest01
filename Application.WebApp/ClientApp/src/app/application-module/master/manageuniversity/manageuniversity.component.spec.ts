import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageuniversityComponent } from './manageuniversity.component';

describe('ManageuniversityComponent', () => {
  let component: ManageuniversityComponent;
  let fixture: ComponentFixture<ManageuniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageuniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageuniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
