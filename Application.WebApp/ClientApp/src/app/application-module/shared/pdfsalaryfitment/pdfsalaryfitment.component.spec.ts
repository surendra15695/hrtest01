import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsalaryfitmentComponent } from './pdfsalaryfitment.component';

describe('PdfsalaryfitmentComponent', () => {
  let component: PdfsalaryfitmentComponent;
  let fixture: ComponentFixture<PdfsalaryfitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfsalaryfitmentComponent ]
    })
    .compileComponents();
  }));
//Piu Biswas
  beforeEach(() => {
    fixture = TestBed.createComponent(PdfsalaryfitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
