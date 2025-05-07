import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtrelocationreimbursementlistComponent } from './htrelocationreimbursementlist.component';

describe('HtrelocationreimbursementlistComponent', () => {
  let component: HtrelocationreimbursementlistComponent;
  let fixture: ComponentFixture<HtrelocationreimbursementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtrelocationreimbursementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtrelocationreimbursementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
