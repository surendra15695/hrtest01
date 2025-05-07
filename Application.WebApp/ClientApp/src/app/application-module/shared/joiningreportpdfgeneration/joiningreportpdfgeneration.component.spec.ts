import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningreportpdfgenerationComponent } from './joiningreportpdfgeneration.component';

describe('JoiningreportpdfgenerationComponent', () => {
  let component: JoiningreportpdfgenerationComponent;
  let fixture: ComponentFixture<JoiningreportpdfgenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningreportpdfgenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningreportpdfgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
