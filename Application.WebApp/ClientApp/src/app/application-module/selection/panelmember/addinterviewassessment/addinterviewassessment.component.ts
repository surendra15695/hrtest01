import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  ISearchInterviewCalendarAssessment, IInterviewCalendarAssessmentList,
  IInterviewCalendarAssessmentListData, IInterviewCalendarAssessmentFormData
} from '../../../../interfaces/selection/interviewcalendaraction.interface';
import { IState } from '../../../../interfaces/common/common.interface';
import { InterviewcalendaractionService } from '../../../../services/selection/interviewcalendaraction/interviewcalendaraction.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';

import { IFunctionDepartment, ISearchDepartment } from '../../../../interfaces/common/department.interface';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { LocationService } from '../../../../services/common/location/location.service';

declare var jQuery: any;
declare var html2pdf: any;
@Component({
  selector: 'app-addinterviewassessment',
  templateUrl: './addinterviewassessment.component.html',
  styleUrls: ['./addinterviewassessment.component.css']
})
export class AddinterviewassessmentComponent implements OnInit {
  calendarIds: string;
  candidateIds: string; // Added anif
  candidateId: number;
  requisitionDetailId: number;
  searchAssessmentList: ISearchInterviewCalendarAssessment = {
    CalendarIds: null,
    CandidateId: null,
    RequisitionDetailId: null,
  }
  CandidateWiseAssessmentDetails: any[] = []
  positionName: string;
  interviewName: string;
  interviewDate: string;
  states: IState[] = [];
  assessmentList: any[] = [];
  assessmentArray: any[] = [];
  // formData: IInterviewCalendarAssessmentFormData = {
  //   InterviewCalendarAssessmentData: null,
  //   CreatedBy: null,
  //   CandidateIds: null
  // }
  // added on 03-04-2023
  formData: any = {
    InterviewCalendarAssessmentData: null,
    CreatedBy: null,
    CandidateIds: null,
    HtmlString: []
  }
  file: any[] = []
  autoUserId: number;
  isVisisble: boolean = false;
  // Anif
  FunctionList: any[] = [];
  VerticalList: any[] = [];
  DepartmentList: any[] = [];
  searchVertical = {
    VerticalId: null,
    VerticalName: "",
    IsActive: true
  }
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  departmentId: number;
  departmentName: string;
  //fromData:FormData;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  currentcalenderid: any;
  VerticalId: any;
  FunctionId: any;
  DepartmentId: any;
  // Added on 03-04-2023
  CandidateAndRequisitionDetailsIds: any[] = [];
  CandidateWiseAssessmentDetailsWithInterviewerName: any[] = [];
  CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit: any[] = [];
  assessmentWithInterviewerName: any[] = [];
  assessmentRecords: any[] = [];
  assessmentData: any;
  loggedinUserEmpId: any;
  candidateWiseHtmlElement: any[] = [];
  htmlstring: string = "";
  // till this on 03-04-2023
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService: CommonService,
    private interActionService: InterviewcalendaractionService,
    private persistance: PersistanceService,
    private notiService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private departmentService: DepartmentService,
    private verticalService: VerticalService,
    private functionService: FunctionService,
    private locationService: LocationService,
  ) {
    const formData = new FormData();
    this.getAllState();
    this.getAllVertical();
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.candidateIds = this.persistance.get("candidateIdsForMail"); // Added anif
    this.loggedinUserEmpId = this.persistance.get('loggedinuser').mapId;// Added anif on 03-04-2023 (mapid adn empid is same)
    //this.candidateIds = "48,50" // Added anif
    if (this.persistance.get('pagename') == "assessment") {
      this.calendarIds = this.persistance.get('calendarIds');
      // console.log(this.calendarIds);
      this.getAssessmentList();
    }
  }

  ngOnInit() {
  }

  getAssessmentList() {
    this.SpinnerService.show();
    this.assessmentList = [];
    this.searchAssessmentList.CalendarIds = this.calendarIds;
    //console.log(this.searchAssessmentList);
    this.interActionService.getInterviewCalendarAssessmentList(this.searchAssessmentList).subscribe((result) => {
      if (result) {
        this.assessmentList = result;
        //console.log(this.assessmentList);
        if (this.assessmentList[0].overallScore > 0) {
          if ((this.assessmentList[0].actionStatus == 2 || this.assessmentList[0].actionStatus == 0) && this.assessmentList.length == 1) {
            this.isVisisble = true;
          }
          else {
            this.isVisisble = false;
          }
        }
        else {
          this.isVisisble = true;
        }
        this.positionName = this.assessmentList[0].positionName;
        this.interviewName = this.assessmentList[0].interviewName;
        this.interviewDate = this.assessmentList[0].interviewDate;
        this.assessmentList.forEach(element => {
          element.verticalid = null,
            element.functionid = null,
            element.departmentid = null
        })
        // console.log(this.assessmentList);
        // Added on 03-04-2023
        if (this.assessmentList.length > 0) {
          this.assessmentList.forEach(element => {
            var checkExisted = this.CandidateAndRequisitionDetailsIds.find(e => e.candidateId == element.candidateId);
            if (checkExisted == undefined) {
              this.CandidateAndRequisitionDetailsIds.push({ candidateId: element.candidateId, requisitionDetailsId: element.requisitionDetailId })
            }
          })
          //  if (this.CandidateAndRequisitionDetailsIds.length > 0) {

          this.getAssessmentDetailsWithInterviewerName(this.CandidateAndRequisitionDetailsIds[0]);
          //  }
        }
        // Till this on 03-04-2023
      }
      else {
        this.assessmentList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getAssessmentDetailsWithInterviewerName(CandidateAndRequisitionDetailsIds: any) {
    var interviewNames = [];
    let searchObj = {
      CalendarIds: null,
      CandidateId: CandidateAndRequisitionDetailsIds.candidateId,
      RequisitionDetailId: CandidateAndRequisitionDetailsIds.requisitionDetailsId
    }
    this.interActionService.getInterviewCalendarAssessmentList(searchObj).subscribe((result) => {
      if (result) {
        this.assessmentWithInterviewerName = result;
        for (var i = 0; i < this.assessmentWithInterviewerName.length; i++) {
          var flag = 0;
          for (var j = 0; j < interviewNames.length; j++) {
            if (interviewNames[j] == this.assessmentWithInterviewerName[i].interviewName) {
              flag = 1;
            }
          }
          if (flag == 0) {
            interviewNames.push(this.assessmentWithInterviewerName[i].interviewName);
          }
        }
        this.assessmentRecords = [];
        for (var i = 0; i < interviewNames.length; i++) {
          var listdata = this.assessmentWithInterviewerName.filter(x => x.interviewName == interviewNames[i]);

          this.assessmentRecords.push({
            interviewName: interviewNames[i],
            fullName: this.assessmentWithInterviewerName[0].fullName,
            positionName: this.assessmentWithInterviewerName[0].positionName,
            assessmentList: listdata,
            interviewDate: this.assessmentWithInterviewerName[0].interviewDate,
          }
          )
        }
        this.CandidateWiseAssessmentDetailsWithInterviewerName.push({ CandidateId: CandidateAndRequisitionDetailsIds.candidateId, AssessmentRecord: this.assessmentRecords })

        // this.assessmentData = this.CandidateWiseAssessmentDetailsWithInterviewerName;

        // For downloading next employee doc
        this.CandidateAndRequisitionDetailsIds = this.CandidateAndRequisitionDetailsIds.filter(e => e.candidateId != CandidateAndRequisitionDetailsIds.candidateId);
        if (this.CandidateAndRequisitionDetailsIds.length > 0) {
          this.getAssessmentDetailsWithInterviewerName(this.CandidateAndRequisitionDetailsIds[0]);
        }

      }
      else {
        this.assessmentList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  getAllState() {
    this.states = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.states = result;
        this.states.splice(0, 0, {
          stateId: 0,
          stateName: "Select"
        })
      }
      else {
        this.states = [];
        this.states.splice(0, 0, {
          stateId: 0,
          stateName: "Select"
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  // Added on 03-04-2023

  assessmentSubmit() {
    // if (this.assessmentList.length > 0) {
    this.SpinnerService.show();
    this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit = this.CandidateWiseAssessmentDetailsWithInterviewerName;
    if (this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit.length > 0) {
      this.generatePdfFiles(this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit[0]); //added by Amartya on 08-06-2023
      //this.generateHTMLElement(this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit[0]);
    }

  }

  generatePdfFiles(assesmentDetailsbyCandidate) {
    debugger
    this.CandidateWiseAssessmentDetails = [];
    var dataArray = [];
    dataArray.push(assesmentDetailsbyCandidate)
    var processedcandidateId = dataArray[0].CandidateId;
    //this.htmlstring="";
    this.CandidateWiseAssessmentDetails.push(assesmentDetailsbyCandidate)

    setTimeout(() => {
      debugger
      var htmlstring = document.getElementById("pdfGenerationdivInterviewAssessment").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = htmlstring;

      var opt = {
        margin: 8,
        filename: 'Interview_Assesment.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        html2canvas: { scale: 3, y: 0, scrollY: 0 }, //pdf cut issue fixed by Amartya on 17-08-2023 
        //jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        jsPDF: { format: 'A4', orientation: 'landscape' },
      }

      html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => { //code to convert html to pdf on 08-06-2023
        data.filename = processedcandidateId.toString();
        this.file.push(data);
        //formData.append("file_"+processedcandidateId.toString(),data);
        this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit = this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit.filter(e => e.CandidateId != processedcandidateId);
        if (this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit.length > 0) {
          this.generatePdfFiles(this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit[0]);
        }
        if (this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit.length == 0) {
          this.finalSubmit()
          this.SpinnerService.hide();
        }
        this.notiService.showSuccess("Successfully", "Success");
      })
    }, 500);
  }


  generateHTMLElement(candidateAssessmentDetails) {
    var dataArray = [];
    dataArray.push(candidateAssessmentDetails)
    // console.log("data array", dataArray);
    this.assessmentData = dataArray;
    this.htmlstring = ""
    var processedcandidateId = dataArray[0].CandidateId
    this.htmlstring = document.getElementById("pdfGenerationdivInterviewAssessment").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = this.htmlstring;

    var opt = {
      margin: 10,
      filename: 'Interview_Assesment.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    }
    //html2pdf(dom, opt);

    html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {

      //this.fromData.append("file_"+processedcandidateId.toString(),data)
      this.finalSubmit();

    })


    // this.candidateWiseHtmlElement.push({ candidateId: processedcandidateId, htmlString: this.htmlstring })
    this.formData.HtmlString.push({ candidateId: processedcandidateId, htmlString: this.htmlstring })
    //console.log("html string array", this.candidateWiseHtmlElement);

    this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit = this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit.filter(e => e.CandidateId != processedcandidateId);
    if (this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit.length > 0) {
      this.generateHTMLElement(this.CandidateWiseAssessmentDetailsWithInterviewerNameForSubmit[0]);
    }
  }

  finalSubmit() {
    var flag = 0;
    this.assessmentArray = [];
    for (var i = 0; i < this.assessmentList.length; i++) {
      if (this.assessmentList[i].personalityScore == 0
        || this.assessmentList[i].communicationScore == 0
        || this.assessmentList[i].subjectScore == 0
        || this.assessmentList[i].apptitudeScore == 0
        || this.assessmentList[i].overallScore == 0
        //|| this.assessmentList[i].preferredLocation==""

        //|| this.assessmentList[i].noticePeriod==0 
        //|| this.assessmentList[i].expectedSalary==0 
        //|| this.assessmentList[i].otherComments==""
        //|| this.assessmentList[i].stateId==0 
        || this.assessmentList[i].actionStatus == 0
      ) {
        flag = 1;
      }
    }
    if (flag == 0) {
      for (var i = 0; i < this.assessmentList.length; i++) {
        this.assessmentArray.push({
          CalendarId: this.assessmentList[i].calendarId,
          PersonalityScore: this.assessmentList[i].personalityScore,
          CommunicationScore: this.assessmentList[i].communicationScore,
          SubjectScore: this.assessmentList[i].subjectScore,
          ApptitudeScore: this.assessmentList[i].apptitudeScore,
          OverallScore: this.assessmentList[i].overallScore,
          NoticePeriod: this.assessmentList[i].noticePeriod,
          ExpectedSalary: this.assessmentList[i].expectedSalary,
          StateId: 0,//this.assessmentList[i].stateId,
          PreferredLocation: this.assessmentList[i].preferredLocation,
          OtherComments: this.assessmentList[i].otherComments,
          ActionStatus: this.assessmentList[i].actionStatus,
          CandidateId: this.assessmentList[i].candidateId,
          DocumentPath: "",
          VerticalId: this.assessmentList[i].verticalid,
          FunctionId: this.assessmentList[i].functionid,
          DepartmentId: this.assessmentList[i].departmentid
        })
      }
      //console.log(this.assessmentArray);
      //this.formData.InterviewCalendarAssessmentData = this.assessmentArray;
      // this.formData.CreatedBy = this.autoUserId;
      // added Anif
      // this.formData.CandidateIds = this.candidateIds.toString();
      const fromData = new FormData()
      for (var value of this.file) {
        fromData.append("file_" + value.filename, value);
      }
      fromData.append("CandidateIds", this.candidateIds.toString());
      fromData.append("InterviewCalendarAssessmentData", JSON.stringify(this.assessmentArray));
      fromData.append("CreatedBy", this.autoUserId.toString());


      //this.interActionService.addInterviewCalendarAssessment(this.formData).subscribe((result) => {
      this.SpinnerService.show()
      this.interActionService.addInterviewCalendarAssessmentWithPDFGeneration(fromData).subscribe((result: any) => {
        if (result) {
          debugger
          this.SpinnerService.hide();
          if (result.successFlag == 1) {
            this.notiService.showSuccess(result.msg, "Success");
            this.assessmentList = [];
          }
          else {
            //this.notificationService.showSuccess(result.msg, "Success");
            this.notiService.showError(result.msg, "Error");

            //this.getAssessmentList();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
        this.getAssessmentList();
      });
    }
    else {
      this.notiService.showError("Please fill all the fileds to continue", "Error");
      this.SpinnerService.hide();
    }
  }
  // till this 03-04-2023

  updateActionStatus(val, calendarId, candidateId) {
    this.currentcalenderid = calendarId;
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].actionStatus = val;
    if (val == 3) {
      jQuery(".close").click();
      // alert("inside 3")
      jQuery("#myModal").modal('show');
    }
    else {
      this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].verticalid = null;
      this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].functionid = null;
      this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].departmentid = null;
    }
    // Added by Anif on 03-04-2023
    if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
      this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
        if (pdfarr.CandidateId == candidateId) {
          if (pdfarr.AssessmentRecord.length > 0) {
            pdfarr.AssessmentRecord.forEach(asre_ele => {
              asre_ele.assessmentList.forEach(asl_ele => {
                if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                  asl_ele.actionStatus = val;
                  switch (val) {
                    case 1:
                      asl_ele.actionStatusName = "Selected";
                      break;
                    case 2:
                      asl_ele.actionStatusName = "Hold";
                      break;
                    case 3:
                      asl_ele.actionStatusName = "Referred to";
                      break;
                    case 4:
                      asl_ele.actionStatusName = "Rejected";
                      break;
                  }
                }
              })
            })
          }
        }
      })
    }
    // till this on 03-04-2023
  }

  updateState(val, calendarId) {
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].stateId = val;
  }

  updatePreferredLocation(evt, calendarId, candidateId) {
    var val = evt.target.value;
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].preferredLocation = val;
    // Added by Anif on 03-04-2023
    if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
      this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
        if (pdfarr.CandidateId == candidateId) {
          if (pdfarr.AssessmentRecord.length > 0) {
            pdfarr.AssessmentRecord.forEach(asre_ele => {
              asre_ele.assessmentList.forEach(asl_ele => {
                if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                  asl_ele.preferredLocation = val;
                }
              })
            })
          }
        }
      })
    }
    // till this on 03-04-2023
  }

  updateNoticePeriod(evt, calendarId) {
    var val = evt.target.value;
    // if(val=="")
    // {
    //   val=0;
    // }
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].noticePeriod = val;//Number(val);
  }

  updateSalary(evt, calendarId) {
    var val = evt.target.value;
    // if(val=="")
    // {
    //   val=0;
    // }
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].expectedSalary = val;//Number(val);
  }

  updateComments(evt, calendarId, candidateId) {
    var val = evt.target.value;
    this.assessmentList.filter(x => x.calendarId == calendarId)[0].otherComments = val;
    // Added by Anif on 03-04-2023
    if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
      this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
        if (pdfarr.CandidateId == candidateId) {
          if (pdfarr.AssessmentRecord.length > 0) {
            pdfarr.AssessmentRecord.forEach(asre_ele => {
              asre_ele.assessmentList.forEach(asl_ele => {
                if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                  asl_ele.otherComments = val;
                }
              })
            })
          }
        }
      })
    }
    // till this on 03-04-2023
  }

  updateScore(score, scoreType, calendarId, candidateId) {
    if (scoreType == "Personality") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].personalityScore = Number(score);
      // Added by Anif on 03-04-2023
      if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
        this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
          if (pdfarr.CandidateId == candidateId) {
            if (pdfarr.AssessmentRecord.length > 0) {
              pdfarr.AssessmentRecord.forEach(asre_ele => {
                asre_ele.assessmentList.forEach(asl_ele => {
                  if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                    asl_ele.personalityScore = Number(score);
                  }
                })
              })
            }
          }
        })
      }
      // till this on 03-04-2023
    }
    else if (scoreType == "Communication") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].communicationScore = Number(score);
      // Added by Anif on 03-04-2023
      if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
        this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
          if (pdfarr.CandidateId == candidateId) {
            if (pdfarr.AssessmentRecord.length > 0) {
              pdfarr.AssessmentRecord.forEach(asre_ele => {
                asre_ele.assessmentList.forEach(asl_ele => {
                  if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                    asl_ele.communicationScore = Number(score);
                  }
                })
              })
            }
          }
        })
      }
      // till this on 03-04-2023
    }
    else if (scoreType == "Subject") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].subjectScore = Number(score);
      // Added by Anif on 03-04-2023
      if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
        this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
          if (pdfarr.CandidateId == candidateId) {
            if (pdfarr.AssessmentRecord.length > 0) {
              pdfarr.AssessmentRecord.forEach(asre_ele => {
                asre_ele.assessmentList.forEach(asl_ele => {
                  if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                    asl_ele.subjectScore = Number(score);
                  }
                })
              })
            }
          }
        })
      }
      // till this on 03-04-2023
    }
    else if (scoreType == "Apptitude") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].apptitudeScore = Number(score);
      // Added by Anif on 03-04-2023
      if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
        this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
          if (pdfarr.CandidateId == candidateId) {
            if (pdfarr.AssessmentRecord.length > 0) {
              pdfarr.AssessmentRecord.forEach(asre_ele => {
                asre_ele.assessmentList.forEach(asl_ele => {
                  if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                    asl_ele.apptitudeScore = Number(score);
                  }
                })
              })
            }
          }
        })
      }
      // till this on 03-04-2023
    }
    else if (scoreType == "Overall") {
      this.assessmentList.filter(x => x.calendarId == calendarId)[0].overallScore = Number(score);
      // Added by Anif on 03-04-2023
      if (this.CandidateWiseAssessmentDetailsWithInterviewerName.length > 0) {
        this.CandidateWiseAssessmentDetailsWithInterviewerName.forEach(pdfarr => {
          if (pdfarr.CandidateId == candidateId) {
            if (pdfarr.AssessmentRecord.length > 0) {
              pdfarr.AssessmentRecord.forEach(asre_ele => {
                asre_ele.assessmentList.forEach(asl_ele => {
                  if (asl_ele.interviewerEmpId == this.loggedinUserEmpId) {
                    asl_ele.overallScore = Number(score);
                  }
                })
              })
            }
          }
        })
      }
      // till this on 03-04-2023
    }
  }

  gotoCalendar() {
    this.persistance.set('calendarIds', null);
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/my-calendar']);
  }

  // Anif

  getAllVertical() {
    this.verticalService.getAllVertical(this.searchVertical).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        // console.log("VerticalList: ", response);
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }
  onChangeVertical(verticalID: any) {
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }
    this.searchDepartment.verticalId = verticalID;
    this.searchLocation.verticalId = verticalID;
    this.getVerticalFunction(data);
    this.getAllLocation();
  }

  getVerticalFunction(data: any) {
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        // console.log("FunList: ", this.FunctionList);
        this.SpinnerService.hide();
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
      this.SpinnerService.hide();
    })
  }
  onChangeFunction(functionId: any) {
    this.searchDepartment.functionId = functionId;
    this.getAllDepartment();
  }
  //department
  getAllDepartment() {
    this.departments = [];
    // this.searchDepartment.verticalId = this.StaticVerticalId;
    // this.searchDepartment.functionId = this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        //console.log(this.departments);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
    });
  }
  //locations
  getAllLocation() {
    this.locations = [];
    // this.searchLocation.verticalId = this.StaticVerticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        // console.log("Location", this.locations);
      }
      else {
        this.locations = [];
      }
    }, error => {
      this.SpinnerService.hide();
      console.log(error);
    }, () => {
      // this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  RefferedSubmit() {
    this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].verticalid = this.VerticalId;
    this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].functionid = this.FunctionId;
    this.assessmentList.filter(x => x.calendarId == this.currentcalenderid)[0].departmentid = this.DepartmentId;
    this.VerticalId = null;
    this.FunctionId = null;
    this.DepartmentId = null;
  }
  RefferedCancel() {
    this.VerticalId = null;
    this.FunctionId = null;
    this.DepartmentId = null;
  }
}
