import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { FunctionService } from '../../../services/common/function/function.service';
import { EdmsService } from '../../../services/common/edms/edms.service';
import { PositionService } from '../../../services/common/position/position.service';
import { IGrade, ISearchGrade } from '../../../interfaces/common/grade.interface';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { Router, ActivatedRoute, Route, Params, ActivatedRouteSnapshot } from '@angular/router'
declare var jQuery: any;

@Component({
  selector: 'app-gardewise-docmap-list',
  templateUrl: './gardewise-docmap-list.component.html',
  styleUrls: ['./gardewise-docmap-list.component.css']
})
export class GardewiseDocmapListComponent implements OnInit {

  searchFormCount: FormGroup;
  searchForm: FormGroup;
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  createdBy: number;
  selectedVerticalId: number;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;

  //grade
  gradeList: IGrade[] = [];
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
  gradeWiseDocumentMapList: any[] = [];
  gradeWiseDocumentCountList: any[] = [];

  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private gradeService: GradeService,
    private edmsService: EdmsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.createSearchForm();
    this.tableOptionDropDown();
    this.loadDataTable();
    this.getAllGrade();
    this.getAllVerticals();
    this.getAllDocumentCount();
    //this.getAllGradewiseDocMappingList();
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
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
    this.searchFormCount = this.fb.group({
      verticalId: null,
      functionId: null,
      gradeId: null,
    });
    this.searchForm = this.fb.group({
      verticalId: null,
      functionId: null,
      gradeId: null,
      isActive: null
    });
  }

  getAllDocumentCount() {
    this.spinnerService.show();
    this.edmsService.getAllGradeWiseDocCount(this.searchFormCount.value).subscribe((response: any) => {
      if (response.length != 0) {
        this.gradeWiseDocumentCountList = response;
        this.getAllGradewiseDocMappingList();
      }
      else {
        this.gradeWiseDocumentCountList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  getAllGradewiseDocMappingList() {
    this.spinnerService.show();
    this.edmsService.getAllGradeWiseDocMapList(this.searchForm.value).subscribe((response: any) => {
      if (response.length != 0) {
        this.gradeWiseDocumentMapList = response;
      }
      else {
        this.gradeWiseDocumentMapList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  getRequiredDocCount(docMapId) {
    var docCountObj = this.gradeWiseDocumentCountList.find(e => e.documentMapId == docMapId);
    if (docCountObj != undefined) {
      return docCountObj.documentCount;
    } else {
      return 0;
    }
  }
  changeVertical() {
    this.selectedVerticalId = this.searchForm.get("verticalId").value;
    this.getAllFunction();
  }
  //Function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }

  // Grade
  getAllGrade() {
    this.spinnerService.show();
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.gradeList = response;
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
  filter() {
    this.getAllGradewiseDocMappingList();
  }
  reset() {
    this.searchForm.reset();
    this.getAllGradewiseDocMappingList();

  }
  onClickNew() {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.router.navigate(['/app/admin/add-edit-gradewise-docmap', 0, false]);
    }, 100);
  }
  onClickEdit(data) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.router.navigate(['/app/admin/add-edit-gradewise-docmap', data.documentMapId, true]);
    }, 100);
  }
  onDetailsClick(data: any) {
    jQuery(".custom-menu").hide();
    setTimeout(() => {
      this.router.navigate(['/app/admin/gradewise-docmap-details', data.documentMapId, data.verticalId, data.functionId, data.gradeId]);
    }, 100);
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
