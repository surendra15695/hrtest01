import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { ISearchLocation } from 'src/app/interfaces/common/location.interface';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { ISearchFunction } from 'src/app/interfaces/common/function.interface';
@Component({
  selector: 'app-manage-requestor-verticalmap',
  templateUrl: './manage-requestor-verticalmap.component.html',
  styleUrls: ['./manage-requestor-verticalmap.component.css']
})
export class ManageRequestorVerticalmapComponent implements OnInit {
  searchForm: FormGroup;
  //  saveform: FormGroup;
   createdBy: number;
  constructor(private fb: FormBuilder,
    private persistance: PersistanceService,
    private locationService: LocationService,
    private functionService: FunctionService,) { this.createdBy = this.persistance.get('loggedinuser').autoUserId; }
  showUserRoleList: boolean = true;
  mapingText: string = "";
  verticals: any[] = [];
  locations: any[] = [];
  functions: any[] = [];
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
    searchFunction: ISearchFunction = {
      verticalId: null,
      functionId: null,
      isActive: true
    }
  selectedVerticalId: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  ngOnInit() {
    this.createForm();
    this.createSearchForm();
    this.getAllVerticals();
  }
  createForm() {
    this.saveForm = this.fb.group({
      requestorId: [null, Validators.required],
      verticalId: [null, Validators.required],
      locationId: [null, Validators.required],
      functionId: [null, Validators.required],
      CreatedBy: this.createdBy
    });
  }
  createSearchForm()
  {
    this.searchForm = this.fb.group({
      VerticalId: [null],
      LocationId: [null],
      FunctionId: [null],
      autoUserId:null
    });
  }
  onClickAddNew() {
    this.showUserRoleList=false;
    this.mapingText = "Add Maping";
  }
  changeVertical()
  {
    this.selectedVerticalId = this.saveForm.get("verticalId").value;
    console.log("try",this.selectedVerticalId)
    this.getAllLocation();
    this.getAllFunction();
  }
  reset()
  {

  }
  filter() {
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
    console.log("find",this.verticals);
  }
  getAllLocation()
  {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
      }
    })
  }
  getAllFunction()
  {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
      }
    })
  }
  OnchangeVertical()
  {

  }
}
