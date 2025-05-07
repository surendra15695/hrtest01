import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pdfapplicationform',
  templateUrl: './pdfapplicationform.component.html',
  styleUrls: ['./pdfapplicationform.component.css']
})
export class PdfapplicationformComponent implements OnInit {
  @Input() candidateProfile;
  constructor() { 
    
  }

  ngOnInit() {
  }

}
