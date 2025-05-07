import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomainService } from 'src/app/services/common/domain/domain.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from '../../../services/common/common/common.service';

declare var jQuery: any;

@Component({
  selector: 'app-managedomain',
  templateUrl: './managedomain.component.html',
  styleUrls: ['./managedomain.component.css']
})

export class ManagedomainComponent implements OnInit {

  DomainList: any[] = [];
  allDomainList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  parentDomainList: any[] = [];
  constructor(
    private domainService: DomainService,
    private spinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private notiService: NotificationService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm();

    this.getAllDomain();
  }

  createForm() {
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      DomainName: ['', Validators.required],
      DomainId: [0],
      ParentDomainId: [0],
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }

  onSubmit() {
    this.spinnerService.show();
    //this.saveForm.value.ParentDomainId = this.saveForm.value.ParentDomainId == null ? 0 : this.saveForm.value.ParentDomainId;
    this.saveForm.value.ParentDomainId=0;
    this.domainService.addDomain(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllDomain();
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

  onEdit(rowData: any) {
    debugger
    this.Operation = 'edit';
    this.saveForm.patchValue({
      DomainId: rowData.domainId,
      DomainName: rowData.domainName,
      IsActive: rowData.isActive,
      CreatedBy: rowData.createdBy
    });
  }

  getAllDomain() {
    this.spinnerService.show();
    this.allDomainList = [];
    this.parentDomainList=[];
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
      this.loadDataTable();
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
