import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdfallhandholdingforms',
  templateUrl: './pdfallhandholdingforms.component.html',
  styleUrls: ['./pdfallhandholdingforms.component.css']
})
export class PdfallhandholdingformsComponent implements OnInit {
  @Input() pdfvalues;
  constructor() { }

  ngOnInit() {
  }

  getFeedbackStatus(statusId, feedbackbutton) {
    switch (statusId) {
      case "1":
        return "Not Released";
        break;
      case "2":
        switch (feedbackbutton) {
          case true:
            return "Pending";
            break;
          case false:
            return "Expired";
            break;
        }
      //return "Pending";
      break;
      case "3":
        return "Feedback Provided";
        break;
    }
  }

}
