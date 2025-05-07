import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from 'src/app/services/common/position/position.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
declare var jQuery: any;


@Component({
  selector: 'app-campus-interview-master',
  templateUrl: './campus-interview-master.component.html',
  styleUrls: ['./campus-interview-master.component.css']
})
export class CampusInterviewMasterComponent implements OnInit {
  interviewNameList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    
    private spinnerService: NgxSpinnerService,
    private calenderActionSevice: InterviewcalendaractionService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;

  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm();

    this.getAllInterviewName()
  }
  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      InterviewName:['', Validators.required],
      InterviewId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){      
    this.spinnerService.show();    
    this.calenderActionSevice.insertupcampusinterviewname(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllInterviewName()  
        jQuery(".close").click();        
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () =>{
      this.spinnerService.hide();
    })
  }
  onEdit(RowData: any){
    this.Operation = 'edit';   
    this.saveForm.patchValue({
      InterviewName: RowData.interviewName,
      InterviewId: RowData.interviewNameId,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });
  }
  getAllInterviewName(){
    this.spinnerService.show();
    this.saveForm.value.isActive = null;
    var value={
      InterviewNameId:0
    }
    this.calenderActionSevice.getcampusinterviewname(value).subscribe((response: any) => {            
      if(response){
        this.interviewNameList = response; 
        //console.log("Position List: ", this.PositionList);                            
      }
      else{
        this.interviewNameList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }   

}
