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
  selector: 'app-gradewise-docmap-details',
  templateUrl: './gradewise-docmap-details.component.html',
  styleUrls: ['./gradewise-docmap-details.component.css']
})
export class GradewiseDocmapDetailsComponent implements OnInit {

  createdBy: number;
  gradeWiseDocumentMapList: any[] = [];
  searchGradeWiseDocMaplist = {
    DocumentMapId: null,
    VerticalId: null,
    FunctionId: null,
    GradeId: null,
    IsActive:null
  }
  gradewiseDocMapDetailsList: any[] = [];
  searchGradeWiseDocMapDetailslist = {
    DocumentMapId: null
  }
  docMapId: any;
  verticalId: any;
  functionId: any;
  gradeId: any;
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
    this.docMapId = this.route.snapshot.params.mapId;
    this.verticalId = this.route.snapshot.params.verticalId;
    this.functionId = this.route.snapshot.params.functionId;
    this.gradeId = this.route.snapshot.params.gradeId;

  }

  ngOnInit() {
    this.tableOptionDropDown();
    this.loadDataTable();
    if (this.docMapId != undefined && this.verticalId != undefined && this.functionId != undefined && this.gradeId != undefined) {
      this.searchGradeWiseDocMaplist.DocumentMapId = Number(this.docMapId);
      this.searchGradeWiseDocMaplist.VerticalId = Number(this.verticalId);
      this.searchGradeWiseDocMaplist.FunctionId = Number(this.functionId);
      this.searchGradeWiseDocMaplist.GradeId = Number(this.gradeId);
      this.searchGradeWiseDocMapDetailslist.DocumentMapId = Number(this.docMapId);
      this.getAllGradewiseDocMappingList();
      this.getAllGradeWiseDocDetailsList();
    }
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

  getAllGradewiseDocMappingList() {
    this.spinnerService.show();
    this.edmsService.getAllGradeWiseDocMapList(this.searchGradeWiseDocMaplist).subscribe((response: any) => {
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
      this.spinnerService.hide();
    })
  }
  getAllGradeWiseDocDetailsList() {
    this.spinnerService.show();
    this.edmsService.getAllGradeWiseDocMapDetailsList(this.searchGradeWiseDocMapDetailslist).subscribe((response: any) => {
      if (response.length != 0) {
        this.gradewiseDocMapDetailsList = response;
      }
      else {
        this.gradewiseDocMapDetailsList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  onBackClick() {
    this.router.navigate(['/app/admin/gradewise-docmap-list'])
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
}
