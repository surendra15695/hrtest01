import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/common/language/language.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managelanguage',
  templateUrl: './managelanguage.component.html',
  styleUrls: ['./managelanguage.component.css']
})

export class ManagelanguageComponent implements OnInit {

  LanguageList: any[] = [];
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private languageService: LanguageService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm(); 
    
    this.getAllLanguage();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      LanguageName:['', Validators.required],
      LanguageId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.languageService.addLanguage(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllLanguage();  
        jQuery(".close").click();        
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(Data: any){    
    this.Operation = 'edit';
    this.saveForm.patchValue({
      LanguageName: Data.languageName,
      LanguageId: Data.languageId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }

  getAllLanguage(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.languageService.getAllLanguage(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.LanguageList = response;                
      }
      else{
        this.LanguageList = [];        
      }      
    }, error => {
      // display form values on success
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
