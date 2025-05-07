import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVerticalHiringManager, ISearchVerticalHiringManager } from '../../../../../interfaces/common/vertical.interface';
import { ISearchRequisition, IRequisitionList, IRequsitionSourceChannelFeature, IRequisitionSourceFormData, IRequisitionSourceChannelDetailList, ISearchRequisitionSourceChannelDetailList } from '../../../../../interfaces/preselection/requisition.interface';
import { ISelectionGuide, ISearchSelectGuide } from '../../../../../interfaces/common/selectionguide.interface';
import { IVendor, ISearchVendor } from '../../../../../interfaces/vendor/vendor.interface';
import { IInterviewName } from '../../../../../interfaces/common/common.interface';
import { ShareddataService } from '../../../../../sharedservices/shareddata.service';
import { RequisitionService } from '../../../../../services/preselection/requisition/requisition.service';
import { UserService } from '../../../../../services/common/user/user.service';
import { VendorService } from '../../../../../services/vendor/vendor/vendor.service';
import { SelectionguideService } from '../../../../../services/common/selectionguide/selectionguide.service';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;

@Component({
  selector: 'app-stopsourcechannel',
  templateUrl: './stopsourcechannel.component.html',
  styleUrls: ['./stopsourcechannel.component.css']
})
export class StopsourcechannelComponent implements OnInit {
  pageTitle: string = "Allocate To Sources";
  showBtn: boolean = true;
  requisitionDetailId: number;
  requisitionLists: IRequisitionList[] = [];
  // searchRequisition: ISearchRequisition = {
  //   requisitionNo: null,
  //   requistionId: null,
  //   requisitionDetailId: null,
  //   locationId: null,
  //   verticalId: null,
  //   fromDate: null,
  //   toDate: null,
  //   iOMNo: null,
  //   requisitionApprovalStatus: null,
  //   requisitionProcessStatus: null,
  //   createdBy: null,
  //   approverAutoUserId: null,
  //   allocatedUserId: null,
  //   requisitionTypeId: null
  // }
  searchRequisition: any = {
    requisitionNo: null,
    requistionId: null,
    requisitionDetailId: null,
    locationId: null,
    verticalId: null,
    fromDate: null,
    toDate: null,
    iOMNo: null,
    requisitionApprovalStatus: null,
    requisitionProcessStatus: null,
    createdBy: null,
    approverAutoUserId: null,
    allocatedUserId: null,
    requisitionTypeId: null,
    loggedInUserRoleIds: null,
    moduleId: null
  }
  sourceChannelFeature: IRequsitionSourceChannelFeature[] = [];
  formData: IRequisitionSourceFormData = {
    RequisitionDetailId: null,
    HiringManagerId: null,
    SelectionGuideId: null,
    VendorIds: null,
    SourceChannelFeature: null,
    CreatedBy: null
  };
  //vendors
  vendors: IVendor[] = [];
  selectedVendor: number[] = [];
  searchVendor: ISearchVendor = {
    vendorId: null,
    isActive: null
  }
  isSourceChannel1Disable: boolean = true;
  isSourceChannel2Disable: boolean = true;
  isSourceChannel3Disable: boolean = true;
  isSourceChannel4Disable: boolean = true;
  isSourceChannel5Disable: boolean = true;
  createdBy: number;
  //selectionguide
  selectionGuides: ISelectionGuide[] = [];
  searchSelectionGuide: ISearchSelectGuide = {
    selectionGuideId: null,
    isActive: true
  }
  selectedSelectionGuideId: ISelectionGuide;
  interviewnames: IInterviewName[] = [];
  showSourceChannel: boolean = false;
  description: string;
  searchSourceChannelDetail: ISearchRequisitionSourceChannelDetailList = {
    requisitionDetailId: null
  }
  sourceChannelDetailList: IRequisitionSourceChannelDetailList[] = [];
  hrCheck: boolean = false;
  externalCheck: boolean = false;
  internalCheck: boolean = false;
  referralCheck: boolean = false;
  chk_1_1Check: boolean = false;
  chk_1_2Check: boolean = false;
  chk_1_3Check: boolean = false;
  chk_2_1Check: boolean = false;
  chk_2_2Check: boolean = false;
  chk_2_3Check: boolean = false;
  chk_3_1Check: boolean = false;
  chk_3_2Check: boolean = false;
  chk_3_3Check: boolean = false;
  chk_4_1Check: boolean = false;
  chk_4_2Check: boolean = false;
  chk_4_3Check: boolean = false;
  chk_5_1Check: boolean = false;
  chk_5_2Check: boolean = false;
  chk_5_3Check: boolean = false;
  txtchannel1: string;
  txtchannel2: string;
  txtchannel3: string;
  txtchannel4: string;
  txtchannel5: string;

