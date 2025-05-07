import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdfhandholdingconfirmationform',
  templateUrl: './pdfhandholdingconfirmationform.component.html',
  styleUrls: ['./pdfhandholdingconfirmationform.component.css']
})
export class PdfhandholdingconfirmationformComponent implements OnInit {
  @Input() pdfvalues;
  constructor() { }

  ngOnInit() {
  }

}
