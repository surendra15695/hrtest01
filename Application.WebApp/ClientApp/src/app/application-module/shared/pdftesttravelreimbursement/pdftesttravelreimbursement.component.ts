import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdftesttravelreimbursement',
  templateUrl: './pdftesttravelreimbursement.component.html',
  styleUrls: ['./pdftesttravelreimbursement.component.css']
})
export class PdftesttravelreimbursementComponent implements OnInit {
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
