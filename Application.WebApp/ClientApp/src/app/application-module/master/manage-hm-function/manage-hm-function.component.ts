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

declare var jQuery: any;

@Component({
  selector: 'app-manage-hm-function',
  templateUrl: './manage-hm-function.component.html',
  styleUrls: ['./manage-hm-function.component.css']
})
export class ManageHmFunctionComponent implements OnInit {

  Operation: string;
  FunctionList: any[] = [];
  VerticalList: any[] = [];
  VerticalFunctionHiringManagerList: any[] = [];
  Hirign
  createdBy: number;
  hiringManagers: IVerticalHiringManager[] = [];
  searchhiringManager: ISearchVerticalHiringManager = {
    autoUserId: null,
    roleId: null,
    verticalId: null
  }
  searchVertical = {
    VerticalId: null,
    VerticalName: "",
    IsActive: true
  }
  objSaveVerticalFunctionHiringmanager: SaveVerticalFunctionHiringmanager;
  searchVerticalFunctionHiringManager = {
    hiringManagerFunctionId: null,
    verticalId: null,
    functionId: null,
    hiringManagerAutoUserId: null,
    isActive: true
  }
  isEditMode: boolean = false;

  constructor(
    private functionService: FunctionService,
    private verticalService: VerticalService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.objSaveVerticalFunctionHiringmanager = new SaveVerticalFunctionHiringmanager();
    this.objSaveVerticalFunctionHiringmanager.hiringManagerFunctionId = 0;
    this.objSaveVerticalFunctionHiringmanager.isActive = true;

  }

  ngOnInit() {
    this.loadDataTable();
    this.tableOptionDropDown();
    // this.createForm();
    this.getAllVertical();
    this.getAllHiringManagerForVerticalFunction();
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
    this.Operation = 'add';
    this.objSaveVerticalFunctionHiringmanager = new SaveVerticalFunctionHiringmanager();
    this.objSaveVerticalFunctionHiringmanager.hiringManagerFunctionId = 0;
    this.objSaveVerticalFunctionHiringmanager.isActive = true;
    this.isEditMode = false;
    // this.saveForm = this.fb.group({
    //   HiringManagerFunctionId: 0,
    //   VerticalId: [null, Validators.required],
    //   FunctionId: [null, Validators.required],
    //   HiringManagerAutoUserId: [{ value: null, disabled: false }, Validators.required],
    //   IsActive: [true],
    //   CreatedBy: this.createdBy
    // })
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
  getAllHiringManagerForVerticalFunction() {
    this.spinnerService.show();
    this.functionService.getAllVerticalFunctionHiringManager(this.searchVerticalFunctionHiringManager).subscribe((response: any) => {
      if (response) {
        this.VerticalFunctionHiringManagerList = response;
        // console.log("Grid data: ", this.VerticalFunctionHiringManagerList);
      }
      else {
        this.VerticalFunctionHiringManagerList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
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
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }
    if (verticalID == 1) {
      this.getAllHiringManager(12);
    } else if (verticalID == 2) {
      this.getAllHiringManager(13);
    } else if (verticalID == 3) {
      this.getAllHiringManager(14);
    }
    this.getVerticalFunction(data);
  }
  getAllHiringManager(roleid) {
    this.hiringManagers = [];
    this.searchhiringManager.roleId = roleid;
    this.userService.getVerticalHiringManager(this.searchhiringManager).subscribe((result) => {
      if (result) {
        this.hiringManagers = result;
        // console.log("Hiring Manager", this.hiringManagers);
      }
      else {
        this.hiringManagers = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    });
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
  onSubmit() {
    if (this.isValid()) {
      this.spinnerService.show();
      // console.log("Save Obj", this.objSaveVerticalFunctionHiringmanager);
      this.functionService.addVerticalFunctionHiringManager(this.objSaveVerticalFunctionHiringmanager).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.getAllHiringManagerForVerticalFunction();
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
    if (this.objSaveVerticalFunctionHiringmanager.verticalId == undefined || this.objSaveVerticalFunctionHiringmanager.verticalId == null) {
      this.notiService.showError("Please Selecte Vertical", "Error");
      return false;
    }
    if (this.objSaveVerticalFunctionHiringmanager.hiringManagerAutoUserId == undefined || this.objSaveVerticalFunctionHiringmanager.hiringManagerAutoUserId == null) {
      this.notiService.showError("Please Select Hiring Manager", "Error");
      return false;
    }
    if (this.objSaveVerticalFunctionHiringmanager.functionId == undefined || this.objSaveVerticalFunctionHiringmanager.functionId == null) {
      this.notiService.showError("Please Select Function", "Error");
      return false;
    }

    return true;
  }
  onEdit(data: any) {
    this.onChangeVertical(data.verticalId);
    this.Operation = 'edit';
    this.isEditMode = true;
    this.objSaveVerticalFunctionHiringmanager = data;
  }


}
class SaveVerticalFunctionHiringmanager {
  hiringManagerFunctionId: number;
  verticalId: number;
  functionId: number;
  hiringManagerAutoUserId: number;
  isActive: boolean;
  createdBy: number;
}
