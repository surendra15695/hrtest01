import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfinterviewtravelreimbursement',
  templateUrl: './pdfinterviewtravelreimbursement.component.html',
  styleUrls: ['./pdfinterviewtravelreimbursement.component.css']
})
export class PdfinterviewtravelreimbursementComponent implements OnInit {
  @Input() interviewTravelReimbursementRecord;
  totalAmount: number = 0;
  constructor() {
    this.calculateTotal();
  }

  ngOnInit() {
  }
  calculateTotal() {
    if (this.interviewTravelReimbursementRecord != undefined) {
      this.interviewTravelReimbursementRecord.travelReimbursementJourneyListData.forEach(element => {
        this.totalAmount += element.claimAmount;
      })
    }
  }
}
