import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfinductiondetails',
  templateUrl: './pdfinductiondetails.component.html',
  styleUrls: ['./pdfinductiondetails.component.css']
})
export class PdfinductiondetailsComponent implements OnInit {
  @Input() inductionRecord;
  constructor() { }

  ngOnInit() {
  }

}
