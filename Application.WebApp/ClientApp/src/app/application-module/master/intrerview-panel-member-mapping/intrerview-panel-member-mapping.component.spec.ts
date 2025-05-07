import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrerviewPanelMemberMappingComponent } from './intrerview-panel-member-mapping.component';

describe('IntrerviewPanelMemberMappingComponent', () => {
  let component: IntrerviewPanelMemberMappingComponent;
  let fixture: ComponentFixture<IntrerviewPanelMemberMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrerviewPanelMemberMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrerviewPanelMemberMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
