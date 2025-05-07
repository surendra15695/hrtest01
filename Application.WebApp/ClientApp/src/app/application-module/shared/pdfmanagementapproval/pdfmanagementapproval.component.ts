import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import {
  IManagementApprovalCandidates, IManagementApprovalMasterData, IManagementApprovalVacancy,
  ISearchManagementApproval
} from '../../../interfaces/offer/managementapproval.interface';
import { ManagementapprovalService } from '../../../services/offer/managementapproval/managementapproval.service';


@Component({
  selector: 'app-pdfmanagementapproval',
  templateUrl: './pdfmanagementapproval.component.html',
  styleUrls: ['./pdfmanagementapproval.component.css']
})
export class PdfmanagementapprovalComponent implements OnInit {
  @Input() candidateIds : string;
  @Input() requisitionDetailId : number;
  @Input() approvalId : number;
  FromData: string;
  ToData: string;
  createdBy: number;
  candidateIdNames: any[];
  candidateList: IManagementApprovalCandidates[] = [];
  approvalVacancyList: IManagementApprovalVacancy[] = [];
  signatureFromText: string;
  signatureToText: string;
  signatureFrom: any[];
  signatureTo: any[];
  topNote: string;
  bottomNote: string;
  managementApprovalId: number;
  updatedDated:string;

  managementApprovalData: any;
  serachManagementApproval: ISearchManagementApproval = {
    candidateId: null,
    managementApprovalId: null,
    requisitionDetailId: null
  }
  btnVisible:boolean=true;
  approvedDocument:string;
  constructor(private managementApprovalService: ManagementapprovalService,) {
    
   }

  ngOnInit() {
    console.log(this.candidateIds);
    this.getManagementApproval(this.candidateIds);
  }

  getManagementApproval(candidate) {
    this.managementApprovalData = 0;
    this.serachManagementApproval.candidateId = candidate;
    this.serachManagementApproval.requisitionDetailId = this.requisitionDetailId;
    console.log(this.serachManagementApproval);
    this.managementApprovalService.getManagementApproval(this.serachManagementApproval).subscribe((response) => {
      if (response) {
        this.managementApprovalData = response;
        this.updatedDated=this.managementApprovalData.date;
        console.log(this.managementApprovalData);
        if (this.managementApprovalData.managementApprovalId > 0) {
          this.signatureFrom = [];
          this.signatureTo = [];
          for (var i = 0; i < this.managementApprovalData.managementApprovalSigntureFrom.length; i++) {
            this.signatureFrom.push({
              signatureFromText: this.managementApprovalData.managementApprovalSigntureFrom[i].signatureNeededFrom
            })
          }
          for (var i = 0; i < this.managementApprovalData.managementApprovalSigntureTo.length; i++) {
            this.signatureTo.push({
              signatureToText: this.managementApprovalData.managementApprovalSigntureTo[i].signatureNeededTo
            })
          }
          this.FromData = this.managementApprovalData.from;
          this.ToData = this.managementApprovalData.to;
          this.candidateList = this.managementApprovalData.managementApprovalCandidates;
          this.topNote = this.managementApprovalData.note;
          this.approvalVacancyList = this.managementApprovalData.managementApprovalVacancy;
          this.btnVisible=false;
          this.approvedDocument=this.managementApprovalData.managementApprovalCandidates[0].approvedDocument;
        }
      }
      else {
        
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

  ngOnChanges() {
    if(this.approvalId==1){
      this.getManagementApproval(this.candidateIds);
    }
  }   
}
