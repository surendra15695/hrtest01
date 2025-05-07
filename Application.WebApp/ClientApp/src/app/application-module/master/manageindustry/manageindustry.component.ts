import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IndustryService } from 'src/app/services/common/industry/industry.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manageindustry',
  templateUrl: './manageindustry.component.html',
  styleUrls: ['./manageindustry.component.css']
})

export class ManageindustryComponent implements OnInit {

  IndustryList: any[] = [];
  createdBy: number;
  Operation: string;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private industryService: IndustryService,
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

    this.getAllIndustry();
  }

  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      IndustryName: ['', Validators.required],
      IndustryId: [0],
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }

  onSubmit() {
    this.spinnerService.show();
    this.industryService.addIndustry(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllIndustry();  
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
      IndustryName: Data.industryName,
      IndustryId: Data.industryId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }

  getAllIndustry() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.industryService.getAllIndustry(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.IndustryList = response; 
        console.log("Industry: ", this.IndustryList);               
      }
      else {
        this.IndustryList = [];        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "");
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
