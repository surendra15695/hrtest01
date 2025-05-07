import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CandidateService } from '../../../../services/prejoining/candidate/candidate.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { IState, IDropDown, IFormFiles } from '../../../../interfaces/common/common.interface';
// import {
//   ISearchTravelReimbursement, ITravelReimbursementDetailData,ITravelReimbursementAttachmentList,
//   ITravelReimbursementJourneyList,
//   ITravelJourneyArray, ITravelAttachmentArray, ITravelJourneyArrayData, ITravelAttachmentArrayData
// } from '../../../../interfaces/selection/travelreimbursement.interface';
import { IUploadMedicalDocument, IMedicalDocumentData, IMedicalDocumentRemarks } from '../../../../interfaces/prejoining/uploadmedicaldocument.interface';
import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/common/location/location.service';
@Component({
  selector: 'app-uploadmedicaldocument',
  templateUrl: './uploadmedicaldocument.component.html',
  styleUrls: ['./uploadmedicaldocument.component.css']
})
export class UploadmedicaldocumentComponent implements OnInit {
  searchMedicalDocument: IUploadMedicalDocument = {
    MedicalDocumentCollectionId: null,
    RequisitionDetailId: null,
    CandidateId: null,
    IsActive: false
  }
  loggedinUser: any;
  candidateId: any;
  uploadedDocumentList: any;
  uploadedMedicalDocument: IMedicalDocumentData = {
    medicalDocumentCollectionId: null,
    requisitionDetailId: null,
    candidateId: null,
    name: null,
    position: null,
    functionName: null,
    location: null,
    grade: null,
    doumentType: null,
    doumentTypeName: null,
    doumentParticular: null,
    doumentParticularName: null,
    documentNameId: null,
    documentName: null,
    document: null,
    remarks: null,
    medicalDocumentDoctorApprovalId: null,
    approvalListId: null,
    approvalListName: null,
    approvalRemarks: null,
    createdBy: null,
    medicalDocumentRemarks: []
  }
  //isEnabledMedicalDoc: boolean = false;
  // medicalDocumentsAdditionalRemarks: IMedicalDocumentRemarks[];
  medicalDocumentsAdditionalRemarks: any[] = [];
  fileUploadArray: any[] = [];
  enableField: boolean;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  attachmentfileToUpload: File;
  AdditionalRemarks: string = "";
  autoUserId: number;
  selectedPdf1?: Blob;
  pdfURL1: any;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  UploadPDFList: any[] = [];
  medicalSampleDoc: any;
  invalidFileName: boolean = false;
  constructor(private notificationService: NotificationService, private candidateService: CandidateService,
    private toasterService: ToastrService, private SpinnerService: NgxSpinnerService, private persistance: PersistanceService,
    private sant: DomSanitizer, private commonService: CommonService, private locationService: LocationService,
  ) {
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.getUploadedForms();
    this.getMedicalDocument();
  }

