import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-confirmation-file',
  templateUrl: './pdf-confirmation-file.component.html',
  styleUrls: ['./pdf-confirmation-file.component.css']
})
export class PdfConfirmationFileComponent implements OnInit {
  @Input() pdfvalues;
  isbool:boolean=false
  constructor() { }

  ngOnInit() {
  }

}
