import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-familydetailsformpdfgeneration',
  templateUrl: './familydetailsformpdfgeneration.component.html',
  styleUrls: ['./familydetailsformpdfgeneration.component.css']
})
export class FamilydetailsformpdfgenerationComponent implements OnInit {

  @Input() familyDetailsRecord;
  constructor() { }

  ngOnInit() {
  }

}
