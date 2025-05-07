import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pdfsalaryfitmentsinglepage',
  templateUrl: './pdfsalaryfitmentsinglepage.component.html',
  styleUrls: ['./pdfsalaryfitmentsinglepage.component.css']
})
export class PdfsalaryfitmentsinglepageComponent implements OnInit {
  @Input() salaryFitment;
  constructor() { }

  ngOnInit() {
  }

}
