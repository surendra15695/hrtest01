import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelanguageComponent } from './managelanguage.component';

describe('ManagelanguageComponent', () => {
  let component: ManagelanguageComponent;
  let fixture: ComponentFixture<ManagelanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagelanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
