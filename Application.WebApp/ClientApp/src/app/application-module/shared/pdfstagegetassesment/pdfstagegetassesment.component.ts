import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfstagegetassesment',
  templateUrl: './pdfstagegetassesment.component.html',
  styleUrls: ['./pdfstagegetassesment.component.css']
})
export class PdfstagegetassesmentComponent implements OnInit {
  @Input() pdfValues;
  currentDate:any;
  constructor() {
    this.currentDate = new Date();
   }

  ngOnInit() {
  }

}
