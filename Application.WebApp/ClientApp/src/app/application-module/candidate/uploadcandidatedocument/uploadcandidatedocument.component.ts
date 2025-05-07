import { Title } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { IStatus, IFormFiles } from '../../../interfaces/common/common.interface';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ICandidateOfferDocument,ISearchCandidateOfferDocument,IPreviousSalaryDetails,IOfferDocumentAttachmentDetails,
  IAttachedDocument,IAttachedDocumentArrayList,IOfferDocumentRemarksDetails,ISubmittedAttachedDocumentArrayList } from '../../../interfaces/offer/candidatedocument.interface'
import { IAttachmentDocumentType,ISearchAttachmentDocumentType,IAttachmentDocumentParticular,
  ISearchAttachmentDocumentParticular,IAttachmentDocumentNameDetails,ISearchAttachmentDocumentName,
   } from '../../../interfaces/common/attachmentdocument.interface'
import { CandidateofferdocumentService } from '../../../services/offer/candidateofferdocument/candidateofferdocument.service';
import { AttachmentdocumentService } from '../../../services/common/attachementdocument/attachmentdocument.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { ConditionalExpr } from '@angular/compiler';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
@Component({
  selector: 'app-uploadcandidatedocument',
  templateUrl: './uploadcandidatedocument.component.html',
  styleUrls: ['./uploadcandidatedocument.component.css']
})
export class UploadcandidatedocumentComponent implements OnInit {   
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('documentFileImport', { static: false }) documentFileImport: ElementRef;
  attachedDocument : File;
  attachedDocumentResult:any;
  documentFileArray:any[];
  documentData:ICandidateOfferDocument;
  searchDocument:ISearchCandidateOfferDocument={
    offerDocumentCollectionId:null,
    candidateId:null,
    requsitaionDetailsId:null
  };

  candidateId:number;
  autoUserId:number;

  newEmolumentName:string;
  newMonthlySal:number;
  newYearlySal:number;

  previousNewSalary:IPreviousSalaryDetails[]=[];
  updatedSalary:IPreviousSalaryDetails[]=[];

  documentTypes:IAttachmentDocumentType[]=[];
  searchDocumentType:ISearchAttachmentDocumentType={
    attachmentDocumentTypeId:null,
    isActive:true
  }

  documentParticulars:IAttachmentDocumentParticular[]=[];
  documentParticularList:IAttachmentDocumentParticular[]=[];
  searchDocumentParticular:ISearchAttachmentDocumentParticular={
    attachmentDocumentParticularId:null,
    attachmentDocumentTypeId:null,
    isActive:true
  }

  documentNames:IAttachmentDocumentNameDetails[]=[];
  documentNameList:IAttachmentDocumentNameDetails[]=[];
  searchDocumentName:ISearchAttachmentDocumentName={
    attachmentDocumentNameId:null,
    attachmentDocumentParticularId:null,
    isActive:true
  }

  selectedDocumentType:number;;
  selectedDocumentParticular:number;
  selectedDocumentName:number;

  attachedDocumentList:IAttachedDocument[]=[];
  attachedDocumentArrayList:IAttachedDocumentArrayList[]=[];
  attachedSubmittedDocumentArrayList:IOfferDocumentAttachmentDetails[]=[];
  submittedDocumentArrayList:ISubmittedAttachedDocumentArrayList[]=[];
  offerDocumentAttachmentDetails:IOfferDocumentAttachmentDetails[]=[];

  additionalSubmittedDocumentArrayList:IOfferDocumentAttachmentDetails[]=[];
  additionalDocumentList:IAttachedDocument[]=[];

  remarksArray:IOfferDocumentRemarksDetails[]=[];

  fileToUpload: IFormFiles[] = [];
  additionalFileToUpload: IFormFiles[] = [];
  removedDocumentId:string="";

  salaryRemarksVisible:boolean=false;
  salaryRemarks:string="";
  additionalRemarks:string="";

  submittedSalaryRemarksDetails: IOfferDocumentRemarksDetails[] = [];
  submittedAdditionalRemarksDetails: IOfferDocumentRemarksDetails[] = [];

  isFormEnable:boolean=false;

