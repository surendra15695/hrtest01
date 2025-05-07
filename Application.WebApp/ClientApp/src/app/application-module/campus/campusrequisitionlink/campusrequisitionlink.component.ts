import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { IState, IDropDown } from 'src/app/interfaces/common/common.interface';
import {
  ICampusLink, ISearchCampusLink, ICampusLinkFormData, ICampusCollegeLinkFormData,
  ISharedCampusCollegeLink, ISearchCampusCollegeLinklSharedList, ISearchCampusRequisitionTitle, ICampusRequisitionTitleList
} from '../../../interfaces/campus/campusrequisition.interface';
import {
  ICampusYear, ISearchCampusYear, ICampusCollegeCategory, ICampusCollege, ISearchCampusCollege,
  ICampusCourseStream, ISearchCampusCourse, ICampusCourse, ICampusStream, ISearchCampusStream
} from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { CommonService } from '../../../services/common/common/common.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IEmailTemplate, ISearchEmailTemplate, } from '../../../interfaces/common/emailtemplate.interface';
import { EmailtemplateService } from '../../../services/common/emailtemplate/emailtemplate.service';
declare var jQuery: any;
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-campusrequisitionlink',
  templateUrl: './campusrequisitionlink.component.html',
  styleUrls: ['./campusrequisitionlink.component.css']
})
export class CampusrequisitionlinkComponent implements OnInit {
  @ViewChild('closeCollegeModal', { static: false }) cCollegeModal: ElementRef;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string
  searchCampusYear: ISearchCampusYear = {
    campusYearId: null,
    isActive: null
  }
  campusYears: ICampusYear[] = [];
  selectedCampusYear: number;
  courses: ICampusCourse[] = [];
  searchCourse: ISearchCampusCourse = {
    campusCourseId: null,
    isActive: true
  }
  modifiedTemplateDetails:any;
  modifiedtemplate:any;
  createdBy: number;
  campusLinks: ICampusLink[] = [];
  searchCampusLink: ISearchCampusLink = {
    campusCourseId: null,
    campusYearId: null,
    createdBy: null,
    campusLinkId: null
  }
  selectedLinkCampusForId: number;
  selectedLinkCampusCourseId: number;
  selectedLinkCampusYear: number;
  campusLinkTemplate: string;
  campusLinkFormData: any = {
    campusYearId: null,
    campusCourseId: null,
    campusForId: null,
    campusTemplate: null,
    createdBy: null,
    appurl:null
  }
  selectedCollegeCategoryId: number;
  selectedStateId: number;
  selectedCampusLink: ICampusLink;
  campusColleges: any[] = [];
  searchCampusCollege: ISearchCampusCollegeLinklSharedList = {
    campusLinkId: null,
    stateId: null,
    collegeCategoryId: null
  }
  states: IState[] = [];
  collegeCategories: ICampusCollegeCategory[] = [];
  campusCollegeIds: string = "";
  campusCollegeLinkFormData: ICampusCollegeLinkFormData = {
    campusLinkId: null,
    campusCollegeIds: null,
    createdBy: null
  }
  selectedCampusLinkId: number;
  searchCampusTitle: ISearchCampusRequisitionTitle = {
    campusYearId: null,
    campusCourseId: null
  }
  selectedLinkCampusRequisitionDetailId: number;
  requisitionTitle:ICampusRequisitionTitleList[]=[];
  emailTemplates: IEmailTemplate[] = [];
  searchEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 50,
    templateId: null,
    isActive: true
  }
  EmailTemplateDescription:string;
  selectedEmailTemplateId:number;
  verticalIds:string;
  verticals:any[]=[];
  campusFor:any[]=[];
  isSales:boolean=false;
  selectedCampusLinkIdData:number;
  selectedCampusLinkStatus:number;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private campusCommonService: CampuscommonService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private requisitionService: CampusrequisitionService,
    private _route: Router,
    private fb: FormBuilder,
    private emailTemplateService:EmailtemplateService
  ) {
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.getAllVerticals();
    this.SpinnerService.show();
    this.getAllCampusYear();
    this.courses = [];
    this.getAllCampusCourse();
    this.getAllCollegeCategory();
    this.getAllState();
  }

  

  getAllVerticals() {
    this.verticals = [];
    var splitvertical = this.verticalIds.split(",");
    var allvertical = "";
    for (var i = 0; i < splitvertical.length; i++) {
      if (splitvertical[i] != "0") {
        if (splitvertical[i] == "1") {
          this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
        }
        else if (splitvertical[i] == "2") {
          this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
        }
        else if (splitvertical[i] == "3") {
          this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
        }
        if (allvertical == "") {
          allvertical = splitvertical[i];
        }
        else {
          allvertical = allvertical + "," + splitvertical[i];
        }
      }
    }
    var salesid=0;
    for(var i=0;i<this.verticals.length;i++){
      if(this.verticals[i].verticalId==3){
        salesid=1;
        
      }
    }
    // if(salesid==1){
    //   this.campusFor.push({
    //     campusForId:2,
    //     campusForName:"Sales & Marketing"
    //   })
    //   this.isSales=true;
    // }
    // else{
    //   this.campusFor.push({
    //     campusForId:1,
    //     campusForName:"Corporate & Manufacture"
    //   })
    //   this.isSales=false;
    // }
    var roleIds = this.persistance.get('loggedinuser').roleIds.split(",");
    if(roleIds.includes("38")){
        this.campusFor.push({
          campusForId:1,
          campusForName:"Corporate & Manufacture"
      })
      this.isSales=false;
    }
    if(roleIds.includes("40")){
      this.campusFor.push({
        campusForId:2,
        campusForName:"Sales & Marketing"
      })
      this.isSales=true;
    }
  }

  getAllEligibilityEmailTemplate(typeid) {
    this.emailTemplates = [];
    this.searchEmailTemplate.templateTypeId=typeid;
    this.emailTemplateService.getAllEmailTemplate(this.searchEmailTemplate).subscribe((result) => {
      if (result) {
        this.emailTemplates = result;
      }
      else {
        this.emailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'specialchar,about,others,link',
      removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Table,Image,Maximize,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,RemoveFormat,Indent,Outdent,Blockquote'
    };
  }

  getAllState() {
    this.states = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.states = result;
      }
      else {
        this.states = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllCollegeCategory() {
    this.collegeCategories = [];
    this.campusCommonService.getAllCampusCollegeCategory().subscribe((result) => {
      if (result) {
        this.collegeCategories = result;
      }
      else {
        this.collegeCategories = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllCampusYear() {
    this.searchCampusYear.campusYearId = null;
    this.searchCampusYear.isActive = null;
    this.campusCommonService.getAllCampusYear(this.searchCampusYear).subscribe((response: any) => {
      if (response) {
        this.campusYears = response;
        this.selectedCampusYear = this.campusYears[0].campusYearId;
        this.getAllCampusLink(this.selectedCampusYear);
      }
      else {
        this.campusYears = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  getAllCampusCourse() {
    this.searchCourse.campusCourseId = null;
    this.searchCourse.isActive = true
    this.campusCommonService.getAllCampusCourse(this.searchCourse).subscribe((response: any) => {
      if (response) {
        this.courses = response;
      }
      else {
        this.courses = [];
      }
    }, error => {
      console.log(error);
    }, () => {

      this.SpinnerService.hide();
    })
  }

  changeCampusYear(evt) {
    this.getAllCampusLink(evt);
  }

  getAllCampusLink(campusYearId) {
    this.SpinnerService.show();
    this.searchCampusLink.campusYearId = campusYearId;
    this.searchCampusLink.createdBy = this.createdBy;
    this.requisitionService.getAllCampusLink(this.searchCampusLink).subscribe((response: any) => {
      if (response) {
        this.campusLinks = response;
      }
      else {
        this.campusLinks = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    })
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns": {
          "left": 2
        }
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

  generateCampusLink() {
    var flag = 0;
    var msg = "";
    if (this.campusLinkTemplate == undefined || this.campusLinkTemplate == "") {
      flag = 1;
      msg = "Please enter criteria";
    }
    else {
    }
    if (this.selectedLinkCampusForId == undefined) {
      flag = 1;
      msg = "Please select type";
    }
    else {
    }
    if (this.selectedLinkCampusCourseId == undefined) {
      flag = 1;
      msg = "Please select course";
    }
    else {
    }
    if (this.selectedLinkCampusYear == undefined) {
      flag = 1;
      msg = "Please select recruitment year";
    }
    else {
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.campusLinkFormData.campusYearId = this.selectedLinkCampusYear;
      this.campusLinkFormData.campusCourseId = this.selectedLinkCampusCourseId;
      this.campusLinkFormData.campusForId = this.selectedLinkCampusForId;
      this.campusLinkFormData.campusTemplate = this.campusLinkTemplate;
      this.campusLinkFormData.createdBy = this.createdBy;
      //this.campusLinkFormData.appurl = environment.campuslink;     
      this.campusLinkFormData.appurl = environment.campuslink+"/campusoffcampus";   // By Sayandeepon 05-08-2023
      this.requisitionService.createCampusLink(this.campusLinkFormData).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notificationService.showSuccess(response.msg, "Success");
          this.clearEntireForm();
          this.getAllCampusLink(this.selectedCampusYear);
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showError(response.msg, "Error");
          this.SpinnerService.hide();
        }
      }, error => {
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
        jQuery("#myModal1").modal('toggle');
      })
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

  clearEntireForm() {
    this.selectedLinkCampusYear = undefined;
    this.selectedLinkCampusForId = undefined;
    this.selectedLinkCampusCourseId = undefined;
    this.campusLinkTemplate = "";
    this.selectedEmailTemplateId=undefined;
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
    });
  }

  openShareLink(id) {
    this.selectedCampusLinkId = id;
    this.getAllCampusCollege();
  }

  getSelectedLink(id) {
    this.SpinnerService.show();
    this.searchCampusLink.campusLinkId = id;
    this.requisitionService.getAllCampusLink(this.searchCampusLink).subscribe((response: any) => {
      if (response) {
        this.selectedCampusLink = response[0];
        this.selectedLinkCampusCourseId = this.selectedCampusLink.campusCourseId;
        this.selectedLinkCampusYear = this.selectedCampusLink.campusYearId;
        this.selectedLinkCampusForId = this.selectedCampusLink.campusForId;
        this.campusLinkTemplate = this.selectedCampusLink.campusTemplate;
        this.SpinnerService.hide();
      }
      else {
        this.selectedCampusLink = null;
        this.SpinnerService.hide();
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    })
  }

  openLinkPopup() {
    this.selectedLinkCampusCourseId = undefined;
    this.selectedLinkCampusYear = undefined;
    this.selectedLinkCampusForId = undefined;
    this.campusLinkTemplate = "";
  }

  getAllCampusCollege() {
    this.SpinnerService.show();
    this.searchCampusCollege.collegeCategoryId = this.selectedCollegeCategoryId;
    this.searchCampusCollege.stateId = this.selectedStateId;
    this.searchCampusCollege.campusLinkId = this.selectedCampusLinkId;
    this.requisitionService.getAllCampusCollegeSharedLink(this.searchCampusCollege).subscribe((response: any) => {
      if (response) {
        this.campusColleges = response;
      }
      else {
        this.campusColleges = [];
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  searchColleges() {
    this.SpinnerService.show();
    this.searchCampusCollege.collegeCategoryId = this.selectedCollegeCategoryId;
    this.searchCampusCollege.stateId = this.selectedStateId;
    this.searchCampusCollege.campusLinkId = this.selectedCampusLinkId;
    this.requisitionService.getAllCampusCollegeSharedLink(this.searchCampusCollege).subscribe((response: any) => {
      if (response) {
        this.campusColleges = response;
      }
      else {
        this.campusColleges = [];
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  resetCollege() {
    this.selectedStateId = undefined;
    this.selectedCollegeCategoryId = undefined;
    this.getAllCampusCollege();
  }

  select(evt, id) {
    if (evt.target.checked) {
      this.campusCollegeIds = this.campusCollegeIds + "," + id;
    }
    else {
      this.campusCollegeIds = this.campusCollegeIds.replace("," + id, "");
    }
  }

  shareLink() {
    if (this.campusCollegeIds == "") {
      this.notificationService.showError("Please select colleges to share", "");
    }
    else {
      this.campusCollegeLinkFormData.campusCollegeIds = this.campusCollegeIds;
      this.campusCollegeLinkFormData.createdBy = this.createdBy;
      this.campusCollegeLinkFormData.campusLinkId = this.selectedCampusLinkId;
      this.SpinnerService.show();
      this.requisitionService.shareCampusLinkToCaollege(this.campusCollegeLinkFormData).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notificationService.showSuccess(response.msg, "Success");
          this.clearLinkForm();
          this.cCollegeModal.nativeElement.click();
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showError(response.msg, "Error");
          this.SpinnerService.hide();
        }
      }, error => {
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      })
    }
  }

  clearLinkForm() {
    this.selectedCollegeCategoryId = undefined;
    this.selectedStateId = undefined;
    this.resetCollege();

  }

  getRequisitionTitle() {
    this.requisitionTitle = [];
    this.requisitionTitle=[];
    if (this.selectedLinkCampusCourseId != undefined && this.selectedLinkCampusYear != undefined && this.selectedLinkCampusForId!=undefined) {
      this.searchCampusTitle.campusCourseId=this.selectedLinkCampusCourseId;
      this.searchCampusTitle.campusYearId=this.selectedLinkCampusYear;
      this.requisitionService.getAllCampusRequisitionTitle(this.searchCampusTitle).subscribe((response: any) => {
        if (response) {
          this.requisitionTitle = response;
          if(this.isSales==true){
            this.requisitionTitle=this.requisitionTitle.filter(x=>x.verticalId==2);
          }
          else{
            this.requisitionTitle=this.requisitionTitle.filter(x=>x.verticalId!=2);
          }
          //this.requisitionTitle=this.requisitionTitle.filter(x=>x.ca)
        }
        else {
          this.requisitionTitle = [];
        }
      }, error => {
        // display form values on success
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
      }, () => {
      })
    }
  }

  gotoCandidateList(id, data) {
    //debugger
    jQuery(".custom-menu").hide();
    var objBody = {
      campusLink: data.campusLink
    }
    setTimeout(()=>{
    this.persistance.set('pagename', "talentpool");
    this.persistance.set('paramid', id);
      this._route.navigate(['/app/talent-pool'], {
        queryParams: objBody, skipLocationChange: false
      });
    });
   
   
  }

  gotoSubmitTestResult(id){
    jQuery(".custom-menu").hide();
    setTimeout(()=>{
    this.persistance.set('pagename', "talentpool");
    this.persistance.set('paramid', id);
    this._route.navigate(['/app/campus/submit-test-result']);});
  }

  changeEmailTemplate() {
    var templatedescription = this.emailTemplates.filter(x => x.templateId == this.selectedEmailTemplateId)[0].templateDescription;
    
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    this.EmailTemplateDescription = templatedescription
    this.campusLinkTemplate= templatedescription;
  }

  changeVerticalTemplate(){
    this.campusLinkTemplate = "";
    this.selectedEmailTemplateId=undefined;
    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
    });
    if(this.selectedLinkCampusForId==1){
      this.getAllEligibilityEmailTemplate(50);
    }
    else{
      this.getAllEligibilityEmailTemplate(51);
    }
  }

  onDeleteSubmit(){
    var formData={
      campusLinkId:this.selectedCampusLinkIdData,
      Status:this.selectedCampusLinkStatus
    }
    this.requisitionService.enableDisableCampusLink(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.getAllCampusLink(this.selectedCampusYear);
        jQuery("#confirmPopup").modal('toggle');
        this.SpinnerService.hide();
      }
      else {
        this.notificationService.showError(response.msg, "Error");
        this.SpinnerService.hide();
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  openEnableDisableModal(data,status){
    this.selectedCampusLinkIdData=data.campusLinkId;
    this.selectedCampusLinkStatus=status;
  }

  openModifyTemplate(data){
    this.modifiedTemplateDetails=data;
    this.modifiedtemplate=data.campusTemplate;
  }
  updatetemplate(){
    
    this.SpinnerService.show();
    var value={
      CampusLinkId:Number(this.modifiedTemplateDetails.campusLinkId),
      CampusLinkTemplate:this.modifiedtemplate.toString(),
      IsActive:true,
      CampusYearId:Number(this.modifiedTemplateDetails.campusYearId),
      CreatedBy:this.createdBy
    }
    this.requisitionService.updateCampusLink(value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.getAllCampusLink(this.selectedCampusYear);
        jQuery("#modifytemplate").modal('toggle');
        this.SpinnerService.hide();
      }
      else {
        this.notificationService.showError(response.msg, "Error");
        this.SpinnerService.hide();
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
      jQuery("#modifytemplate").modal('toggle');
    })
  }
}
