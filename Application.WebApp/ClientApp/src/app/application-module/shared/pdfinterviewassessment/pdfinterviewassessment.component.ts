import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pdfinterviewassessment',
  templateUrl: './pdfinterviewassessment.component.html',
  styleUrls: ['./pdfinterviewassessment.component.css']
})
export class PdfinterviewassessmentComponent implements OnInit {
  @Input() assessmentRecords;
  constructor() { }

  ngOnInit() {
  }

}
