import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/common/location/location.service';
@Component({
  selector: 'app-htrelocationreimbursementdetails',
  templateUrl: './htrelocationreimbursementdetails.component.html',
  styleUrls: ['./htrelocationreimbursementdetails.component.css']
})
export class HtrelocationreimbursementdetailsComponent implements OnInit {
  private subscription: Subscription;
  objHrrelocation: Htrelocationreimbursementdetails;
  doc: string = "";
  document: string = "";
  constructor(private activeRouter: ActivatedRoute, private router: Router,    private locationService: LocationService,
  ) { }

ngOnInit() {
  this.subscription = new Subscription();
  this.objHrrelocation = new Htrelocationreimbursementdetails();
  this.subscription.add(this.activeRouter.queryParams.subscribe((x: any) => {
    debugger;
    if (x.empNo) {
      this.objHrrelocation.empNo = x.empNo;
    }
    if (x.candidateFullName) {
      this.objHrrelocation.candidateFullName = x.candidateFullName;  
    }
    if (x.verticalName) {
      this.objHrrelocation.verticalName = x.verticalName;
    }
    if (x.locationName) {
      this.objHrrelocation.locationName = x.locationName;
    }
    if (x.functionName) {
      this.objHrrelocation.functionName = x.functionName;
    }
    if (x.departmentName) {
      this.objHrrelocation.departmentName = x.departmentName;
    }
    if (x.designationName) {
      this.objHrrelocation.designationName = x.designationName;
    }
    if (x.gradeName) {
      this.objHrrelocation.gradeName = x.gradeName;
    }
    if (x.amount) {
      this.objHrrelocation.amount = x.amount;
    }
    if (x.document) {
      this.document = x.document;
      var subStr = new String(x.document);
      var strsSplits = subStr.split("/");
      var lastSubStr = strsSplits[strsSplits.length - 1]
      var lastSubStrSplits = lastSubStr.split("_");
      var result: any = lastSubStrSplits[lastSubStrSplits.length - 1];
      this.doc = result;
    }
  }))
  }
  onClickBack() {

    this.router.navigate(['/app/ht-relocation-reimbursement-list']
    );
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);

    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
class Htrelocationreimbursementdetails {
  empNo: any;
  candidateFullName: any;
  verticalName: any;
  locationName: any;
  functionName: any;
  departmentName: any;
  designationName: any;
  gradeName: any;
  amount: any;
}

