import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { InterviewcalendaractionService } from '../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
declare var html2pdf: any;
@Component({
  selector: 'app-campus-stageget-assesment',
  templateUrl: './campus-stageget-assesment.component.html',
  styleUrls: ['./campus-stageget-assesment.component.css']
})
export class CampusStagegetAssesmentComponent implements OnInit {
  candidateId:number;
  candidateDeatilsData:any=[]
  rowHeader:any=[];
  columnHeader:any=[]
  isVisible:boolean=false;
  currentDate:any;
  analyticalIq:any=0;
  analyticalplan:any=0;
  analyticaltotal:any=0;
  analyticalavg:any=0;
  analyticalweight:any=0;
  analiticalfinal:any=0;

  plainingnego:any=0;
  plainingwriting:any=0;
  plainingtotal:any=0;
  plainingavg:any=0;
  plainingweight:any=0;
  planingfinal:any=0

  sellingnego:any=0;
  sellingprese:any=0;
  sellingtotal:any=0;
  sellingavg:any=0;
  sellingweight:any=0;
  sellingfinal:any=0;

  takeconvnego:any=0;
  takeconvprese:any=0;
  takeconvtotal:any=0;
  takeconvavg:any=0;
  takeconvweight:any=0;
  takeconvfinal:any=0;

  customertotalavg:any=0;
  customerfinal:any=0;
  customerweight:any=0;
  pdfValuePage:any={};
  pdfValues:any={};
  totalMarks:any=0;
  constructor(
    private persistance: PersistanceService,
    private _route: Router,
    private campusRequisitionService: CampusrequisitionService,
    private SpinnerService: NgxSpinnerService,
    private interActionService: InterviewcalendaractionService,
    private notificationService: NotificationService,
  ) {
    this.candidateId=this.persistance.get('candidateId');
    this.persistance.get('pagename')=="campusmycalendar" ? this.isVisible=true: this.isVisible=false;

    this.candidateDeatils();
    //this.rowAndColumnDetails()
    this.currentDate = new Date();
    this.getDetailsOfScore()

   }

  ngOnInit() {
  }

