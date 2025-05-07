import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsourcechannelComponent } from './stopsourcechannel.component';

describe('StopsourcechannelComponent', () => {
  let component: StopsourcechannelComponent;
  let fixture: ComponentFixture<StopsourcechannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsourcechannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsourcechannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
