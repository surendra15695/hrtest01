import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationcorporateComponent } from './resignationcorporate.component';

describe('ResignationcorporateComponent', () => {
  let component: ResignationcorporateComponent;
  let fixture: ComponentFixture<ResignationcorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationcorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationcorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
