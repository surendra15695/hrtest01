import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {ICampusStream,ISearchCampusStream} from '../../../interfaces/campus/campuscommon.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managecampusstream',
  templateUrl: './managecampusstream.component.html',
  styleUrls: ['./managecampusstream.component.css']
})
export class ManagecampusstreamComponent implements OnInit {
  streamList: ICampusStream[] = [];
  Operation: string;
  createdBy: number;
  saveForm : FormGroup;
  campusStream:ICampusStream;
  searchStream:ISearchCampusStream={
    campusStreamId:null,
    isActive:null
  }
  selectedSearchStream:ISearchCampusStream={
    campusStreamId:null,
    isActive:null
  }

  constructor(
    private campusCommonService: CampuscommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
    this.createForm(); 
    
    this.getAllCampusStream();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      StreamName:['', Validators.required],
      CampusStreamId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.campusCommonService.addCampusStream(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllCampusStream();     
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

  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.custom-menu');
        body_.append(dropdownMenu.detach());
        var eOffset = jQuery(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + jQuery(e.target).outerHeight(),
          'left': eOffset.left,
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });
      jQuery(".custom-menu").find(".dropdown-item").on("click", function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.custom-menu').hide();
      });
    });
  }

  getSelectedCampusStream(id){
    jQuery(".custom-menu").hide();
    this.spinnerService.show();
    this.selectedSearchStream.campusStreamId=id;
    this.selectedSearchStream.isActive=null
    this.campusCommonService.getAllCampusStream(this.selectedSearchStream).subscribe((response: any) => {            
      if(response){
        this.campusStream = response[0];
        this.Operation = 'edit';
        this.saveForm.patchValue({
          StreamName: this.campusStream.streamName,
          CampusStreamId: this.campusStream.campusStreamId,
          IsActive: this.campusStream.isActive,
          CreatedBy: 0
        });   
        console.log(this.saveForm.value);             
      }
      else{
        this.campusStream = null;        
      }      
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllCampusStream(){
    this.spinnerService.show();
    this.searchStream.campusStreamId=null;
    this.searchStream.isActive=null
    this.campusCommonService.getAllCampusStream(this.searchStream).subscribe((response: any) => {            
      if(response){
        this.streamList = response;                
      }
      else{
        this.streamList = [];        
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
