import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IVertical } from 'src/app/interfaces/common/vertical.interface';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { FunctionService } from '../../../services/common/function/function.service';
import { EdmsService } from '../../../services/common/edms/edms.service';
import { PositionService } from '../../../services/common/position/position.service';
import { IGrade, ISearchGrade } from '../../../interfaces/common/grade.interface';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { Router, ActivatedRoute, Route, Params, ActivatedRouteSnapshot } from '@angular/router'
declare var jQuery: any;


@Component({
  selector: 'app-addedit-gradewise-docmap',
  templateUrl: './addedit-gradewise-docmap.component.html',
  styleUrls: ['./addedit-gradewise-docmap.component.css']
})
export class AddeditGradewiseDocmapComponent implements OnInit {

  selectedVerticalId: number;
  verticals: IVertical[] = [];
  createdBy: number;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  selectedfunctionId: number;
  functionName: string;

  //grade
  gradeList: IGrade[] = [];
  searchGrade: ISearchGrade = {
    gradeId: null,
    isActive: true
  }
  isEdit: boolean;
  DocNameList: any[] = [];
  DocTypeList: any[] = [];
  DocParticularList: any[] = [];
  objAddEditGradewiseDocMapping: AddEditGradewiseDocMapping;
  // Edit Mode
  gradeWiseDocumentMapList: any[] = [];
  searchGradeWiseDocMaplist = {
    DocumentMapId: null,
    VerticalId: null,
    FunctionId: null,
    GradeId: null
  }
  gradewiseDocMapDetailsList: any[] = [];
  searchGradeWiseDocMapDetailslist = {
    DocumentMapId: null
  }
  docMapId: number;

  constructor(
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private gradeService: GradeService,
    private edmsService: EdmsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    jQuery(".custom-menu").hide();
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.objAddEditGradewiseDocMapping = new AddEditGradewiseDocMapping();
    this.isEdit = this.route.snapshot.params.isEdit === 'true' ? true : false;
    this.docMapId = this.route.snapshot.params.mapId;
    if (this.isEdit) {
      this.searchGradeWiseDocMaplist.DocumentMapId = Number(this.docMapId);
      this.searchGradeWiseDocMapDetailslist.DocumentMapId = Number(this.docMapId);
      this.objAddEditGradewiseDocMapping.documentMapId = Number(this.docMapId);
      this.getAllGradewiseDocMappingList();
      this.getAllGradeWiseDocDetailsList();
    }
  }

