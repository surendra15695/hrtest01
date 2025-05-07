import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service'; 

@Component({
  selector: 'app-viewhandbook',
  templateUrl: './viewhandbook.component.html',
  styleUrls: ['./viewhandbook.component.css']
})
export class ViewhandbookComponent implements OnInit {
  handBookLink:string="www.google.com";

  urlDownload: string ;
  PdfDocId: [0];
  DownloadPDFList: any[] = [];
  saveForm = new FormGroup({
    Name: new FormControl('')
  }); 
  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,) { }

  ngOnInit() {
    this.getAllAttachmentPDF();
  }
  getAllAttachmentPDF(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null
    this.commonService.getAllDownloadPDFHandBook(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.DownloadPDFList = response;   
        this.urlDownload  =   this.DownloadPDFList[0].documentPath;                  
      }
      else{
        this.DownloadPDFList = [];        
      }      
    })  

  }
}
