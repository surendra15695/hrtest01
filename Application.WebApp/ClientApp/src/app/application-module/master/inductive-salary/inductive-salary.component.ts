import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/services/common/salary/salary.service';
import { ISalary,ISearchSalary } from 'src/app/interfaces/common/salary.interface'; 
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-inductive-salary',
  templateUrl: './inductive-salary.component.html',
  styleUrls: ['./inductive-salary.component.css']
})
export class InductiveSalaryComponent implements OnInit {

  constructor(private salaryService:SalaryService,
    private fb: FormBuilder,
    private notiService: NotificationService,
    private spinnerService: NgxSpinnerService,
    private persistance: PersistanceService) {
      this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    }
  salaries:ISalary[]=[];
  Operation: string;
  saveForm: FormGroup;
  createdBy: number;
  searchSalary:ISearchSalary={
    salaryId:0,
    isActive:null
  }
  ngOnInit() {
    this.getAllSalary();
    this.createForm();
    this.loadDataTable();
  }
  getAllSalary(){
    this.salaries=[];
    this.salaryService.getAllSalary(this.searchSalary).subscribe((result) => {
      if (result) {
        console.log("Natok",result);
        this.salaries = result;
        if(this.salaries.length==0){
          this.getAllSalary();
        }
      }
      else {
        this.salaries = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    });
  }
  createForm()
  {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      SalaryName: ['', Validators.required],
      SalaryId:[0],
      FromSalary: ['', Validators.required],
      ToSalary: ['', Validators.required],
      IsActive: [true],
      CreatedBy: [this.createdBy]
    })
  }
  onEdit(Data: any)
  {
    this.Operation = 'edit';
    this.saveForm.patchValue({
      SalaryId: Data.salaryId,
      SalaryName: Data.salaryName,
      FromSalary: Data.fromSalary,
      ToSalary: Data.toSalary,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
    jQuery(".custom-menu").hide();
  }
  onSubmit()
  {
    var v=0;
    if(this.saveForm.value.ToSalary<this.saveForm.value.FromSalary)
    {
      this.notiService.showError("From Salary cannot be greater than ToSalary ", "Error");
      // v=1;
      v=1;
    }
    if(v==0)
    {

    
    // this.spinnerService.show();
    console.log("chck",this.saveForm.value)
    this.salaryService.InsertUpdateSalary(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {  
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllSalary();
        jQuery(".close").click();
        jQuery(".custom-menu").hide();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.spinnerService.hide();
      jQuery(".custom-menu").hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
    }
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
// sayandeep
