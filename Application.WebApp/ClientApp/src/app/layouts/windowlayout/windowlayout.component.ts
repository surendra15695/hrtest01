import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-windowlayout',
  templateUrl: './windowlayout.component.html',
  styleUrls: ['./windowlayout.component.css']
})
export class WindowlayoutComponent implements OnInit {

  constructor() { 
    document.body.style.paddingTop="0px";
  }

  ngOnInit() {
  }

}
