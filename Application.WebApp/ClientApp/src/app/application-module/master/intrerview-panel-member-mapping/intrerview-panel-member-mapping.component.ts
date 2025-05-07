import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/common/language/language.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { IVerticalHiringManager, ISearchVerticalHiringManager } from '../../../interfaces/common/vertical.interface';
import { UserService } from '../../../services/common/user/user.service';
import { IInterviewPanelMember, ISearchInterviewPanelMember, IInterviewRoom, ISearchInterviewRoom } from '../../../interfaces/common/interview.interface';
import { InterviewService } from '../../../services/common/interview/interview.service';
import { IFunctionDepartment, ISearchDepartment } from '../../../interfaces/common/department.interface';
import { DepartmentService } from '../../../services/common/department/department.service';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';


declare var jQuery: any;

@Component({
  selector: 'app-intrerview-panel-member-mapping',
  templateUrl: './intrerview-panel-member-mapping.component.html',
  styleUrls: ['./intrerview-panel-member-mapping.component.css']
})
export class IntrerviewPanelMemberMappingComponent implements OnInit {

  Operation: string;
  FunctionList: any[] = [];
  VerticalList: any[] = [];
  DepartmentList: any[] = [];
  interviewPanelMemberList: any[] = [];
  createdBy: number;
  interviewPanelMembersHR: IInterviewPanelMember[] = [];
  interviewPanelMembersFunction: IInterviewPanelMember[] = [];
  searchInterviewPanelMember: ISearchInterviewPanelMember = {
    verticalId: null,
    functionId: null,
    panelTypeId: null,
    isActive: true
  }
  searchVertical = {
    VerticalId: null,
    VerticalName: "",
    IsActive: true
  }
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  departmentId: number;
  departmentName: string;
  objSaveInterviewpanleMemberMapping: SaveInterviewpanleMemberMapping;
  isEditMode: boolean = false;
  searchInterviewPanelMemberList = {
    inerviewPanelMemberMapId: null,
    inerviewPanelMemberAutoUserId: null,
    verticalId: null,
    functionId: null,
    departmentId: null,
    isActive: true
  }

  constructor(
    private functionService: FunctionService,
    private verticalService: VerticalService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder,
    private userService: UserService,
    private interviewService: InterviewService,
    private departmentService: DepartmentService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.objSaveInterviewpanleMemberMapping = new SaveInterviewpanleMemberMapping();
  }

  ngOnInit() {
    this.loadDataTable();
    this.tableOptionDropDown();
    this.getAllInterviewPanelMemberFunction();
    this.getAllVertical();
    this.getAllInterviewpanelMembetrList();
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
  getAllInterviewpanelMembetrList() {
    this.spinnerService.show();
    this.interviewService.getInterviewPanelMemberList(this.searchInterviewPanelMemberList).subscribe((response: any) => {
      if (response) {
        this.interviewPanelMemberList = response;
        console.log("Grid data: ", this.interviewPanelMemberList);
      }
      else {
        this.interviewPanelMemberList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  getAllInterviewPanelMemberFunction() {
    this.interviewPanelMembersFunction = [];
    this.searchInterviewPanelMember.panelTypeId = 2;
    this.interviewService.getAllInterviewPanelMember(this.searchInterviewPanelMember).subscribe((result) => {
      if (result) {
        this.interviewPanelMembersFunction = result;
        this.interviewPanelMembersFunction = this.interviewPanelMembersFunction.filter(x => x.panelTypeId == 2);
      }
      else {
        this.interviewPanelMembersFunction = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  getAllVertical() {
    this.verticalService.getAllVertical(this.searchVertical).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        // console.log("VerticalList: ", response);
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
  onChangeVertical(verticalID: any) {
    // alert(verticalID);
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }
    this.searchDepartment.verticalId = verticalID;
    this.getVerticalFunction(data);
    this.objSaveInterviewpanleMemberMapping.functionId=null;
    this.objSaveInterviewpanleMemberMapping.departmentId=null;
  }

  getVerticalFunction(data: any) {
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        // console.log("FunList: ", this.FunctionList);
        this.spinnerService.hide();
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.spinnerService.hide();
    })
  }
  onChangeFunction(functionId: any) {
    // alert("Finctionid" + functionId)
    this.searchDepartment.functionId = functionId;
    this.getAllDepartment();
   this.objSaveInterviewpanleMemberMapping.departmentId=null;
  }
  //department
  getAllDepartment() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.StaticVerticalId;
    // this.searchDepartment.functionId = this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        // console.log(this.departments);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  createForm() {
    this.Operation = 'add';
    this.objSaveInterviewpanleMemberMapping = new SaveInterviewpanleMemberMapping();
    this.objSaveInterviewpanleMemberMapping.inerviewPanelMemberMapId = 0;
    this.objSaveInterviewpanleMemberMapping.isActive = true;
    this.objSaveInterviewpanleMemberMapping.createdBy = this.createdBy;
    this.isEditMode = false;
    this.getAllVertical();
    this.FunctionList = [];
    this.departments = [];
    // this.getVerticalFunction();
  }
  onSubmit() {
    if (this.isValid()) {
      this.spinnerService.show();
      // console.log("Save Obj", this.objSaveVerticalFunctionHiringmanager);
      this.interviewService.saveInterviewPanelMemberMapping(this.objSaveInterviewpanleMemberMapping).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.getAllInterviewpanelMembetrList();
          jQuery(".close").click();
        }
        else {
          this.notiService.showError(response.msg, "Error");
        }
      }, error => {
        this.notiService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
        this.spinnerService.hide();
      }, () => {
        this.spinnerService.hide();
      })
    }
  }
  isValid(): boolean {
    if (this.objSaveInterviewpanleMemberMapping.inerviewPanelMemberAutoUserId == undefined || this.objSaveInterviewpanleMemberMapping.inerviewPanelMemberAutoUserId == null) {
      this.notiService.showError("Please Select Interview Panel Member", "Error");
      return false;
    }
    if (this.objSaveInterviewpanleMemberMapping.verticalId == undefined || this.objSaveInterviewpanleMemberMapping.verticalId == null) {
      this.notiService.showError("Please Selecte Vertical", "Error");
      return false;
    }
    if (this.objSaveInterviewpanleMemberMapping.functionId == undefined || this.objSaveInterviewpanleMemberMapping.functionId == null) {
      this.notiService.showError("Please Select Function", "Error");
      return false;
    }
    if (this.objSaveInterviewpanleMemberMapping.departmentId == undefined || this.objSaveInterviewpanleMemberMapping.departmentId == null) {
      this.notiService.showError("Please Select Department", "Error");
      return false;
    }
    return true;
  }
  onEdit(data: any) {
    this.Operation = 'edit';
    this.onChangeVertical(data.verticalId);
    this.onChangeFunction(data.functionId);
    this.isEditMode = true;
    this.objSaveInterviewpanleMemberMapping = JSON.parse(JSON.stringify(data));
  }

}

class SaveInterviewpanleMemberMapping {
  inerviewPanelMemberMapId: number;    // table id need to be changed
  verticalId: number;
  functionId: number;
  departmentId: number;
  departmentName:string;
  inerviewPanelMemberAutoUserId: number;
  isActive: boolean;
  createdBy: number;
}
