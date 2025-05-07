import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { InterviewService } from 'src/app/services/common/interview/interview.service';
import { CommonService } from 'src/app/services/common/common/common.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-interviewpanel',
  templateUrl: './manage-interviewpanel.component.html',
  styleUrls: ['./manage-interviewpanel.component.css']
})

export class ManageInterviewpanelComponent implements OnInit {

  VerticalList: any[] = [];
  FunctionList: any[] = [];
  UserRoleList: any[] = [];
  PanelMembers: any[] = [];
  SelVerticalID: number;
  SelFunctionID: number;
  SelectedMemID: any[] = [];
  data: any = {};
  arr: any[] = [];
  createdBy: number;
  PanelType: any = [
    { "id": 1, "text": "Interview Panel Member" },
    { "id": 2, "text": "HR Panel Member" }
  ]
  // Data: any = {
  //   "RoleId": null
  // };
  searchUserObj: any;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  // Added by anif on 06-07-2022
  showList: boolean = true;
  labelText: string = "Add Panel Member";
  panelMembersList: any[] = [];
  searchForm: FormGroup;
  constructor(
    private verticalService: VerticalService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private functionService: FunctionService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private interviewService: InterviewService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.tableOptionDropDown();
    this.createSearchForm();
    this.createForm();
    this.getAllVertical();
    //  this.getRoleWiseUser();
    this.getAllPanelMemberList();
  }
  // Added By Anif on 06-07-2022
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

  createSearchForm() {
    this.searchForm = this.fb.group({
      AutoId: null,
      VerticalId: null,
      FunctionId: null,
      PanelTypeId: null,
      IsActive: true
    })
  }
  // Till this
  createForm() {
    this.saveForm = this.fb.group({
      VerticalId: [null, Validators.required],
      FunctionId: [null, Validators.required],
      PanelTypeId: [null, Validators.required],
      MemberId: [null, Validators.required],
      CreatedBy: this.createdBy
    })
  }

  onSubmit() {
    this.spinnerService.show();
    let strMemberIDs: string = '';
    let count: number = 0;
    if (this.SelectedMemID.length != 0) {
      for (let val of this.SelectedMemID) {
        if (count == 0) {
          strMemberIDs = val.toString();
        }
        else {
          strMemberIDs = strMemberIDs + ',' + val.toString();
        }

        count = count + 1;
      }
    }

    let data: any = {
      "VerticalId": this.saveForm.value.VerticalId,
      "FunctionId": this.saveForm.value.FunctionId,
      "PanelTypeId": this.saveForm.value.PanelTypeId,
      "PanelMemberId": strMemberIDs,
      "CreatedBy": this.createdBy
    }

    this.interviewService.saveInterviewPanelMember(data).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.SelectedMemID = [];
        this.getAllVertical();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
      this.onBackClick();
    })
  }

  getAllVertical() {
    this.saveForm.value.IsActive = true;
    this.VerticalList = [];
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
        //console.log("Vertical Function List: ", this.FunctionList);                             
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
  }

  onChangePanelType(PaneltypeID: any) {
    let data: any = {
      "VerticalId": this.SelVerticalID,
      "FunctionId": this.SelFunctionID,
      "PanelTypeId": PaneltypeID,
      "IsActive": true
    }
    if (PaneltypeID == 1) {
      this.searchUserObj = {
        RoleId: 20
      }
    } else {
      this.searchUserObj = {
        RoleId: 19
      }
    }
    this.getRoleWiseUser(this.searchUserObj);
    this.getInterviewPanelMem(data);
  }

  getRoleWiseUser(searchUserObj) {
    this.UserRoleList = [];
    this.commonService.getRoleWiseUser(searchUserObj).subscribe((response: any) => {
      if (response) {
        this.UserRoleList = response;
      //  console.log("User Role List: ", this.UserRoleList);
      }
      else {
        this.UserRoleList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getInterviewPanelMem(data: any) {
    this.interviewService.getAllInterviewPanelMember(data).subscribe((response: any) => {
      if (response) {
        this.PanelMembers = response;
        this.SelectedMemID = [];
        let TempArr: any[] = [];
        for (let item of this.PanelMembers) {
          TempArr.push(item.autoUserId);
        }
        this.SelectedMemID = TempArr;
        //console.log("Interview Panel Member: ", this.PanelMembers);                            
      }
      else {
        this.PanelMembers = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  // Added by Anif on 06-07-2022

  onClickAddNew() {
    this.getAllVertical();
    this.FunctionList = [];
    this.createForm();
    this.labelText = "Add Panel Member";
    this.showList = false;
    jQuery(".custom-menu").hide();

  }
  onBackClick() {
    this.spinnerService.show();
    this.showList = true;
    this.createSearchForm();
    this.getAllPanelMemberList();
    this.tableOptionDropDown();
    jQuery(".custom-menu").hide();
  }
  getAllPanelMemberList() {
    this.interviewService.getAllInterviewPanelMemberList(this.searchForm.value).subscribe((response: any) => {
      if (response) {
        this.panelMembersList = response;
        //console.log("Panel Members List", this.panelMembersList);
      }
      else {
        this.panelMembersList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.spinnerService.hide();
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  onClickEdit(record) {
    this.onChangeVertical(record.verticalId);
    if (record.panelTypeId == 1) {
      this.searchUserObj = {
        RoleId: 20
      }
    } else {
      this.searchUserObj = {
        RoleId: 19
      }
    }
    this.getRoleWiseUser(this.searchUserObj);
    this.showList = false;
    this.labelText = "Edit Panel Member";
    let data: any = {
      "VerticalId": record.verticalId,
      "FunctionId": record.functionId,
      "PanelTypeId": record.panelTypeId,
      "IsActive": true
    }
    this.saveForm.patchValue({
      VerticalId: record.verticalId,
      FunctionId: record.functionId,
      PanelTypeId: record.panelTypeId,
      CreatedBy: this.createdBy
    });
    this.getInterviewPanelMem(data);
    jQuery(".custom-menu").hide();
  }
  onCancelClick() {
    this.showList = true;
    this.labelText = "Add Panel Member";
    this.createSearchForm();
    this.getAllPanelMemberList();
    this.tableOptionDropDown();
    // this.searchForm.reset();
    jQuery(".custom-menu").hide();
  }
  filter() {
    this.getAllPanelMemberList();
  }
  reset() {
    this.createSearchForm();
    this.getAllPanelMemberList();
  }
}
