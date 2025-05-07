import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../sharedservices/notification.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';
declare var jQuery: any;
@Component({
  selector: 'app-external-trainers',
  templateUrl: './external-trainers.component.html',
  styleUrls: ['./external-trainers.component.css']
})
export class ExternalTrainersComponent implements OnInit {
  TrainerList: any[] = [];
  createdBy: number;
  Operation: string;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private commonService: CommonService,
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
    this.getAllExternalTrainer();
  }

  createForm(){
    this.Operation = 'add';  
    this.saveForm = this.fb.group({
      InductorName:['', Validators.required],
      InductorEmail:['', Validators.required],
      InductorId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  getAllExternalTrainer(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.commonService.getAllExternalTrainer(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.TrainerList = response;                           
      }
      else{
        this.TrainerList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  onSubmit(){
    this.spinnerService.show();    
    this.commonService.addExternalTrainers(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllExternalTrainer();  
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
      InductorName: RowData.inductorName,
      InductorEmail: RowData.inductorEmail,
      InductorId: RowData.inductorId,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });
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
