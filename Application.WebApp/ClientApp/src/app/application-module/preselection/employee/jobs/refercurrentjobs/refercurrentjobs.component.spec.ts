import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefercurrentjobsComponent } from './refercurrentjobs.component';

describe('RefercurrentjobsComponent', () => {
  let component: RefercurrentjobsComponent;
  let fixture: ComponentFixture<RefercurrentjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefercurrentjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefercurrentjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
