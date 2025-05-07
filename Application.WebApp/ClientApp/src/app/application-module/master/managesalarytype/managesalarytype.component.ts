
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/common/course/course.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { SalarytypenewService } from '../../../services/common/salarytypenew/salarytypenew.service';
import { element } from 'protractor';
import { ISalaryType, ISearchSalaryType } from '../../../interfaces/common/paystructure.interface';

declare var jQuery: any;

@Component({
  selector: 'app-managesalarytype',
  templateUrl: './managesalarytype.component.html',
  styleUrls: ['./managesalarytype.component.css']
})

export class ManagesalarytypeComponent implements OnInit {


  SalaryTypeList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private salarytypenewService: SalarytypenewService,
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

    this.getAllSalaryType();
   // this.getAllVisualOrder();
  }

  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      SalaryTypeName: ['', Validators.required],
      SalaryTypeId: [0],
      VisualOrder: null,
      Order: null,
      IsActive: [true]
    })
    this.ddlSalaryTypeList;
  }
  //Visual Order
  visualOrders: ISalaryType[] = [];
  SearchVisualOrder: ISalaryType =
    {
      salaryTypeId: null,
      salaryTypeName:null,
      visualOrder: null,
      order: null,
      salaryType: null,
      createdBy: null,
      isActive:null
  }

  //departments
  //getAllVisualOrder() {
  //  this.visualOrders = [];
  //  this.departmentService.getAllFunctionDepartment(this.SearchDepartmentId).subscribe((result) => {
  //    if (result) {
  //      console.log("VisualOrder", result);
  //      this.visualOrders = result;
  //    }
  //  }, error => {
  //    console.log(error);
  //  }, () => {
  //    //this.loadSelectPicker();
  //  });
  //}
  onSubmit() {
    this.spinnerService.show();
    //var payLoad = {
    //  SalaryTypeName: this.saveForm.value.SalaryTypeName,
    //  SalaryTypeId: this.saveForm.value.SalaryTypeId,
    //  VisualOrder: this.saveForm.value.VisualOrder.$ngOptionLabel,
    //  Order: this.saveForm.value.Order.$ngOptionLabel,
    //  IsActive: true
    //}
    this.salarytypenewService.addSalaryType(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllSalaryType();
        jQuery(".close").click();
      }
      else {
        this.spinnerService.hide();
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      // display form values on success
        this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  changeVisualOrderType() {

  }
  changeOrderType() {

  }
  onEdit(Data: any) {
    this.Operation = 'edit';
    this.saveForm.patchValue({
      SalaryTypeName: Data.salaryTypeName,
      SalaryTypeId: Data.salaryTypeId,
      VisualOrder: Data.visualOrder,
      Order:Data.order,
      IsActive: Data.isActive,
      //CreatedBy: Data.createdBy
    });
  }
  ddlSalaryTypeList: any[] = [];
  getAllSalaryType() {
    this.spinnerService.show();
    //this.saveForm.value.IsActive = null;
    var payLoad = {
      /*salaryTypeId: this.saveForm.value.SalaryTypeId*/
      salaryTypeId: null,
      isActive:null
    }
    this.salarytypenewService.getAllSalaryTypeList(payLoad).subscribe((response: any) => {
      console.log("salaryTypeNew", response);
      if (response) {
        /*this.ddlSalaryTypeList = response;*/
        /*this.ddlSalaryTypeList.push({ VisualOrder:''})*/
        this.SalaryTypeList = response;
      }
      else {
        this.SalaryTypeList = [];
        this.spinnerService.hide();
      }
    }, error => {
      // display form values on success
        this.spinnerService.hide();
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
