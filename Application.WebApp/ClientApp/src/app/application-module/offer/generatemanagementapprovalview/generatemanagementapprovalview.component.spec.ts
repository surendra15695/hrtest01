import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratemanagementapprovalviewComponent } from './generatemanagementapprovalview.component';

describe('GeneratemanagementapprovalviewComponent', () => {
  let component: GeneratemanagementapprovalviewComponent;
  let fixture: ComponentFixture<GeneratemanagementapprovalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratemanagementapprovalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratemanagementapprovalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
