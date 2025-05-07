import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAttachmentDocumentNameDetails, IAttachmentDocumentParticular, IAttachmentDocumentType, ISearchAttachmentDocumentName, ISearchAttachmentDocumentParticular, ISearchAttachmentDocumentType, ISearchdocumentrole } from 'src/app/interfaces/common/attachmentdocument.interface';
import { AttachmentdocumentService } from 'src/app/services/common/attachementdocument/attachmentdocument.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-role-wise-document-access',
  templateUrl: './role-wise-document-access.component.html',
  styleUrls: ['./role-wise-document-access.component.css']
})
export class RoleWiseDocumentAccessComponent implements OnInit {

  documentTypes: IAttachmentDocumentType[] = [];
  searchDocumentType: ISearchAttachmentDocumentType = {
    attachmentDocumentTypeId: null,
    isActive: true
  }
  searchdocument: ISearchdocumentrole = {
    DocumentnameId: null
  }
  documentParticulars: IAttachmentDocumentParticular[] = [];
  searchDocumentParticular: ISearchAttachmentDocumentParticular = {
    attachmentDocumentParticularId: null,
    attachmentDocumentTypeId: null,
    isActive: true
  }
  searchDocumentName: ISearchAttachmentDocumentName = {
    attachmentDocumentNameId: null,
    attachmentDocumentParticularId: null,
    isActive: true
  }
  documentParticularList: IAttachmentDocumentParticular[] = [];
  documentNameList: IAttachmentDocumentNameDetails[] = [];
  selectedDocumentType: number;;
  selectedDocumentParticular: number;
  selectedDocumentName: number;
  documentNames: IAttachmentDocumentNameDetails[] = [];
  RoleList: any = [];
  DataTable: any[] = [];
  rolearray: any[]=[];
  roleId: String[];
  array:any[]=[];
  createdBy: number;
  showUserRoleList: boolean = true;
  showedit: boolean = false;
  mapingText:string;
  str1:string;
  constructor(private attachmentDocumentService: AttachmentdocumentService,
    private SpinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private commonService: CommonService,
    private persistance: PersistanceService,) { this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.searchUserRole.AutoUserId = this.createdBy;}
    searchUserRole = {
      AutoUserId: null,
      isActive: true
    }

  ngOnInit() {
    this.getAllDocumentType();
    this.getAllDocumentParticulars();
    this.getAllDocumentName();
    this.getAllUserRole();
    this.getdata();
    this.loadDataTable();

  }
  getdata() {
    this.SpinnerService.show();
    this.commonService.getRoleWiseDocument(this.searchdocument).subscribe((response: any) => {
      if (response) {
        this.DataTable = response;
      }
      else {
        this.DataTable = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
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
  getAllDocumentType() {
    //this.documentTypes=[];
    this.attachmentDocumentService.getAllDocumentType(this.searchDocumentType).subscribe((result) => {
      if (result) {
        this.documentTypes = result;
      }
      else {
        this.documentTypes = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getAllDocumentParticulars() {
    this.documentParticulars = [];
    this.attachmentDocumentService.getAllDocumentParticular(this.searchDocumentParticular).subscribe((result) => {
      if (result) {
        this.documentParticulars = result;
      }
      else {
        this.documentParticulars = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getAllDocumentName() {
    this.documentNames = [];
    this.attachmentDocumentService.getAllDocumentName(this.searchDocumentName).subscribe((result) => {
      if (result) {
        this.documentNames = result;
      }
      else {
        this.documentNames = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  changeDocumentType(evt) {
    
    this.selectedDocumentParticular = undefined;
    this.selectedDocumentName = undefined;
    this.documentNameList = [];
    this.documentParticularList = this.documentParticulars.filter(x => x.attachmentDocumentTypeId == evt);
    this.roleId=null;
  }
  changeDocumentParticular(evt) {
    
    this.selectedDocumentName = undefined;
    this.documentNameList = this.documentNames.filter(x => x.attachmentDocumentParticularId == evt);
  }
  getAllUserRole() {
    this.SpinnerService.show();
    this.commonService.getAllUserRole(this.searchUserRole).subscribe((response: any) => {
      if (response.length != 0) {
        this.RoleList = response;
        this.SpinnerService.hide();
      }
      else {
        this.RoleList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.SpinnerService.hide();
    })
  }
  onEdit(record :any){
    this.rolearray=[];
    this.str1=null;
    this.roleId=null;
    this.selectedDocumentName=null;
    this.selectedDocumentParticular=null;
    this.mapingText="Edit Role Wise Document Access";
    this.showedit=true;
    this.showUserRoleList=false;
    this.changeDocumentType(record.attachmentDocumentTypeId);
    this.selectedDocumentType=record.attachmentDocumentTypeId;
    this.changeDocumentParticular(record.attachmentDocumentParticularId);
    this.selectedDocumentParticular=record.attachmentDocumentParticularId;
    this.selectedDocumentName= record.attachmentDocumentNameId;
    // this.changeDocumentType(record.attachmentDocumentTypeId);
    // this.changeDocumentParticular(record.attachmentDocumentParticularId);
    var userole = record.roleId.split(',');
    for (var i = 0; i < userole.length; i++) {
      this.rolearray.push(parseInt(userole[i]));
    }
    this.roleId=this.rolearray;
    this.str1=this.roleId.toString();
    if(this.str1=="0"){
      this.roleId=[];
    }
  }
  onBackClick(){
    this.showUserRoleList=true;
    this.showedit=false;
    this.loadDataTable();
    this.str1=null;
    this.roleId=null;
    this.selectedDocumentName=null;
    this.selectedDocumentParticular=null;
  }
  onChangeUserRole(RoleId: any){
    this.roleId = RoleId
    this.str1 = this.roleId.toString();
  }
  onSubmit(){
    let record =
    {
      AttachmentDocumentNameId : this.selectedDocumentName,
      AttachmentDocumentParticularId : this.selectedDocumentParticular,
      RoleIds : this.str1
    }
    if(record.RoleIds=="0"){
      this.notiService.showError("Please Select UserRole" , "Error");
    }
    else{
    this.SpinnerService.show();
    this.commonService.updateDocumentRole(record).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        jQuery(".close").click();
      }
      else {
        this.SpinnerService.hide();
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      // display form values on success
      this.SpinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
    }, () => {
      this.getdata();
      this.showUserRoleList = true;
      this.showedit=false;
      this.SpinnerService.hide();
    })
  }
  }
  onClickshow(){
    this.array=[];
    // console.log("chck",this.saveForm.value.LocationId[0])
    // console.log("chck",this.LocationList)
    for(let i=0;i<this.roleId.length;i++)
    {
      for(let j=0;j<this.RoleList.length;j++)
      {
        
        if(this.roleId[i]==this.RoleList[j].roleId)
        {
          console.log("TRY",this.RoleList[j].roleId)
          this.array.push(this.RoleList[j].roleName);
          console.log("TRY",this.array)
          
        }
      }
    }
  }
}
