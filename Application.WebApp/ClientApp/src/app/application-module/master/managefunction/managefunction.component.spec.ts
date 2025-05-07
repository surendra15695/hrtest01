import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefunctionComponent } from './managefunction.component';

describe('ManagefunctionComponent', () => {
  let component: ManagefunctionComponent;
  let fixture: ComponentFixture<ManagefunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagefunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
