import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from 'src/app/services/common/position/position.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manageposition',
  templateUrl: './manageposition.component.html',
  styleUrls: ['./manageposition.component.css']
})

export class ManagepositionComponent implements OnInit {

  PositionList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private positionService: PositionService,
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

    this.getAllPositionMaster();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      PositionName:['', Validators.required],
      PositionId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){      
    this.spinnerService.show();    
    this.positionService.addPosition(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllPositionMaster();   
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
      PositionName: RowData.positionName,
      PositionId: RowData.positionId,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });
  }

  getAllPositionMaster(){
    this.spinnerService.show();
    this.saveForm.value.isActive = null;
    this.positionService.getAllPositionMaster(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.PositionList = response; 
        //console.log("Position List: ", this.PositionList);                            
      }
      else{
        this.PositionList = [];        
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
