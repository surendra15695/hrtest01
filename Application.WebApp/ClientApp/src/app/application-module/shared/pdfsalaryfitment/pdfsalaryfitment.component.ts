import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfsalaryfitment',
  templateUrl: './pdfsalaryfitment.component.html',
  styleUrls: ['./pdfsalaryfitment.component.css']
})
export class PdfsalaryfitmentComponent implements OnInit {
  @Input() salaryFitment;
  constructor() {
  }
  //Piu Biswas
  ngOnInit() {
  }

}
