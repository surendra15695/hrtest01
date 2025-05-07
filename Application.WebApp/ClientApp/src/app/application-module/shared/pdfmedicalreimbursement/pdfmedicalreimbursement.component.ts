import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfmedicalreimbursement',
  templateUrl: './pdfmedicalreimbursement.component.html',
  styleUrls: ['./pdfmedicalreimbursement.component.css']
})
export class PdfmedicalreimbursementComponent implements OnInit {
  @Input() medicalReimbursementRecord;
  today = new Date();
  n: any;
  constructor() { }

  ngOnInit() {
  }
  inWords(num) {
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if ((num = num.toString()).length > 9) return 'overflow';
    this.n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!this.n) return; var str = '';
    str += (this.n[1] != 0) ? (a[Number(this.n[1])] || b[this.n[1][0]] + ' ' + a[this.n[1][1]]) + 'crore ' : '';
    str += (this.n[2] != 0) ? (a[Number(this.n[2])] || b[this.n[2][0]] + ' ' + a[this.n[2][1]]) + 'lakh ' : '';
    str += (this.n[3] != 0) ? (a[Number(this.n[3])] || b[this.n[3][0]] + ' ' + a[this.n[3][1]]) + 'thousand ' : '';
    str += (this.n[4] != 0) ? (a[Number(this.n[4])] || b[this.n[4][0]] + ' ' + a[this.n[4][1]]) + 'hundred ' : '';
    str += (this.n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(this.n[5])] || b[this.n[5][0]] + ' ' + a[this.n[5][1]]) + 'only ' : '';
    return str;
  }

}
