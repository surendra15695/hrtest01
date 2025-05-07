import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdf-upload-medical-document',
  templateUrl: './pdf-upload-medical-document.component.html',
  styleUrls: ['./pdf-upload-medical-document.component.css']
})
export class PdfUploadMedicalDocumentComponent implements OnInit {
  @Input() medicalDocRecord;
  constructor() { }

  ngOnInit() {

    
  }

}
