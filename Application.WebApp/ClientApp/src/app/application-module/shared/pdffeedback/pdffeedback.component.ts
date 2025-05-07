import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdffeedback',
  templateUrl: './pdffeedback.component.html',
  styleUrls: ['./pdffeedback.component.css']
})
export class PdffeedbackComponent implements OnInit {
@Input() feedbackRecord;
  constructor() { }

  ngOnInit() {
  }

}
