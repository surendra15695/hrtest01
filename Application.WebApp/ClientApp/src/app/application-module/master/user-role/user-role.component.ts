import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { ISearchFunction, IVerticalFunction } from 'src/app/interfaces/common/function.interface';

declare var jQuery: any;

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})

export class UserRoleComponent implements OnInit {
  verticalId: any;
  searchForm: FormGroup;
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction =
    {
      verticalId: null,
      functionId: null,
      isActive: true
    };
  functionId: number;
  functionName: string;
  UserList: any[] = [];
  RoleList: any[] = [];
  SelectedUserRole: any[] = [];
  createdBy: number;
  mapingText: string = "";
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  //Anif
  showUserRoleList: boolean = true;
  userWiseRole: any[] = [];
  FunctionList: any[] = [];
  roleIds: string;
  roleArr: any[] = [];
  isPlantHR: boolean = false;
  RoleListForFilter: any[] = [];
  SelectedUserRoleActual: any[] = [];
  constructor(
    private userService: UserService,
    private functionService: FunctionService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.roleIds = this.persistance.get('loggedinuser').roleIds;
    this.checkPlantHr()
  }

  ngOnInit() {
    this.createForm();
    this.createSearchForm();
    this.getAllUser();
    this.loadDataTable();
    this.tableOptionDropDown();
    this.getAllVerticals();
    this.getAllRoleWiseUser();
    this.getAllFunction()
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
  checkPlantHr() {
    this.roleArr = this.roleIds.split(",");
    var roleArrNumber = [];
    this.roleArr.forEach(element => {
      roleArrNumber.push(Number(element))
    })
    var isAdmin = roleArrNumber.includes(1);
    var isPlantHr = roleArrNumber.includes(35);
    if (isPlantHr == true && isAdmin == false) {
      this.isPlantHR = true;
    }
  }
  getAllRoleWiseUser() {
    this.spinnerService.show();
    //this.userService.getAllUserWiseRole(this.searchForm.value).subscribe((response: any) => {
    this.userService.getAllUserWiseRoleWithAutoUserId(this.searchForm.value).subscribe((response: any) => {
      if (response) {
        this.userWiseRole = response;
      }
      else {
        this.userWiseRole = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  createForm() {
    this.saveForm = this.fb.group({
      AutoUserId: [null, Validators.required],
      RoleId: [null, Validators.required],
      CreatedBy: this.createdBy,
      functionId: [0]
    });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      verticalId: [1],
      autoUserId: this.createdBy,
      functionId: [0],
    });
  }
  onClickAddNew() {
    this.mapingText = "Add Maping";
    this.SelectedUserRole = [];
    this.RoleList = [];
    this.showUserRoleList = false;
    this.createForm();
    jQuery(".custom-menu").hide();
  }
  onBackClick() {
    this.spinnerService.show();
    this.showUserRoleList = true;
    this.getAllVerticals();
    this.getAllRoleWiseUser();
    this.tableOptionDropDown();
    jQuery(".custom-menu").hide();

  }

  getAllVerticals() {
    this.verticals = [];
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
    this.loadSelectPicker();
    this.setDefaultVertical();
  }
  changeVertical() {
    var verticalId = this.searchForm.get("verticalId").value;
    this.searchForm.patchValue({
      verticalId: verticalId
    })

    this.verticalId = verticalId;
    this.getAllFunction();
  }
  // getAllVerticalFunction(vData: any) {
  //   this.getAllFunction();
  //   this.functionService.getAllVerticalFunction(vData).subscribe((response: any) => {
  //     if (response) {
  //       this.FunctionList = response;
  //       //console.log("Vertical Function List: ", this.FunctionList);                             
  //     }
  //     else {
  //       this.FunctionList = [];
  //     }
  //   }, error => {
  //     this.notiService.showError("Something went wrong.. Try again later..", "")
  //     console.log(error);
  //   })
  // }

  getAllFunction() {
    this.functions = [];
    if (this.selectedVertical != undefined) {
      this.searchFunction.verticalId = this.verticalId;
    }
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
    this.getAllVerticals()
  }
  //arg

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
  getAllUser() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = true;
    let searchObj = {
      UserId: "",
      UserName: "",
      RoleId: null,
      IsActive: true,
      AutoUserId: this.createdBy
    }
    //this.userService.getAllUser(this.saveForm.value).subscribe((response: any) => {
    this.userService.getLocationwiseAllUser(searchObj).subscribe((response: any) => {
      if (response.length != 0) {
        this.UserList = response;
      }
      else {
        this.UserList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  filter() {
    this.getAllRoleWiseUser();
  }

  reset() {
    this.searchForm.reset();
    this.searchForm.patchValue({
      verticalId: null
    });
    this.getAllRoleWiseUser();
  }

  onChnageUser(userAutoID: number) {
    this.SelectedUserRole = [];
    let data: any = {
      'AutoUserId': userAutoID,
      'IsActive': true
    }
    // alert(userAutoID)
    let userData: any = this.UserList.find(m => m.autoUserId == userAutoID);
    let strRoleIDs: any[] = userData.roleIds.split(',');
    let arrRole: any[] = [];
    if (strRoleIDs.length != 0) {
      for (let val of strRoleIDs) {
        arrRole.push(+val);
      }
      this.SelectedUserRoleActual = arrRole;
      if (this.isPlantHR) {
        this.SelectedUserRole = arrRole.filter(e => e == 51 || e == 60 || e == 61 || e == 63);
      } else {

        this.SelectedUserRole = arrRole;
      }

    }

    this.getAllUserRole(data);
  }
  onSubmit() {
    let selRoleIDs: any[] = this.saveForm.value.RoleId;
    let strRoleID: string = '';
    if (this.isPlantHR) {  // For Plant HR
      var roleIdWithoutPlantHRAccess = [];
      this.SelectedUserRoleActual.forEach(element => {
        if (element != 51 && element != 60 && element != 61 && element != 63) {
          roleIdWithoutPlantHRAccess.push(element);
        }
      })
      if (selRoleIDs.length > 0) {
        selRoleIDs.forEach(ele => {
          roleIdWithoutPlantHRAccess.push(ele);
        })
      }
      roleIdWithoutPlantHRAccess.forEach(final_element => {
        strRoleID += strRoleID == '' ? final_element.toString() : "," + final_element.toString();
      })
    } else {  // For Admin
      let count: number = 0;
      if (selRoleIDs.length != 0) {
        for (let val of selRoleIDs) {
          if (count == 0) {
            strRoleID = val.toString();
          }
          else {
            strRoleID = strRoleID + ',' + val.toString();
          }

          count = count + 1;
        }
      }
    }

    //  this.spinnerService.show();
    this.saveForm.value.RoleId = strRoleID;
    this.commonService.addUserRole(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.SelectedUserRole = [];
        this.createForm();
        this.getAllUser();
        this.getAllVerticals();
        this.getAllRoleWiseUser();
        jQuery(".custom-menu").hide();
        this.showUserRoleList = true;
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  setDefaultVertical() {
    setTimeout(() => {
      jQuery('.ddlvertical').selectpicker("val", "0: " + this.selectedVertical.verticalId + "");
      jQuery('.ddlvertical').selectpicker("refresh");
    });
  }
  onClickEdit(data: any) {
    this.mapingText = "Edit Maping";
    this.showUserRoleList = false;
    this.onChnageUser(data.autoUserId);

    this.saveForm.patchValue({
      AutoUserId: data.autoUserId,
    });
    jQuery(".custom-menu").hide();

  }
  getAllUserRole(data: any) {
    this.commonService.getAllUserRole(data).subscribe((response: any) => {
      if (response.length != 0) {
        this.RoleList = response;
        this.RoleListForFilter = response;
        if (this.isPlantHR) {
          this.RoleList = this.RoleListForFilter.filter(e => e.roleId == 51 || e.roleId == 60 || e.roleId == 61 || e.roleId == 63);
        } else {
          this.RoleList = this.RoleListForFilter;
        }
      }
      else {
        this.RoleList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
}
