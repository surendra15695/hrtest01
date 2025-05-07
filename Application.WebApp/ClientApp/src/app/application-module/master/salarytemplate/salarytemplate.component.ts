import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IGrade, ISearchGrade } from '../../../interfaces/common/grade.interface';
import { ISearchSalaryAccountHead, ISalaryAccountHead, ISalaryFormula, ISalaryArray,ISalaryTemplateMasterData,
  ISearchSalaryTemplate,ISalaryTemplateList,ISalaryTemplateFormula } from '../../../interfaces/common/paystructure.interface'
import { PaystructureService } from 'src/app/services/common/paystructure/paystructure.service';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-salarytemplate',
  templateUrl: './salarytemplate.component.html',
  styleUrls: ['./salarytemplate.component.css']
})
export class SalarytemplateComponent implements OnInit {
  @ViewChild('closeCalculateModal', { static: false }) closeCalculateModal: ElementRef;
  salaryAccountHeadList: ISalaryAccountHead[] = [];
  searchSalaryAccountHead: ISearchSalaryAccountHead = {
    salaryAccountHeadId: null,
    isActive: true
  }
  gradeList: IGrade[] = [];
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }
  createdBy: number;
  salaryFormulaList: ISalaryFormula[] = [];
  salaryAmount: string;
  salaryFormula: string;
  selectedSalaryAccountHeadId: number;
  formulaarr: any[] = [];
  selectedCalculateSalaryAccountHeadId: number;
  calculateFormula: string;

  listVisible: boolean = true;
  formVisible: boolean = false;
  SalaryTemplateName: string;
  selectedGradeId: number;
  salaryTemplateId: number;
  salaryArray: ISalaryArray[] = [];

  searchSalaryTemplate:ISearchSalaryTemplate={
    salaryTemplateId:null,
    grade:null,
    isActive:true
  };
  salaryTemplateList:ISalaryTemplateList[]=[];
  salaryTemplates:ISalaryTemplateMasterData[]=[];

  constructor(
    private payStructureService: PaystructureService,
    private gradeService: GradeService,
    private spinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private persistanceService: PersistanceService,
  ) {
    this.createdBy = this.persistanceService.get('loggedinuser').autoUserId;
    this.getAlltemplateList();
    this.getAllSalaryAccountHead();
    this.getAllGrade();
  }

  ngOnInit() {
    this.loadDataTable();
  }

  getAllSalaryAccountHead() {
    this.spinnerService.show();
    this.payStructureService.getAllSalaryAccountHead(this.searchSalaryAccountHead).subscribe((response: any) => {
      if (response) {
        this.salaryAccountHeadList = response;
      }
      else {
        this.salaryAccountHeadList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  AddRowInBetween(val){
    var flag = 0;
    if (this.selectedSalaryAccountHeadId == undefined || this.selectedSalaryAccountHeadId == 0) {
      flag = 1;
      jQuery(".ddltablesalary").addClass("is-invalid");
    }
    else {
      jQuery(".ddltablesalary").removeClass("is-invalid");
    }
    if (flag == 0) {
    var items={
      salaryAccountHeadId: this.selectedSalaryAccountHeadId,
        salaryAccountName: this.salaryAccountHeadList.filter(x => x.salaryAccountHeadId == this.selectedSalaryAccountHeadId)[0].salaryAccountHeadName,
        formula: this.salaryFormula,
        amount: this.salaryAmount
    }
    this.salaryFormulaList.splice(val,0,items);
    this.selectedSalaryAccountHeadId = undefined;
    this.salaryAmount = "";
    this.salaryFormula = "";
  }
  }
  getAllGrade() {
    this.spinnerService.show();
    this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
      if (response) {
        this.gradeList = response;
      }
      else {
        this.gradeList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllSalaryTemplateList() {
    this.salaryTemplateList=[];
    this.spinnerService.show();
    this.payStructureService.getAllSalaryTemplate(this.searchSalaryTemplate).subscribe((response: any) => {
      if (response) {
        this.salaryTemplateList = response;
      
      }
      else {
        this.salaryTemplateList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.spinnerService.hide();
      this.loadDataTable();
    })
  }

  addFormula() {
    var flag = 0;
    if (this.selectedSalaryAccountHeadId == undefined || this.selectedSalaryAccountHeadId == 0) {
      flag = 1;
      jQuery(".ddltablesalary").addClass("is-invalid");
    }
    else {
      jQuery(".ddltablesalary").removeClass("is-invalid");
    }

    if (flag == 0) {
      this.salaryFormulaList.push({
        salaryAccountHeadId: this.selectedSalaryAccountHeadId,
        salaryAccountName: this.salaryAccountHeadList.filter(x => x.salaryAccountHeadId == this.selectedSalaryAccountHeadId)[0].salaryAccountHeadName,
        formula: this.salaryFormula,
        amount: this.salaryAmount
      })
      this.selectedSalaryAccountHeadId = undefined;
      this.salaryAmount = "";
      this.salaryFormula = "";
    }

  }

  clickBtn(dataText) {
    this.formulaarr.push(dataText);
    this.createFormula();
  }

  createFormula() {
    this.calculateFormula = "";
    for (var i = 0; i < this.formulaarr.length; i++) {
      this.calculateFormula = this.calculateFormula + this.formulaarr[i];
    }
  }

  removeCalculateArray() {
    this.formulaarr.pop();
    console.log(this.formulaarr);
    this.createFormula();
  }

  addAccountHead() {
    if (this.selectedCalculateSalaryAccountHeadId != undefined) {
      this.formulaarr.push("[" + this.salaryAccountHeadList.filter(x => x.salaryAccountHeadId == this.selectedCalculateSalaryAccountHeadId)[0].salaryAccountHeadName + "]");
      this.createFormula();
      this.selectedCalculateSalaryAccountHeadId = undefined;
    }
  }

  clearFormula() {
    this.formulaarr = [];
    this.calculateFormula = "";
    this.selectedCalculateSalaryAccountHeadId = undefined;
  }

  submitFormula() {
    this.salaryFormula = this.calculateFormula;
    this.closeCalculateModal.nativeElement.click();
    this.calculateFormula = "";
  }

  showList() {
    this.listVisible = true;
    this.formVisible = false;
    this.searchSalaryTemplate.salaryTemplateId=0;   
    this.getAlltemplateList();  
  }

  showForm() {
    this.listVisible = false;
    this.formVisible = true;
    this.salaryTemplateId = 0;
    this.salaryFormulaList=[];
    this.selectedGradeId=undefined;
    this.SalaryTemplateName="";
  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  formSubmit() {
    var flag = 0;
    var msg = "";
    
    if (this.SalaryTemplateName == undefined || this.SalaryTemplateName == "") {
      msg = "Please enter template name";
      flag = 1;
    }
    if (this.selectedGradeId == undefined) {
      msg = "Please select grade";
      flag = 1;
    }
    if (this.salaryFormulaList.length == 0) {
      msg = "Please create template";
      flag = 1;
    }
    if (flag == 0) {
      this.spinnerService.show();
      this.salaryArray = [];
      for (var i = 0; i < this.salaryFormulaList.length; i++) {
        this.salaryArray.push({
          salaryAccountHead: this.salaryFormulaList[i].salaryAccountHeadId,
          formula: this.salaryFormulaList[i].formula,
          amount:(this.salaryFormulaList[i].amount==null || this.salaryFormulaList[i].amount==undefined)?"0": this.salaryFormulaList[i].amount.toString(),
        })
      }
      const formData = new FormData();
      formData.append("SalaryTemplateId", this.salaryTemplateId.toString());
      formData.append("SalaryTemplateName", this.SalaryTemplateName);
      formData.append("Grade", this.selectedGradeId.toString());
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("IsActive", "true");
      formData.append("ClaCulatePayStructureSearch", JSON.stringify(this.salaryArray));
      console.log(formData);
      this.payStructureService.addSalaryTemplate(formData).subscribe((result) => {
        if (result.successFlag == 1) {
          this.spinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.salaryTemplateId = result.id;
          this.searchSalaryTemplate.salaryTemplateId = result.id;
          this.showAmountGetAll();
          // this.SalaryTemplateName="";
          // this.selectedGradeId=undefined;
          // this.salaryArray=[];
          // this.salaryFormulaList=[];   
          // this.salaryTemplateId=0 ;
          //this.searchSalaryTemplate.salaryTemplateId=0;   
          //this.getAlltemplateList(); 
        }
        else {
          this.notificationService.showError(result.msg, "Error");  
          this.spinnerService.hide();        
        }

      }, error => {
        // display form values on success
        this.notificationService.showError("Something went wrong.. Try again later..", "");
        this.spinnerService.hide();
        
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
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

  getAlltemplateList(){
    this.salaryTemplates=[];
    this.payStructureService.getAllSalaryTemplateList(this.searchSalaryTemplate).subscribe((response: any) => {
      if (response) {
        this.salaryTemplates = response;
        console.log(response);
        this.loadDataTable();
      }
      else {
        this.salaryTemplates = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadDataTable();
    })
  }

  deleteRow(salaryHead:any){
    this.salaryFormulaList=this.salaryFormulaList.filter(x=>x.salaryAccountHeadId!=salaryHead)
  }

  editButton(data){
    this.salaryFormulaList=[];
    this.listVisible=false;
    this.formVisible=true;
    this.salaryTemplateId=data.salaryTemplateId.toString();
    this.searchSalaryTemplate.salaryTemplateId=data.salaryTemplateId;
    this.SalaryTemplateName=data.salaryTemplateName;
    this.selectedGradeId=data.grade;
    this.showAmountGetAll();
    // this.payStructureService.getAllSalaryTemplateFormula(this.searchSalaryTemplate).subscribe((response: any) => {
    //   if (response) {
    //     this.salaryFormulaList = response;
    //     console.log(response);
    //     this.listVisible=false;
    //     this.formVisible=true;
    //   }
    //   else {
    //     this.salaryFormulaList = [];
    //   }
    // }, error => {
    //   console.log(error);
    // }, () => {
    // })
  }
  showAmountGetAll(){
    this.payStructureService.getAllSalaryTemplateFormula(this.searchSalaryTemplate).subscribe((response: any) => {
      if (response) {
        this.salaryFormulaList = response;
        console.log(response);
      }
      else {
        this.salaryFormulaList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }

}
