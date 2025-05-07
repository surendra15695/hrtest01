import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdfnoticeperiodbuyoutforzip',
  templateUrl: './pdfnoticeperiodbuyoutforzip.component.html',
  styleUrls: ['./pdfnoticeperiodbuyoutforzip.component.css']
})
export class PdfnoticeperiodbuyoutforzipComponent implements OnInit {
  @Input() noticeperiodDataRecord;
  today = new Date();
  constructor() { }

  ngOnInit() {
  }

}
