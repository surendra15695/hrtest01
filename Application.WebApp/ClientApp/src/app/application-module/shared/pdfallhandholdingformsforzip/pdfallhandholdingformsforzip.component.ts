import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdfallhandholdingformsforzip',
  templateUrl: './pdfallhandholdingformsforzip.component.html',
  styleUrls: ['./pdfallhandholdingformsforzip.component.css']
})
export class PdfallhandholdingformsforzipComponent implements OnInit {
  @Input() pdfvalues;
  constructor() { }

  ngOnInit() {
  }

}
