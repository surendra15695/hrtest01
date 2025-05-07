import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { ISearchArea } from 'src/app/interfaces/common/common.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { ISearchFunction } from 'src/app/interfaces/common/function.interface';
declare var jQuery: any;
@Component({
  selector: 'app-cost-center-map-with-sub-area-vertical-fuc-loc-state',
  templateUrl: './cost-center-map-with-sub-area-vertical-fuc-loc-state.component.html',
  styleUrls: ['./cost-center-map-with-sub-area-vertical-fuc-loc-state.component.css']
})
export class CostCenterMapWithSubAreaVerticalFucLocStateComponent implements OnInit {
  showheading: boolean = true;
  showadd: boolean = true;
  showGirdList: boolean = true;
  mapingText: string;
  SubAreaList:any[]=[];
  verticals: any[] = [];
  functions: any[] = [];
  stateList:any[]=[];
  locationList:any[]=[];
  AllFfunctions:any[]=[]

  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  searchState = {
    StateId: 0,
    IsActive: null
  }
  searcharea: ISearchArea = 
  {
    LocationId: null,
    IsActive: null
  }
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  createdBy: number;
  costCenterGridData:any[]=[]
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private functionService: FunctionService
  ) { 
    this.getdataList()
    this.loadDataTable();
    this.getAllState();
    this.getSubArea();
    this.getAllVerticals();
    this.getAllFunction();
    //this.getAllLocations();
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
  }
  onClickAddNew() {
    this.showheading = false;
    this.showadd = false;
    this.showGirdList = false;
    this.mapingText = "Add Mapping"
    this.createForm();
  }
  createForm(){
    this.saveForm = this.fb.group({
      CostCenterMapId:0,
      SubAreaId:[null,Validators.required],
      Costcenter: null,
      CostcenterText:null,
      verticalId: [null, Validators.required],
      FunctionId: [null, Validators.required],
      LocationId: [null,Validators.required],
      StateId: [null,Validators.required],
      CreatedBy: this.createdBy,
      IsActive: true
    });
  }
  onEdit(RowData: any) {
    this.mapingText = "Edit Mapping"
    this.showadd = false;
    this.showheading = false
    this.showGirdList = false;
    this.editForm(RowData);
  }
  onBackClick(){
      this.showheading=true;
      this.showadd = true;
      this.showGirdList = true;
      this.getdataList();
  }
  editForm(value){
    this.getSubArea()
    this.getAllVerticals()
    var verticalIdStringArray = value.verticalId.split(',');
    var functionIdStringArray = value.functionId.split(',');
    var locationIdStringArray = value.locationId.split(',');
    var stateIdStringArray = value.stateId.split(',');

    var varticalIds=[]
    var functionIds:number[]=[]
    var locationIds:number[]=[]
    var stateIds:number[]=[]

    for (var i = 0; i < verticalIdStringArray.length; i++) {
      varticalIds.push(parseInt(verticalIdStringArray[i]));
    }
    for(var val of functionIdStringArray){
      functionIds.push(Number(val));
    }
    for(var val of locationIdStringArray){
      locationIds.push(Number(val));
    }
    for(var val of stateIdStringArray){
      stateIds.push(Number(val));
    }

  this.onChangeVericle(varticalIds);
  this.getAllLocations(functionIds);
    this.saveForm = this.fb.group({
      CostCenterMapId: value.costCenterMapId,
      SubAreaId:Number(value.subAreaId),
      Costcenter:value.costCenterId,
      CostcenterText:value.costCenterName,
      verticalId:[varticalIds,Validators.required],
      FunctionId: [functionIds, Validators.required],
      LocationId: [locationIds,Validators.required],
      StateId: [stateIds,Validators.required],
      CreatedBy: this.createdBy,
      IsActive: true
    })
    console.log("chc",this.saveForm.value)
  }
  getdataList(){
    var record={
      CostCenterMapId:0
    }
    this.commonService.getAllCostCenterList(record).subscribe((response: any) => {
      if (response) {
        this.costCenterGridData = response;
      }
      else {
        this.costCenterGridData = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable()
      this.spinnerService.hide();
    })
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  }
  getSubArea(){
    this.spinnerService.show();
    this.commonService.getalllocationwisearea(this.searcharea).subscribe((response: any) => {
      if (response) {
        this.SubAreaList = response;
      }
      else {
        this.SubAreaList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllFunction() {
    this.AllFfunctions = [];
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.AllFfunctions = result;
      }
      else{
        this.AllFfunctions=[]
      }
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
  getAllLocations(values) {
    var functionIds="";
    for(var val of values){
      functionIds += val.toString() +","
    }
    var rec={
      FunctionIds:functionIds.slice(0,-1)
    }
    
    this.commonService.getallfunctionwiselocation(rec).subscribe((result) => {
      if (result) {
        this.locationList=result;
      }
      else{
        this.locationList=[];
      }
    })
  }

  getAllState() {
    this.spinnerService.show();
    // this.saveForm.value.IsActive = null;
    this.commonService.getAllMasterState(this.searchState).subscribe((response: any) => {
      if (response) {
        console.log("response",response);
        this.stateList = response;
      }
      else {
        this.stateList = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  onChangeVericle(event:any){
    this.functions=[];
    for (let i = 0; i < event.length; i++) {
      this.functions = this.functions.concat(this.AllFfunctions.filter(e => event[i] == e.verticalId))
    }
  }

  onSubmit(){
    console.log("values",this.saveForm.value);
   // var subAreas=""
    var verticals="";
    var funcations="";
    var locations=""
    var states=""

    // for(var val of this.saveForm.value.SubAreaId){
    //   subAreas += val.toString()+","
    // }
    for(var val of this.saveForm.value.verticalId){
      verticals += val.toString() +","
    }
    for(var val of this.saveForm.value.FunctionId){
      funcations += val.toString() +","
    }
    for(var val of this.saveForm.value.LocationId){
      locations += val.toString() +","
    }
    for(var val of this.saveForm.value.StateId){
      states += val.toString() +","
    }

    var record={
      CostCenterMapId:this.saveForm.value.CostCenterMapId,
      SubAreaId:this.saveForm.value.SubAreaId,
      CostcenterId:Number(this.saveForm.value.Costcenter),
      CostcenterText:this.saveForm.value.CostcenterText,
      verticalId: verticals.slice(0,-1),
      FunctionId: funcations.slice(0,-1),
      LocationId: locations.slice(0,-1),
      StateId: states.slice(0,-1),
      CreatedBy: this.createdBy,
      IsActive: this.saveForm.value.IsActive
    }
    this.commonService.insertUpdateCostCenter(record).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
      }
      else {
        this.spinnerService.hide();
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  
}
