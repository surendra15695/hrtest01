import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StreamService } from 'src/app/services/common/stream/stream.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managestream',
  templateUrl: './managestream.component.html',
  styleUrls: ['./managestream.component.css']
})

export class ManagestreamComponent implements OnInit {

  StreamList: any[] = [];
  createdBy: number;
  Operation: string;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private streamService: StreamService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.createForm();
    this.loadDataTable();

    this.getAllStream();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      StreamName:['', Validators.required],
      StreamId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.streamService.addStream(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllStream(); 
        jQuery(".close").click();         
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(Data: any){ 
    this.Operation = 'edit';   
    this.saveForm.patchValue({
      StreamName: Data.streamName,
      StreamId: Data.streamId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy  
    });
  }

  getAllStream(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.streamService.getAllStreamList(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.StreamList = response;                            
      }
      else{
        this.StreamList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    },() => {
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
