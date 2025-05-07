import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campus-pdf-interview-assesment',
  templateUrl: './campus-pdf-interview-assesment.component.html',
  styleUrls: ['./campus-pdf-interview-assesment.component.css']
})
export class CampusPdfInterviewAssesmentComponent implements OnInit {
  @Input() assessmentRecords;
  constructor() { }

  ngOnInit() {
  }

}
