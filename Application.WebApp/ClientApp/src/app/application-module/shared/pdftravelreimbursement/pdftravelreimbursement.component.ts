import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdftravelreimbursement',
  templateUrl: './pdftravelreimbursement.component.html',
  styleUrls: ['./pdftravelreimbursement.component.css']
})
export class PdftravelreimbursementComponent implements OnInit {
  @Input() travelReimbursementRecord;
  today = new Date();
  modeOfJourney: any[] = [];
  constructor() {
    this.modeOfJourney.push({ TravelModeId: "1", TravelModeName: "Bus" }, { TravelModeId: "2", TravelModeName: "Taxi" },
      { TravelModeId: "3", TravelModeName: "Train" }, { TravelModeId: "4", TravelModeName: "Air" });
    console.log("Travel reinburesment details in pdf file", this.travelReimbursementRecord);

  }

  ngOnInit() {
  }
  getModeOfTransport(traverModeId) {
    return this.modeOfJourney.find(e => e.TravelModeId == traverModeId).TravelModeName;

  }

}
