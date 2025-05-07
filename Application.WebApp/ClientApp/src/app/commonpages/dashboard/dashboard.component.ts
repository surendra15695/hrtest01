import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DashboardService } from '../../services/common/dashboard/dashboard.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardsComponent implements OnInit {
  rmData:any[]=[];
  searchRMData: any = 
  { 
    autoUserId:null,
    dayCount:null
  };
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder
    ) { 
      this.createForm();
    }

  ngOnInit() {
    this.getRMDashboard();
  }

  createForm() {
    
  }

  getRMDashboard() {
    this.dashboardService.getRMdashboard(this.searchRMData).subscribe((result) => {
      if (result) {
        this.rmData = result;
        console.log(result);
      }
      else {
        this.rmData = [];
      }
    })
  }

}
