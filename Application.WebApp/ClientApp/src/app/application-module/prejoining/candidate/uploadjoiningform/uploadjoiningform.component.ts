import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CandidateService } from '../../../../services/prejoining/candidate/candidate.service';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { IState, IDropDown, IFormFiles } from '../../../../interfaces/common/common.interface';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
// import {
//   ISearchTravelReimbursement, ITravelReimbursementDetailData,ITravelReimbursementAttachmentList,
//   ITravelReimbursementJourneyList,
//   ITravelJourneyArray, ITravelAttachmentArray, ITravelJourneyArrayData, ITravelAttachmentArrayData
// } from '../../../../interfaces/selection/travelreimbursement.interface';
import { IUploadMedicalDocument, IMedicalDocumentData } from '../../../../interfaces/prejoining/uploadmedicaldocument.interface';
import { IJoiningDocumentData, IJoiningDocumentFormFiles, IPreJoiningDocumentAttachmentData, IPreJoiningDocumentFormData, ISearchJoinningDocument } from 'src/app/interfaces/prejoining/uploadjoiningform.interface';
import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationService } from 'src/app/services/common/location/location.service';

@Component({
  selector: 'app-uploadjoiningform',
  templateUrl: './uploadjoiningform.component.html',
  styleUrls: ['./uploadjoiningform.component.css']
})
export class UploadjoiningformComponent implements OnInit {

  autoUserId: number;
  candidateId: any;
  @ViewChild('attachmentFileImport1', { static: false }) attachmentFileImport1: ElementRef;
  @ViewChild('attachmentFileImport2', { static: false }) attachmentFileImport2: ElementRef;
  @ViewChild('attachmentFileImport3', { static: false }) attachmentFileImport3: ElementRef;
  @ViewChild('attachmentFileImport4', { static: false }) attachmentFileImport4: ElementRef;
  @ViewChild('attachmentFileImport5', { static: false }) attachmentFileImport5: ElementRef;
  @ViewChild('attachmentFileImport6', { static: false }) attachmentFileImport6: ElementRef;
  @ViewChild('attachmentFileImport7', { static: false }) attachmentFileImport7: ElementRef;
  attachmentfileToUpload: File;
  fileUpload: IJoiningDocumentFormFiles[] = [];
  seachJoiningDocument: ISearchJoinningDocument = {
    joiningDocumentCollectionId: null,
    requisitionDetailId: null,
    candidateId: null,
  }
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  joiningDocumentData: IJoiningDocumentData;
  joiningDocumentFormData: IPreJoiningDocumentFormData;
  joiningAttachemntData: IPreJoiningDocumentAttachmentData[] = [];
  fileUploadArray: any[] = [];
  additionalRemarks: string;
  showESIDeclarationForm: boolean;
  showAnnuationBeneficiaryForm: boolean;
  UploadPDFList: any[] = [];
  // For previewing PDF
  selectedPdf1?: Blob;
  pdfURL1: any;
  selectedPdf2?: Blob;
  pdfURL2: string;
  selectedPdf3?: Blob;
  pdfURL3: string;
  selectedPdf4?: Blob;
  pdfURL4: string;
  selectedPdf5?: Blob;
  pdfURL5: string;
  selectedPdf6?: Blob;
  pdfURL6: string;
  selectedPdf7?: Blob;
  pdfURL7: string;
  // base642: string;
  autoTrans: any;
  gratiNormForm: any;
  bankMandiate: any;
  pfNomination: any;
  ESIDecleareform: any;
  SuperBenefish: any;
  downloadInstructionManual: any;
  bankMandateReupload: boolean;
  pfNominationReupload: boolean;
  compositeDeclarationReupload: boolean;
  graturityReupload: boolean;
  bankStatementReupload: boolean;
  esiDeclarationReupload: boolean;
  annuationBeneficiaryReupload: boolean;
  showSaveButton: boolean;
  offerDocumentCollectionDocumentId: number = 0;
  invalidFileName1: boolean = false;
  invalidFileName2: boolean = false;
  invalidFileName3: boolean = false;
  invalidFileName4: boolean = false;
  invalidFileName5: boolean = false;
  invalidFileName6: boolean = false;
  invalidFileName7: boolean = false;
  constructor(private notificationService: NotificationService, private candidateService: CandidateService, private commonService: CommonService,
    private toasterService: ToastrService, private SpinnerService: NgxSpinnerService, private persistance: PersistanceService, private _route: Router,
    private sant: DomSanitizer,
    private locationService: LocationService,
  ) {
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;;
    this.getUploadJoiningForm();
    this.getUploadedForms();
  }


