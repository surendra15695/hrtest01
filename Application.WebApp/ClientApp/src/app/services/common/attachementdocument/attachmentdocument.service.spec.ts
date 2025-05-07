import { TestBed } from '@angular/core/testing';

import { AttachmentdocumentService } from './attachmentdocument.service';

describe('AttachmentdocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttachmentdocumentService = TestBed.get(AttachmentdocumentService);
    expect(service).toBeTruthy();
  });
});
