import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateTravelReimbursementDetails, IEmployeeTravelAttachmentDetails, IEmployeeTravelJourneyDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement, ISearchCandidateTravelReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { IFormFiles, IFormFilesTravel } from 'src/app/interfaces/common/common.interface';
declare var jQuery: any;
declare var html2pdf: any;
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-cdtrabelreimbursementdetails',
  templateUrl: './cdtrabelreimbursementdetails.component.html',
  styleUrls: ['./cdtrabelreimbursementdetails.component.css']
})
export class CdtrabelreimbursementdetailsComponent implements OnInit {
  travelReimbursementData: any = {};
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateTravelReimbursementId: number;
  approvalRemarks: string="";
  @ViewChild('journeyDate', { static: false }) journeyDate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  attachmentfileToUpload: File;
  attachemntFileName: string = "";
  searchCandidateTravelReimbursement: ISearchCandidateTravelReimbursement = {
    candidateId: null,
    candidateTravelReimbursementId: null,
  }
  candidateTravelReimbursementList: ICandidateTravelReimbursementDetails;
  candidateTravelJourneyDetails: IEmployeeTravelJourneyDetails[] = [];
  candidateAttachmentDetails: IEmployeeTravelAttachmentDetails[] = [];
  journeyTypeList: any[] = [];
  modeOfJourney: any[] = [];
  billType: any[] = [];
  objJourneyDetails: JourneyDetails;
  journeyDetailsArray: any[] = [];
  objJourneyAttachment: JourneyAttachment;
  travelAttachementDetailsArray: any[] = [];
  candidateName: string;
  designationName: string;
  gradeName: string;
  dateOfInduction: string;
  placeOfInduction: string;
  fileUpload: IFormFilesTravel[] = [];
  mode: string;
  ForPrintRemarks: any[];
  // For Preview file
  selectedPdf1?: Blob;
  pdfURL1: any;
  previousJourneyId: string = "";
  previousAttachmentId: string = "";
  approvalStatus: string; //Argg
  file: File;
  joiningTravelReimbursementForPDF = {
    candidateFullName: '',
    designationName: '',
    gradeName: '',
    dateofInduction: '',
    placeofInductionDesc: '',
    employeeTravelJourneyDetails: []
  }
  totalAmount: number = 0;
  invalidFileName:boolean=false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService, private sant: DomSanitizer
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    //this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    //this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.objJourneyDetails = new JourneyDetails();
    this.objJourneyAttachment = new JourneyAttachment();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateTravelReimbursementId = params['CandidateTravelReimbursementId'];
      // this.approvalRemarks = params['ApprovalRemarks'];
      this.approvalStatus = params['ApprovalStatus']; //Argg
      this.mode = params['Mode'];
    });
    //this.searchCandidateTravelReimbursement.candidateId = this.candidateId;
    this.searchCandidateTravelReimbursement.candidateId = Number(this.candidateId);
    this.searchCandidateTravelReimbursement.candidateTravelReimbursementId = Number(this.candidateTravelReimbursementId);
    this.updateDropdownArray();
    //   this.createNewGridArray()
    this.getCandidateTravelReimbursementDetails();
  }

  ngOnInit() {
    this.loadDatePicker();
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  updateDropdownArray() {
    this.journeyTypeList = [];
    this.modeOfJourney = [];
    this.billType = [];
    this.journeyTypeList.push({ JourneyTypeId: "1", JourneyTypeName: "Onward Journey" }, { JourneyTypeId: "2", JourneyTypeName: "Return Journey" });
    this.modeOfJourney.push({ TravelModeId: "1", TravelModeName: "Bus" }, { TravelModeId: "2", TravelModeName: "Taxi" },
      { TravelModeId: "3", TravelModeName: "Train" }, { TravelModeId: "4", TravelModeName: "Air" });
    this.billType.push({ TicketId: "1", TicketName: "Train/Bus/Air ticket" }, { TicketId: "2", TicketName: "Boarding Pass" }, { TicketId: "3", TicketName: "Taxi Bills" })
  }
  createNewGridArray() {
    let journeyArrayObj = {
      candidateTravelReimbursementId: null,
      candidateTravelReimbursementJourneyId: null,
      journeyTypeId: null,
      reportingLocation: "",
      from: "",
      to: "",
      travelModeId: null,
      claimAmount: null,
      createdBy: this.loginUserId,
      journeyDate: "",
      isReadOnly: false
    }
    this.journeyDetailsArray.push(journeyArrayObj);
    let attachmentArrayObj = {
      CandidateTravelReimbursementId: null,
      CandidateTravelReimbursementAttachmentId: null,
      JourneyTypeId: null,
      TicketId: null,
      AttachmentFile: "",
      AttachmentLink: "",
      CreatedBy: null,
      isReadOnly: false
    }
    this.travelAttachementDetailsArray.push(attachmentArrayObj);

  }
  getCandidateTravelReimbursementDetails() {
    this.previousJourneyId = "";
    this.candidateService.getCandidateTravelReimbursementDetails(this.searchCandidateTravelReimbursement).subscribe((result) => {
      if (result) {
        this.candidateTravelReimbursementList = result;
       // console.log("Travel Reimbursement Details", this.candidateTravelReimbursementList);

        this.candidateName = this.candidateTravelReimbursementList.candidateFullName;
        this.designationName = this.candidateTravelReimbursementList.designationName;
        this.gradeName = this.candidateTravelReimbursementList.gradeName;
        this.dateOfInduction = this.candidateTravelReimbursementList.dateofInduction;
        this.placeOfInduction = this.candidateTravelReimbursementList.placeofInductionDesc;
        this.updateDropdownArray();
        if ((this.candidateTravelReimbursementList.approvalStatus == 0 || this.candidateTravelReimbursementList.approvalStatus == 2) && this.mode == "Edit") {
          this.journeyDetailsArray.push(this.objJourneyDetails);
          this.travelAttachementDetailsArray.push(this.objJourneyAttachment);
        }
        if (this.candidateTravelReimbursementList.employeeTravelJourneyDetails.length > 0) {
          this.candidateTravelReimbursementList.employeeTravelJourneyDetails.forEach(element => {
            let jdObj = {
              candidateTravelReimbursementId: element.candidateTravelReimbursementId,
              candidateTravelReimbursementJourneyId: element.candidateTravelReimbursementJourneyId,
              journeyTypeId: element.journeyTypeId,
              reportingLocation: element.reportingLocation,
              from: element.from,
              to: element.to,
              travelModeId: element.travelModeId,
              claimAmount: element.claimAmount,
              createdBy: element.createdBy,
              isReadOnly: true,
            }
            this.journeyDetailsArray.push(jdObj);
            this.previousJourneyId += (this.previousJourneyId == "" ? (element.candidateTravelReimbursementJourneyId.toString()) : ("," + element.candidateTravelReimbursementJourneyId.toString()));

          })
        }
        if (this.candidateTravelReimbursementList.employeeTravelAttachmentDetails.length > 0) {
          this.candidateTravelReimbursementList.employeeTravelAttachmentDetails.forEach(element => {
            let jaObj = {
              candidateTravelReimbursementId: element.candidateTravelReimbursementId,
              candidateTravelReimbursementAttachmentId: element.candidateTravelReimbursementAttachmentId,
              journeyTypeId: element.journeyTypeId,
              ticketId: element.ticketId,
              attachmentFile: element.attachmentFile,
              attachmentLink: element.attachmentLink,
              createdBy: element.createdBy,
              isReadOnly: true
            }
            this.travelAttachementDetailsArray.push(jaObj);
            this.previousAttachmentId += (this.previousAttachmentId == "" ? (element.candidateTravelReimbursementAttachmentId.toString()) : ("," + element.candidateTravelReimbursementAttachmentId.toString()));
          })
        }
        if (this.candidateTravelReimbursementList.employeeTravelForRemarks.length > 0) {
          this.ForPrintRemarks = [];
          for (var i = 0; i < this.candidateTravelReimbursementList.employeeTravelForRemarks.length; i++) {
            let obj = {
              printName: this.candidateTravelReimbursementList.employeeTravelForRemarks[i].fullName,
              printRemarks: this.candidateTravelReimbursementList.employeeTravelForRemarks[i].approvalRemarks,
            }
            this.ForPrintRemarks.push(obj);
          }
        }//arg
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getJourneyTypeName(JTypeId) {
    return this.journeyTypeList.find(e => e.JourneyTypeId == JTypeId).JourneyTypeName;
  }
  getTravelModename(TModeId) {
    return this.modeOfJourney.find(e => e.TravelModeId == TModeId).TravelModeName;
  }
  onClickAddJourneyDetails(jd) {
    var flag = 0;
    var msg = "";
    if (jd.claimAmount == undefined) {
      flag = 1;
      msg = "Please Enter claim Amount";
    }
    else {

    }
    if (jd.travelModeId == undefined) {
      flag = 1;
      msg = "Please Select Travel Mode";
    }
    else {

    }
    if (jd.to == undefined) {
      flag = 1;
      msg = "Please Enter to";
    }
    else {

    }
    if (jd.from == undefined) {
      flag = 1;
      msg = "Please Enter From";
    }
    else {

    }
    if (jd.reportingLocation == undefined) {
      flag = 1;
      msg = "Please Enter Reporting Location";
    }
    else {

    }
    // if (jd.journeyDate == undefined) {
    //   flag = 1;
    //   msg = "Please Select Journey Date";
    // }
    // else {

    // }
    if (jd.journeyTypeId == undefined) {
      flag = 1;
      msg = "Please Selelct Journey Type";
    }
    else {

    }
    if (flag == 0) {
      jd.isReadOnly = true;
      this.objJourneyDetails = new JourneyDetails();
      this.journeyDetailsArray.unshift(this.objJourneyDetails);
    } else {
      this.notificationService.showError(msg, "Error");
    }

  }
  onClickDelete(i) {
    this.journeyDetailsArray.forEach((element, index) => {
      if (index == i) {
        this.journeyDetailsArray.splice(i, 1);
      }
    })
  }
  onAttachmentFileChange(files: FileList, ja) {
    //this.fileUploadArray = [];
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      this.attachemntFileName = "";
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      ja.attachmentFile = files[0].name;
      this.attachemntFileName = files[0].name;
      //ja.attachmentLink = files[0].name;
      ja.uploadedDocuments = files.item(0);
      // Creating Blob URL
      this.selectedPdf1 = files[0];
      this.pdfURL1 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf1)) as string;
      ja.BlobURL = this.pdfURL1;
    }
  }
  onClickAddJourneyAttachement(ja) {
    var flag = 0;
    var msg = "";
    if (ja.attachmentFile == undefined) {
      flag = 1;
      msg = "Please Attach A file";
    }
    else {

    }
    if (ja.ticketId == undefined) {
      flag = 1;
      msg = "Please select Ticket/Pass/Bill";
    }
    else {

    }
    if (ja.journeyTypeId == undefined) {
      flag = 1;
      msg = "Please Selelct Journey Type";
    }
    else {

    }
    if (flag == 0) {
      ja.isReadOnly = true;
      ja.attachmentLink = "";
      this.objJourneyAttachment = new JourneyAttachment();
      this.travelAttachementDetailsArray.unshift(this.objJourneyAttachment);
      this.fileUpload.push({ file: this.attachmentfileToUpload, fileName: this.attachemntFileName });
      // console.log("Fileupload Array", this.fileUpload);

      this.attachmentFileImport.nativeElement.innerText = "Choose File";
      this.attachmentFileImport.nativeElement.value = "";
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  getBillTypeName(ticketId) {
    return this.billType.find(e => e.TicketId == ticketId).TicketName;
  }
  onClickDeleteAttachement(i) {
    this.travelAttachementDetailsArray.forEach((element, index) => {
      if (index == i) {
        this.travelAttachementDetailsArray.splice(i, 1);
      }
    })
  }
  onSubmitJoiningTravelReimBursementDetails() {
    var flag = 0;
    var msg = "";

    if (this.travelAttachementDetailsArray.length == 0) {
      flag = 1;
      msg = "Please Upload atlease one documnet proof";
    }
    else {

    }
    if (this.journeyDetailsArray.length == 0) {
      flag = 1;
      msg = "Please add atlease one travel history";
    }
    else {

    }
    if (flag == 0) {
      // Calculate total amount
      this.totalAmount = 0;
      this.journeyDetailsArray.forEach(element => {
        if (element.isReadOnly) {
          this.totalAmount += Number(element.claimAmount)
        }

      })
      let journeyDetailsSubmitArray = [];
      let travelAttachmentSubmitArray = [];
      let filesSubmitArray = [];
      this.journeyDetailsArray.forEach(element => {
        if (element.isReadOnly) {
          let jdObj = {
            candidateTravelReimbursementId: this.candidateTravelReimbursementList.candidateTravelReimbursementId,
            candidateTravelReimbursementJourneyId: element.candidateTravelReimbursementJourneyId,
            journeyTypeId: element.journeyTypeId,
            reportingLocation: element.reportingLocation,
            from: element.from,
            to: element.to,
            travelModeId: element.travelModeId,
            claimAmount: element.claimAmount,
            createdBy: element.createdBy
          }
          journeyDetailsSubmitArray.push(jdObj);
        }
      })

      this.travelAttachementDetailsArray.forEach(element => {
        if (element.isReadOnly) {
          let taObj = {
            candidateTravelReimbursementId: this.candidateTravelReimbursementList.candidateTravelReimbursementId,
            candidateTravelReimbursementAttachmentId: element.candidateTravelReimbursementAttachmentId,
            journeyTypeId: element.journeyTypeId,
            ticketId: element.ticketId,
            attachmentFile: element.attachmentFile,
            attachmentLink: element.attachmentLink,
            createdBy: element.createdBy
          }
          travelAttachmentSubmitArray.push(taObj);
        }
      })
      this.travelAttachementDetailsArray.forEach(element => {
        filesSubmitArray.push(element.uploadedDocuments);
      })
      // console.log("Travel Reimbursement Journey Obj", journeyDetailsSubmitArray);
      // console.log("Travel Reimbursement Attachment Obj", travelAttachmentSubmitArray);
      this.travelReimbursementData.candidateFullName = this.candidateName;
      this.travelReimbursementData.designationName = this.designationName;
      this.travelReimbursementData.gradeName = this.gradeName
      this.travelReimbursementData.dateofInduction = this.dateOfInduction;
      this.travelReimbursementData.placeofInductionDesc = this.placeOfInduction;
      this.travelReimbursementData.employeeTravelJourneyDetails = journeyDetailsSubmitArray;
      this.approvalStatus = '1';
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("CandidateTravelReimbursementId", this.candidateTravelReimbursementList.candidateTravelReimbursementId.toString());
      formData.append("EmployeeTravelAttachmentDetails", JSON.stringify(travelAttachmentSubmitArray));
      // formData.append("RequsitaionDetailsId", this.candidateTravelReimbursementList.requisitionDetailId.toString());
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("DateofInduction", this.candidateTravelReimbursementList.dateofInduction.toString());
      formData.append("PlaceofInduction", this.candidateTravelReimbursementList.placeofInduction.toString());
      formData.append("PlaceofInductionDesc", this.candidateTravelReimbursementList.placeofInductionDesc.toString());
      formData.append("previousJourneyIds", this.previousJourneyId);
      formData.append("PreviousAttachmentIds", this.previousJourneyId);
      formData.append("ApprovalRemarks", this.approvalRemarks); //Argg
      formData.append("ApprovalStatus", this.approvalStatus); //Argg
      formData.append("EmployeeTravelJourneyDetails", JSON.stringify(journeyDetailsSubmitArray));
      formData.append("CreatedBy", this.loginUserId.toString());
      //formData.append("TotalAmount", this.totalAmount.toString());
      formData.append("Files", JSON.stringify(filesSubmitArray));
      formData.append("theFile", this.file);
      // for (var i = 0; i < this.fileUpload.length; i++) {
      //   formData.append("Files" + i.toString(), this.fileUpload[i].file);
      // }
      setTimeout(() => {
        var htmlstring = document.getElementById("printtravelReimbursementForzip").innerHTML;

        formData.append("Htmlstring", htmlstring);

        this.fileUpload.forEach((element, i) => {
          formData.append("UploadFile_" + element.fileName, element.file);
        })
        this.candidateService.saveTravelreimbursement(formData).subscribe((result) => {
          // console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.closeModal.nativeElement.click();
            this.SpinnerService.hide();
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.closeModal.nativeElement.click();
            this.attachmentFileImport.nativeElement.innerText = "";
            this.attachmentFileImport.nativeElement.value = "";
            this._route.navigate(['/app/career/travel-reimbursement-list']);
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.notificationService.showError("Something went wrong", "Error");
        });
      }, 500);
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickSubmit() {
    this.SpinnerService.show();
    this.joiningTravelReimbursementForPDF.candidateFullName = this.candidateName;
    this.joiningTravelReimbursementForPDF.dateofInduction = this.dateOfInduction;
    this.joiningTravelReimbursementForPDF.designationName = this.designationName;
    this.joiningTravelReimbursementForPDF.gradeName = this.gradeName;
    this.joiningTravelReimbursementForPDF.placeofInductionDesc = this.placeOfInduction;

    this.joiningTravelReimbursementForPDF.employeeTravelJourneyDetails = [];
    for (var i = 1; i < this.journeyDetailsArray.length; i++) {
      this.joiningTravelReimbursementForPDF.employeeTravelJourneyDetails.push({
        from: this.journeyDetailsArray[i].from,
        to: this.journeyDetailsArray[i].to,
        travelModeId: this.journeyDetailsArray[i].travelModeId,
        claimAmount: Number(this.journeyDetailsArray[i].claimAmount)

      })
    }

    var htmlString = "";
    setTimeout(() => {
      htmlString = document.getElementById("printJoiningTravelReimbursementDiv").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = htmlString;
      var opt = {
        margin: 6,
        filename: this.candidateId + "_JoiningTravel_Reimbursement.pdf",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, y: 2, scrollY: 0 },
        jsPDF: { format: 'A4', orientation: "portrait" },
      }
      html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
        this.file = data;
        //this.submitData();)
        jQuery("#confirmPopup").modal('show');
      })
      this.SpinnerService.hide()
      //this.SpinnerService.hide()
    }, 300);
  }


  onClickCancel() {

  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
class JourneyDetails {
  candidateTravelReimbursementId: number;
  candidateTravelReimbursementJourneyId: number;
  journeyTypeId: number;
  reportingLocation: string;
  from: string;
  to: string;
  travelModeId: number;
  claimAmount: number;
  createdBy: number;
  journeyDate: string;
  isReadOnly: boolean = false;
}
class JourneyAttachment {
  candidateTravelReimbursementId: number;
  candidateTravelReimbursementAttachmentId: number;
  journeyTypeId: number;
  ticketId: number;
  attachmentFile: string;
  attachmentLink: string;
  createdBy: number;
  isReadOnly: boolean = false;
  uploadedDocuments: File;

}
