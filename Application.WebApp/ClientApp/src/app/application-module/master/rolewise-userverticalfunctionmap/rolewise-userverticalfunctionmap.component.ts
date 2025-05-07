import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { table } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISearchFunction } from 'src/app/interfaces/common/function.interface';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-rolewise-userverticalfunctionmap',
  templateUrl: './rolewise-userverticalfunctionmap.component.html',
  styleUrls: ['./rolewise-userverticalfunctionmap.component.css']
})
export class RolewiseUserverticalfunctionmapComponent implements OnInit {
  showUserRoleList: boolean = true;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  searchUserRole = {
    AutoUserId: null,
    isActive: true
  }
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  flag: any = 0;
  objarr: Function;
  createdBy: number;
  RoleList: any = [];
  SelUserRole: number;
  data: any = {};
  trainingInchargeList: any = [];
  verticals: any[] = [];
  functions: any[] = [];
  mapingText: string;
  showheading: boolean = true;
  str: string;
  str1: string;
  arrr: any[] = [];
  showfunction: boolean = true;
  newarray: any[] = [];
  showadd: boolean = true
  isEditMode: boolean = false;
  DataTable: any[] = [];
  objSaveJdAccess: SaveJdAccess;
  constructor(private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private commonService: CommonService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private functionService: FunctionService) {
    this.objSaveJdAccess = new SaveJdAccess();
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchUserRole.AutoUserId = this.createdBy;
    //this.tableOptionDropDown();
  }

