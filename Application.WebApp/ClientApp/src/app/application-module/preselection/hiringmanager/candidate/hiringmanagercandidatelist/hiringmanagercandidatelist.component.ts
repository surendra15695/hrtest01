import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ICandidateDetailData, ISearchCandidateDetail } from '../../../../../interfaces/preselection/candidate.interface';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { CandidateService } from '../../../../../services/preselection/candidate/candidate.service';
declare var jQuery: any;

@Component({
  selector: 'app-hiringmanagercandidatelist',
  templateUrl: './hiringmanagercandidatelist.component.html',
  styleUrls: ['./hiringmanagercandidatelist.component.css']
})
export class HiringmanagercandidatelistComponent implements OnInit {
  btnVisible: boolean = false;
  candidates: ICandidateDetailData[] = [];
  searchCandidate: ISearchCandidateDetail = {
    CandidateId: 0,
    CandidateName: "",
    HiringStatusId: 0,
    GenderIds: "",
    FromAge: 0,
    ToAge: 0,
    AadharNo: "",
    ContactNo: "",
    EmailId: "",
    MotherTongueIds: "",
    QualificationIds: "",
    CourseIds: "",
    StreamIds: "",
    FromPercentage: 0,
    ToPercentage: 0,
    DomainIds: "",
    SubDomainIds: "",
    StateIds: "",
    SourceChannelId: "",
    CreatedBy: 0,
    RequisitionDetailId: 0,
    FromDate: "",
    ToDate: "",
    FromExperience: 0,
    ToExperience: 0,
    CompletionYears: "",
    QualificationTypeIds: "",
    CurrentEmployer: "",
    Designation: "",
    RelativeStatus: "",
    PreviousApplied: 0
  }
  requisitionDetailId: number;
  isSourceChannelId: number;
  functionId: number;
  createdBy: number;
  candidateIds: string;
  constructor(
    private _route: Router,
    private candidateService: CandidateService,
    private persistance: PersistanceService,
  ) {

    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "corporatehiringmanagerrequisitionlist" ||
        this.persistance.get('pagename') == "planthiringmanagerrequisitionlist" ||
        this.persistance.get('pagename') == "saleshiringmanagerrequisitionlist"
      ) {
        this.requisitionDetailId = this.persistance.get('paramid');
        this.isSourceChannelId = this.persistance.get('hrStatus');
        this.functionId = this.persistance.get('functionId');
        this.getCandidateList();
      } else {
        if (this.persistance.get('pagetype') == "corporate") {
          this._route.navigate(['/app/corporate/all-requisition']);
        }
        else if (this.persistance.get('pagetype') == "plant") {
          this._route.navigate(['/app/plant/all-requisition']);
        }
        else if (this.persistance.get('pagetype') == "sales") {
          this._route.navigate(['/app/sales/all-requisition']);
        }
      }
    }
    else {
      if (this.persistance.get('pagetype') == "corporate") {
        this._route.navigate(['/app/corporate/all-requisition']);
      }
      else if (this.persistance.get('pagetype') == "plant") {
        this._route.navigate(['/app/plant/all-requisition']);
      }
      else if (this.persistance.get('pagetype') == "sales") {
        this._route.navigate(['/app/sales/all-requisition']);
      }
    }
  }

  ngOnInit() {
    this.loadTooltipMenu();
    //this.openNav();
    //this.closeNav();
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  getCandidateList() {
    this.candidates = [];
    this.searchCandidate.RequisitionDetailId = this.requisitionDetailId;
    console.log(this.searchCandidate);
    this.candidateService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidates = result;
        console.log(result);
      }
      else {
        this.candidates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadDataTable();
    });
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "order":[],
        "fixedColumns": 
          {"left": 3}
      });
    });
  }

  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.custom-menu');
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
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }

  selectAll(event) {
    jQuery('#dataTable1 tr').each(function () {
      jQuery(this).find("input[type=checkbox]").attr("checked", event.target.checked);
    });
  }
  select(event) {
    jQuery(this).find("input[type=checkbox]").attr("checked", event.target.checked);
    var candidates = "";
    jQuery('#dataTable1 tbody tr').each(function () {
      alert("Hi");
      if (jQuery(this).find("input[type=checkbox]").attr("checked")) {
        alert("Hi");
        var idval = jQuery(this).find("input[type=checkbox]").val();
        if (candidates == "") {
          candidates = idval;
        }
        else {
          candidates += "," + idval;
        }
      }

    });
  }

  getCandidateIds() {
    var dothis = this;
    var candidates = "";
    jQuery('#dataTable1 tr').each(function () {
      if (jQuery(this).find("input[type=checkbox]").attr("checked")) {
        var idval = jQuery(this).find("input[type=checkbox]").val();
        if (candidates == "") {
          candidates = idval;
        }
        else {
          candidates += "," + idval;
        }
      }

    });
    dothis.candidateIds = candidates;
  }

  gotoCandidateAction(id: any) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "hiringmanagerrequisitionlist");
    this.persistance.set('nextpagename', "hiringmanagercandidateaction");
    this.persistance.set('candidateid', id);
    this.persistance.set('paramid', this.requisitionDetailId);
    this._route.navigate(['/app/my-action/all-requisition/candidate-list/candidate']);
  }

  gotoRequisitionList() {
    if (this.persistance.get('pagename') == "corporatehiringmanagerrequisitionlist"
    ) {
      this._route.navigate(['/app/corporate/all-requisition']);
    }
    else if (this.persistance.get('pagename') == "planthiringmanagerrequisitionlist") {
      this._route.navigate(['/app/plant/all-requisition']);
    }
    else if (this.persistance.get('pagename') == "saleshiringmanagerrequisitionlist") {
      this._route.navigate(['/app/sales/all-requisition']);
    }
  }

}
