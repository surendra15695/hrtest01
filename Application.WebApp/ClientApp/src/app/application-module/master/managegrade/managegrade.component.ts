import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managegrade',
  templateUrl: './managegrade.component.html',
  styleUrls: ['./managegrade.component.css']
})

export class ManagegradeComponent implements OnInit {

  GradeList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private gradeService: GradeService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm(); 
    
    this.getAllGrade();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      GradeName:['', Validators.required],
      GradeId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.gradeService.addGrade(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllGrade(); 
        jQuery(".close").click();       
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(Data: any){    
    this.Operation = 'edit';
    this.saveForm.patchValue({
      GradeName: Data.gradeName,
      GradeId: Data.gradeId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }

  getAllGrade(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.gradeService.getAllGrade(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.GradeList = response;                
      }
      else{
        this.GradeList = [];        
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
