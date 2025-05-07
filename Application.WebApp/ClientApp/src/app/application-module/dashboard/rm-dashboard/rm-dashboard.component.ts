import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

@Component({
  selector: 'app-rm-dashboard',
  templateUrl: './rm-dashboard.component.html',
  styleUrls: ['./rm-dashboard.component.css']
})
export class RmDashboardComponent implements OnInit {
  AutoUserId:number;
  DashBoardValues:any;
  constructor(
    private commonservice: CommonService,
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
  ) {
    this.AutoUserId= this.persistance.get('loggedinuser').autoUserId;
    this.getRmDashBoardValues();
   }

  ngOnInit() {
  }
  getRmDashBoardValues(){
    this.SpinnerService.show()
    var value={
      AutoUserId:this.AutoUserId
    }
    this.commonservice.getDashBoardValues(value).subscribe((result) => {
      if (result) {
        
        this.DashBoardValues = result;
        this.SpinnerService.hide();
      }
      else {
        this.DashBoardValues = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide()
    });
  }
}
