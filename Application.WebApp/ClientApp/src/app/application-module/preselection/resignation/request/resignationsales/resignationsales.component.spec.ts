import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationsalesComponent } from './resignationsales.component';

describe('ResignationsalesComponent', () => {
  let component: ResignationsalesComponent;
  let fixture: ComponentFixture<ResignationsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignationsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignationsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