  ngOnInit() {
  }

  getUploadedForms() {
    this.commonService.getAllAttachmentPDF(this.saveForm.value).subscribe((response: any) => {
      this.UploadPDFList = response;
      // this.bankMandiate = this.UploadPDFList.find(e => e.attachmentDocumentName == "Bank Mandate Form");
      // this.pfNomination = this.UploadPDFList.find(e => e.attachmentDocumentName == "Form 2 - PF Nomination")
      // this.autoTrans = this.UploadPDFList.find(e => e.attachmentDocumentName == "Form 11- Composite Declaration form  for Auto Transfer")
      // this.gratiNormForm = this.UploadPDFList.find(e => e.attachmentDocumentName == "Form F -Graturity Nomination Form")
      // this.ESIDecleareform = this.UploadPDFList.find(e => e.attachmentDocumentName == "ESI Declaration Form")
      // this.SuperBenefish = this.UploadPDFList.find(e => e.attachmentDocumentName == "Super Annuation-Beneficiary Form")
      this.bankMandiate = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 12);
      this.pfNomination = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 13)
      this.autoTrans = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 14)
      this.gratiNormForm = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 15)
      this.ESIDecleareform = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 16)
      this.SuperBenefish = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 18)
      this.downloadInstructionManual = this.UploadPDFList.find(e => e.attachmentDocumentNameId == 53)

    })
  }
  getUploadJoiningForm() {
    this.SpinnerService.show();
    this.seachJoiningDocument.candidateId = this.candidateId;
    this.candidateService.getUploadedJoiningForm(this.seachJoiningDocument).subscribe((result) => {
      if (result) {
        // this.uploadedDocumentList = result;
        this.joiningDocumentData = result;
        //console.log("Joining Document All data", this.joiningDocumentData);
        // this.joiningDocumentFormData = this.joiningDocumentData.preJoiningDocumentFormData;
        this.joiningAttachemntData = this.joiningDocumentData.preJoiningDocumentAttachmentData;
        // console.log("Joining Document Attachment data", this.joiningAttachemntData);
        if (this.joiningDocumentData.additionalDocumentID != null) {
          if (this.joiningDocumentData.additionalDocumentID.indexOf('16') > -1) {
            //alert(this.joiningDocumentData.additionalDocumentID.indexOf('16'));
            this.showESIDeclarationForm = true;
          } else {
            this.showESIDeclarationForm = false;
          }
          if (this.joiningDocumentData.additionalDocumentID.indexOf('18') > -1) {
            //alert(this.joiningDocumentData.additionalDocumentID.indexOf('21'));
            this.showAnnuationBeneficiaryForm = true;
          } else {
            this.showAnnuationBeneficiaryForm = false;
          }
        }
        if (this.joiningAttachemntData.length > 0) {
          this.joiningAttachemntData.forEach(element => {
            if (element.documentPath != "") {
              let uploadedObj = {
                approvalListId: element.approvalListId,
                approvalListName: element.approvalListName,
                approvalRemarks: element.approvalRemarks,
                candidateId: element.candidateId,
                document: element.document,
                documentPath: element.documentPath,
                doumentName: element.doumentName,
                doumentNameId: element.doumentNameId,
                doumentParticular: element.doumentParticular,
                doumentParticularName: element.doumentParticularName,
                doumentTypName: element.doumentTypName,
                //documentTypeNameId: 1,
                doumentType: element.doumentType,
                offerDocumentCollectionDocumentId: element.offerDocumentCollectionDocumentId,
                offerDocumentCollectionId: element.offerDocumentCollectionId
              }
              this.fileUploadArray.push(uploadedObj);
              if (element.approvalListId == 2) {     // need to confirm the approvalListId is 2 or not for the status need clarification
                this.canReupload(element.doumentNameId);
              }
            }

          })
        }

      }
      else {
        //this.uploadedMedicalDocument = null;
      }
    }, error => {
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  canReupload(documentId) {
    switch (documentId) {
      case 12:
        this.bankMandateReupload = true;
        this.showSaveButton = true;
        break;
      case 13:
        this.pfNominationReupload = true;
        this.showSaveButton = true;
        break;
      case 14:
        this.compositeDeclarationReupload = true;
        this.showSaveButton = true;
        break;
      case 15:
        this.graturityReupload = true;
        this.showSaveButton = true;
        break;
      case 19:
        this.bankStatementReupload = true;
        this.showSaveButton = true;
        break;
      case 16:
        this.esiDeclarationReupload = true;
        this.showSaveButton = true;
        break;
      case 18:
        this.annuationBeneficiaryReupload = true;
        this.showSaveButton = true;
        break;
    }
  }
  onAttachmentFileChange1(files: FileList) {
    this.invalidFileName1 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName1 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport1.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName1) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport1.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    else {
      this.attachmentFileImport1.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf1 = files[0];
      this.pdfURL1 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf1)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 12) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 12) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })

      // let reader = new FileReader();
      // reader.onloadend = (e: any) => {
      //   var blob = new Blob(eve.target.files, { type: eve.target.files[0].type });
      //   var url = window.URL.createObjectURL(blob);
      //   this.pdfURL1 = this.sant.bypassSecurityTrustUrl(url);
      //   console.log("pdfUrl1", this.pdfURL1);

      // }
      // reader.readAsDataURL(eve.target.files[0]);



      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 12 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL1,
        document: files[0].name,
        documentPath: "",
        doumentName: "Bank Mandate Form",
        doumentNameId: 12,
        doumentParticular: 9,
        doumentParticularName: "Joining Document",
        doumentTypName: "Prejoining & OnBoarding",
        //documentTypeNameId: 1,
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }

  onAttachmentFileChange2(files: FileList) {
    this.invalidFileName2 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName2 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport2.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName2) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport2.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport2.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf2 = files[0];
      this.pdfURL2 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf2)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 13) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 13) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })

      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 13 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL2,
        document: files[0].name,
        documentPath: "",
        doumentName: "Form 2 - PF Nomination",
        doumentNameId: 13,
        doumentParticular: 9,
        doumentParticularName: "Joining Document",
        doumentTypName: "Prejoining & OnBoarding",
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }
  onAttachmentFileChange3(files: FileList) {
    this.invalidFileName3 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName3 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport3.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName3) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport3.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport3.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf3 = files[0];
      this.pdfURL3 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf3)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 14) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 14) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })
      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 14 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL3,
        document: files[0].name,
        documentPath: "",
        doumentName: "Form 11- Composite Declartion form  for Auto Transfer",
        doumentNameId: 14,
        doumentParticular: 9,
        doumentParticularName: "Joining Document",
        doumentTypName: "Prejoining & OnBoarding",
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }
  onAttachmentFileChange4(files: FileList) {
    this.invalidFileName4 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName4 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport4.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName4) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport4.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport4.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf4 = files[0];
      this.pdfURL4 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf4)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 15) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 15) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })

      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 15 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL4,
        document: files[0].name,
        documentPath: "",
        doumentName: "Form F -Graturity Nomination Form",
        doumentNameId: 15,
        doumentParticular: 9,
        doumentParticularName: "Joining Document",
        doumentTypName: "Prejoining & OnBoarding",
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }
  onAttachmentFileChange5(files: FileList) {
    this.invalidFileName5 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName5 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport5.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName5) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport5.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport5.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf5 = files[0];
      this.pdfURL5 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf5)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 19) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 19) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })

      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 19 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL5,
        document: files[0].name,
        documentPath: "",
        doumentName: "Bank Statement",
        doumentNameId: 19,
        doumentParticular: 9,
        doumentParticularName: "Joining Document",
        doumentTypName: "Prejoining & OnBoarding",
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }
  onAttachmentFileChange6(files: FileList) {
    this.invalidFileName6 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName6 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport6.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName6) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport6.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport6.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf6 = files[0];
      this.pdfURL6 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf6)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 16) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 16) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })

      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 16 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL6,
        document: files[0].name,
        documentPath: "",
        doumentName: "ESI Declaration Form",
        doumentNameId: 16,
        doumentParticular: 10,
        doumentParticularName: "Prejoining & Onboarding Document",
        doumentTypName: "Prejoining & OnBoarding",
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }
  onAttachmentFileChange7(files: FileList) {
    this.invalidFileName7 = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName7 = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport7.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
    if (this.invalidFileName7) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport7.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport7.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf7 = files[0];
      this.pdfURL7 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf7)) as string;

      //Remove existing
      this.fileUpload.forEach((element, index) => {
        if (element.doumentNameId == 18) {
          this.fileUpload.splice(index, 1)
        }
      })
      this.fileUploadArray.forEach((element, index) => {
        if (element.doumentNameId == 18) {
          this.offerDocumentCollectionDocumentId = element.offerDocumentCollectionDocumentId;
          this.fileUploadArray.splice(index, 1)
        }
      })

      this.fileUpload.push({ file: this.attachmentfileToUpload, doumentNameId: 18 });
      this.fileUploadArray.push({
        approvalListId: 1,
        approvalListName: "Pending",
        approvalRemarks: "",
        candidateId: this.candidateId,
        //document: "",
        pdfURL: this.pdfURL7,
        document: files[0].name,
        documentPath: "",
        doumentName: "Super Annuation-Beneficiary Form",
        doumentNameId: 18,
        doumentParticular: 10,
        doumentParticularName: "Prejoining & Onboarding Document",
        doumentTypName: "Prejoining & OnBoarding",
        doumentType: 4,
        offerDocumentCollectionDocumentId: this.offerDocumentCollectionDocumentId == 0 ? 0 : this.offerDocumentCollectionDocumentId,
        offerDocumentCollectionId: this.joiningDocumentData.offerDocumentCollectionId
      })
    }
  }

  onClickRemove(data) {
    this.fileUploadArray = this.fileUploadArray.filter(e => e.doumentNameId != data.doumentNameId);
    if (data.doumentNameId == 12) {
      this.attachmentFileImport1.nativeElement.innerText = "";
      this.attachmentFileImport1.nativeElement.value = "";
    } else if (data.doumentNameId == 13) {
      this.attachmentFileImport2.nativeElement.innerText = "";
      this.attachmentFileImport2.nativeElement.value = "";
    } else if (data.doumentNameId == 14) {
      this.attachmentFileImport3.nativeElement.innerText = "";
      this.attachmentFileImport3.nativeElement.value = "";
    } else if (data.doumentNameId == 15) {
      this.attachmentFileImport4.nativeElement.innerText = "";
      this.attachmentFileImport4.nativeElement.value = "";
    } else if (data.doumentNameId == 19) {
      this.attachmentFileImport5.nativeElement.innerText = "";
      this.attachmentFileImport5.nativeElement.value = "";
    } else if (data.doumentNameId == 16) {
      this.attachmentFileImport6.nativeElement.innerText = "";
      this.attachmentFileImport6.nativeElement.value = "";
    } else if (data.doumentNameId == 18) {
      this.attachmentFileImport7.nativeElement.innerText = "";
      this.attachmentFileImport7.nativeElement.value = "";
    }

  }

  onClickConfirmatin(value) {
    if (value == "Y") {
      var flag = 0;
      var msg = "";
      // if (this.additionalRemarks == "" || this.additionalRemarks == null) {
      //   flag = 1;
      //   msg = "Please Enter Remarks";
      // }
      // else {

      // }
      if (this.fileUploadArray.length > 0) {
        this.fileUploadArray.forEach(element => {
          if (this.showAnnuationBeneficiaryForm) {
            var fileUploadArray7 = this.fileUploadArray.find(e => e.doumentNameId == 18);
            if (fileUploadArray7 == undefined || fileUploadArray7.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
              flag = 1;
              msg = "Please Attach Super Annuation-Beneficiary Form";
            }
          }
          if (this.showESIDeclarationForm) {
            var fileUploadArray6 = this.fileUploadArray.find(e => e.doumentNameId == 16);
            if (fileUploadArray6 == undefined || fileUploadArray6.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
              flag = 1;
              msg = "Please Attach ESI Declaration Form";
            }
          }
          var fileUploadArray5 = this.fileUploadArray.find(e => e.doumentNameId == 19);
          if (fileUploadArray5 == undefined || fileUploadArray5.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
            flag = 1;
            msg = "Please Attach Bank Statement/Cancelled Cheque/Passbook";
          }
          var fileUploadArray4 = this.fileUploadArray.find(e => e.doumentNameId == 15);
          if (fileUploadArray4 == undefined || fileUploadArray4.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
            flag = 1;
            msg = "Please Attach Gratuity Form";
          }
          var fileUploadArray3 = this.fileUploadArray.find(e => e.doumentNameId == 14);
          if (fileUploadArray3 == undefined || fileUploadArray3.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
            flag = 1;
            msg = "Please Attach Composite Declar Form";
          }
          var fileUploadArray2 = this.fileUploadArray.find(e => e.doumentNameId == 13);
          if (fileUploadArray2 == undefined || fileUploadArray2.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
            flag = 1;
            msg = "Please Attach PF Nomination Form";
          }
          var fileUploadArray1 = this.fileUploadArray.find(e => e.doumentNameId == 12);
          if (fileUploadArray1 == undefined || fileUploadArray1.document == "") { // changed by Sayandeep on 02-09-2023 to restrict uploading without document
            flag = 1;
            msg = "Please Attach Bank Mandate Form";
          }
        })
      }
      if (this.fileUploadArray.length == 0) {
        flag = 1;
        msg = "Please Attach  file";
      }
      else {

      }
      if (flag == 0) {
        var attachmnetDocumentArray = [];
        this.SpinnerService.show();
        const formData = new FormData();
        formData.append("JoiningDocumentCollectionId", this.joiningDocumentData.joiningDocumentCollectionId.toString());
        this.fileUploadArray.forEach(element => {
          let attachmentDocObj = {
            CandidateId: element.candidateId,
            OfferDocumentCollectionId: element.offerDocumentCollectionId,
            OfferDocumentCollectionDocumentId: element.offerDocumentCollectionDocumentId,
            DoumentType: element.doumentType,
            DoumentTypName: element.doumentTypName,
            DoumentParticular: element.doumentParticular,
            DoumentParticularName: element.doumentParticularName,
            DoumentNameId: element.doumentNameId,
            DoumentName: element.doumentName,
            Document: element.document,
            DocumentPath: element.documentPath,
            ApprovalListId: element.approvalListId,
            ApprovalListName: element.approvalListName,
            ApprovalRemarks: element.approvalRemarks
          }
          attachmnetDocumentArray.push(attachmentDocObj);
        })
        // console.log("attachement Document Array On Submit", attachmnetDocumentArray);
        this.fileUpload.forEach((element, i) => {
          formData.append("UploadFile_" + element.doumentNameId, element.file);
        })
        formData.append("AttachmentDetails", JSON.stringify(attachmnetDocumentArray));
        formData.append("RequisitionDetailId", this.joiningDocumentData.requisitionDetailId.toString());
        formData.append("CandidateId", this.candidateId.toString());
        formData.append("OfferDocumentCollectionId", this.joiningDocumentData.offerDocumentCollectionId.toString());
        formData.append("AdditionalRemarks", this.additionalRemarks == undefined ? "" : this.additionalRemarks);
        formData.append("CreatedBy", this.autoUserId.toString());

        this.candidateService.uploadJoiningForm(formData).subscribe((result) => {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.SpinnerService.hide();
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getUploadJoiningForm();
            this.getUploadedForms();
            // this.attachmentFileImport.nativeElement.innerText = "";
            // this.attachmentFileImport.nativeElement.value = "";
            this.fileUploadArray = [];
            if (!this.showSaveButton) {
              this.attachmentFileImport1.nativeElement.innerText = "";
              this.attachmentFileImport1.nativeElement.value = "";
              this.attachmentFileImport2.nativeElement.innerText = "";
              this.attachmentFileImport2.nativeElement.value = "";
              this.attachmentFileImport3.nativeElement.innerText = "";
              this.attachmentFileImport3.nativeElement.value = "";
              this.attachmentFileImport4.nativeElement.innerText = "";
              this.attachmentFileImport4.nativeElement.value = "";
              this.attachmentFileImport5.nativeElement.innerText = "";
              this.attachmentFileImport5.nativeElement.value = "";
              this.attachmentFileImport6.nativeElement.innerText = "";
              this.attachmentFileImport6.nativeElement.value = "";
              this.attachmentFileImport7.nativeElement.innerText = "";
              this.attachmentFileImport7.nativeElement.value = "";
            } else if (this.showSaveButton) {
              if (this.bankMandateReupload) {
                this.attachmentFileImport1.nativeElement.innerText = "";
                this.attachmentFileImport1.nativeElement.value = "";
              } else if (this.pfNominationReupload) {
                this.attachmentFileImport2.nativeElement.innerText = "";
                this.attachmentFileImport2.nativeElement.value = "";
              } else if (this.compositeDeclarationReupload) {
                this.attachmentFileImport3.nativeElement.innerText = "";
                this.attachmentFileImport3.nativeElement.value = "";
              } else if (this.graturityReupload) {
                this.attachmentFileImport4.nativeElement.innerText = "";
                this.attachmentFileImport4.nativeElement.value = "";
              } else if (this.bankStatementReupload) {
                this.attachmentFileImport5.nativeElement.innerText = "";
                this.attachmentFileImport5.nativeElement.value = "";
              } else if (this.esiDeclarationReupload) {
                this.attachmentFileImport6.nativeElement.innerText = "";
                this.attachmentFileImport6.nativeElement.value = "";
              } else if (this.annuationBeneficiaryReupload) {
                this.attachmentFileImport7.nativeElement.innerText = "";
                this.attachmentFileImport7.nativeElement.value = "";
              }
            }
            this.additionalRemarks = "";

            // this._route.navigate(['career/upload-joining-documents']);
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.notificationService.showError("Something went wrong", "Error");
        });
      }
      else {
        this.SpinnerService.hide();
        this.notificationService.showError(msg, "Error");
      }
    }
  }
  onCancelClick() {
    this.fileUploadArray = [];
    this.attachmentFileImport1.nativeElement.innerText = "";
    this.attachmentFileImport1.nativeElement.value = "";
    this.attachmentFileImport2.nativeElement.innerText = "";
    this.attachmentFileImport2.nativeElement.value = "";
    this.attachmentFileImport3.nativeElement.innerText = "";
    this.attachmentFileImport3.nativeElement.value = "";
    this.attachmentFileImport4.nativeElement.innerText = "";
    this.attachmentFileImport4.nativeElement.value = "";
    this.attachmentFileImport5.nativeElement.innerText = "";
    this.attachmentFileImport5.nativeElement.value = "";
    this.attachmentFileImport6.nativeElement.innerText = "";
    this.attachmentFileImport6.nativeElement.value = "";
    this.attachmentFileImport7.nativeElement.innerText = "";
    this.attachmentFileImport7.nativeElement.value = "";
    this.additionalRemarks = "";
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
