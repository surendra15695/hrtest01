import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/common/location/location.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import * as FileSaver from 'file-saver';
declare var jQuery: any;
@Component({
  selector: 'app-managelocation',
  templateUrl: './managelocation.component.html',
  styleUrls: ['./managelocation.component.css']
})
export class ManagelocationComponent implements OnInit {
  Operation: string;
  LocationList: any[] = [];
  VerticalList: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  
  constructor(
    private locationService: LocationService,
    private verticalService: VerticalService,
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
    this.getAllVertical();
    this.getAllLocation();
    // this.geTest();
  }

  createForm(){
    this.Operation = 'add';  
    this.saveForm = this.fb.group({
      LocationNo:['', Validators.required],
      LocationCode:['', Validators.required],
      LocationOffice:['', Validators.required],
      LocationId:[0],
      VerticalId:[null, Validators.required],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.locationService.addLocation(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllLocation();  
        jQuery(".close").click();      
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(Data: any){  
    this.Operation = 'edit';      
    this.saveForm.patchValue({
      LocationNo: Data.locationNo,
      LocationId: Data.locationId,
      LocationOffice: Data.locationOffice,
      LocationCode: Data.locationCode,
      VerticalId:Data.verticalId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }
  downloadFile(blobName: string): void {
    this.locationService.getTestfile(blobName,"candidateresume").subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const fileName = blobName; // You can set a specific filename if needed

      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
  openFile(blobName: string): void {
    this.locationService.getTestfile(blobName,"candidateresume").subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
      
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
  // downloadFile(blobName: string) {
  //   this.locationService.getTestfile(blobName).subscribe(blob => {
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = blobName + '.pdf';
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }, error => {
  //     console.error('Download error:', error);
  //   });
  // }
  // geTest(){
  //   this.locationService.getTestfile("133652654219118833_1554_ApplicationForm.pdf").subscribe((response: any) => {  
  //     console.log("chck", response)          
  //   })
  // }
  getAllLocation(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.locationService.getAllLocation(this.saveForm.value).subscribe((response: any) => {  
     // console.log("getAllLocatioin", response)          
      if(response){
        this.LocationList = response;
        //console.log("FunList: ", response);                
      }
      else{
        this.LocationList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllVertical(){
    this.spinnerService.show();
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.VerticalList = response;
        //console.log("VerticalList: ", response);                
      }
      else{
        this.VerticalList = [];        
      }      
    }, error => {     
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
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
