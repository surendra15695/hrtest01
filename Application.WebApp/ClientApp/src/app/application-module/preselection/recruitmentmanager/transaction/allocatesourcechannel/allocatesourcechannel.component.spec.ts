import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatesourcechannelComponent } from './allocatesourcechannel.component';

describe('AllocatesourcechannelComponent', () => {
  let component: AllocatesourcechannelComponent;
  let fixture: ComponentFixture<AllocatesourcechannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatesourcechannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatesourcechannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
