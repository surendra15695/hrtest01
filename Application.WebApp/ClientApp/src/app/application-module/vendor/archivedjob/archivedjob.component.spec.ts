import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedjobComponent } from './archivedjob.component';

describe('ArchivedjobComponent', () => {
  let component: ArchivedjobComponent;
  let fixture: ComponentFixture<ArchivedjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
