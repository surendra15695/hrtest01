import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managequalification',
  templateUrl: './managequalification.component.html',
  styleUrls: ['./managequalification.component.css']
})
export class ManagequalificationComponent implements OnInit {

  QualificationList: any[] = [];
  createdBy: number;
  Operation: string;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private qualificationService: QualificationService,
    private spinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.createForm();
    this.loadDataTable();

    this.getAllQualification();
  }

  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      QualificationName: ['', Validators.required],
      QualificationId: [0],
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }

  onSubmit() {
    this.spinnerService.show();
    this.qualificationService.addQualification(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllQualification();   
        jQuery(".close").click();       
      }
      else {
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(Data: any) {
    this.Operation = 'edit';
    this.saveForm.patchValue({
      QualificationName: Data.qualificationName,
      QualificationId: Data.qualificationId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }

  getAllQualification() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.qualificationService.getAllQualificationAllType(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.QualificationList = response;                
      }
      else {
        this.QualificationList = [];        
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
