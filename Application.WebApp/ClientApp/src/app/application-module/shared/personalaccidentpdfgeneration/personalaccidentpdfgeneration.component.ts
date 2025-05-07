import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personalaccidentpdfgeneration',
  templateUrl: './personalaccidentpdfgeneration.component.html',
  styleUrls: ['./personalaccidentpdfgeneration.component.css']
})
export class PersonalaccidentpdfgenerationComponent implements OnInit {
  @Input() accidentInsurancePolicyRecord;
  constructor() { }

  ngOnInit() {
  }

}
