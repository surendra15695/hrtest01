import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTrainersComponent } from './external-trainers.component';

describe('ExternalTrainersComponent', () => {
  let component: ExternalTrainersComponent;
  let fixture: ComponentFixture<ExternalTrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalTrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
