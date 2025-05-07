import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joiningreportpdfgeneration',
  templateUrl: './joiningreportpdfgeneration.component.html',
  styleUrls: ['./joiningreportpdfgeneration.component.css']
})
export class JoiningreportpdfgenerationComponent implements OnInit {
  @Input() inductionRecord;
  constructor() { }

  ngOnInit() {
  }

}
