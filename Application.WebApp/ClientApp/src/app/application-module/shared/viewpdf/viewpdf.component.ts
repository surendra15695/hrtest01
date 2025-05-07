import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-viewpdf',
  templateUrl: './viewpdf.component.html',
  styleUrls: ['./viewpdf.component.css']
})
export class ViewpdfComponent implements OnInit {
 src:string="";
 private apppath = environment.apppath;
  constructor(private route: ActivatedRoute) { 
    this.src =this.route.snapshot.queryParamMap.get('q');
  }

  ngOnInit() {
  }

}
