import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcewisereportComponent } from './sourcewisereport.component';

describe('SourcewisereportComponent', () => {
  let component: SourcewisereportComponent;
  let fixture: ComponentFixture<SourcewisereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcewisereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcewisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
