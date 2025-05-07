import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdffamilydetailsform',
  templateUrl: './pdffamilydetailsform.component.html',
  styleUrls: ['./pdffamilydetailsform.component.css']
})
export class PdffamilydetailsformComponent implements OnInit {
@Input() familyDetailsRecord;
  constructor() { }

  ngOnInit() {
  }

}
