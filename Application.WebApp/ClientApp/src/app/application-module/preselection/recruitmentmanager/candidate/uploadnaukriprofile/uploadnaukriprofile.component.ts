import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';

import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { DecimalPipe } from '@angular/common';
import { CandidateService } from 'src/app/services/preselection/candidate/candidate.service';
import { InaukriCandidate } from 'src/app/interfaces/preselection/candidate.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
declare var jQuery: any;

@Component({
  selector: 'app-uploadnaukriprofile',
  templateUrl: './uploadnaukriprofile.component.html',
  styleUrls: ['./uploadnaukriprofile.component.css']
})
export class UploadnaukriprofileComponent implements OnInit {
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('naukriProfile', { static: false }) naukriprofileImport: ElementRef;
  createdBy: number;
  naukrifileToUpload: File = null;
  requisitionDetailId: number;
  naukriCandidate: any[] = [];
  searchNaukriCandidate: InaukriCandidate = {
    RequisitionDetailId: null
  }
  intervalId: any;
  sampletestarray: any[] = [];
  constructor(
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private _route: Router,
    private persistance: PersistanceService,
    private requisitionService: RequisitionService,
    private candidateService: CandidateService,
    private SpinnerService: NgxSpinnerService,
    private excelService: ExcelService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "rmrequisitionlist") {
        this.requisitionDetailId = this.persistance.get('paramid');

      } else {
        this._route.navigate(['/app/my-action/all-requisition']);
      }
    }
    else {
      this._route.navigate(['/app/my-action/all-requisition']);
    }
  }

  ngAfterViewInit() {

  }


  ngOnInit() {
    this.getNaukriCandidate();
    this.intervalId = setInterval(() => { this.onRefresh(); }, 60000);

  }

  gotoCandidateList() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.persistance.set('pagename', "rmrequisitionlist");
    //By Kuntal
    this.persistance.set('previouspageparams', this.persistance.get('previouspagefilter'));
    this.persistance.set('tabledisplayStartcandi', this.persistance.get('tabledisplayStartcandi'));
    this._route.navigate(['/app/my-action/all-positions/candidate-list']);
  }

  onFileChange(files: FileList) {
    this.naukriprofileImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notificationService.showError("File should be less than 2MB!", "Error");
        this.naukrifileToUpload = files.item(0);
      }
      else {
        this.naukriprofileImport.nativeElement.innerText = files[0].name;
        this.naukrifileToUpload = files.item(0);
      }
      // const formData = new FormData();
      // formData.append("naukriProfileFile", this.naukrifileToUpload);
      // formData.append("CreatedBy", this.createdBy.toString());
      // formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
      // console.log(formData);
      // this.requisitionService.uploadNaukriProfile(formData).subscribe((result) => {
      //   console.log(result);
      //   if (result.status == 0) {
      //     this.notificationService.showError(result.msg, "Error");
      //   }
      //   else {
      //     this.notificationService.showSuccess(result.msg, "Success");
      //     this._route.navigate(['/my-action/all-positions/candidate-list']);
      //   }
      // }, error => {
      //   console.log(error);
      //   this.notificationService.showError("Something went wrong", "Error")
      // });

    }
  }
  statusArr: any[] = [];
  onupload() {
    const formData = new FormData();
    this.statusArr = [];
    formData.append("naukriProfileFile", this.naukrifileToUpload);
    formData.append("CreatedBy", this.createdBy.toString());
    formData.append("RequisitionDetailId", this.requisitionDetailId.toString());
    console.log(formData);
    this.requisitionService.uploadNaukriProfile(formData).subscribe((result) => {
      console.log(result);
      debugger
      if (result.returnMessage.status == 0) {
        this.notificationService.showError(result.returnMessage.msg, "Error");
        this.naukrifileToUpload = null;
      }
      else {
        this.notificationService.showSuccess(result.returnMessage.msg, "Success");
        this.naukrifileToUpload = null;
        this.naukriprofileImport.nativeElement.innerText="Choose file";
        //this._route.navigate(['/app/my-action/all-positions/candidate-list']);
        if (result.candidateDetailForExcelUploads != null) {
          for (var val of result.candidateDetailForExcelUploads) {
            var data = {
              "Candidate Name": val.candidateName,
              "Candidate Email": val.candidateEmail,
              "Status": val.status,
              "Error Msg": val.errorMsg
            }
            this.statusArr.push(data);
          }
        }
      }
    }, error => {
      console.log(error);
      this.notificationService.showError("Something went wrong", "Error")
    });
  }

  ExportReport() {
    if (this.statusArr.length > 0) {
      this.excelService.ExportAsExcelFile(this.statusArr, 'Uploaded Status');
    }
  }
  getNaukriCandidate() {
    this.naukriCandidate = [];
    this.searchNaukriCandidate.RequisitionDetailId = this.requisitionDetailId;
    this.candidateService.getNaukriCandidate(this.searchNaukriCandidate).subscribe((result) => {
      if (result) {
        this.naukriCandidate = result;
      }
      else {
        this.naukriCandidate = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').dataTable().fnClearTable();
    jQuery('#dataTable1').dataTable().fnDestroy();
    setTimeout(() => {
      // jQuery('#dataTable2').DataTable({
      //   "searching": false,
      //   "paging": true,
      //   "scrollX": true,
      //   "bLengthChange": false,
      // });
      jQuery('#dataTable1').dataTable({
        "searching": false,
        "paging": true,
        "scrollX": false,
      });
    });
  }
  onRefresh() {
    this.getNaukriCandidate();
  }
  SampleFile() {
    this.sampletestarray = [];
    let Sampleobj = {
      EmailId: 'samplemail@gmail.com',
      Name: 'SampleName',
    }
    this.sampletestarray.push(Sampleobj)
    this.excelService.ExportAsCSVFile(this.sampletestarray, 'Sample File');
  }
}

