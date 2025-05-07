import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatejoinerslistComponent } from './corporatejoinerslist.component';

describe('CorporatejoinerslistComponent', () => {
  let component: CorporatejoinerslistComponent;
  let fixture: ComponentFixture<CorporatejoinerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporatejoinerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporatejoinerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
