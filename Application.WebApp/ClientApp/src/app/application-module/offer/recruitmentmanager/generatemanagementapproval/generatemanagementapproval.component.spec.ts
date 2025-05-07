import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratemanagementapprovalComponent } from './generatemanagementapproval.component';

describe('GeneratemanagementapprovalComponent', () => {
  let component: GeneratemanagementapprovalComponent;
  let fixture: ComponentFixture<GeneratemanagementapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratemanagementapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratemanagementapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
