import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { ISearchFunction } from 'src/app/interfaces/common/function.interface';
import { IGrade, ISearchGrade } from '../../../interfaces/common/grade.interface';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { element } from 'protractor';
import { ILocation, IsearchVerticalLocation } from 'src/app/interfaces/common/location.interface';
import { LocationService } from 'src/app/services/common/location/location.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-edms-access',
  templateUrl: './manage-edms-access.component.html',
  styleUrls: ['./manage-edms-access.component.css']
})
export class ManageEdmsAccessComponent implements OnInit {

  searchForm: FormGroup;
  saveForm: FormGroup;
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  createdBy: number;
  userListCanAccessEDMS: any[] = [];
  addEDMSUsersAccess = {
    UserWiseEDMSAccess: [],
    CreatedBy: null
  }
  //Role List
  AllRoleList: any[] = [];
  RoleList: any[] = [];
  searchUserRole = {
    AutoUserId: null,
    isActive: true
  }
  // User List
  roleWiseUserList: any[] = [];
  // Function List
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functions: any[] = [];
  filteredFunctionList: any[] = [];
  // Grade List
  //grade
  gradeList: IGrade[] = [];
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }
   arr :any[] = [];
   arr2:any[] = [];
  searchLocation: IsearchVerticalLocation =
    {
      locationId: null,
      verticalIds: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
    locations: any[] = [];
  objSearchEDMSAccess: SearchEDMSAccess;
  isEditMode: boolean = false;
  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private functionService: FunctionService,
    private gradeService: GradeService,
    private locationService: LocationService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchUserRole.AutoUserId = this.createdBy;
    this.objSearchEDMSAccess = new SearchEDMSAccess();
  }


  ngOnInit() {
    this.createSearchForm();
    this.createSaveForm();
    this.getAllVerticals();
    this.getAllUserRole();
    this.getAllGrade();
    this.getAllFunction();
    // this.getAllLocation();
    this.getAllUserCanAccessEDMS();
    this.loadDataTable();
    this.tableOptionDropDown();
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  }
  getAllUserRole() {
    this.spinnerService.show();
    this.commonService.getAllUserRole(this.searchUserRole).subscribe((response: any) => {
      if (response.length != 0) {
        this.AllRoleList = response;
        this.RoleList = this.RoleList.concat(this.AllRoleList.filter(e => e.roleId == 70))
        //console.log("Role List: ", this.AllRoleList);
        //this.RoleList = this.RoleList.concat(this.AllRoleList.filter(e => e.roleId == 41 || e.roleId == 42 || e.roleId == 43 || e.roleId == 35 || e.roleId == 56 || e.roleId == 57 || e.roleId == 58 || e.roleId == 59 || e.roleId == 60))
        // console.log("Filtered Role List", this.RoleList);
        this.spinnerService.hide();
      }
      else {
        this.AllRoleList = [];
        this.spinnerService.hide();
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.spinnerService.hide();
    })
  }
  onChangeUserRole(roleId: any) {
    this.saveForm.patchValue({
      AutoUserId: null
    })
    let userRoleObj = {
      'RoleId': roleId
    }
    this.getRoleWiseUser(userRoleObj);
  }
  getRoleWiseUser(data: any) {
    this.spinnerService.show();
    this.commonService.getRoleWiseUser(data).subscribe((response: any) => {
      if (response) {
        this.roleWiseUserList = response;
        //console.log("user", this.roleWiseUserList)
      }
      else {
        this.roleWiseUserList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  changeVertical(rec: any) {
    if (rec.length > 1) {
      let c = ((rec.length) - 1)
      this.filteredFunctionList = this.filteredFunctionList.concat(this.functions.filter(e => rec[c] == e.verticalId))
    }
    else {
      this.saveForm.patchValue({
        FunctionId: null,
        locationId:null
      })
      this.filteredFunctionList = this.functions.filter(e => rec[0] == e.verticalId)
    }
    // this.getAllLocation();
  }
  changeFunction(rec:any)
  {
    this.getAllLocation();
  }
  getAllLocation() {
    this.locations = [];
    let functions:string="";
    if(this.saveForm.value.FunctionId!=undefined||this.saveForm.value.FunctionId!=null)
    {
      this.saveForm.value.FunctionId.forEach(element => {
        functions += (functions == "" ? element : ("," + element))
      })
    }
    
    let obj = 
    {
      FunctionIds : functions,
      IsActive : true
    }
    this.locationService.getAllFunctionwiseLocation(obj).subscribe((result) => {
      if (result) {
        //console.log("location", result)
        this.locations = result;
        if(this.flag==1)
        {
          var newlocationarray = []
          for(let i=0;i<this.locationArrayForBind.length;i++)
          {
            for(let j=0;j<this.locations.length;j++)
            {
              if(this.locationArrayForBind[i]==this.locations[j].locationId)
              {
                newlocationarray.push(this.locations[j]);
              }
            }
          }
          console.log("newocation",newlocationarray);
          this.saveForm.patchValue({locationId:newlocationarray})
          this.arr2=[];
          this.saveForm.value.locationId.forEach(element=>{
             this.arr2.push({FunctionId:element.functionId,LocationId:element.locationId})
           // }  
         })
          this.flag=0
        }
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "All",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
      else {
        this.locations = [];
        // this.locations.splice(0, 0, {
        //   locationId: 0,
        //   verticalId: 0,
        //   locationNo: "All",
        //   locationCode: "",
        //   locationOffice: "All",
        //   isActive: true,
        //   createdBy: 0
        // })
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
      // this.SpinnerService.hide(); 
    });
  }
  getAllFunction() {
    this.functions = [];
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        // console.log("function list", this.functions)
        // this.newarray=this.functions
      }
    })
  }
  getAllGrade() {
    this.spinnerService.show();
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.gradeList = response;
        //console.log("Grade list", this.gradeList);
      }
      else {
        this.gradeList = [];
      }
    }, error => {
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
  createSearchForm() {
    this.searchForm = this.fb.group({
      verticalId: null,
    });
  }
  createSaveForm() {
    this.saveForm = this.fb.group({
      Id: 0,
      RoleId: [null, Validators.required],
      AutoUserId: [null, Validators.required],
      VerticalId: [null, Validators.required],
      FunctionId: [null, Validators.required],
      locationId: [null, Validators.required],
      GradeId: [null, Validators.required],
      CanAccess: true,
      CreatedBy: this.createdBy
    });
  }
  getAllUserCanAccessEDMS() {
    this.spinnerService.show();
    var verticalIds="";
    if(this.objSearchEDMSAccess.verticalId==(undefined || null)){
      this.objSearchEDMSAccess.verticalId=""

    }
    if(this.objSearchEDMSAccess.verticalId.length >0 && this.objSearchEDMSAccess.verticalId != undefined){
      this.objSearchEDMSAccess.verticalId.sort();
      for(var val of this.objSearchEDMSAccess.verticalId){
        verticalIds += val.toString()+","
      }
    }
    let searchObj = {
      verticalId: this.objSearchEDMSAccess.verticalId == (undefined || null || "") ? "1,2,3" : verticalIds.slice(0,-1)
    }
    this.userService.getAllUserCanAccessEDMS(searchObj).subscribe((response: any) => {
      if (response.length != 0) {
        this.userListCanAccessEDMS = response;
        // console.log("EDMS User List", this.userListCanAccessEDMS);

      }
      else {
        this.userListCanAccessEDMS = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  getVerticalName(verticalIds: any) {
    var varticalIdaArray = verticalIds.split(",");
    var verticalName = "";
    varticalIdaArray.forEach(element => {
      verticalName += (verticalName == "" ? this.verticals.find(e => e.verticalId == element).verticalName : ("," + this.verticals.find(e => e.verticalId == element).verticalName))
    })
    return verticalName;
  }
  getFunctionName(functionIds: any) {
    var functionsArrya = functionIds.split(",");
    var functionName = "";
    functionsArrya.forEach(element => {
      functionName += (functionName == "" ? this.functions.find(e => e.functionId == element).functionName : ("," + this.functions.find(e => e.functionId == element).functionName));
    })
    return functionName;
  }
  getLocationName(locationIds: any)
  {
    var locationArray = locationIds.split(",");
    var locationName = "";
    locationArray.forEach(element => {
      locationName += (locationName == "" ? this.locations.find(e => e.locationId == element).locationOffice : ("," + this.locations.find(e => e.locationId == element).locationOffice));
    })
    return locationName;
  }
  getGradename(gradeIds: any) {
    var gradesArray = gradeIds.split(",");
    var gradeNames = "";
    gradesArray.forEach(element => {
      gradeNames += (gradeNames == "" ? this.gradeList.find(e => e.gradeId == element).gradeName : ("," + this.gradeList.find(e => e.gradeId == element).gradeName));
    })
    return gradeNames;
  }
  filter() {
    this.getAllUserCanAccessEDMS();
  }
  reset() {
    // this.searchForm.reset();
    // this.searchForm.patchValue({
    //   verticalId: [''],
    // })
    this.objSearchEDMSAccess.verticalId = undefined;
    this.getAllUserCanAccessEDMS();
  }
  onClickAddNew() {
    this.isEditMode = false;
    this.createSaveForm();
  }
  changelocation(rec:any){
    console.log("chck",this.saveForm.value.locationId)
     this.arr2=[];
     this.saveForm.value.locationId.forEach(element=>{
        this.arr2.push({FunctionId:element.functionId,LocationId:element.locationId})
      // }  
    })
    console.log("keep try",this.arr2)
  }
  // onClickSubmit() {
  onSubmit() {
    this.arr=[];
    // this.spinnerService.show();
    // Preapare Array
    // this.addEDMSUsersAccess.UserWiseEDMSAccess = [];
    // if (this.userListCanAccessEDMS.length > 0) {
    //   this.userListCanAccessEDMS.forEach(element => {
    //     let obj = {
    //       VerticalId: element.verticalId,
    //       RoleId: element.roleId,
    //       AutoUserId: element.autoUserId,
    //       IsEDMSAccess: element.isEDMSAccess
    //     }
    //     this.addEDMSUsersAccess.UserWiseEDMSAccess.push(obj);
    //   })
    //   this.addEDMSUsersAccess.CreatedBy = this.createdBy
    // }

    // const formData = new FormData();
    // formData.append("CreatedBy", this.createdBy.toString());
    // formData.append("UserWiseEDMSAccess", JSON.stringify(this.addEDMSUsersAccess.UserWiseEDMSAccess));

    
    
    let submitObj = {
      Id: this.saveForm.value.Id,
      RoleId: this.saveForm.value.RoleId,
      AutoUserId: this.saveForm.value.AutoUserId,
      VerticalId: "",
      FunctionId: "",
      // LocationId: "",
      GradeId: "",
      CanAccess: this.saveForm.value.CanAccess,
      VerticalFunctionDetails:[],
      FunctionLocationDetails:[]
    }
    this.saveForm.value.FunctionId.forEach(element => {
      this.filteredFunctionList.forEach(can_ele=>{
        if(can_ele.functionId==element)
        {
          this.arr.push({VerticalId:can_ele.verticalId,FunctionId:can_ele.functionId})
        }
      })
    })
    // this.saveForm.value.locationId.forEach(element => {
    //   this.locations.forEach(can_ele=>{
    //     if(can_ele.locationId==element)
    //     {
    //       this.arr2.push({FunctionId:can_ele.functionId,LocationId:can_ele.locationId})
    //     }
    //   })
    // })
    // this.arr.forEach((ele,index)=>{
    //   this.arr2.forEach((e)=>{
    //     if(e.functionid==ele.functionid)
    //     {
    //       this.arr[index].locationid=e.location
    //     }
    //   })
    // })
    console.log("try",this.arr,this.arr2)
    submitObj.VerticalFunctionDetails=this.arr;
    submitObj.FunctionLocationDetails=this.arr2;
    
    this.saveForm.value.VerticalId.sort();
    this.saveForm.value.VerticalId.forEach(element => {
      submitObj.VerticalId += (submitObj.VerticalId == "" ? element : ("," + element))
    })
    this.saveForm.value.FunctionId.forEach(element => {
      submitObj.FunctionId += (submitObj.FunctionId == "" ? element : ("," + element))
    })
    // this.saveForm.value.locationId.forEach(element => {
    //   submitObj.LocationId += (submitObj.LocationId == "" ? element : ("," + element))
    // })
    this.saveForm.value.GradeId.forEach(element => {
      submitObj.GradeId += (submitObj.GradeId == "" ? element : ("," + element))
    })
    console.log("Save Obj", submitObj);
    this.userService.addEDMSUsersAccess(submitObj).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.getAllUserCanAccessEDMS();
        this.filteredFunctionList = [];
        this.isEditMode = false;
        jQuery('.ddluserrole').attr("disabled", false);
        jQuery('.ddlUser').attr("disabled", false);
        jQuery("#myModal").modal("hide");
        jQuery(".custom-menu").hide();

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
  flag:any=0;
  locationArrayForBind:any[]=[];
  onEdit(data) {
    this.flag=1
    // jQuery('#aaaau').prop("disabled", true);
    // jQuery('#bbbu').prop("disabled", true);
    this.isEditMode = true;
    this.onChangeUserRole(data.roleId);
    // Vertical
    var verticalArray = data.verticalIds.split(",");
    var verArrayForBind = [];
    verticalArray.forEach(element => {
      verArrayForBind.push(Number(element));
    })
    //Location
    var locationArray = data.locationIds.split(",");
    this.locationArrayForBind = [];
    locationArray.forEach(element => {
      this.locationArrayForBind.push(Number(element));
    })
    // Function
    var FunctionArray = data.functionIds.split(",");
    var FunctionArrayForBind = [];
    FunctionArray.forEach(element => {
      FunctionArrayForBind.push(Number(element));
    })
    // Grade
    var GradeArray = data.gradeIds.split(",");
    var GradeArrayForBind = [];
    GradeArray.forEach(element => {
      GradeArrayForBind.push(Number(element));
    })
    let onj = {
      ver: FunctionArrayForBind
    }
    // Prepare Function List
    var filterFunctionArry = [];
    this.filteredFunctionList = [];
    verArrayForBind.forEach(element => {
      this.filteredFunctionList = this.filteredFunctionList.concat(this.functions.filter(e => e.verticalId == element));
    })
    setTimeout(() => {
      this.saveForm.patchValue({
        Id: data.id,
        RoleId: data.roleId,
        AutoUserId: data.autoUserId,
        VerticalId: verArrayForBind,
        FunctionId: FunctionArrayForBind,
        locationId: this.locationArrayForBind,
        GradeId: GradeArrayForBind,
        CanAccess: data.isEDMSAccess
      })
      this.getAllLocation();
    }, 1000)
    console.log("locations",this.locations)
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
class SearchEDMSAccess {
  verticalId: any;
}