  gotoCandidateList(){
    if(this.persistance.get('pagename')=="mycalenderviewcandidate"){
      this.persistance.set('candidateId', this.persistance.get('candidateId'));
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));
      this._route.navigate(['/app/campus/rm-mycalender-view-candidate'])
    }
    else if(this.persistance.get('pagename')=="campusmycalendar"){
      //this.persistance.set('candidateId', this.persistance.get('candidateId'));
      this.persistance.set('interviewMasterId', this.persistance.get('interviewMasterId'));

      this.persistance.set("fromdate",this.persistance.get('fromdate'))
      this.persistance.set("count",this.persistance.get('count'))
      this.persistance.set("functionId",this.persistance.get('functionId'))
      this._route.navigate(['/app/campus/campusmycalendar'])
    }
    else{
    this.persistance.set('candidateId', null);
    this._route.navigate(['/app/talent-pool'])
    }
  }
  onchangeanaliq(){
    this.analyticaltotal=Number(this.analyticalIq)+ Number(this.analyticalplan);
    this.analyticalavg = this.analyticaltotal/2
  }
  onchangeAnaliticalWeight(){
    this.analiticalfinal = this.analyticalavg * Number(this.analyticalweight);
    this.totalMarks = Number(this.analiticalfinal) + Number(this.planingfinal) + Number(this.sellingfinal) + Number(this.takeconvfinal)+ Number(this.customerfinal)
  }
  onchangeplannego(){
    this.plainingtotal= Number(this.plainingnego)+Number(this.plainingwriting);
    this.plainingavg = this.plainingtotal/2
  }
  onchangeplanwieght(){
    this.planingfinal = this.plainingavg * Number(this.plainingweight)
    this.totalMarks = Number(this.analiticalfinal) + Number(this.planingfinal) + Number(this.sellingfinal) + Number(this.takeconvfinal)+ Number(this.customerfinal)
  }
  onchangesellingego(){
    this.sellingtotal= Number(this.sellingnego)+Number(this.sellingprese)
    this.sellingavg=this.sellingtotal/2
  }
  onchangesellwieght(){
    this.sellingfinal = this.sellingavg * Number(this.sellingweight)
    this.totalMarks = Number(this.analiticalfinal) + Number(this.planingfinal) + Number(this.sellingfinal) + Number(this.takeconvfinal)+ Number(this.customerfinal)
  }
  onchangetakeconvingego(){
    this.takeconvtotal=Number(this.takeconvnego) + Number(this.takeconvprese);
    this.takeconvavg= Number(this.takeconvtotal)/2
  }
  onchangetakeconvwieght(){
    this.takeconvfinal=this.takeconvavg * Number(this.takeconvweight);
    this.totalMarks = Number(this.analiticalfinal) + Number(this.planingfinal) + Number(this.sellingfinal) + Number(this.takeconvfinal)+ Number(this.customerfinal)
  }
  onchangecustomer(){
    this.customerfinal= Number(this.customerweight) * Number(this.customertotalavg);
    this.totalMarks = Number(this.analiticalfinal) + Number(this.planingfinal) + Number(this.sellingfinal) + Number(this.takeconvfinal)+ Number(this.customerfinal)
  }
  
  candidateDeatils(){
    this.SpinnerService.show();
    var formData={
      CandidateId:Number(this.candidateId)
    }
    this.campusRequisitionService.getCandidateDetailsForStageGate(formData).subscribe((result) => {
      if(result.length >0){
      this.candidateDeatilsData = result[0];
      this.pdfValuePage=this.candidateDeatilsData;
      }
      this.SpinnerService.hide();
    })
  }

  onSubmit(){
    const formData = new FormData();
    formData.append("CandidateId",this.candidateId.toString());
    var scoreArray=[];
    scoreArray.push({RowId:1,ColumnId:9,Marks:Number(this.analyticalIq)});
    scoreArray.push({RowId:3,ColumnId:9,Marks:Number(this.analyticalplan)});
    scoreArray.push({RowId:5,ColumnId:9,Marks:Number(this.analyticaltotal)});
    scoreArray.push({RowId:6,ColumnId:9,Marks:Number(this.analyticalavg)});
    scoreArray.push({RowId:7,ColumnId:9,Marks:Number(this.analyticalweight)});
    scoreArray.push({RowId:8,ColumnId:9,Marks:Number(this.analiticalfinal)});

    scoreArray.push({RowId:2,ColumnId:10,Marks:Number(this.plainingnego)});
    scoreArray.push({RowId:3,ColumnId:10,Marks:Number(this.plainingwriting)});
    scoreArray.push({RowId:5,ColumnId:10,Marks:Number(this.plainingtotal)});
    scoreArray.push({RowId:6,ColumnId:10,Marks:Number(this.plainingavg)});
    scoreArray.push({RowId:7,ColumnId:10,Marks:Number(this.plainingweight)});
    scoreArray.push({RowId:8,ColumnId:10,Marks:Number(this.planingfinal)});

    scoreArray.push({RowId:2,ColumnId:11,Marks:Number(this.sellingnego)});
    scoreArray.push({RowId:4,ColumnId:11,Marks:Number(this.sellingprese)});
    scoreArray.push({RowId:5,ColumnId:11,Marks:Number(this.sellingtotal)});
    scoreArray.push({RowId:6,ColumnId:11,Marks:Number(this.sellingavg)});
    scoreArray.push({RowId:7,ColumnId:11,Marks:Number(this.sellingweight)});
    scoreArray.push({RowId:8,ColumnId:11,Marks:Number(this.sellingfinal)});

    scoreArray.push({RowId:2,ColumnId:12,Marks:Number(this.takeconvnego)});
    scoreArray.push({RowId:4,ColumnId:12,Marks:Number(this.takeconvprese)});
    scoreArray.push({RowId:5,ColumnId:12,Marks:Number(this.takeconvtotal)});
    scoreArray.push({RowId:6,ColumnId:12,Marks:Number(this.takeconvavg)});
    scoreArray.push({RowId:7,ColumnId:12,Marks:Number(this.takeconvweight)});
    scoreArray.push({RowId:8,ColumnId:12,Marks:Number(this.takeconvfinal)});

    scoreArray.push({RowId:2,ColumnId:13,Marks:Number(this.customertotalavg)});
    scoreArray.push({RowId:5,ColumnId:13,Marks:Number(this.customertotalavg)});
    scoreArray.push({RowId:6,ColumnId:13,Marks:Number(this.customertotalavg)});
    scoreArray.push({RowId:7,ColumnId:13,Marks:Number(this.customerweight)});
    scoreArray.push({RowId:8,ColumnId:13,Marks:Number(this.customerfinal)});

   // formData.append("ScoreArray",scoreArray.toString());
    formData.append("TotalMarks",this.totalMarks.toString());
    formData.append("CreatedBy",this.persistance.get('loggedinuser').autoUserId.toString());
    var data={
      CandidateId:Number(this.candidateId),
      TotalMarks:Number(this.totalMarks),
      MarksTables:scoreArray,
       CreatedBy:Number(this.persistance.get('loggedinuser').autoUserId)
    }

    this.interActionService.insertupdateStageGateAssessment(data).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          this.getDetailsOfScore()
        }
      }
      else {
      }
    })
  }
  onCancel(){
    
  }
  fileName: string="";
  htmlPath:any;
  pdfdownload(){
    this.fileName=this.candidateId.toString()+"_Stage_Get_Assesment.pdf"
    setTimeout(() => {
      this.htmlPath = document.getElementById("printerdiv").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = this.htmlPath;
      html2pdf(dom, {
        margin: 6,
        filename: this.fileName,
        image: { type: 'jpeg', quality: 0.98 },
        //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        html2canvas: { scale: 3, y: 0, scrollY: 0 },
        //jsPDF: { format: 'A4' },
        //jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        jsPDF: { format: 'A4', orientation: 'portrait' },
      });
    }, 100);
  }
  rowAndColumnDetails(){
    this.SpinnerService.show();
    var formData={
      CandidateId:Number(this.candidateId)
    }
    this.campusRequisitionService.getStageGateAssesmentComp(formData).subscribe((result) => {
      if(result.length >0){
      this.rowHeader = result.filter(e => e.isHeader==true)
      this.columnHeader = result.filter(e => e.isHeader ==false);
      }
      this.SpinnerService.hide();
    })
  }

  getDetailsOfScore(){
    var formData={
      CandidateId:Number(this.candidateId)
    }
    this.interActionService.getStageGateAssessment(formData).subscribe((result) => {
      if(result.length >0){
        this.isVisible=true;
        this.analyticalIq = result.filter(e => e.rowId==1 && e.columnId==9)[0].marks;
        this.pdfValuePage.analyticalIq = this.analyticalIq
        this.analyticalplan= result.filter(e => e.rowId==3 && e.columnId==9)[0].marks;
        this.pdfValuePage.analyticalplan = this.analyticalplan
        this.analyticaltotal= result.filter(e => e.rowId==5 && e.columnId==9)[0].marks;
        this.pdfValuePage.analyticaltotal = this.analyticaltotal
        this.analyticalavg= result.filter(e => e.rowId==6 && e.columnId==9)[0].marks;
        this.pdfValuePage.analyticalavg = this.analyticalavg
        this.analyticalweight= result.filter(e => e.rowId==7 && e.columnId==9)[0].marks;
        this.pdfValuePage.analyticalweight = this.analyticalweight
        this.analiticalfinal= result.filter(e => e.rowId==8 && e.columnId==9)[0].marks;
        this.pdfValuePage.analiticalfinal = this.analiticalfinal
      
        this.plainingnego= result.filter(e => e.rowId==2 && e.columnId==10)[0].marks;
        this.pdfValuePage.plainingnego = this.plainingnego
        this.plainingwriting= result.filter(e => e.rowId==3 && e.columnId==10)[0].marks;
        this.pdfValuePage.plainingwriting = this.plainingwriting
        this.plainingtotal= result.filter(e => e.rowId==5 && e.columnId==10)[0].marks;
        this.pdfValuePage.plainingtotal = this.plainingtotal
        this.plainingavg= result.filter(e => e.rowId==6 && e.columnId==10)[0].marks;
        this.pdfValuePage.plainingavg = this.plainingavg
        this.plainingweight= result.filter(e => e.rowId==7 && e.columnId==10)[0].marks;
        this.pdfValuePage.plainingweight = this.plainingweight
        this.planingfinal= result.filter(e => e.rowId==8 && e.columnId==10)[0].marks;
        this.pdfValuePage.planingfinal = this.planingfinal

      
        this.sellingnego= result.filter(e => e.rowId==2 && e.columnId==11)[0].marks;
        this.pdfValuePage.sellingnego = this.sellingnego
        this.sellingprese= result.filter(e => e.rowId==4 && e.columnId==11)[0].marks;
        this.pdfValuePage.sellingprese = this.sellingprese
        this.sellingtotal= result.filter(e => e.rowId==5 && e.columnId==11)[0].marks;
        this.pdfValuePage.sellingtotal = this.sellingtotal
        this.sellingavg= result.filter(e => e.rowId==6 && e.columnId==11)[0].marks;
        this.pdfValuePage.sellingavg = this.sellingavg
        this.sellingweight= result.filter(e => e.rowId==7 && e.columnId==11)[0].marks;
        this.pdfValuePage.sellingweight = this.sellingweight
        this.sellingfinal= result.filter(e => e.rowId==8 && e.columnId==11)[0].marks;
        this.pdfValuePage.sellingfinal = this.sellingfinal
      
        this.takeconvnego= result.filter(e => e.rowId==2 && e.columnId==12)[0].marks;
        this.pdfValuePage.takeconvnego = this.takeconvnego
        this.takeconvprese= result.filter(e => e.rowId==4 && e.columnId==12)[0].marks;
        this.pdfValuePage.takeconvprese = this.takeconvprese
        this.takeconvtotal= result.filter(e => e.rowId==5 && e.columnId==12)[0].marks;
        this.pdfValuePage.takeconvtotal = this.takeconvtotal
        this.takeconvavg= result.filter(e => e.rowId==6 && e.columnId==12)[0].marks;
        this.pdfValuePage.takeconvavg = this.takeconvavg
        this. takeconvweight= result.filter(e => e.rowId==7 && e.columnId==12)[0].marks;
        this.pdfValuePage.takeconvweight = this.takeconvweight
        this.takeconvfinal= result.filter(e => e.rowId==8 && e.columnId==12)[0].marks;
        this.pdfValuePage.takeconvfinal = this.takeconvfinal
      
        this.customertotalavg = result.filter(e => e.rowId==2 && e.columnId==13)[0].marks;
        this.pdfValuePage.customertotalavg = this.customertotalavg
        // this.customertotalavg = result.filter(e => e.rowId==5 && e.columnId==13)[0].marks;
        // this.customertotalavg = result.filter(e => e.rowId==6 && e.columnId==13)[0].marks;
        this.customerweight = result.filter(e => e.rowId==7 && e.columnId==13)[0].marks;
        this.pdfValuePage.customerweight = this.customerweight
        this.customerfinal = result.filter(e => e.rowId==8 && e.columnId==13)[0].marks;
        this.pdfValuePage.customerfinal = this.customerfinal

        this.totalMarks= result[0].totalMarks;
        this.pdfValuePage.totalMarks = this.totalMarks

      }
      this.SpinnerService.hide();
    })
  }
}
