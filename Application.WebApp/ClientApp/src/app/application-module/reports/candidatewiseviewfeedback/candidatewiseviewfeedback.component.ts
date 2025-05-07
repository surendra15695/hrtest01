import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ReportService } from 'src/app/services/reports/report.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-candidatewiseviewfeedback',
  templateUrl: './candidatewiseviewfeedback.component.html',
  styleUrls: ['./candidatewiseviewfeedback.component.css']
})
export class CandidatewiseviewfeedbackComponent implements OnInit {
  
  candidateId: number;
  candidateNo: string;
  joiningType : any;
  
  viewfeedbackList:any[]=[];
  constructor(
    public activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
    private _route: Router,
    private persistance: PersistanceService,


  )
  {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateNo = params['CandidateNo'];
      
   })

  }
  ngOnInit() {
    this.loadDataTable();
    //this.loadDatePicker();
    setTimeout(() => {
      this.formSubmit();
    })
  }
  formSubmit() 
  {
    this.SpinnerService.show();
   let data = {
    CandidateId:Number(this.candidateId)
    
    
   }
    this.reportService.viewfeedback(data).subscribe((result) => {
      if (result) {
        this.viewfeedbackList = result;
        this.loadDataTable();
        this.SpinnerService.hide();
      }
      else {
        this.viewfeedbackList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  } 
  loadDataTable() 
  {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns":{
          "left":3
        }
      });
    });
  }
loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
 
 
  downloadarray:any[]=[];

  ExportReport(data:any)
  {
    this.downloadarray=[];
   
        this.viewfeedbackList.forEach((element,index) => {
          if (element.joiningType == "I")
            {
                let headerObj = {
                  "Serial No." : index+1,
                "CandidateId" : this.candidateId,
                  "Candidate Name" : element.fullName,
                  //"Plant" : element.plant,
                  "Grade" : element.gradeName,
                  "Department" : element.departmentName,
                "Question Type" : element.question_Type,
                "Question Name" : element.question_Name,
                "Given Answer" : element.given_Answer
                }
                this.downloadarray.push(headerObj);
              
              this.excelService.ExportAsExcelFileForReport(this.downloadarray, 'Induction Feedback Report(Candidate Wise)');
            }

            else 
            { 
              let headerObj = {
                "Serial No." : index+1,
              "Batch Id" : element.batchId,
                "Batch No" : element.batchNo,
                "CandidateId" : this.candidateId,
                "Candidate Name" : element.fullName,
                "Plant" : element.plant,
                "Grade" : element.gradeName,
                "Department" : element.departmentName,
              "Question Type" : element.question_Type,
              "Question Name" : element.question_Name,
              "Given Answer" : element.given_Answer
              }
              this.downloadarray.push(headerObj);
            
            this.excelService.ExportAsExcelFileForReport(this.downloadarray, 'Induction Feedback Report(Batch Wise)');
            }
          });
    }

  
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
  onClickBack()
  {
    //this.persistance.set('parentActiveTab', "Individual");
    this._route.navigate(['/app/report/inducfeedbacktDetailsReportComponent'])
  }
}
