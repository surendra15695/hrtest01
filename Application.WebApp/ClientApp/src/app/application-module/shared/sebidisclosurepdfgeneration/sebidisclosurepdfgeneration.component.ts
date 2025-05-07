import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-sebidisclosurepdfgeneration',
  templateUrl: './sebidisclosurepdfgeneration.component.html',
  styleUrls: ['./sebidisclosurepdfgeneration.component.css']
})
export class SebidisclosurepdfgenerationComponent implements OnInit {
  @Input() sebiDisclosureRecord;
  constructor() { }

  ngOnInit() {
  }

}
