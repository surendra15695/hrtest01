import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcandidatesalaryfitmentComponent } from './rmcandidatesalaryfitment.component';

describe('RmcandidatesalaryfitmentComponent', () => {
  let component: RmcandidatesalaryfitmentComponent;
  let fixture: ComponentFixture<RmcandidatesalaryfitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcandidatesalaryfitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcandidatesalaryfitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
