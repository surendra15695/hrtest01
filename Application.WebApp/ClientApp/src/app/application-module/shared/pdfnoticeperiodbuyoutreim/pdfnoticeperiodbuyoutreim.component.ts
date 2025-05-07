import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfnoticeperiodbuyoutreim',
  templateUrl: './pdfnoticeperiodbuyoutreim.component.html',
  styleUrls: ['./pdfnoticeperiodbuyoutreim.component.css']
})
export class PdfnoticeperiodbuyoutreimComponent implements OnInit {
  @Input() noticeperiodDataRecord;
  today = new Date();
  constructor() { }

  ngOnInit() {
  }

}
