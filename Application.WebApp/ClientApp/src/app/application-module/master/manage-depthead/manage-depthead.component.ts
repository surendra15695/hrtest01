import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { DepartmentService } from 'src/app/services/common/department/department.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-depthead',
  templateUrl: './manage-depthead.component.html',
  styleUrls: ['./manage-depthead.component.css']
})

export class ManageDeptheadComponent implements OnInit {

  VerticalList: any[] = [];
  FunctionList: any[] = [];
  DeptList: any[] = [];
  DeptHeadList: any[] = [];
  createdBy: number;
  SelVerticalID: number;
  SelFunctionID: number;
  DataTable: any[] = [];
  UserRoleList: any[] = [];
  Data: any = {
    "RoleId": 15
  };
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  // Added by ANif on 07-07-2022
  independentFunction: any[] = [];

  constructor(
    private deptService: DepartmentService,
    private verticalService: VerticalService,
    private functionService: FunctionService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm();
    this.getAllIndependentFunction();
    //this.GetAllVerticalFunctionDepartmentHead();
    this.getAllVertical();
    this.getRoleWiseUser();
  }

  createForm() {
    this.saveForm = this.fb.group({
      AutoId: [0],
      VerticalId: [null, Validators.required],
      FunctionId: [null, Validators.required],
      // DepartmentId:[null, Validators.required],
      ApproverautoUserId: [null, Validators.required],
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }
  getAllIndependentFunction() {
    let data = {
      "VerticalId": null,
      "IsActive": true
    }
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.independentFunction = response;
        //console.log("Independent function: ", this.independentFunction);
        this.GetAllVerticalFunctionDepartmentHead();
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
  GetAllVerticalFunctionDepartmentHead() {
    this.spinnerService.show();
    this.functionService.getAllFunctionDepartmentHead(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.DataTable = response;
        //  console.log("Data Table: ", this.DataTable);
      }
      else {
        this.DataTable = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  onSubmit() {
    this.spinnerService.show();
    this.functionService.addVerFunDeptHead(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.GetAllVerticalFunctionDepartmentHead();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
      jQuery("#myModal").modal("hide");
    })
  }

  onEdit(RowData: any) {
    this.saveForm.patchValue({
      AutoId: RowData.autoId,
      VerticalId: RowData.verticalId,
      FunctionId: RowData.functionId,
      DepartmentId: RowData.departmentId,
      ApproverautoUserId: RowData.approverautoUserId,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });

    this.onChangeVertical(RowData.verticalId);
    this.onChangeFunction(RowData.functionId);
  }

  getAllVertical() {
    this.saveForm.value.IsActive = true;
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        //console.log("VerticalList: ", response);                
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangeVertical(VerticalID: any) {

    this.SelVerticalID = VerticalID;
    let vData: any = {
      "VerticalId": VerticalID,
      "IsActive": true
    }

    this.getAllVerticalFunction(vData);
  }

  getAllVerticalFunction(vData: any) {
    this.functionService.getAllVerticalFunction(vData).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        // console.log("Vertical Function List: ", this.FunctionList);
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangeFunction(FunctionID: any) {
    this.SelFunctionID = FunctionID;
    let vfunData: any = {
      "FunctionId": FunctionID,
      "VerticalId": this.SelVerticalID,
      "IsActive": true
    }

    this.getAllFunctionDept(vfunData);
  }

  getAllFunctionDept(vfunData: any) {
    this.deptService.getAllFunctionDepartment(vfunData).subscribe((response: any) => {
      if (response) {
        this.DeptList = response;
       // console.log("Vertical Function Dept List: ", this.DeptList);
      }
      else {
        this.DeptList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  // onChangeDepartment(DeptID: any){    
  //   let vFunDeptData: any = {
  //     "VerticalId": this.SelVerticalID,
  //     "FunctionId": this.SelFunctionID,
  //     "DepartmentId": DeptID,
  //     "IsActive": true
  //   }

  //   this.getAllFunctionDeptHead(vFunDeptData);
  // }

  // getAllFunctionDeptHead(vFunDeptData: any){    
  //   this.functionService.getAllFunctionDepartmentHead(vFunDeptData).subscribe((response: any) => {            
  //     if(response){
  //       this.DeptHeadList = response;
  //       console.log("Function Dept Head List: ", this.DeptHeadList);                             
  //     }
  //     else{
  //       this.DeptHeadList = [];        
  //     }      
  //   }, error => {      
  //     this.notiService.showError("Something went wrong.. Try again later..", "")
  //     console.log(error);      
  //   })
  // }

  getRoleWiseUser() {
    this.commonService.getRoleWiseUser(this.Data).subscribe((response: any) => {
      if (response) {
        this.UserRoleList = response;
        //console.log("User Role List: ", this.UserRoleList);                            
      }
      else {
        this.UserRoleList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
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
  getVerticalName(verticalId) {
    switch (verticalId) {
      case 1:
        return "Corporate";
        break;
      case 2:
        return "Plant";
        break;
      case 3:
        return "Sales & Marketing";
        break;
    }
  }
  getFunctionName(functionId) {
    var functionObj = this.independentFunction.find(x => x.functionId == functionId);
    return functionObj.functionName;
  }
}
