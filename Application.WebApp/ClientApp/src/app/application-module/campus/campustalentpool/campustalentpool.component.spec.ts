import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampustalentpoolComponent } from './campustalentpool.component';

describe('CampustalentpoolComponent', () => {
  let component: CampustalentpoolComponent;
  let fixture: ComponentFixture<CampustalentpoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampustalentpoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampustalentpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
