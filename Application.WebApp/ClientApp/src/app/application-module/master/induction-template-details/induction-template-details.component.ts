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
import { Router, ActivatedRoute, Route, Params, ActivatedRouteSnapshot } from '@angular/router';
import { InductionassessmentService } from '../../../services/common/inductionassessment/inductionassessment.service';
declare var jQuery: any;

@Component({
  selector: 'app-induction-template-details',
  templateUrl: './induction-template-details.component.html',
  styleUrls: ['./induction-template-details.component.css']
})
export class InductionTemplateDetailsComponent implements OnInit {

  createdBy: number;
  inductionTemplateId: number;
  searchInductionTemplate = {
    inductionTemplateId: null,
    isActive: null,
    isBatch: null
  }
  inductionTemplateDetailsList: any[] = [];
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
    private fb: FormBuilder,
    private inductionassessmentService: InductionassessmentService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.inductionTemplateId = this.route.snapshot.params.templateid;
    this.searchInductionTemplate.inductionTemplateId = Number(this.inductionTemplateId);
    this.getInductionTemplateDetails();

  }

  ngOnInit() {
    this.loadDataTable();
    this.tableOptionDropDown();
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
  getInductionTemplateDetails() {
    this.spinnerService.show();
    this.inductionassessmentService.getAllInductionTemplateDetails(this.searchInductionTemplate).subscribe((result) => {
      if (result) {
        this.inductionTemplateDetailsList = result;
        this.spinnerService.hide();
      }
      else {
        this.inductionTemplateDetailsList = [];
        this.spinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.loadDataTable();
      this.spinnerService.hide();
    });
  }
  onBackClick() {
    this.router.navigate(["/app/admin/induction-template"]);
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
