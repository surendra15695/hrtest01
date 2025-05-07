import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleaseresignationsalesComponent } from './holdreleaseresignationsales.component';

describe('HoldreleaseresignationsalesComponent', () => {
  let component: HoldreleaseresignationsalesComponent;
  let fixture: ComponentFixture<HoldreleaseresignationsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleaseresignationsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleaseresignationsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
