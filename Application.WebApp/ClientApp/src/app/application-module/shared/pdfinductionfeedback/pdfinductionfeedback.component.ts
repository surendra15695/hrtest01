import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfinductionfeedback',
  templateUrl: './pdfinductionfeedback.component.html',
  styleUrls: ['./pdfinductionfeedback.component.css']
})
export class PdfinductionfeedbackComponent implements OnInit {
  @Input() inductionFeedbackRecord;
  constructor() { }

  ngOnInit() {
  }

}