  ngOnInit() {
  }
  onClickDownload() {

  }
  getUploadedForms() {
    this.commonService.getAllAttachmentPDF(this.saveForm.value).subscribe((response: any) => {
      this.UploadPDFList = response;
      // this.medicalSampleDoc = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 50);
      this.medicalSampleDoc = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 9);
      // this.pfNomination = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 13)
      // this.autoTrans = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 14)
      // this.gratiNormForm = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 15)
      // this.ESIDecleareform = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 16)
      // this.SuperBenefish = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 18)
      // this.downloadInstructionManual = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 53)

    })
  }
  onAttachmentFileChange(files: FileList) {
    this.invalidFileName = false;
    this.fileUploadArray = [];
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 10505761) {
      this.notificationService.showError("File should not be more than 10MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    else {
      var filenameforValidationCheck = files[0].name.replace(".pdf", "");
      const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
      specialChars.forEach(element => {
        if (filenameforValidationCheck.includes(element)) {
          this.invalidFileName = true;
        }
      })
      if (this.invalidFileName) {
        this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
        this.attachmentFileImport.nativeElement.innerText = "Choose file";
        this.attachmentfileToUpload = null;
      }
      // if (filenameforValidationCheck.includes(" ") || filenameforValidationCheck.includes(".") || filenameforValidationCheck.includes("-") || filenameforValidationCheck.includes(",")) {
      //   this.notificationService.showError("Please Remove Space, dot, hypen or comma from name of the pdf", "Error");
      // }
      else {
        var filename = files[0].name.replace(/\s/g, "");
        this.attachmentFileImport.nativeElement.innerText = filename;
        this.attachmentfileToUpload = files.item(0);
        // Creating Blob URL
        this.selectedPdf1 = files[0];
        this.pdfURL1 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf1)) as string;

        this.fileUploadArray.push({
          document: filename,
          documentName: filename,
          DoumentType: 4,
          DoumentParticular: 6,
          approvalRemarks: "",
          uploaded: "NO",
          pdfUrl: this.pdfURL1,
          approvalListName: "Pending",
          medicalDocumentCollectionId: 0
        })
      }
    }
  }
  getMedicalDocument() {
    this.medicalDocumentsAdditionalRemarks = [];
    this.SpinnerService.show();
    this.searchMedicalDocument.CandidateId = this.candidateId;
    this.candidateService.getUploadedMedicalDocument(this.searchMedicalDocument).subscribe((result) => {
      if (result.requisitionDetailId != 0) {
        this.uploadedDocumentList = result;
        // this.uploadedDocumentList.isEnabledForMedical == true ? this.isEnabledMedicalDoc = true : this.isEnabledMedicalDoc = false; //added by Amartya 
        // console.log("Upload Medical Doc Result by Candidate", this.uploadedDocumentList);
        if (this.uploadedDocumentList != null) {
          // if (this.uploadedDocumentList.medicalDocumentCollectionId == 0 || (this.uploadedDocumentList.medicalDocumentCollectionId > 0 && this.uploadedDocumentList.approvalListId == 2)) {
          if (this.uploadedDocumentList.medicalDocumentCollectionId == 0 || (this.uploadedDocumentList.medicalDocumentCollectionId > 0 && this.uploadedDocumentList.docApprovalStatusId == 2 && this.uploadedDocumentList.isEnabledForMedical == true)) {
            this.enableField = true;
          } else {
            this.enableField = false;
          }
        } else {
          this.enableField = true;
        }
        /* If Single */
        this.uploadedMedicalDocument = result;
        //console.log("Medical Document Details", result);
        if (result != null) {
          if (this.uploadedMedicalDocument.document != "" && this.uploadedMedicalDocument.document != null) {
            this.fileUploadArray.push({
              document: this.uploadedMedicalDocument.document,
              documentName: this.uploadedMedicalDocument.documentName,
              DoumentType: this.uploadedMedicalDocument.doumentType,
              DoumentParticular: this.uploadedMedicalDocument.doumentParticular,
              approvalRemarks: this.uploadedMedicalDocument.approvalRemarks,
              approvalListName: this.uploadedMedicalDocument.approvalListName,
              medicalDocumentCollectionId: this.uploadedMedicalDocument.medicalDocumentCollectionId,
              uploaded: "YES"
            })
            //console.log("File Upload Array", this.fileUploadArray);
          }
          this.uploadedMedicalDocument.medicalDocumentRemarks.forEach(element => {
            if (element.remarks != "" && element.remarks != null && element.createdBy != null) {
              var checkExisted = this.medicalDocumentsAdditionalRemarks.find(e => e.offerDocumentCollectionRemarksId == element.offerDocumentCollectionRemarksId);
              if (checkExisted == undefined) {
                this.medicalDocumentsAdditionalRemarks.push(element);
              }
            }
          })
        }
      }
      else {
        this.uploadedMedicalDocument = null;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onSubmit(saveMode) {
    var flag = 0;
    var msg = "";
    // if (this.AdditionalRemarks == "") {
    //   flag = 1;
    //   msg = "Please Enter Remarks";
    // }
    // else {

    // }
    if (this.attachmentfileToUpload == null) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    if (this.fileUploadArray.length == 0) {
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      const formData = new FormData();
      formData.append("Remarks", this.AdditionalRemarks);
      formData.append("DoumentType", "4");
      formData.append("DoumentParticular", "6");
      formData.append("DoumentName", "9");
      formData.append("RequsitaionDetailsId", this.uploadedMedicalDocument.requisitionDetailId.toString());
      formData.append("MedicalDocumentCollectionId", this.uploadedMedicalDocument.medicalDocumentCollectionId.toString())
      formData.append("Files", this.attachmentfileToUpload);
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("CreatedBy", this.autoUserId.toString());

      this.candidateService.uploadMedicalDocument(formData).subscribe((result) => {
        // console.log(result);
        if (result.status == 0) {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.attachmentFileImport.nativeElement.innerText = "";
          this.attachmentFileImport.nativeElement.value = "";
          this.fileUploadArray = [];
          this.AdditionalRemarks = "";
          this.getMedicalDocument();
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong", "Error");
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickRemoveDocument(record) {
    this.fileUploadArray = this.fileUploadArray.filter(x => x.medicalDocumentCollectionId != record.medicalDocumentCollectionId && x.DoumentParticular != record.DoumentParticular);
    //console.log("After Remove", this.fileUploadArray);

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


  onCancelClick() {

  }

}
