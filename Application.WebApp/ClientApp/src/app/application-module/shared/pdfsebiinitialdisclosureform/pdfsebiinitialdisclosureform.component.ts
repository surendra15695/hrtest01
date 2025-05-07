import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdfsebiinitialdisclosureform',
  templateUrl: './pdfsebiinitialdisclosureform.component.html',
  styleUrls: ['./pdfsebiinitialdisclosureform.component.css']
})
export class PdfsebiinitialdisclosureformComponent implements OnInit {
@Input() sebiDisclosureRecord;
  constructor() { }

  ngOnInit() {
  }

}
