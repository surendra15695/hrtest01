import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelocationComponent } from './managelocation.component';

describe('ManagelocationComponent', () => {
  let component: ManagelocationComponent;
  let fixture: ComponentFixture<ManagelocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagelocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
