import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomainService } from 'src/app/services/common/domain/domain.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-subdomain',
  templateUrl: './manage-subdomain.component.html',
  styleUrls: ['./manage-subdomain.component.css']
})
export class ManageSubdomainComponent implements OnInit {
  DomainList: any[] = [];
  DomainListAll: any[] = [];
  allDomainList:any[]=[];
  SubDomainList:any[]=[];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  
  parentDomainList: any[]=[];

  constructor(
    private domainService: DomainService,
    private spinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.getDomainName()
  }

  ngOnInit() {
    this.createForm();
    this.loadDataTable();
    this.getAllDomain();
    this.getAllSubDomain();
  }
  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      SubDomainName: ['', Validators.required],
      SubDomainId: [0],
      //ParentDomainId: [null],
      DomainId: [],
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }
  onSubmit(){
    this.spinnerService.show();  
    console.log("saveData", this.saveForm.value)
    debugger
    var value ={
      DomainId: this.saveForm.value.SubDomainId,
      DomainName:this.saveForm.value.SubDomainName,
      ParentDomainId:this.saveForm.value.DomainId,
      IsActive: this.saveForm.value.IsActive,
      CreatedBy:this.createdBy
    }
    this.domainService.addDomain(value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllSubDomain();
        jQuery(".close").click();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  onEdit(data: any){
    debugger
    this.Operation = 'edit';           
    //this.onChangePDomain(data.parentDomainId);    
    this.saveForm.patchValue({
      SubDomainName: data.subdomainName,
      IsActive: data.isActive,
      CreatedBy: this.createdBy,
      SubDomainId: data.subdomainId,
      //ParentDomainId: data.parentDomainId,
      DomainId: data.domainId
    });
  }

  getAllSubDomain(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.domainService.getAllSubDomainNew(this.saveForm.value).subscribe((response: any) => {    
      console.log("getSubDomain", response)        
      if(response){
        this.SubDomainList = response;              
      }
      else{
        this.SubDomainList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllDomain() {
    this.spinnerService.show();
    this.allDomainList = [];
    this.saveForm.value.IsActive = null;
    //this.saveForm.value.ParentDomainId = this.saveForm.value.ParentDomainId ? null : 0;
    this.domainService.getAllDomain(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.DomainList = response;
        for (var i = 0; i < this.DomainList.length; i++) {
          var obj = {
            domainId: this.DomainList[i].domainId,
            domainName: this.DomainList[i].domainName,
            parentDomainId: this.DomainList[i].parentDomainId,
            parentDomainName: this.DomainList[i].parentDomainId == 0 ? '' : this.DomainList.filter(x => x.domainId == this.DomainList[i].parentDomainId)[0].domainName,
            isActive: this.DomainList[i].isActive
          }
          this.allDomainList.push(obj);
          if (this.DomainList[i].parentDomainId == 0 || this.DomainList[i].parentDomainId == null) {
            this.parentDomainList.push(this.DomainList[i])
          }
        }
        //console.log("Domain List: ", this.DomainList);
      }
      else {
        this.DomainList = [];
        this.allDomainList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  // onChangePDomain(parentDomainId: any){
  //   let data: any = {
  //     'ParentDomainId': 0,
  //     'IsActive': true
  //   }
  //   this.getDomainName(data);
  // }
  getDomainName(){
    let data: any = {
      'ParentDomainId': 0,
      'IsActive': true
    }
    this.spinnerService.show();
    this.domainService.getAllDomain(data).subscribe((response: any) => {            
      if(response){
        this.DomainListAll = response;             
      }
      else{
        this.DomainListAll = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
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
      });
    });
  }
}


