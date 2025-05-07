import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCvdropTagComponent } from './candidate-cvdrop-tag.component';

describe('CandidateCvdropTagComponent', () => {
  let component: CandidateCvdropTagComponent;
  let fixture: ComponentFixture<CandidateCvdropTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCvdropTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCvdropTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
