import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusViewDocumentComponent } from './campus-view-document.component';

describe('CampusViewDocumentComponent', () => {
  let component: CampusViewDocumentComponent;
  let fixture: ComponentFixture<CampusViewDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusViewDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusViewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
