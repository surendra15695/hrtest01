import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelocationfunctionComponent } from './managelocationfunction.component';

describe('ManagelocationfunctionComponent', () => {
  let component: ManagelocationfunctionComponent;
  let fixture: ComponentFixture<ManagelocationfunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagelocationfunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelocationfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
