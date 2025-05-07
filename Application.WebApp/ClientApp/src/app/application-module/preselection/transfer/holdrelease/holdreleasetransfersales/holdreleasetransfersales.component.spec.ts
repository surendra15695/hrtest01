import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleasetransfersalesComponent } from './holdreleasetransfersales.component';

describe('HoldreleasetransfersalesComponent', () => {
  let component: HoldreleasetransfersalesComponent;
  let fixture: ComponentFixture<HoldreleasetransfersalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldreleasetransfersalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleasetransfersalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
