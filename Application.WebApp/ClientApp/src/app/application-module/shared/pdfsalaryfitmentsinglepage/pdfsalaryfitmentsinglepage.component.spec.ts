import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsalaryfitmentsinglepageComponent } from './pdfsalaryfitmentsinglepage.component';

describe('PdfsalaryfitmentsinglepageComponent', () => {
  let component: PdfsalaryfitmentsinglepageComponent;
  let fixture: ComponentFixture<PdfsalaryfitmentsinglepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfsalaryfitmentsinglepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfsalaryfitmentsinglepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
