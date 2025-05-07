import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateapplicationformaComponent } from './createapplicationforma.component';

describe('CreateapplicationformaComponent', () => {
  let component: CreateapplicationformaComponent;
  let fixture: ComponentFixture<CreateapplicationformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateapplicationformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateapplicationformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
