import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { InterviewService } from 'src/app/services/common/interview/interview.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { InterviewcalendaractionService } from 'src/app/services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service';
import { IEmailTemplate, ISearchEmailTemplate } from 'src/app/interfaces/common/emailtemplate.interface';
import { EmailtemplateService } from 'src/app/services/common/emailtemplate/emailtemplate.service';
import { IDocumentCollectionFormData } from 'src/app/interfaces/offer/candidatedocument.interface';
import { CandidateofferdocumentService } from 'src/app/services/offer/candidateofferdocument/candidateofferdocument.service';
import { ManagementapprovalService } from 'src/app/services/offer/managementapproval/managementapproval.service';

declare var jQuery: any;
declare var html2pdf: any;
@Component({
  selector: 'app-off-campus-requisition-lsit-view-candidates',
  templateUrl: './off-campus-requisition-lsit-view-candidates.component.html',
  styleUrls: ['./off-campus-requisition-lsit-view-candidates.component.css']
})
export class OffCampusRequisitionLsitViewCandidatesComponent implements OnInit {

  @ViewChild('pfromDate', { static: false }) pfDate: ElementRef;
  @ViewChild('ptoDate', { static: false }) ptDate: ElementRef;
  @ViewChild('ifromDate', { static: false }) ifDate: ElementRef;
  @ViewChild('itoDate', { static: false }) itDate: ElementRef;
  @ViewChild('closeActionModal', { static: false }) caModal: ElementRef;
  @ViewChild('closeselectionModel', { static: false }) cfModal: ElementRef;
  @ViewChild('closeInterviewClarificationModal', { static: false }) cInterviewClarificationModal: ElementRef;
  @ViewChild('closeManagementApprovalModal', { static: false }) closeManagementApprovalModal: ElementRef;
  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
  requisitionDeatilId:number;
  managementfileToUpload: File = null;
  verticalIds : any;
  autoUserId:any;
  canidateName:string="";
  functionname:string="";
  emailId:string="";
  candidateId:any;
  interviewMasterId:number;
  interviews:any[]=[]
  interviewDetailsData:any=[];
  isVisibleStageGetAssesment:boolean=false;
  searchInterviewEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 100,
    templateId: null,
    isActive: true
  }
  selectedInterviewEmailTemplateId: number;
  interviewemailTemplates: IEmailTemplate[] = [];
  selectAll: boolean = false;
  prevselectedstatus: number = 0;
  candidateIds: string = "";
  callngIfFunction: boolean = true;
  documentCollectionEmailTemplates: IEmailTemplate[] = [];
  searchDocumentCollectionEmailTemplate: ISearchEmailTemplate = {
    templateTypeId: 4,
    templateId: null,
    isActive: true
  }
  documentCollectionEmailTemplateDescription: string;
  candidateIdString : string = "";
  documentCollectionFormData: IDocumentCollectionFormData = {
    offerDocumentCollectionId: 0,
    requsitaionDetailsId: 0,
    candidateId: "",
    emailTemplateId: 0,
    emailTemplate: "",
    createdBy: 0
  }
  requisitionType: any;
  campusrequisitionLists: any[] = [];
  invalidFileName:boolean=false;
  constructor(
    private _route: Router,
    private interViewService: InterviewService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private requisitionService: CampusrequisitionService,
    private emailtemplateService: EmailtemplateService,
    private candidateOfferDocumentService: CandidateofferdocumentService,
    private managementApprovalService: ManagementapprovalService
  ) { 
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId; 
    var roleIds=this.persistance.get('loggedinuser').roleIds.split(",");
    this.requisitionDeatilId = this.persistance.get('requisitionDetailId')
    this.getAllInterviewEmailTemplate();
    this.getAllCampusRequisitionList()
  }

  ngOnInit() {
    this.loadTooltipMenu();
    this.loadDataTable();
    this.loadSelectPicker();
  }
  getAllInterviewEmailTemplate() {
    this.interviewemailTemplates = [];
    this.emailtemplateService.getAllEmailTemplate(this.searchInterviewEmailTemplate).subscribe((result) => {
      if (result) {
        this.interviewemailTemplates = result;
      }
      else {
        this.interviewemailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      
    });
  }

  onCLickSelect(data){
      this.canidateName=data.fullName;
      this.functionname= data.functionName;
      this.emailId=data.emailId;
      this.candidateId= data.candidateId
  }
  onCheckSelectAll(eve) {
    var firstHiringStatusId = this.candidateList[0].statusname;
    var flag = 0;
    this.candidateList.forEach(element => {
      if (element.statusname != firstHiringStatusId) {
        flag = 1
      }
    })
    if (flag == 0) {
      this.candidateList.forEach(element => {
        element.checked = eve.target.checked;
      })
    } else {
      jQuery("#ani").prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
    //console.log("chck",this.candidateList)
  }
  getSelectAllValue(data) {
    return this.selectAll;
  }
  getEnableStatus(data) {
    // console.log("find",data)
    return data.checked;
  }
  onCheckRowWise(data, eve, index) {
    // console.log(data)
    if (this.GetSelectedHiringStatus(data)) {
      data.checked = eve.target.checked;
    } else {
      jQuery("#" + index).prop("checked", false);
      this.notificationService.showError("Please select same hiring status", "Error");
    }
  }
  GetSelectedHiringStatus(NewRow) {
    var AlredyChecked = this.candidateList.find(e => e.checked);
    if (AlredyChecked == null) {
      return true;
    } else {
      return AlredyChecked.statusId == NewRow.statusId;
    }
  }
  showBtnDocumentCollection() {
    var CheckedObj = [];
    CheckedObj = this.candidateList.filter(e => e.checked == true && e.statusId == 21);
    if (CheckedObj.length > 0) {
      var doccollection = CheckedObj.find(e => e.checked == true && e.statusId == 21);
      if (doccollection == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  showBtnMgmtApproval(){
    var CheckedObj = [];
    CheckedObj = this.candidateList.filter(e => e.checked == true && e.statusId == 38);
    if (CheckedObj.length > 0) { 
      var doccollection = CheckedObj.find(e => e.checked == true && e.statusId == 38);
      if (doccollection == null) {
        return false;
      } else {
        return true;
      }
    }
  }

  showUploadmgmtApproval(){
    var CheckedObj = [];
    CheckedObj = this.candidateList.filter(e => e.checked == true && e.statusId == 39);
    if (CheckedObj.length > 0) { 
      var doccollection = CheckedObj.find(e => e.checked == true && e.statusId == 39);
      if (doccollection == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  openDocumentCollectionModal() {
    this.candidateIdString = "";
    var cFlag = 0;
    var templatedescription = "";
    var searchObjDocumentCollectionEmailTemplate = {
      templateTypeId: 40,
      templateId: null,
      isActive: true
    }
    var documentCollectionTemplateList = [];
    this.documentCollectionEmailTemplates = [];
    this.candidateList.forEach(element => {
      if (element.checked && (element.statusId == 21)) {
        this.candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
        cFlag = 1;
      }
    })
    //console.log("canid",this.candidateList)
    this.emailtemplateService.getAllEmailTemplate(searchObjDocumentCollectionEmailTemplate).subscribe((result) => {
      if (result) {
        documentCollectionTemplateList = result;
        templatedescription = documentCollectionTemplateList[0].templateDescription;

        setTimeout(() => {
          jQuery(".cke_wysiwyg_div").html("");
          jQuery(".cke_wysiwyg_div").html(templatedescription);
        });
        this.documentCollectionEmailTemplateDescription = templatedescription

      }
      else {
        this.documentCollectionEmailTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });


  }
  SendDocumentCollectionCandidate() {
    //console.log("candidateid",this.candidateIdString)
    this.SpinnerService.show();
    this.documentCollectionFormData.offerDocumentCollectionId = 0;
    this.documentCollectionFormData.candidateId = this.candidateIdString.toString();
    this.documentCollectionFormData.requsitaionDetailsId = this.requisitionDeatilId;
    this.documentCollectionFormData.emailTemplateId = 6;
    this.documentCollectionFormData.emailTemplate = this.documentCollectionEmailTemplateDescription;
    this.documentCollectionFormData.createdBy = this.autoUserId; // added on 30-01-2025 by anif
    this.candidateOfferDocumentService.CampusaddCandidateOfferDocument(this.documentCollectionFormData).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery("#documentCollectionModal").modal('toggle');
          this.loadDataTable();
          this.getAllCampusRequisitionList();

          //this.getFilterCandidateList();
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  gotoSalaryFitmentPage(values){
    this.persistance.set("candidateId",values.candidateId);
    this.persistance.set("paramid",this.requisitionDeatilId);
    this.persistance.set("pagename","offsalary");
    this._route.navigate(['app/my-action/all-positions/campus-candidate/salary-fitment']);
  }
  interviewEmailTemplateDescription:any;
  changeInterviewEmailTemplate() {
    if (this.selectedInterviewEmailTemplateId != undefined) {
      
      var templatedescription = this.interviewemailTemplates.filter(x => x.templateId == this.selectedInterviewEmailTemplateId)[0].templateDescription;
      //  templatedescription = templatedescription.replace("@~@candidateName", this.canidateName);
      //  templatedescription = templatedescription.replace("@~@functionName", this.functionname);
      
    }
   

    setTimeout(() => {
      jQuery(".cke_wysiwyg_div").html("");
      jQuery(".cke_wysiwyg_div").html(templatedescription);
    });
    this.interviewEmailTemplateDescription = templatedescription
    
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
          "left": 3
        }
      });
    });
  }
candidateList:any=[]
  getAllCampusRequisitionList() {
    this.SpinnerService.show();
    var value ={
      RequistionDeatilsId:this.requisitionDeatilId
    }
    this.requisitionService.ViewCanidateListByRequisition(value).subscribe((response: any) => {
      if (response) {
        this.candidateList = response;
       // console.log(this.candidateList);
      }
      else {
        this.candidateList = [];
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
     // console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    })
  }
  gotoRequisitionDeatils(){
    this._route.navigate(['app/offcampus/requisition-list']);
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
  loadPopover() {
    setTimeout(() => {
      jQuery('[data-toggle="popover"]').popover({
        html: true
      });
    });
  }
  closeselectionModel(){
    this.selectedInterviewEmailTemplateId=null;
    this.interviewEmailTemplateDescription="";
    jQuery("#selectionModel").modal('toggle');
  }
  showBtnSendselection(){
    var CheckedObj = [];
    CheckedObj = this.candidateList.filter(e => e.checked == true && e.statusId == 12);
    if (CheckedObj.length > 0) {
      var sendselection = CheckedObj.find(e => e.checked == true && e.statusId == 12);
      if (sendselection == null) {
        return false;
      } else {
        return true;
      }
    }
  }
  openSelectionModal(){
    this.candidateId="";
    var cFlag = 0;
    this.candidateList.forEach(element => {
      if (element.checked && (element.statusId == 12)) {
        this.candidateId += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
        this.canidateName += (cFlag == 0 ? "" : ",") + element.fullName.toString();
        this.functionname += (cFlag == 0 ? "" : ",") + element.functionName.toString();
        this.emailId += (cFlag == 0 ? "" : ",") + element.emailId.toString();
        cFlag = 1;
      }
    })
    //console.log("values",this.candidateId,this.canidateName,this.functionname,this.emailId)
  }
  oncickSelectioModel(){
    var value={
      CandidateIds:this.candidateId.toString(),
      CandiateName:this.canidateName,
      Emails:this.emailId,
      Functions:this.functionname,
      Template: this.interviewEmailTemplateDescription,
      CreatedBy:this.autoUserId,
      RequisitionDetailsId: this.requisitionDeatilId
    }
    this.requisitionService.updateselectioncomunication(value).subscribe((result: any) => {
      if (result) {
        if (result.successFlag == 0) {
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.notificationService.showSuccess(result.msg, "Success");
          
        }
      }
      else {
      }
    }, error => {
      // display form values on success
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.closeselectionModel();
      this.getAllCampusRequisitionList();
      this.SpinnerService.hide();
    })
  }
  gotoMgmtApproval(){
    jQuery(".custom-menu").hide();
    var candidateIdNames = [];
    var cFlag = 0;
    this.candidateList.forEach(element => {
      if (element.checked && (element.statusId == 38)) {
        candidateIdNames.push({
          candidateId: element.candidateId,
          candidateName: element.fullName
        })
        //this.candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
        cFlag = 1;
      }
    })
    
    this.persistance.set("requisitionDetailId",this.persistance.get("requisitionDetailId"))
    this.persistance.set("candidateId",candidateIdNames);
    this._route.navigate(['/app/campus/candidate/management-approval'])
  }
  gotoViewMgmtApproval(data){
    jQuery(".custom-menu").hide();
    var candidateIdNames = [];
    candidateIdNames.push({
      candidateId: data.candidateId,
      candidateName: data.fullName
    })
    this.persistance.set("requisitionDetailId",this.persistance.get("requisitionDetailId"))
    this.persistance.set("candidateId",candidateIdNames);
    this._route.navigate(['/app/campus/candidate/management-approval-view'])
  }
  openUploadmgmtApproval(){
    this.candidateIdString = "";
    var cFlag = 0;
    this.candidateList.forEach(element => {
      if (element.checked && (element.statusId == 39)) {
        this.candidateIdString += (cFlag == 0 ? "" : ",") + element.candidateId.toString();
        cFlag = 1;
      }
    })
  }
  onFileChange(event) {
    const files = event.target.files;
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    if (files.length === 0) {
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
    } else {
      this.managementFileImport.nativeElement.innerText = files[0].name;
      this.managementfileToUpload = files.item(0);
    }
  }
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }
  UploadManagementApproval() {
    if (this.managementfileToUpload == null) {
      this.notificationService.showError("Please attach the management approval document !!", "Error");
    }
    else {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CreatedBy", this.autoUserId.toString());
      formData.append("RequisitionDetailId", this.requisitionDeatilId.toString());
      formData.append("CandidateIds", this.candidateIdString.toString());
      formData.append("ManagementApprovalFile", this.managementfileToUpload);
      this.managementApprovalService.campusCandidateuploadManagementApproval(formData).subscribe((result) => {
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.getAllCampusRequisitionList();
          this.notificationService.showSuccess(result.msg, "Success");
          this.managementfileToUpload = null;
          this.managementFileImport.nativeElement.innerText = "Choose file";
          this.closeManagementApprovalModal.nativeElement.click();
          //this.btnUploadManagementApprovalVisible = false;
          this.candidateIdString = "";
          
        }
      }, error => {
        console.log(error);
        this.SpinnerService.show();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
  }
  onChangeRequisitionType () {
    let searchdata = {
      RequisitionDetailId: null,
      IsDummy: Number(this.requisitionType)
    }
    this.requisitionService.getRequisitionListForRequisitionMapping(searchdata).subscribe((result) => {
      if (result) {
        this.campusrequisitionLists = result;
       // console.log("Requsition List", this.campusrequisitionLists);

      }
      else {
        this.campusrequisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });

  }
  mapReqCandiate:any;
  openMapReq(data){
    this.mapReqCandiate=Number(data.candidateId);
  }
  closeRequisitionModal(){
    jQuery("#requisitionModal").modal('toggle');
    this.mapReqCandiate=0;
    this.requisitionType="";
    this.selectedRequisitionDetailId="";
  }
  selectedRequisitionDetailId:any;
  onMapRequisition(){
    var value ={
      CandidateId:Number(this.mapReqCandiate),
      RequistionType: Number(this.requisitionType),
      SelectedRequitionDetails:Number(this.selectedRequisitionDetailId),
      CreatedBy : Number(this.autoUserId)
    }

    this.requisitionService.InsertUpdateMapRequistion(value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notificationService.showSuccess(response.msg, "Success");
        this.SpinnerService.hide();
        this.closeRequisitionModal()
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
  gotoSendOfferLetter(values) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "offcampuscandidatelist");
    this.persistance.set('nextpagename', "sendofferletter");
    this.persistance.set('candidateId', values.candidateId);
    this.persistance.set('paramid', this.requisitionDeatilId);
    this.persistance.set('candidatename', values.fullName);
    this.persistance.set('candidateno', values.candidateNo);
    this._route.navigate(['/app/my-action/all-positions/candidate/campus-send-offer-letter']);
  }
  gotoViewDocuments(candidateId, requisitionDetailId) {
    jQuery(".custom-menu").hide();
    this.persistance.set('pagename', "offCampuscandidatemanagement");
    this.persistance.set('nextpagename', "offcampuscandidatedocuments");
    this.persistance.set('candidateId', candidateId);
    // this.persistance.set('paramid', this.requisitionDetailId);
    this.persistance.set('paramid', requisitionDetailId);
    this._route.navigate(['app/CampusViewDocumentComponent']);
  }
}