  monthlyTotal:number;
  yearlyTotal:number;
  invalidFileName:boolean=false;
  invalidAdditionalFileName:boolean=false;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private documentService: CandidateofferdocumentService,  
    private attachmentDocumentService:AttachmentdocumentService,  
    private persistance:PersistanceService,
    private _route: Router,
    private locationService: LocationService,
  ) { 
      this.SpinnerService.show();
      this.candidateId=this.persistance.get('loggedinuser').candidateId;
      this.autoUserId=this.persistance.get('loggedinuser').autoUserId;
      this.getCandidateOfferDocument();
      this.getAllDocumentType();
      this.getAllDocumentParticulars();
      this.getAllDocumentName();
  }

  ngOnInit() {
  }

  getCandidateOfferDocument(){
    this.monthlyTotal=0;
    this.yearlyTotal=0;
    this.salaryRemarksVisible=false;
    this.documentData = null;
    this.searchDocument.candidateId = this.candidateId;
    this.documentService.getCandidateOfferDocumentForAdditional(this.searchDocument).subscribe((result) => {
      if (result) {
        this.documentData = result;
        //console.log("Doc Data",this.documentData);
        this.submittedSalaryRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 1);
        this.submittedAdditionalRemarksDetails = this.documentData.remaksDetails.filter(x => x.remarksType == 2);
        
        this.attachedSubmittedDocumentArrayList=this.documentData.attachmentDetails.filter(x=>x.documentPath!="" && x.offerDocumentCollectionDocumentId>0);
        for(var i=0;i<this.attachedSubmittedDocumentArrayList.length;i++){
          //if(this.attachedSubmittedDocumentArrayList[i].approvalStatus==3 ){  // sanjib das's code
          if(this.attachedSubmittedDocumentArrayList[i].approvalStatus==3 || this.attachedSubmittedDocumentArrayList[i].approvalStatus==2 || this.attachedSubmittedDocumentArrayList[i].approvalStatus==1 ){ // added by me
            this.salaryRemarksVisible=true;
          }
        }
        for(var i=0;i<this.documentData.salaryDetails.length;i++){
          if(this.documentData.salaryDetails[i].emolumntVerifyStatus==3){
            this.salaryRemarksVisible=true;
          }
          this.monthlyTotal+=Number(this.documentData.salaryDetails[i].monthly);
          this.yearlyTotal+=Number(this.documentData.salaryDetails[i].yerly); 
          
        }
        if(this.documentData.isEnabled==true){
          this.isFormEnable=true;
        }
        else{
          this.isFormEnable=false;
        }
        this.groupSubmittedAttachedDocument();

        this.additionalSubmittedDocumentArrayList=this.documentData.attachmentDetails.filter(x=>x.documentPath=="" && x.offerDocumentCollectionDocumentId>0);
        this.additionalDocumentList=[];
        for(var i=0;i<this.additionalSubmittedDocumentArrayList.length;i++)
        {
          this.additionalDocumentList.push({
          offerDocumentCollectionDocumentId:this.additionalSubmittedDocumentArrayList[i].offerDocumentCollectionDocumentId,
          offerDocumentCollectionId:this.additionalSubmittedDocumentArrayList[i].offerDocumentCollectionId,
          doumentType:this.additionalSubmittedDocumentArrayList[i].doumentType,
          doumentTypName:this.additionalSubmittedDocumentArrayList[i].doumentTypName,
          doumentParticular:this.additionalSubmittedDocumentArrayList[i].doumentParticular,
          doumentParticularName:this.additionalSubmittedDocumentArrayList[i].doumentParticularName,
          doumentNameId:this.additionalSubmittedDocumentArrayList[i].doumentNameId,
          doumentName:this.additionalSubmittedDocumentArrayList[i].doumentName,
          document:"",
          documentPath:"",
          approvalStatus:1,
          approvalRemarks:"",
          additionalDocument:true,
          modifyStatus:0,
          createdBy:this.additionalSubmittedDocumentArrayList[i].createdBy,
          documentFileSrc:null,
          documentFile:null
          });
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

  getAllDocumentType(){
    //this.documentTypes=[];
    this.attachmentDocumentService.getAllDocumentType(this.searchDocumentType).subscribe((result) => {
      if (result) {
        this.documentTypes = result;
        this.documentTypes=this.documentTypes.filter(x=>x.attachmentDocumentTypeId<=3);
      }
      else {
        this.documentTypes=[];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllDocumentParticulars(){
    this.documentParticulars=[];
    this.attachmentDocumentService.getAllDocumentParticular(this.searchDocumentParticular).subscribe((result) => {
      if (result) {
        this.documentParticulars = result;
      }
      else {
        this.documentParticulars=[];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllDocumentName(){
    this.documentNames=[];
    this.attachmentDocumentService.getAllDocumentName(this.searchDocumentName).subscribe((result) => {
      if (result) {      
        this.documentNames = result;
      }
      else {
        this.documentNames=[];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  changeDocumentType(evt){
    this.documentParticularList=[];
    this.selectedDocumentParticular=undefined;
    this.documentNameList=[];
    this.selectedDocumentName=undefined;
    this.documentParticularList=this.documentParticulars.filter(x=>x.attachmentDocumentTypeId==evt);
  }

  changeDocumentParticular(evt){
    this.documentNameList=[];
    this.selectedDocumentName=undefined;
    this.documentNameList=this.documentNames.filter(x=>x.attachmentDocumentParticularId==evt);
    for(var i=0;i<this.attachedDocumentList.length;i++){
      this.documentNameList=this.documentNameList.filter(x=>x.attachmentDocumentNameId!=this.attachedDocumentList[i].doumentNameId);
    }
    for(var i=0;i<this.attachedSubmittedDocumentArrayList.length;i++){
      this.documentNameList=this.documentNameList.filter(x=>x.attachmentDocumentNameId!=this.attachedSubmittedDocumentArrayList[i].doumentNameId);
    }
  }

  changeMonthlySalary(evt,id){
    this.monthlyTotal=0;
    this.yearlyTotal=0;
    var yearlyVal=evt*12;
    this.updateData(1,yearlyVal,id);
    for(var i=0;i<this.documentData.salaryDetails.length;i++){
      this.monthlyTotal+=Number(this.documentData.salaryDetails[i].monthly);
      this.yearlyTotal+=Number(this.documentData.salaryDetails[i].yerly);       
    }
    for(var i=0;i<this.previousNewSalary.length;i++){
      this.monthlyTotal+=Number(this.previousNewSalary[i].monthly);
      this.yearlyTotal+=Number(this.previousNewSalary[i].yerly);         
    }
  }

  changeYearlySalary(evt,id){
    this.monthlyTotal=0;
    this.yearlyTotal=0;
    var monthlyVal=evt/12;
    this.updateData(2,monthlyVal.toFixed(0),id);
    for(var i=0;i<this.documentData.salaryDetails.length;i++){
      this.monthlyTotal+=Number(this.documentData.salaryDetails[i].monthly);
      this.yearlyTotal+=Number(this.documentData.salaryDetails[i].yerly);      
    }
    for(var i=0;i<this.previousNewSalary.length;i++){
      this.monthlyTotal+=Number(this.previousNewSalary[i].monthly);
      this.yearlyTotal+=Number(this.previousNewSalary[i].yerly);         
    }
  }

  updateData(type,valData,id){
    if(type==1){
      this.documentData.salaryDetails.filter(x=>x.offerDocumentCollectionSalaryId==id)[0].yerly=valData;
    }
    else{
      this.documentData.salaryDetails.filter(x=>x.offerDocumentCollectionSalaryId==id)[0].monthly=valData;
    }
  }

  changeNewMonthlySalary(evt,id){
    var yearlyVal=evt*12;
    this.updateData(1,yearlyVal,id);
  }

  changeNewYearlySalary(evt,id){
    var monthlyVal=evt/12;
    this.updateNewData(2,monthlyVal.toFixed(0),id);
  }

  updateNewData(type,valData,id){
    if(type==1){
      this.previousNewSalary.filter(x=>x.offerDocumentCollectionSalaryId==id)[0].yerly=valData;
    }
    else{
      this.previousNewSalary.filter(x=>x.offerDocumentCollectionSalaryId==id)[0].monthly=valData;
    }
  }

  changeMonthlySalaryData(evt){
    this.newYearlySal=evt*12;
  }

  changeYearlySalaryData(evt){
    this.newMonthlySal=Number((evt/12).toFixed(0));
  }

  removeSalaryHead(id){
    this.monthlyTotal=0;
    this.yearlyTotal=0;
    if (confirm("Are you sure to delete ")) {
      this.documentData.salaryDetails=this.documentData.salaryDetails.filter(x=>x.offerDocumentCollectionSalaryId!=id);
      for(var i=0;i<this.documentData.salaryDetails.length;i++){
        this.monthlyTotal+=Number(this.documentData.salaryDetails[i].monthly);
        this.yearlyTotal+=Number(this.documentData.salaryDetails[i].yerly);         
      }
      for(var i=0;i<this.previousNewSalary.length;i++){
        this.monthlyTotal+=Number(this.previousNewSalary[i].monthly);
        this.yearlyTotal+=Number(this.previousNewSalary[i].yerly);         
      }
    }
  }

  removeNewSalaryHead(id){
    this.monthlyTotal=0;
    this.yearlyTotal=0;
    if (confirm("Are you sure to delete ")) {
      this.previousNewSalary=this.previousNewSalary.filter(x=>x.offerDocumentCollectionSalaryId!=id);
      for(var i=0;i<this.documentData.salaryDetails.length;i++){
        this.monthlyTotal+=Number(this.documentData.salaryDetails[i].monthly);
        this.yearlyTotal+=Number(this.documentData.salaryDetails[i].yerly);         
      }
      for(var i=0;i<this.previousNewSalary.length;i++){
        this.monthlyTotal+=Number(this.previousNewSalary[i].monthly);
        this.yearlyTotal+=Number(this.previousNewSalary[i].yerly);         
      }
    }
  }

  addNewSalary(){
    var flag=0;
    if(this.newEmolumentName=="" || this.newEmolumentName==undefined){
      flag=1;
      jQuery(".newEmolument").addClass("is-invalid");
    }
    else{
      jQuery(".newEmolument").removeClass("is-invalid");
    }
    if(this.newYearlySal==0 || this.newYearlySal==undefined){
      flag=1;
      jQuery(".newYearly").addClass("is-invalid");
    }
    else{
      jQuery(".newYearly").removeClass("is-invalid");
    }
    if(this.newMonthlySal==0 || this.newMonthlySal==undefined){
      flag=1;
      jQuery(".newMonthly").addClass("is-invalid");
    }
    else{
      jQuery(".newMonthly").removeClass("is-invalid");
    }

    if(flag==0){
      var count=this.previousNewSalary.length+100;
      this.previousNewSalary.push({
        offerDocumentCollectionSalaryId:count,
        offerDocumentCollectionId:this.documentData.offerDocumentCollectionId,
        emolumntId:count,
        emolumntName:this.newEmolumentName,
        monthly:this.newMonthlySal,
        yerly:this.newYearlySal,
        emolumntVerifyStatus:1,
        emolumntVerifyRemarks:"",
        createdBy:0
      })
      this.newEmolumentName="";
      this.newMonthlySal=undefined;
      this.newYearlySal=undefined;
      this.monthlyTotal=0;
      this.yearlyTotal=0;
      for(var i=0;i<this.documentData.salaryDetails.length;i++){
        this.monthlyTotal+=Number(this.documentData.salaryDetails[i].monthly);
        this.yearlyTotal+=Number(this.documentData.salaryDetails[i].yerly);       
      }
      for(var i=0;i<this.previousNewSalary.length;i++){
        this.monthlyTotal+=Number(this.previousNewSalary[i].monthly);
        this.yearlyTotal+=Number(this.previousNewSalary[i].yerly);         
      }
    }

  }

  onFileChange(event) {
    this.invalidFileName = false;
    this.attachedDocument = null;
    this.documentFileImport.nativeElement.innerText = "Choose file";
    const files = event.target.files;
    if (files.length === 0)
    {
      this.attachedDocument = null;
      this.documentFileImport.nativeElement.innerText = "Choose file";
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      this.documentFileImport.nativeElement.innerText = "Choose file";
      this.attachedDocument = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachedDocument = null;
      return
    } 
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ','.',',','-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.documentFileImport.nativeElement.innerText = "Choose file";
      this.attachedDocument = null;
      return
    }

    const reader = new FileReader();
    this.attachedDocument = files[0];
    this.documentFileImport.nativeElement.innerText =files[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.attachedDocumentResult = reader.result;
    }
  }

  onAdditionFileChange(event,id) {
    this.invalidAdditionalFileName=false;
    const files = event.target.files;
    if (files.length === 0)
    {
      jQuery("#pdffile"+id).html("Choose file");
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      jQuery("#pdffile"+id).html("Choose file");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      jQuery("#pdffile"+id).html("Choose file");
      return
    } 

    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ','.',',','-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidAdditionalFileName = true;
      }
    })
    if (this.invalidAdditionalFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      jQuery("#pdffile"+id).html("Choose file");
      return
    }
    const reader = new FileReader();
    jQuery("#pdffile"+id).html(files[0].name);

    for(var i=0;i<this.additionalDocumentList.length;i++){
      if(this.additionalDocumentList[i].offerDocumentCollectionDocumentId==id){
        this.additionalDocumentList[i].documentFile=files[0];
      }
    }
    
  }

  UploadDocument(){
    var flag=0;
    if(this.selectedDocumentType==undefined){
      jQuery(".documentType").addClass("is-invalid");
      flag=1
    }
    else{
      jQuery(".documentType").removeClass("is-invalid");
    }
    if(this.selectedDocumentParticular==undefined){
      jQuery(".documentParticular").addClass("is-invalid");
      flag=1
    }
    else{
      jQuery(".documentParticular").removeClass("is-invalid");
    }
    if(this.selectedDocumentName==undefined){
      jQuery(".documentName").addClass("is-invalid");
      flag=1
    }
    else{
      jQuery(".documentName").removeClass("is-invalid");
    }
    if(this.attachedDocument!=null){
      jQuery(".custom-file-input").removeClass("is-invalid");
    }
    else{
      jQuery(".custom-file-input").addClass("is-invalid");
      flag=1;
    }

    if(flag==0){
      this.attachedDocumentList.push({
        offerDocumentCollectionDocumentId:this.attachedDocumentList.length+1,
        offerDocumentCollectionId:this.documentData.offerDocumentCollectionId,
        doumentType:this.selectedDocumentType,
        doumentTypName:this.documentTypes.filter(x=>x.attachmentDocumentTypeId==this.selectedDocumentType)[0].attachmentDocumentTypeName,
        doumentParticular:this.selectedDocumentParticular,
        doumentParticularName:this.documentParticulars.filter(x=>x.attachmentDocumentParticularId==this.selectedDocumentParticular)[0].attachmentDocumentParticularName,
        doumentNameId:this.selectedDocumentName,
        doumentName:this.documentNames.filter(x=>x.attachmentDocumentNameId==this.selectedDocumentName)[0].attachmentDocumentName,
        document:"",
        documentPath:this.attachedDocumentResult,
        approvalStatus:0,
        approvalRemarks:"",
        additionalDocument:false,
        modifyStatus:0,
        createdBy:this.autoUserId,
        documentFileSrc:this.attachedDocumentResult,
        documentFile:this.attachedDocument
      })     

      this.selectedDocumentName=undefined;
      this.selectedDocumentParticular=undefined;
      this.selectedDocumentType=undefined;
      this.attachedDocument=null;
      this.documentFileImport.nativeElement.innerText = "Choose file";
      this.groupAttachedDocument();
      

    }

  }

  groupAttachedDocument(){
    this.attachedDocumentArrayList=[];
    for(var i=0;i<this.attachedDocumentList.length;i++){
      var nflag=0;
      for(var j=0;j<this.attachedDocumentArrayList.length;j++){
        if(this.attachedDocumentList[i].doumentType==this.attachedDocumentArrayList[j].doumentType){
          nflag=1;
        }
      }
      if(nflag==0){
        this.attachedDocumentArrayList.push({
          doumentType:this.attachedDocumentList[i].doumentType,
          doumentTypName:this.attachedDocumentList[i].doumentTypName,
          documents:this.attachedDocumentList.filter(x=>x.doumentType==this.attachedDocumentList[i].doumentType)
        })
      }
    }
  }

  groupSubmittedAttachedDocument(){
    this.submittedDocumentArrayList=[];
    for(var i=0;i<this.attachedSubmittedDocumentArrayList.length;i++){
      var nflag=0;
      for(var j=0;j<this.submittedDocumentArrayList.length;j++){
        if(this.attachedSubmittedDocumentArrayList[i].doumentType==this.submittedDocumentArrayList[j].doumentType){
          nflag=1;
        }
      }
      if(nflag==0){
        this.submittedDocumentArrayList.push({
          doumentType:this.attachedSubmittedDocumentArrayList[i].doumentType,
          doumentTypName:this.attachedSubmittedDocumentArrayList[i].doumentTypName,
          documents:this.attachedSubmittedDocumentArrayList.filter(x=>x.doumentType==this.attachedSubmittedDocumentArrayList[i].doumentType)
        })
      }
    }
  //    // Added from here by anif on 21-10-2022 to grouping Portal document type into prejoining & Onboarding
  //    var docList = this.submittedDocumentArrayList.filter(e => e.doumentType == 6);    
  //    this.submittedDocumentArrayList = this.submittedDocumentArrayList.filter(e => e.doumentType != 6);
  //    this.submittedDocumentArrayList.forEach(element => {
  //      if (element.doumentType == 4) {
  //        element.documents.forEach(ele_doc => {
  //          docList[0].documents.push(ele_doc);
  //        })
  //        element.documents = docList[0].documents;
  //      }
  //    })
  //  // // Till here by anif on 21-10-2022
  }

  removeUploadedDocument(id){
    this.attachedDocumentList=this.attachedDocumentList.filter(x=>x.offerDocumentCollectionDocumentId!=id);
    this.groupAttachedDocument();
  }

  removeSubmittedDocument(id){
    this.attachedSubmittedDocumentArrayList=this.attachedSubmittedDocumentArrayList.filter(x=>x.offerDocumentCollectionDocumentId!=id);
    this.groupSubmittedAttachedDocument();
    if(this.removedDocumentId==""){
      this.removedDocumentId=id;
    }
    else{
      this.removedDocumentId=this.removedDocumentId+","+id;
    }
  }

  submitData(status){    
    if(this.documentData.attachmentDetails.length==0 && this.attachedDocumentArrayList.length==0){
      this.notificationService.showError("Please upload required documents","Error");
    }
    else{
      this.SpinnerService.show();
      this.fileToUpload=[];
      this.updatedSalary=[];
      this.remarksArray=[];
      if(this.salaryRemarks!=""){
        for(var i=0;i<this.submittedSalaryRemarksDetails.length;i++){
          if(i==this.submittedSalaryRemarksDetails.length-1){
            this.submittedSalaryRemarksDetails[i].reamrksReply=this.salaryRemarks;
            this.remarksArray.push({
              offerDocumentCollectionRemarksId:this.submittedSalaryRemarksDetails[i].offerDocumentCollectionRemarksId,
              offerDocumentCollectionId:this.submittedSalaryRemarksDetails[i].offerDocumentCollectionId,
              remarksType:this.submittedSalaryRemarksDetails[i].remarksType,
              reamrks:this.submittedSalaryRemarksDetails[i].reamrks,
              reamrksReply:this.submittedSalaryRemarksDetails[i].reamrksReply,
              createdBy:0,
              createdByName:null,
              createdOn:null,
              candidateFullName:null,
              modifiedOn:null,
            })
          }
        }
      }
      if(this.additionalRemarks!=""){
        for(var i=0;i<this.submittedAdditionalRemarksDetails.length;i++){
          if(i==this.submittedAdditionalRemarksDetails.length-1){
            this.submittedAdditionalRemarksDetails[i].reamrksReply=this.additionalRemarks;
            this.remarksArray.push({
              offerDocumentCollectionRemarksId:this.submittedAdditionalRemarksDetails[i].offerDocumentCollectionRemarksId,
              offerDocumentCollectionId:this.submittedAdditionalRemarksDetails[i].offerDocumentCollectionId,
              remarksType:this.submittedAdditionalRemarksDetails[i].remarksType,
              reamrks:this.submittedAdditionalRemarksDetails[i].reamrks,
              reamrksReply:this.submittedAdditionalRemarksDetails[i].reamrksReply,
              createdBy:0,
              createdByName:null,
              createdOn:null,
              candidateFullName:null,
              modifiedOn:null,
            })
          }
        }
      }
      for(var i=0;i<this.documentData.salaryDetails.length;i++){
        this.updatedSalary.push({
          offerDocumentCollectionSalaryId:this.documentData.salaryDetails[i].offerDocumentCollectionSalaryId,
          offerDocumentCollectionId:this.documentData.salaryDetails[i].offerDocumentCollectionId,
          emolumntId:this.documentData.salaryDetails[i].emolumntId,
          emolumntName:this.documentData.salaryDetails[i].emolumntName,
          monthly:this.documentData.salaryDetails[i].monthly,
          yerly:this.documentData.salaryDetails[i].yerly,
          emolumntVerifyStatus:this.documentData.salaryDetails[i].emolumntVerifyStatus,
          emolumntVerifyRemarks:this.documentData.salaryDetails[i].emolumntVerifyRemarks,
          createdBy:this.autoUserId
        })
      }
      for(var i=0;i<this.previousNewSalary.length;i++){
        this.updatedSalary.push({
          offerDocumentCollectionSalaryId:0,
          offerDocumentCollectionId:this.previousNewSalary[i].offerDocumentCollectionId,
          emolumntId:this.previousNewSalary[i].emolumntId,
          emolumntName:this.previousNewSalary[i].emolumntName,
          monthly:this.previousNewSalary[i].monthly,
          yerly:this.previousNewSalary[i].yerly,
          emolumntVerifyStatus:this.previousNewSalary[i].emolumntVerifyStatus,
          emolumntVerifyRemarks:this.previousNewSalary[i].emolumntVerifyRemarks,
          createdBy:this.autoUserId
        })
      }
      const formData = new FormData();
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("OfferDocumentCollectionId", this.documentData.offerDocumentCollectionId.toString());
      formData.append("RequsitaionDetailsId", this.documentData.requsitaionDetailsId.toString());
      formData.append("SalaryDetails", JSON.stringify(this.updatedSalary));
      formData.append("RemaksDetails", JSON.stringify(this.remarksArray));
      formData.append("AttachmentDocumnetNameIdsToDelete",this.removedDocumentId);
      formData.append("IsEnabled",status);
      this.offerDocumentAttachmentDetails=[];
      for(var i=0;i<this.attachedDocumentList.length;i++){
        this.offerDocumentAttachmentDetails.push({
          offerDocumentCollectionDocumentId:0,
          offerDocumentCollectionId:this.documentData.offerDocumentCollectionId,
          doumentType:this.attachedDocumentList[i].doumentType,
          doumentTypName:this.attachedDocumentList[i].doumentTypName,
          doumentParticular:this.attachedDocumentList[i].doumentParticular,
          doumentParticularName:this.attachedDocumentList[i].doumentParticularName,
          doumentNameId:this.attachedDocumentList[i].doumentNameId,
          doumentName:this.attachedDocumentList[i].doumentName,
          document:"",
          documentPath:"",
          approvalStatus:1,
          approvalRemarks:"",
          additionalDocument:false,
          modifyStatus:0,
          createdBy:this.autoUserId
        })   
        this.fileToUpload.push({ file:this.attachedDocumentList[i].documentFile});
        formData.append("UploadFile"+"_"+this.attachedDocumentList[i].doumentNameId.toString(),this.attachedDocumentList[i].documentFile);
      }
      for(var i=0;i<this.additionalDocumentList.length;i++){
        this.offerDocumentAttachmentDetails.push({
          offerDocumentCollectionDocumentId:this.additionalDocumentList[i].offerDocumentCollectionDocumentId,
          offerDocumentCollectionId:this.additionalDocumentList[i].offerDocumentCollectionId,
          doumentType:this.additionalDocumentList[i].doumentType,
          doumentTypName:this.additionalDocumentList[i].doumentTypName,
          doumentParticular:this.additionalDocumentList[i].doumentParticular,
          doumentParticularName:this.additionalDocumentList[i].doumentParticularName,
          doumentNameId:this.additionalDocumentList[i].doumentNameId,
          doumentName:this.additionalDocumentList[i].doumentName,
          document:"",
          documentPath:"",
          approvalStatus:1,
          approvalRemarks:"",
          additionalDocument:true,
          modifyStatus:0,
          createdBy:this.autoUserId
        })   
        this.additionalFileToUpload.push({ file:this.additionalDocumentList[i].documentFile});
        formData.append("AdditionalFile"+"_"+this.additionalDocumentList[i].offerDocumentCollectionDocumentId.toString(),this.additionalDocumentList[i].documentFile);
      }
      formData.append("AttachmentDetails", JSON.stringify(this.offerDocumentAttachmentDetails));
      this.documentService.updateCandidateOfferDocument(formData).subscribe((result) => {
       // console.log(result);
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.attachedDocumentList=[];
          this.additionalDocumentList=[];
          this.groupAttachedDocument();
          this.notificationService.showSuccess('Document Save successfully', "Success");
          //this.clearEntireForm();
          this.getCandidateOfferDocument();
          this.previousNewSalary=[];
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
        this.closeModal.nativeElement.click();
        this.notificationService.showError("Something went wrong", "Error")
      });
    }
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }

}
