import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { table } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISearchArea } from 'src/app/interfaces/common/common.interface';
import { ISearchFunction, ISearchLocationFunction } from 'src/app/interfaces/common/function.interface';
import { ILocation, ISearchLocation, IsearchVerticalLocation } from 'src/app/interfaces/common/location.interface';
import { IVertical, IVerticalFill } from 'src/app/interfaces/common/vertical.interface';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-hr-hand-holding-access',
  templateUrl: './hr-hand-holding-access.component.html',
  styleUrls: ['./hr-hand-holding-access.component.css']
})
export class HrHandHoldingAccessComponent implements OnInit {
  showUserRoleList: boolean = true;
  constructor(
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private commonService: CommonService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private verticalService: VerticalService,
    private locationService: LocationService,
    private functionService: FunctionService) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchUserRole.AutoUserId = this.createdBy;
  }
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  searchUserRole = {
    AutoUserId: null,
    isActive: true
  }
  objarr: Function;
  objarea: Area;
  createdBy: number;
  RoleList: any = [];
  showfunction: boolean = false;
  showVertical: boolean = false;
  showarea: boolean = false;
  showLocation: boolean = true;
  showLocation2: boolean = false;
  data: any = {};
  SelUserRole: number;
  trainingInchargeList: any = [];
  VerticalList: IVerticalFill[] = [];
  selectedVertical: IVerticalFill[] = [];
  locations: ILocation[] = [];
  functions: any[] = [];
  area: any[] = [];
  newarray: any[] = [];
  newarea: any[] = [];
  arrr: any[] = [];
  arrV: any[] = [];
  arrarea: any[] = [];
  DataTable: any[] = [];
  arrayuser: any[] = [];
  arrayLocation: any[] = [];
  arrayFunction: any[] = [];
  arrayArea: any[] = [];
  newarrayfunction: any[] = [];
  abc: string;
  str: string;
  str1: string;
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchVertical: IVertical =
    {
      verticalId: null,
      verticalName: null,
      isActive: true
    };
  searchLocation: IsearchVerticalLocation =
    {
      locationId: null,
      verticalIds: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  searchfunction: ISearchLocationFunction =
    {
      locationId: null,
      functionId: null,
      isActive: null
    }
  searcharea: ISearchArea =
    {
      LocationId: null,
      IsActive: null
    }
  locationId: number;
  showheading: boolean = true;
  showadd: boolean = true;
  mapingText: string;

  ngOnInit() {
    this.createForm();
    this.loadDataTable();
    this.getUserRole();
    this.getAllVertical();
    //this.getAllLocation();
    this.getallLocationFunction();
    this.getallArea();
    this.getdata();
    this.objarr = new Function();
    this.objarea = new Area();
  }
  createForm() {
    this.saveForm = this.fb.group({
      RoleMapId: [0],
      roleId: [null, Validators.required],
      AutoUserId: [null, Validators.required],
      verticalId: [""],
      locationId: [null, Validators.required],
      functionId: [null, Validators.required],
      areaId: null,
      CreatedBy: this.createdBy,
      IsActive: [true]
    });
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        //"searching": true,
        //"paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 3
          }
      });
    });
  }
  getdata() {
    let rec = {
      IsActive: null
    }
    this.spinnerService.show();
    this.commonService.getuserrolelocationfunction(rec).subscribe((response: any) => {
      if (response) {
        this.DataTable = response.filter(e => e.roleId == 51 || e.roleId == 60 || e.roleId == 63 || e.roleId == 61);
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
  getUserRole() {
    this.spinnerService.show();
    // this.commonService.getuserrolehandholding(this.searchUserRole).subscribe((response: any) => {
    //   if (response.length != 0) {
    //     this.RoleList = response;
    //     console.log("Role List: ", this.RoleList);
    //     this.spinnerService.hide();
    //   }
    //   else {
    //     this.RoleList = [];
    //     this.spinnerService.hide();
    //   }
    // }, error => {
    //   this.notiService.showError("Something went wrong.. Try again later..", "")
    //   console.log(error);
    //   this.spinnerService.hide();
    // })

    this.RoleList = []
    this.RoleList.push(
      { roleId: 60, assignedRole: "51,18", assignedRoleName: "Plant AIC,Employee", autoUserId: 794, roleName: "Plant HR Head", verticalId: 2 },
      { roleId: 63, assignedRole: "51,18", assignedRoleName: "Plant AIC,Employee", autoUserId: 794, roleName: "Plant Head", verticalId: 2 },
      { roleId: 61, assignedRole: "51,18", assignedRoleName: "Plant AIC,Employee", autoUserId: 794, roleName: "Plant HOD", verticalId: 2 },
      { roleId: 51, assignedRole: "51,18", assignedRoleName: "Plant AIC,Employee", autoUserId: 794, roleName: "Plant AIC", verticalId: 2 },
    )
    this.spinnerService.hide();
  }
  onChangeUserRole(roleId: any) {
    this.areaName = "";
    this.SelUserRole = roleId;
    this.data = {
      'RoleId': this.SelUserRole
    }
    this.arrr = [];
    this.arrarea = [];
    this.arrV = [];
    this.saveForm.patchValue({
      AutoUserId: [],
      verticalId: [""],
      locationId: [],
      functionId: this.arrr
      //areaId: this.arrarea
    })
    this.getRoleWiseUser(this.data);
    this.searchLocation.verticalIds = this.RoleList.filter(e => e.roleId == roleId)[0].verticalId.toString();
    if ((this.SelUserRole == 60) || (this.SelUserRole == 63) || (this.SelUserRole == 35) || (this.SelUserRole == 57)) {
      this.showVertical = false;
      this.showfunction = false;
      this.showarea = false;
      // this.showLocation = true;
      // this.showLocation2 = false;
      this.saveForm.patchValue({
        verticalId: "",
        functionId: this.arrr
        //areaId: this.arrarea
      });
      this.getAllVertical();
      this.searchLocation.verticalIds == '0' ? this.searchLocation.verticalIds = '2' : this.searchLocation.verticalIds = this.searchLocation.verticalIds
      this.getAllLocation();
    }
    else if (this.SelUserRole == 61) {
      this.showfunction = true;
      this.showarea = false;
      this.showVertical = false;
      // this.showLocation = true;
      // this.showLocation2 = false;
      this.saveForm.patchValue({
        //areaId: this.arrarea,
        verticalId: ""
      });
      this.getAllVertical();
      this.searchLocation.verticalIds == '0' ? this.searchLocation.verticalIds = '2' : this.searchLocation.verticalIds = this.searchLocation.verticalIds
      this.getAllLocation();
    }
    else if ((this.SelUserRole == 62) || (this.SelUserRole == 49)) {
      this.showVertical = true;
      this.showfunction = false;
      this.showarea = false;
      // this.showLocation = false;
      // this.showLocation2 = true;
      this.getAllVertical();
      //this.getAllLocation();    
      //this.newARR;
    }
    else {
      this.showfunction = true;
      this.showarea = true;
      this.showVertical = false;
      // this.showLocation = true;
      // this.showLocation2 = false;
      this.saveForm.patchValue({
        verticalId: ""
      });
      this.getAllVertical();
      this.getAllLocation();

    }
  }
  getRoleWiseUser(data: any) {
    this.spinnerService.show();
    let searchRoleLocationUser = {
      roleId: data.RoleId,
      autoUserId: this.createdBy
    }
    //this.commonService.getRoleWiseUser(data).subscribe((response: any) => {
    this.commonService.getRoleLocationWiseUser(searchRoleLocationUser).subscribe((response: any) => {
      if (response) {
        this.trainingInchargeList = response;
        //console.log("user List", this.trainingInchargeList)
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
  onChangeUser() {
    this.str1 = this.saveForm.value.AutoUserId.toString();
  }
  getAllVertical() {
    //this.VerticalList = [];
    this.spinnerService.show();
    this.verticalService.getAllVertical(this.searchVertical).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
       // console.log("VerticalList: ", response);
        // this.VerticalList.splice(0,0,{
        //   verticalId: "",
        //   verticalName: "All",
        //   isActive: true
        // })              
      }
      else {
        this.VerticalList = [];
        // this.VerticalList.splice(0,0,{
        //   verticalId: "",
        //   verticalName: "All",
        //   isActive: true
        // })     
      }
    }, error => {
      console.log(error);
    })
    //this.selectedVertical = this.VerticalList.filter(x => x.verticalId == 0)[0];
  }
  newARR: any[] = [];
  onChangeVertical() {
    var verticalId = this.saveForm.get("verticalId").value;
    //this.selectedVertical = this.VerticalList.filter(x => x.verticalId == verticalId);
    // this.getAllLocation();
    // if (verticalId.length > 1) {
    //   for (let i = 0; i < verticalId.length; i++) {
    //     // this.locations = this.locations.concat(this.locations.filter(e => rec1[i] == e.verticalId))
    //     this.searchLocation.verticalIds =  verticalId.toString();
    //   }
    // }
    // else {
    this.searchLocation.verticalIds = verticalId.toString();
    // }
    this.getAllLocation();
    // this.abc = this.saveForm.value.verticalId.toString();
    // this.saveForm.value.verticalId = this.abc;
  }
  getAllLocation() {
    this.locations = [];
    //this.searchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllVerticalLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        //console.log("location", result)
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locations = [];
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
      // this.SpinnerService.hide(); 
    });
  }
  changeLocation(rec: any) {
    if (rec.length > 1) {
      for (let i = 0; i < rec.length; i++) {
        this.newarray = this.newarray.concat(this.functions.filter(e => rec[i] == e.locationId));
        this.newarea = this.newarea.concat(this.area.filter(e => rec[i] == e.locationId));
      }
    }
    else {
      this.newarray = this.functions.filter(e => rec[0] == e.locationId);
      this.newarea = this.area.filter(e => rec[0] == e.locationId);
    }
    this.str = this.saveForm.value.locationId.toString();
    this.saveForm.value.locationId = this.str;
  }
  getallLocationFunction() {
    this.functions = [];
    this.functionService.getAllLocationFunction(this.searchfunction).subscribe((result) => {
      if (result) {
        //console.log("func",result)
        this.functions = result;
        // this.newarray=this.functions
      }
    })
  }
  changeFunction(record: any) {
    this.arrr = [];
    for (let i = 0; i < record.length; i++) {
      this.objarr = new Function();
      var locationIdObj = this.newarray.find(e => e.functionId == record[i]);
      if (locationIdObj != undefined) {
        this.objarr.LocationId = locationIdObj.locationId;
      }
      this.objarr.FunctionId = record[i];
      this.arrr.push(this.objarr);     
    }   
  }
  getallArea() {    
    this.area = [];
    this.commonService.getalllocationwisearea(this.searcharea).subscribe((result) => {
      if (result) {        
        this.area = result;
      }
    })
  }
  changeArea(record: any) {
    this.arrarea = [];
    for (let i = 0; i < record.length; i++) {
      this.objarea = new Area();
      var locationIdObj = this.newarea.find(e => e.subAreaId == record[i]);
      if (locationIdObj != undefined) {
        this.objarea.LocationId = locationIdObj.locationId;
      }
      this.objarea.AreaId = record[i];
      this.arrarea.push(this.objarea);
    }    
  }
  onClickAddNew() {
    this.showheading = false;
    this.showadd = false;
    this.showUserRoleList = false;
    this.mapingText = "Add HandHolding Access "
    this.showarea = false;
    this.createForm();

  }
  onBackClick() {
    this.showheading = true;
    this.showadd = true;
    this.showUserRoleList = true;
    this.getdata();
  }
  record = {}
  onSubmit() {
    if ((this.saveForm.value.roleId == 60) || (this.saveForm.value.roleId == 63) || (this.saveForm.value.roleId == 35) || (this.saveForm.value.roleId == 57)) {
      this.record = {
        RoleMapId: this.saveForm.value.RoleMapId,
        RoleId: this.saveForm.value.roleId,
        AutoUserId: this.str1,
        VerticalId: "",
        LocationId: this.str,
        UserWiseRoleLocationFunctionDetails: [],
        UserWiseRoleLocationAreaDetails: [],
        CreatedBy: this.createdBy,
        IsActive: this.saveForm.value.IsActive
      }
    }
    else if (this.saveForm.value.roleId == 61) {
      this.record = {
        RoleMapId: this.saveForm.value.RoleMapId,
        RoleId: this.saveForm.value.roleId,
        AutoUserId: this.str1,
        VerticalId: "",
        LocationId: this.str,
        UserWiseRoleLocationFunctionDetails: this.arrr,
        UserWiseRoleLocationAreaDetails: [],
        CreatedBy: this.createdBy,
        IsActive: this.saveForm.value.IsActive
      }
    }
    else if ((this.saveForm.value.roleId == 62) || (this.saveForm.value.roleId == 49)) {
      this.record = {
        RoleMapId: this.saveForm.value.RoleMapId,
        RoleId: this.saveForm.value.roleId,
        AutoUserId: this.str1,
        VerticalId: this.searchLocation.verticalIds,
        LocationId: this.str,
        UserWiseRoleLocationFunctionDetails: this.arrr,
        UserWiseRoleLocationAreaDetails: [],
        CreatedBy: this.createdBy,
        IsActive: this.saveForm.value.IsActive
      }
    }
    else {
      this.record = {
        RoleMapId: this.saveForm.value.RoleMapId,
        RoleId: this.saveForm.value.roleId,
        AutoUserId: this.str1,
        VerticalId: "",
        LocationId: this.str,
        UserWiseRoleLocationFunctionDetails: this.arrr,
        //UserWiseRoleLocationAreaDetails: this.arrarea,
        Area: this.areaName,
        CreatedBy: this.createdBy,
        IsActive: this.saveForm.value.IsActive
      }
    }
    this.spinnerService.show();
    this.commonService.addInsertUpdateRoleWiseUsrLoctFunc(this.record).subscribe((response: any) => {
      if (response.successFlag == 1) {        
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        // this.getAllSalaryType();
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
      this.showheading = true
      this.showadd = true;
      this.getdata();
      this.showUserRoleList = true
      this.spinnerService.hide();
    })
  }
  areaName: string = "";
  onEdit(RowData: any) {
    this.mapingText = "Edit Hand Holding Access "
    this.showadd = false;
    this.showheading = false
    this.showfunction = true;
    this.showarea = false;
    var varr = RowData.locationId.split(',');
    var arr = [];
    for (var i = 0; i < varr.length; i++) {
      arr.push(parseInt(varr[i]));
    }
    var abc = RowData.verticalId.split(',');
    var abcd = [];
    for (var i = 0; i < abc.length; i++) {
      abcd.push(parseInt(abc[i]));
    }
    //console.log("rrr",arr)
    var varr1 = RowData.autoUserId.split(',');
    var arr1 = [];
    for (var i = 0; i < varr1.length; i++) {
      arr1.push(parseInt(varr1[i]));
    }
    this.showUserRoleList = false;
    this.onChangeUserRole(RowData.roleId);//Piu
    //this.changeFunction();    
    //this.getAllFunction();
    this.saveForm.value.verticalId = abcd;
    this.searchLocation.verticalIds = RowData.verticalId;
    //this.onChangeVertical();//commented on 13-02-2023
    this.saveForm.value.locationId = arr;
    this.changeLocation(arr);
    var func = RowData.functionId.split(',');
    var arr2 = [];
    for (var i = 0; i < func.length; i++) {
      var locationIdObj = this.newarray.find(e => e.functionId == func[i].toString());
      this.objarr = new Function();
      if (locationIdObj != undefined) {
        this.objarr.LocationId = locationIdObj.locationId;
      }
      this.objarr.FunctionId = Number(func[i]);
      this.arrr.push(this.objarr);
      arr2.push(parseInt(func[i]));
    }
    //var area = RowData.areaId.split(',');
    var arr3 = [];
    // for(var i = 0; i < area.length; i++){
    //   var arealocationidobj = this.newarea.find(e => e.subAreaId == area[i].toString());
    //   this.objarea = new Area();
    //   if(arealocationidobj != undefined){
    //     this.objarea.LocationId = arealocationidobj.locationId;
    //   }
    //   this.objarea.AreaId =Number(area[i]);
    //   this.arrarea.push(this.objarea);
    //   arr3.push(parseInt(area[i]));
    // }
    this.areaName = RowData.areaName;
    this.saveForm.patchValue({
      RoleMapId: RowData.roleMapId,
      roleId: RowData.roleId,
      AutoUserId: arr1,
      verticalId: abcd,
      locationId: arr,
      functionId: arr2,
      //areaId: arr3,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });
    this.str1 = this.saveForm.value.AutoUserId.toString();
  }
  onClickshow() {
    this.arrayuser = [];
    for (let i = 0; i < this.saveForm.value.AutoUserId.length; i++) {
      for (let j = 0; j < this.trainingInchargeList.length; j++) {

        if (this.saveForm.value.AutoUserId[i] == this.trainingInchargeList[j].autoUserId) {
          this.arrayuser.push(this.trainingInchargeList[j].employeeName);
        }
      }
    }
  }
  onClickshowLocation() {
    this.arrayLocation = [];
    for (let i = 0; i < this.saveForm.value.locationId.length; i++) {
      for (let j = 0; j < this.locations.length; j++) {

        if (this.saveForm.value.locationId[i] == this.locations[j].locationId) {
          this.arrayLocation.push(this.locations[j].locationOffice);          
        }
      }
    }
  }
  onClickshowFunction() {
    this.arrayFunction = [];
    this.newarrayfunction = [];
    for (let i = 0; i < this.saveForm.value.functionId.length; i++) {
      for (let j = 0; j < this.newarray.length; j++) {

        if (this.saveForm.value.functionId[i] == this.newarray[j].functionId) {
          this.arrayFunction.push(this.newarray[j].functionName);
        }
      }
    }
    for (let a = 0; a < this.arrayFunction.length; a++) {
      if (this.arrayFunction[a] != this.arrayFunction[a + 1]) {
        this.newarrayfunction.push(this.arrayFunction[a]);
      }
    }
  }
  // onClickshowArea(){
  //   this.arrayArea=[];
  //   for(let i=0;i<this.saveForm.value.areaId.length;i++)
  //   {
  //     for(let j=0;j<this.newarea.length;j++)
  //     {

  //       if(this.saveForm.value.areaId[i]==this.newarea[j].subAreaId)
  //       {
  //         this.arrayArea.push(this.newarea[j].subAreaName);
  //         console.log("chck",this.arrayArea);

  //       }
  //     }
  //   }
  // }

}

class Function {
  LocationId: number;
  FunctionId: number;
}
class Area {
  LocationId: number;
  AreaId: number;
}
