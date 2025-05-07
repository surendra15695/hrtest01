import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ISearchSalaryType, ISalaryType, ISearchSalaryAccountHead, ISalaryAccountHead } from '../../../interfaces/common/paystructure.interface'
import { PaystructureService } from 'src/app/services/common/paystructure/paystructure.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-salaryaccounthead',
  templateUrl: './salaryaccounthead.component.html',
  styleUrls: ['./salaryaccounthead.component.css']
})
export class SalaryaccountheadComponent implements OnInit {
  salaryAccountHeadList: ISalaryAccountHead[] = [];
  salaryTypeList: ISalaryType[] = [];
  searchSalaryType: ISearchSalaryType = {
    salaryTypeId: null,
    isActive: true
  }
  searchSalaryAccountHead: ISearchSalaryAccountHead = {
    salaryAccountHeadId: null,
    isActive: null
  }
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  constructor(
    private payStructureService: PaystructureService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    //this.loadDataTable();
    this.createForm();
    this.getAllSalaryType();
    this.getAllSalaryAccountHead();
  }

  createForm() {
    this.saveForm = this.fb.group({
      SalaryAccountHeadName: ['', Validators.required],
      SalaryAccountHeadId: [0],
      SalaryTypeId: [null, Validators.required],
      CalculationType: ["M"],
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }

  onSubmit() {
    this.spinnerService.show();
    //console.log(this.saveForm.value);
    this.payStructureService.addSalaryAccountHead(this.saveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllSalaryAccountHead();
        this.spinnerService.hide();
        jQuery(".close").click();
        jQuery(".custom-menu").hide();
      }
      else {
        this.notiService.showError(response.msg, "Error");
        this.spinnerService.hide();
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(RowData: any) {
    this.saveForm.patchValue({
      SalaryAccountHeadName: RowData.salaryAccountHeadName,
      SalaryAccountHeadId: RowData.salaryAccountHeadId,
      SalaryTypeId: RowData.salaryTypeId,
      CalculationType: RowData.calCulationType,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });
  }

  getAllSalaryAccountHead() {
    this.spinnerService.show();
    this.payStructureService.getAllSalaryAccountHead(this.searchSalaryAccountHead).subscribe((response: any) => {
      if (response) {
        // console.log(response);
        this.salaryAccountHeadList = response;
      }
      else {
        this.salaryAccountHeadList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllSalaryType() {
    this.spinnerService.show();
    this.payStructureService.getAllSalaryType(this.searchSalaryType).subscribe((response: any) => {
      if (response) {
        this.salaryTypeList = response;
        //this.loadDataTable();                            
      }
      else {
        this.salaryTypeList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        //"searching": true,
        //"paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }

}
