import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfjoiningreportform',
  templateUrl: './pdfjoiningreportform.component.html',
  styleUrls: ['./pdfjoiningreportform.component.css']
})
export class PdfjoiningreportformComponent implements OnInit {
  @Input() inductionRecord;
  constructor() { }

  ngOnInit() {
  }

}
