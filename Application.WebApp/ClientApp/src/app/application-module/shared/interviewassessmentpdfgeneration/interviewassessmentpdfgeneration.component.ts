import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-interviewassessmentpdfgeneration',
  templateUrl: './interviewassessmentpdfgeneration.component.html',
  styleUrls: ['./interviewassessmentpdfgeneration.component.css']
})
export class InterviewassessmentpdfgenerationComponent implements OnInit {
  @Input() assessmentRecords;
  constructor() { }

  ngOnInit() {
  }

}
