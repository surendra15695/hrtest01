import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/common/user/user.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-managedoctor',
  templateUrl: './managedoctor.component.html',
  styleUrls: ['./managedoctor.component.css']
})
export class ManagedoctorComponent implements OnInit {
  doctorList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  showUserIdPassword: boolean;

  constructor(
    private userService: UserService,
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
    
    this.getAllDoctors();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      DoctorsName:['', Validators.required],
      DoctorsId: [0],
      EmailId: ['', Validators.required],
      //Password:['', Validators.required],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
    this.showUserIdPassword = true;
  }

  onSubmit(){    
    this.spinnerService.show();
    this.userService.addDoctorList(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllDoctors();  
        jQuery(".close").click();
        this.showUserIdPassword = true;
        jQuery(".custom-menu").hide();
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
      DoctorsName: Data.doctorsName,
      DoctorsId: Data.doctorsId,
      Email: Data.emailId,
      //Password:'123456',
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
    this.showUserIdPassword = true;
    jQuery(".custom-menu").hide();
  }

  getAllDoctors(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.userService.getallDoctorList(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.doctorList = response;      
        console.log(this.doctorList);
      }
      else{
        this.doctorList = [];        
      }      
    }, error => {
      // display form values on success
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