  ngOnInit() {
    this.getAllGrade();
    this.getAllVerticals();
    this.getAllAttachmentDocumentType();
  }
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  }
  changeVertical() {
    // this.selectedVerticalId = this.searchForm.get("verticalId").value;
    this.selectedVerticalId = this.objAddEditGradewiseDocMapping.verticalId;
    this.getAllFunction();
  }
  //Function
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVerticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          functionName: "All",
          verticalId: 0,
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }

  // Grade
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
  getAllAttachmentDocumentType() {
    let docTypeSearchObj = {
      AttachmentDocumentName: null,
      AttachmentDocumentNameId: null,
      AttachmentDocumentTypeId: null,
      AttachmentDocumentParticularId: null,
      IsActive: true,
      CreatedBy: null
    }
    this.commonService.getAllAttachmentDocumentType(docTypeSearchObj).subscribe((response: any) => {
      if (response) {
        this.DocTypeList = response;
      }
      else {
        this.DocTypeList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangeDocType(docTypeID: any) {
    let data: any = {
      'AttachmentDocumentTypeId': docTypeID,
      'IsActive': true
    }
    this.getAllAttachmentDocumentParticular(data);
  }

  getAllAttachmentDocumentParticular(data: any) {
    this.commonService.GetAllAttachmentDocumentParticular(data).subscribe((response: any) => {
      if (response) {
        this.DocParticularList = response;
      }
      else {
        this.DocParticularList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
  onChangeDocParticular(docParticularId: any) {
    let dataObj: any = {
      AttachmentDocumentName: null,
      AttachmentDocumentNameId: null,
      AttachmentDocumentTypeId: null,
      AttachmentDocumentParticularId: docParticularId,
      IsActive: true,
      CreatedBy: null
    }
    this.getAllAttachmentDocumentName(dataObj);
  }
  getAllAttachmentDocumentName(dataObj) {
    this.commonService.getAllAttachmentDocumentName(dataObj).subscribe((response: any) => {
      if (response) {
        this.DocNameList = response;
      }
      else {
        this.DocNameList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  onSubmit() {
    if (this.isValid()) {
      if (!this.isEdit) {
        this.objAddEditGradewiseDocMapping.attachmentDocNameId.forEach(element => {
          let docNameObj = {
            DocumentMapIDtld: 0,
            DocumentMapId: 0,
            AttachmentDocumentNameId: element
          }
          this.objAddEditGradewiseDocMapping.gradeWiseDocuments.push(docNameObj);
        })
      } else {
        this.objAddEditGradewiseDocMapping.attachmentDocNameId.forEach(selected_ele => {
          // Check already added or not
          var chkExisted = this.gradewiseDocMapDetailsList.find(e => e.attachmentDocumentNameId == selected_ele);
          if (chkExisted != undefined) {
            let docNameObj = {
              DocumentMapIDtld: chkExisted.documentMapIDtld,
              DocumentMapId: chkExisted.documentMapId,
              AttachmentDocumentNameId: chkExisted.attachmentDocumentNameId
            }
            this.objAddEditGradewiseDocMapping.gradeWiseDocuments.push(docNameObj);
          } else {
            let docNameObj = {
              DocumentMapIDtld: 0,
              DocumentMapId: 0,
              AttachmentDocumentNameId: selected_ele
            }
            this.objAddEditGradewiseDocMapping.gradeWiseDocuments.push(docNameObj);
          }
        })
      }

      const formData = new FormData();
      formData.append("DocumentMapId", this.isEdit ? this.objAddEditGradewiseDocMapping.documentMapId.toString() : "0");
      formData.append("VerticalId", this.objAddEditGradewiseDocMapping.verticalId.toString());
      formData.append("FunctionId", this.objAddEditGradewiseDocMapping.functionId.toString());
      formData.append("GradeId", this.objAddEditGradewiseDocMapping.gradeId.toString());
      formData.append("AttachmentDocumentTypeId", this.objAddEditGradewiseDocMapping.attachmentDocumentTypeId.toString());
      formData.append("AttachmentDocumentPerticularId", this.objAddEditGradewiseDocMapping.attachmentDocumentPerticularId.toString());
      formData.append("isActive", this.objAddEditGradewiseDocMapping.isActive.toString());
      formData.append("CreatedBy", this.createdBy.toString());
      formData.append("GradeWiseDocuments", JSON.stringify(this.objAddEditGradewiseDocMapping.gradeWiseDocuments))
      this.edmsService.AddEditGradewiseDocMap(formData).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.onBackClick();
          jQuery(".custom-menu").hide();
        }
        else {
          this.notiService.showError(response.msg, "Error");
        }
      }, error => {
        this.notiService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
      }, () => {
        this.spinnerService.hide();
      })
    }
  }
  isValid() {
    if (this.objAddEditGradewiseDocMapping.verticalId == undefined || this.objAddEditGradewiseDocMapping.verticalId == null) {
      this.notiService.showError("Please Select Vertical", "Error");
      return false;
    }
    if (this.objAddEditGradewiseDocMapping.functionId == undefined || this.objAddEditGradewiseDocMapping.functionId == null) {
      this.notiService.showError("Please Selecte Function", "Error");
      return false;
    }
    if (this.objAddEditGradewiseDocMapping.gradeId == undefined || this.objAddEditGradewiseDocMapping.gradeId == null) {
      this.notiService.showError("Please Select Grade", "Error");
      return false;
    }
    if (this.objAddEditGradewiseDocMapping.attachmentDocumentTypeId == undefined || this.objAddEditGradewiseDocMapping.attachmentDocumentTypeId == null) {
      this.notiService.showError("Please Select Document Type", "Error");
      return false;
    }
    if (this.objAddEditGradewiseDocMapping.attachmentDocumentPerticularId == undefined || this.objAddEditGradewiseDocMapping.attachmentDocumentPerticularId == null) {
      this.notiService.showError("Please Select Document Particular", "Error");
      return false;
    }
    if (this.objAddEditGradewiseDocMapping.attachmentDocNameId.length == undefined) {
      this.notiService.showError("Please Select Document Name", "Error");
      return false;
    }
    return true;
  }

  // Edit Mode
  getAllGradewiseDocMappingList() {
    this.spinnerService.show();
    this.edmsService.getAllGradeWiseDocMapList(this.searchGradeWiseDocMaplist).subscribe((response: any) => {
      if (response.length != 0) {
        this.gradeWiseDocumentMapList = response;
        this.selectedVerticalId = this.gradeWiseDocumentMapList[0].verticalId;
        this.getAllFunction();
        this.onChangeDocType(this.gradeWiseDocumentMapList[0].attachmentDocumentTypeId);
        this.onChangeDocParticular(this.gradeWiseDocumentMapList[0].attachmentDocumentPerticularId);
        setTimeout(() => {
          this.objAddEditGradewiseDocMapping.verticalId = this.gradeWiseDocumentMapList[0].verticalId;
          this.objAddEditGradewiseDocMapping.functionId = this.gradeWiseDocumentMapList[0].functionId;
          this.objAddEditGradewiseDocMapping.gradeId = this.gradeWiseDocumentMapList[0].gradeId;
          this.objAddEditGradewiseDocMapping.attachmentDocumentTypeId = this.gradeWiseDocumentMapList[0].attachmentDocumentTypeId;
          this.objAddEditGradewiseDocMapping.attachmentDocumentPerticularId = this.gradeWiseDocumentMapList[0].attachmentDocumentPerticularId;
          this.objAddEditGradewiseDocMapping.isActive = this.gradeWiseDocumentMapList[0].isActive;
        }, 1000)
      }
      else {
        this.gradeWiseDocumentMapList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  getAllGradeWiseDocDetailsList() {
    this.spinnerService.show();
    this.edmsService.getAllGradeWiseDocMapDetailsList(this.searchGradeWiseDocMapDetailslist).subscribe((response: any) => {
      if (response.length != 0) {
        this.gradewiseDocMapDetailsList = response;
        this.objAddEditGradewiseDocMapping.attachmentDocNameId = [];
        let TempArr: any[] = [];
        for (let item of this.gradewiseDocMapDetailsList) {
          TempArr.push(item.attachmentDocumentNameId);
        }
        this.objAddEditGradewiseDocMapping.attachmentDocNameId = TempArr;
      }
      else {
        this.gradewiseDocMapDetailsList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  ngOnDestroy() {
    jQuery(".custom-menu").hide();
  }
  onClickCancel() {
    this.router.navigate(['/app/admin/gradewise-docmap-list']);
  }
  onBackClick() {
    this.router.navigate(['/app/admin/gradewise-docmap-list']);
  }

}
class AddEditGradewiseDocMapping {
  documentMapId: number;
  verticalId: number;
  functionId: number;
  gradeId: number;
  attachmentDocumentTypeId: number;
  attachmentDocumentPerticularId: number;
  attachmentDocNameId: any[];
  isActive: boolean = true;
  gradeWiseDocuments: any[] = [];
  createdBy: number;
}
