import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcandidateinterviewfedbacklistComponent } from './viewcandidateinterviewfedbacklist.component';

describe('ViewcandidateinterviewfedbacklistComponent', () => {
  let component: ViewcandidateinterviewfedbacklistComponent;
  let fixture: ComponentFixture<ViewcandidateinterviewfedbacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcandidateinterviewfedbacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcandidateinterviewfedbacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
