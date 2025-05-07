import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcandidatelistComponent } from './vendorcandidatelist.component';

describe('VendorcandidatelistComponent', () => {
  let component: VendorcandidatelistComponent;
  let fixture: ComponentFixture<VendorcandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
