import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfaccommodation',
  templateUrl: './pdfaccommodation.component.html',
  styleUrls: ['./pdfaccommodation.component.css']
})
export class PdfaccommodationComponent implements OnInit {
  @Input() accommodationRecord;
  constructor() { }

  ngOnInit() {

  }

}
