import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfpersonalaccidentinsuranceform',
  templateUrl: './pdfpersonalaccidentinsuranceform.component.html',
  styleUrls: ['./pdfpersonalaccidentinsuranceform.component.css']
})
export class PdfpersonalaccidentinsuranceformComponent implements OnInit {
  @Input() accidentInsurancePolicyRecord;
  constructor() { }

  ngOnInit() {
  }

}