  ngOnInit() {
    this.createForm();
    this.getdata();
    this.loadDataTable();
    // this.tableOptionDropDown();
    this.getAllUserRole();
    this.getAllVerticals();
    this.getAllFunction();
    this.objarr = new Function();
  }
  tableOptionDropDown() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
        body_.append(dropdownMenu.detach());
        var eOffset = jQuery(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + jQuery(e.target).outerHeight(),
          'left': eOffset.left,
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });
    });
  }
  createForm() {
    this.saveForm = this.fb.group({
      RoleMapId: [0],
      roleId: [null, Validators.required],
      AutoUserId: [null, Validators.required],
      verticalId: [null, Validators.required],
      functionId: [null, Validators.required],
      CreatedBy: this.createdBy,
      IsActive: [true]
    });
  }
  getAllUserRole() {
    this.spinnerService.show();
    this.commonService.getAllUserRole(this.searchUserRole).subscribe((response: any) => {
      if (response.length != 0) {
        this.RoleList = response.filter(e => e.roleName != "Administrator");
        //console.log("Role List: ", this.RoleList);
        this.spinnerService.hide();
      }
      else {
        this.RoleList = [];
        this.spinnerService.hide();
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.spinnerService.hide();
    })
  }

  onClickAddNew() {
    this.flag = 0;
    this.showheading = false;
    this.showadd = false;
    this.showUserRoleList = false;
    this.mapingText = "Add JD Access "
    // this.createForm();
    this.objSaveJdAccess = new SaveJdAccess();
    this.isEditMode = false;
    jQuery(".custom-menu").hide();
  }
  onBackClick() {
    this.saveForm.reset();
    this.showheading = true;
    this.showadd = true;
    this.showUserRoleList = true;
    this.getdata();
    jQuery(".custom-menu").hide();
  }
  onSubmit() {
    if ((this.SelUserRole == 2) || (this.SelUserRole == 3) || (this.SelUserRole == 4) || (this.SelUserRole == 5)) {
      // let record = {
      //   RoleMapId: this.saveForm.value.RoleMapId,
      //   RoleId: this.saveForm.value.roleId,
      //   AutoUserId: this.str1,
      //   VerticalId: this.str,        
      //   UserWiseRoleVerticalFunctionDetails: [],
      //   CreatedBy: this.createdBy,
      //   IsActive: this.saveForm.value.IsActive
      // }
      let record = {
        RoleMapId: this.objSaveJdAccess.RoleMapId,
        RoleId: this.objSaveJdAccess.RoleId,
        AutoUserId: this.str1,
        VerticalId: this.str,
        UserWiseRoleVerticalFunctionDetails: [],
        CreatedBy: this.createdBy,
        IsActive: this.objSaveJdAccess.IsActive
      }
      this.spinnerService.show();
      this.commonService.addInsertUpdateRoleWiseUsrVertFunc(record).subscribe((response: any) => {
        if (response.successFlag == 1) {          
          this.notiService.showSuccess(response.msg, "Success");
          this.createForm();
          jQuery(".close").click();
          jQuery(".custom-menu").hide();
          this.isEditMode = false;
        }
        else if (response.successFlag == 2) {          
          this.notiService.showError(response.msg, "Success");
          this.createForm();
          jQuery(".close").click();
          jQuery(".custom-menu").hide();
          this.isEditMode = false;
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
        this.showheading = true
        this.showadd = true;
        this.getdata();
        this.showUserRoleList = true
        this.spinnerService.hide();
        this.isEditMode = false;
      })
    }
    else {
      // let record = {
      //   RoleMapId: this.saveForm.value.RoleMapId,
      //   RoleId: this.saveForm.value.roleId,
      //   AutoUserId: this.str1,
      //   VerticalId: this.str,        
      //   UserWiseRoleVerticalFunctionDetails: this.arrr,
      //   CreatedBy: this.createdBy,
      //   IsActive: this.saveForm.value.IsActive
      // }
      let record = {
        RoleMapId: this.objSaveJdAccess.RoleMapId,
        RoleId: this.objSaveJdAccess.RoleId,
        AutoUserId: this.str1,
        VerticalId: this.str,
        UserWiseRoleVerticalFunctionDetails: this.arrr,
        CreatedBy: this.createdBy,
        IsActive: this.objSaveJdAccess.IsActive
      }
      this.spinnerService.show();
      this.commonService.addInsertUpdateRoleWiseUsrVertFunc(record).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.createForm();
          jQuery(".close").click();
          jQuery(".custom-menu").hide();
          this.isEditMode = false;
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
        this.showheading = true
        this.showadd = true;
        this.getdata();
        this.showUserRoleList = true
        this.spinnerService.hide();
        jQuery(".custom-menu").hide();
        this.isEditMode = false;
      })
    }
  }

  onChangeUserRole(roleId: any) {
    this.SelUserRole = roleId;
    this.data = {
      'RoleId': this.SelUserRole
    }
    this.getRoleWiseUser(this.data);
    if ((this.SelUserRole == 2) || (this.SelUserRole == 3) || (this.SelUserRole == 4) || (this.SelUserRole == 5)) {
      this.showfunction = false;
    }
    else {
      this.showfunction = true;
    }
    if (this.flag != 1) {
      this.saveForm.patchValue({
        AutoUserId: [null],
      })
    }

  }
  getRoleWiseUser(data: any) {
    this.spinnerService.show();
    this.commonService.getRoleWiseUser(data).subscribe((response: any) => {
      if (response) {
        this.trainingInchargeList = response;
      }
      else {
        this.trainingInchargeList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        //"searching": true,
        //"paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
  onChangeUser() {
    //this.str1 = this.saveForm.value.AutoUserId.toString();    
    this.str1 = this.objSaveJdAccess.AutoUserId.toString();
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  }

  changeVertical(rec: any) {

    if (rec.length > 1) {
      for (let i = 0; i < rec.length; i++) {
        this.newarray = this.newarray.concat(this.functions.filter(e => rec[i] == e.verticalId))
      }
    }
    else {
      this.newarray = this.functions.filter(e => rec[0] == e.verticalId);
    }
    // this.str = this.saveForm.value.verticalId.toString();
    // this.saveForm.value.verticalId = this.str;
    this.str = this.objSaveJdAccess.VerticalId.toString();
  }

  changeFunction(record: any) {
    this.arrr = [];
    for (let i = 0; i < record.length; i++) {
      this.objarr = new Function();
      // this.objarr.VerticalId = record[i].verticalId;
      // this.objarr.FunctionId = record[i].functionId;
      var verticalIdObj = this.newarray.find(e => e.functionId == record[i]);
      if (verticalIdObj != undefined) {
        this.objarr.VerticalId = verticalIdObj.verticalId;
      }
      this.objarr.FunctionId = record[i];
      this.arrr.push(this.objarr);
    }
  }

  getdata() {
    let rec = {
      IsActive: null
    }
    this.spinnerService.show();
    this.commonService.getuserrolefunction(rec).subscribe((response: any) => {
      if (response) {
        this.DataTable = response;
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
  getAllFunction() {
    this.functions = [];
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;        
      }
    })
  }
  onEdit(RowData: any) {
    jQuery(".custom-menu").hide();
    this.isEditMode = true;
    this.flag = 1;
    this.mapingText = "Edit JD Access "
    this.showadd = false;
    this.showheading = false
    this.showfunction = true;
    var varr = RowData.verticalId.split(',');
    var arr = [];
    for (var i = 0; i < varr.length; i++) {
      arr.push(parseInt(varr[i]));
    }
    var varr1 = RowData.autoUserId.split(',');
    var arr1 = [];
    for (var i = 0; i < varr1.length; i++) {
      arr1.push(parseInt(varr1[i]));
    }
    this.showUserRoleList = false;
    this.onChangeUserRole(RowData.roleId);//Piu    
    this.getAllFunctionForEdit(arr);
    this.saveForm.value.verticalId = arr;
    var func = RowData.functionId.split(',');
    var arr2 = [];
    for (var i = 0; i < func.length; i++) {
      var verticalIdObj = this.newarray.find(e => e.functionId == func[i].toString());
      this.objarr = new Function();
      if (verticalIdObj != undefined) {
        this.objarr.VerticalId = verticalIdObj.verticalId;
      }
      this.objarr.FunctionId = i;
      this.arrr.push(this.objarr);
      arr2.push(parseInt(func[i]));
    }
    // this.saveForm.patchValue({
    //   RoleMapId: RowData.roleMapId,
    //   roleId: RowData.roleId,
    //   AutoUserId: arr1,
    //   verticalId: arr,
    //   functionId: arr2,
    //   IsActive: RowData.isActive,
    //   CreatedBy: RowData.createdBy
    // });

    this.objSaveJdAccess.RoleMapId = RowData.roleMapId;
    this.objSaveJdAccess.RoleId = RowData.roleId;
    this.objSaveJdAccess.AutoUserId = arr1;
    this.objSaveJdAccess.VerticalId = arr;
    this.objSaveJdAccess.FunctionId = arr2;
    this.objSaveJdAccess.IsActive = RowData.isActive;
    this.objSaveJdAccess.CreatedBy = RowData.createdBy;
  }
  getAllFunctionForEdit(arr: any) {
    this.functions = [];
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;        
        this.changeVertical(arr);
      }
    })
  }
}
class Function {
  VerticalId: number;
  FunctionId: number;
}


class SaveJdAccess {
  RoleMapId: number = 0;
  RoleId: number;
  AutoUserId: any[] = [];
  VerticalId: any[] = [];
  FunctionId: any[] = [];
  UserWiseRoleVerticalFunctionDetails: any[] = [];
  CreatedBy: number;
  IsActive: boolean = true;
}