  // searchhiringManager: ISearchVerticalHiringManager = {
  //   autoUserId: null,
  //   roleId: null,
  //   verticalId: null
  // }
  searchhiringManager = {
    autoUserId: null,
    roleId: null,
    verticalId: null,
    functionId: null
  }

  hiringManagers: IVerticalHiringManager[] = [];
  selectedHiringManagerId: IVerticalHiringManager;
  showSelectionGuide: boolean = false;
  moduleId: number;
  loggedInUserRoleIds: string;
  constructor(
    private fb: FormBuilder,
    private shareddataService: ShareddataService,
    private requisitionService: RequisitionService,
    private vendorService: VendorService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private persistance: PersistanceService,
    private _route: Router,
    private selectionGuideService: SelectionguideService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private userService: UserService
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.moduleId = this.persistance.get('moduleId');   // Added by anif on 09-02-2023
    this.loggedInUserRoleIds = this.persistance.get('loggedinuser').roleIds;   // Added by anif on 09-02-2023
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "rmrequisitionlist") {
        this.SpinnerService.show();
        this.requisitionDetailId = this.persistance.get('paramid');
        this.getRequisitionDetail();
        this.getAllVendor();
        this.getAllSelectionGuide();
        this.getSourceChannelDetail();
      }
      else {
        this._route.navigate(['/app/rmrequisitionlist']);
      }
    }
    else {
      this._route.navigate(['/app/rmrequisitionlist']);
    }
  }

  ngOnInit() {
  }

  getAllHiringManager(roleid) {
    this.hiringManagers = [];
    this.searchhiringManager.roleId = roleid;
    this.userService.getVerticalFunctionHiringManager(this.searchhiringManager).subscribe((result) => {
      if (result) {
        this.hiringManagers = result;
      }
      else {
        this.hiringManagers = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getRequisitionDetail() {
    this.requisitionLists = [];
    this.searchRequisition.loggedInUserRoleIds = this.loggedInUserRoleIds,       // Added By anif on 18-07-2023
      this.searchRequisition.moduleId = this.moduleId                            // Added By anif on 18-07-2023
    this.searchRequisition.requisitionDetailId = this.requisitionDetailId;
    this.requisitionService.getAllRequisition(this.searchRequisition).subscribe((result) => {
      if (result) {
        // console.log("Requisiiotn Details", result);
        this.requisitionLists = result;
        this.searchhiringManager.functionId = this.requisitionLists[0].functionId;
        if (this.requisitionLists[0].verticalId == 1) {
          this.getAllHiringManager(12);
        }
        else if (this.requisitionLists[0].verticalId == 2) {
          this.getAllHiringManager(13);
        }
        else if (this.requisitionLists[0].verticalId == 3) {
          this.getAllHiringManager(14);
        }
        //console.log(result);
      }
      else {
        this.requisitionLists = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllVendor() {
    this.vendors = [];
    this.searchVendor.isActive = true;
    this.searchVendor.vendorId = 0;
    // console.log(this.searchVendor);
    this.vendorService.getAllVendor(this.searchVendor).subscribe((result) => {
      if (result) {
        this.vendors = result;
      }
      else {
        this.vendors = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllSelectionGuide() {
    this.selectionGuides = [];
    this.selectionGuideService.getAllSelectionGuide(this.searchSelectionGuide).subscribe((result) => {
      if (result) {
        this.selectionGuides = result;
      }
      else {
        this.selectionGuides = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  enableCheckBox(evt, id) {
    if (id == "1") {
      if (evt.target.checked == true) {
        this.isSourceChannel1Disable = false;
      }
      else {
        this.isSourceChannel1Disable = true;
        jQuery(".chkchannel1").prop("checked", false);
        jQuery(".txtchannel1").val("");
      }
    }
    if (id == "2") {
      if (evt.target.checked == true) {
        this.isSourceChannel2Disable = false;
      }
      else {
        this.isSourceChannel2Disable = true;
        jQuery(".chkchannel2").prop("checked", false);
        jQuery(".txtchannel2").val("");
      }
    }
    if (id == "3") {
      if (evt.target.checked == true) {
        this.isSourceChannel3Disable = false;
      }
      else {
        this.isSourceChannel3Disable = true;
        jQuery(".chkchannel3").prop("checked", false);
        jQuery(".txtchannel3").val("");
      }
    }
    if (id == "4") {
      if (evt.target.checked == true) {
        this.isSourceChannel4Disable = false;
      }
      else {
        this.isSourceChannel4Disable = true;
        jQuery(".chkchannel4").prop("checked", false);
        jQuery(".txtchannel4").val("");
      }
    }
  }

  changeselectedVendor() {
    if (this.selectedVendor.length == 0) {
      this.isSourceChannel5Disable = true;
      jQuery(".chkchannel5").prop("checked", false);
      jQuery(".txtchannel5").val("");
    }
    else {
      var flag = 0;
      this.isSourceChannel5Disable = false;
      jQuery(".chkchannel5").each(function () {
        if (jQuery(this).is(":checked")) {
          flag = 1;
        }
      });
      if (flag == 0) {
        jQuery(".chkchannel5").prop("checked", false);
        jQuery(".txtchannel5").val("");
      }
    }
  }

  submitForm() {
    var dothis = this;
    var i = 1;
    var doFlag = 0;
    dothis.sourceChannelFeature = [];


    jQuery("#tbodyfeature").find("tr").each(function () {
      var j = 1;
      var notes = "";
      //var notes =jQuery(this).find("td:last").find("input[type='text']").val();
      if (i == 1) {
        notes = dothis.txtchannel1;
      }
      if (i == 2) {
        notes = dothis.txtchannel2;
      }
      if (i == 3) {
        notes = dothis.txtchannel3;
      }
      if (i == 4) {
        notes = dothis.txtchannel4;
      }
      if (i == 5) {
        notes = dothis.txtchannel5;
      }
      // var value = 0;
      jQuery(this).find("td:not(:first, :last)").each(function () {
        if (jQuery(this).find("input[type='checkbox']").prop("checked") == true) {
          dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: j, Notes: notes });
        } else {
          if (dothis.isSourceChannel1Disable == false && i == 1) {
            var checkExisted = dothis.sourceChannelFeature.find(e => e.SourceChannelId == i && e.JobDescriptionFeatureId == 0);
            if (checkExisted == undefined) {
              dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: 0, Notes: notes })
            }
          }
          if (dothis.isSourceChannel2Disable == false && i == 2) {
            var checkExisted = dothis.sourceChannelFeature.find(e => e.SourceChannelId == i && e.JobDescriptionFeatureId == 0);
            if (checkExisted == undefined) {
              dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: 0, Notes: notes })
            }
          }
          if (dothis.isSourceChannel3Disable == false && i == 3) {
            var checkExisted = dothis.sourceChannelFeature.find(e => e.SourceChannelId == i && e.JobDescriptionFeatureId == 0);
            if (checkExisted == undefined) {
              dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: 0, Notes: notes })
            }
          }
          if (dothis.isSourceChannel4Disable == false && i == 4) {
            var checkExisted = dothis.sourceChannelFeature.find(e => e.SourceChannelId == i && e.JobDescriptionFeatureId == 0);
            if (checkExisted == undefined) {
              dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: 0, Notes: notes })
            }
          }
          if (dothis.isSourceChannel5Disable == false && i == 5) {
            var checkExisted = dothis.sourceChannelFeature.find(e => e.SourceChannelId == i && e.JobDescriptionFeatureId == 0);
            if (checkExisted == undefined) {
              dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: 0, Notes: notes })
            }
          }

        }
        // changed by arnab
        // if (j == 3 && value == 0) {
        //   dothis.sourceChannelFeature.push({ SourceChannelId: i, JobDescriptionFeatureId: 0, Notes: notes })
        // }
        j++;
      });
      i++
    });

    // if (this.isSourceChannel1Disable == false) {
    //   var data = dothis.sourceChannelFeature.filter(x => x.SourceChannelId == 1);
    //   if (data.length == 0) {
    //     doFlag = 1;
    //   }
    // }

    // if (this.isSourceChannel2Disable == false) {
    //   var data = dothis.sourceChannelFeature.filter(x => x.SourceChannelId == 2);
    //   if (data.length == 0) {
    //     doFlag = 1;
    //   }
    // }
    // if (this.isSourceChannel3Disable == false) {
    //   var data = dothis.sourceChannelFeature.filter(x => x.SourceChannelId == 3);
    //   if (data.length == 0) {
    //     doFlag = 1;
    //   }
    // }
    // if (this.isSourceChannel4Disable == false) {
    //   var data = dothis.sourceChannelFeature.filter(x => x.SourceChannelId == 4);
    //   if (data.length == 0) {
    //     doFlag = 1;
    //   }
    // }

    // if (this.isSourceChannel5Disable == false) {
    //   var data = dothis.sourceChannelFeature.filter(x => x.SourceChannelId == 5);
    //   if (data.length == 0) {
    //     doFlag = 1;
    //   }
    // }

    if (this.isSourceChannel1Disable == true &&
      this.isSourceChannel2Disable == true &&
      this.isSourceChannel3Disable == true &&
      this.isSourceChannel4Disable == true &&
      this.isSourceChannel5Disable == true) {
      doFlag = 2;
    }
    // if(doFlag==2){
    //   this.notificationService.showError("Please select source channel", "Error");
    // }

    // else if (doFlag==1 ) {
    //   this.notificationService.showError("Please select criteria", "Error");
    // }
    // else {
    if (doFlag == 1) {
      this.notificationService.showError("Please select criteria", "Error");
    }
    else {
      dothis.SpinnerService.show();
      dothis.formData.RequisitionDetailId = dothis.requisitionDetailId;
      // dothis.formData.HiringManagerId = dothis.selectedHiringManagerId.autoUserId;
      if (dothis.selectedHiringManagerId == undefined) {
        dothis.formData.HiringManagerId = 0;
      } else {
        dothis.formData.HiringManagerId = dothis.selectedHiringManagerId.autoUserId;
      }
      dothis.formData.SourceChannelFeature = dothis.sourceChannelFeature;
      dothis.formData.CreatedBy = this.createdBy;
      dothis.formData.SelectionGuideId = this.selectedSelectionGuideId.selectionGuideId;
      dothis.formData.VendorIds = dothis.selectedVendor.join();
      dothis.requisitionService.allocateSourceChannel(dothis.formData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.getSourceChannelDetail();
          }
        }
        else {
          this.SpinnerService.hide();
          // console.log(result);
        }
      }, error => {
        console.log(error);
        this.SpinnerService.hide();
      }, () => {
        this.loadSelectPicker();
        this.SpinnerService.hide();
      });
    }
  }

  onSelectionGuideChange() {
    this.interviewnames = [];
    var splitdata = this.selectedSelectionGuideId.interviewNames.split(",");
    for (var i = 0; i < splitdata.length; i++) {
      this.interviewnames.push({ interviewName: splitdata[i] });
    }
    this.description = this.selectedSelectionGuideId.description;
    this.showSourceChannel = true;
    this.loadSelectPicker();
  }

  gotoRMRequisitionList() {
    this.persistance.set('pagename', null)
    this.persistance.set('paramid', null)
    this._route.navigate(['/app/my-action/all-positions']);
  }

  getSourceChannelDetail() {
    setTimeout(() => {
      this.searchSourceChannelDetail.requisitionDetailId = this.requisitionDetailId
      this.sourceChannelDetailList = [];
      this.requisitionService.getRequisitionSourceChannelDetailList(this.searchSourceChannelDetail).subscribe((result) => {
        if (result) {
          this.sourceChannelDetailList = result;
          //  console.log("Source Channel Details", this.sourceChannelDetailList);
          if (this.sourceChannelDetailList.length > 0) {

            this.selectedHiringManagerId = this.hiringManagers.filter(x => x.autoUserId == this.sourceChannelDetailList[0].hiringManagerAutoUserId)[0];
            jQuery('.hiringManager').attr("disabled", true);
            jQuery('.hiringManager').selectpicker('refresh');
            this.showSelectionGuide = true;

            this.selectedSelectionGuideId = this.selectionGuides.filter(x => x.selectionGuideId == this.sourceChannelDetailList[0].selectionGuideId)[0];
            jQuery('.selectionGuide').attr("disabled", true);
            jQuery('.selectionGuide').selectpicker('refresh');
            this.showSourceChannel = true;
            this.onSelectionGuideChange();
            for (var i = 0; i < this.sourceChannelDetailList.length; i++) {
              if (this.sourceChannelDetailList[i].sourceChannelId == 1) {
                if (this.sourceChannelDetailList[i].isActive) {  // Added this condition based on point sl no 44
                  this.hrCheck = true;
                  this.isSourceChannel1Disable = false;
                  this.txtchannel1 = this.sourceChannelDetailList[i].notes;
                  var chkfeatures = this.sourceChannelDetailList[i].featureIds.split(",");
                  for (var l = 0; l < chkfeatures.length; l++) {
                    if (chkfeatures[l] == "1") {
                      this.chk_1_1Check = true;
                    }
                    if (chkfeatures[l] == "2") {
                      this.chk_1_2Check = true;
                    }
                    if (chkfeatures[l] == "3") {
                      this.chk_1_3Check = true;
                    }
                  }
                }

              }
              if (this.sourceChannelDetailList[i].sourceChannelId == 2) {
                if (this.sourceChannelDetailList[i].isActive) { // Added this condition based on point sl no 44
                  this.externalCheck = true;
                  this.isSourceChannel2Disable = false;
                  this.txtchannel2 = this.sourceChannelDetailList[i].notes;
                  var chkfeatures = this.sourceChannelDetailList[i].featureIds.split(",");
                  for (var l = 0; l < chkfeatures.length; l++) {
                    if (chkfeatures[l] == "1") {
                      this.chk_2_1Check = true;
                    }
                    if (chkfeatures[l] == "2") {
                      this.chk_2_2Check = true;
                    }
                    if (chkfeatures[l] == "3") {
                      this.chk_2_3Check = true;
                    }
                  }
                }
              }
              if (this.sourceChannelDetailList[i].sourceChannelId == 3) {
                if (this.sourceChannelDetailList[i].isActive) {   // Added this condition based on point sl no 44
                  this.internalCheck = true;
                  this.isSourceChannel3Disable = false;
                  this.txtchannel3 = this.sourceChannelDetailList[i].notes;
                  var chkfeatures = this.sourceChannelDetailList[i].featureIds.split(",");
                  for (var l = 0; l < chkfeatures.length; l++) {
                    if (chkfeatures[l] == "1") {
                      this.chk_3_1Check = true;
                    }
                    if (chkfeatures[l] == "2") {
                      this.chk_3_2Check = true;
                    }
                    if (chkfeatures[l] == "3") {
                      this.chk_3_3Check = true;
                    }
                  }
                }
              }
              if (this.sourceChannelDetailList[i].sourceChannelId == 4) {
                if (this.sourceChannelDetailList[i].isActive) {   // Added this condition based on point sl no 44
                  this.referralCheck = true;
                  this.isSourceChannel4Disable = false;
                  this.txtchannel4 = this.sourceChannelDetailList[i].notes;
                  var chkfeatures = this.sourceChannelDetailList[i].featureIds.split(",");
                  for (var l = 0; l < chkfeatures.length; l++) {
                    if (chkfeatures[l] == "1") {
                      this.chk_4_1Check = true;
                    }
                    if (chkfeatures[l] == "2") {
                      this.chk_4_2Check = true;
                    }
                    if (chkfeatures[l] == "3") {
                      this.chk_4_3Check = true;
                    }
                  }
                }
              }
              if (this.sourceChannelDetailList[i].sourceChannelId == 5) {
                if (this.sourceChannelDetailList[i].isActive) {  // Added this condition based on point sl no 44
                  this.isSourceChannel5Disable = false;
                  this.txtchannel5 = this.sourceChannelDetailList[i].notes;
                  var chkfeatures = this.sourceChannelDetailList[i].featureIds.split(",");
                  for (var l = 0; l < chkfeatures.length; l++) {
                    if (chkfeatures[l] == "1") {
                      this.chk_5_1Check = true;
                    }
                    if (chkfeatures[l] == "2") {
                      this.chk_5_2Check = true;
                    }
                    if (chkfeatures[l] == "3") {
                      this.chk_5_3Check = true;
                    }
                  }
                  var arr = this.sourceChannelDetailList[i].vendorIds.split(",");
                  var vendors = [];
                  for (var j = 0; j < arr.length; j++) {
                    vendors.push(parseInt(arr[j]));
                  }
                  this.selectedVendor = vendors;
                }
              }
            }
          }
        }
        else {
          this.sourceChannelDetailList = [];
        }
      }, error => {
        console.log(error);
      }, () => {
      });
      this.SpinnerService.hide();
    }, 2000);

  }

}
