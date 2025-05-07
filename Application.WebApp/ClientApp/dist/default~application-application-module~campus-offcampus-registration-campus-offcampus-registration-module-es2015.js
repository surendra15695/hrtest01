(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~application-application-module~campus-offcampus-registration-campus-offcampus-registration-module"],{

/***/ "./src/app/services/campus/campusrequisition/campusrequisition.service.ts":
/*!********************************************************************************!*\
  !*** ./src/app/services/campus/campusrequisition/campusrequisition.service.ts ***!
  \********************************************************************************/
/*! exports provided: CampusrequisitionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampusrequisitionService", function() { return CampusrequisitionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let CampusrequisitionService = class CampusrequisitionService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
        this.httpOptionsFile = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
        };
    }
    createCampusrequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createcampusrequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    createOffCampusrequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createoffcampusrequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusrequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampusrequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllOffCampusrequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getalloffcampusrequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampuslink', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCandidateRegistrationDetail(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusregistrationdetails', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCandidateRegistrationRemarks(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusregistrationremarks', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    createCampusLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createcampuslink', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCampusLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuslink', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    shareCampusLinkToCaollege(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/sharecampuslinktocollege', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusCollegeSharedLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallsharedcampuslinktocollege', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusRequisitionTitle(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampusrequisitiontitle', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    saveCampusCandidate(formData) {
        return this.httpClient.post(this.apiURL + '/campuscandidateregistration/savecampuscandidate', formData, this.httpOptionsFile)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    saveOffCampusCandidate(formData) {
        return this.httpClient.post(this.apiURL + '/campuscandidateregistration/saveoffcampuscandidate', formData, this.httpOptionsFile)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    editCampusCandidate(formData) {
        return this.httpClient.post(this.apiURL + '/campuscandidateregistration/editcampuscandidate', formData, this.httpOptionsFile)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusCandidateDataForExcel(formData) {
        return this.httpClient.post(this.apiURL + '/campuscandidateregistration/getallcanditatedetailsforexcel', formData, this.httpOptionsFile)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusCandidateList(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampuscandidatelist', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusHiringStatus(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampushiringstatus', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCampusCandidateHiringStatus(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampushiringstatus', formData, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    createCampusTestSchedule(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createcampustestschedule', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    createPrePlacementTalkSchedule(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createPreplacemetSchedule', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusTestScheduleDetail(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampustestscheduledetail', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    uploadCampusTestResult(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/uploadtestresult', formData, this.httpOptionsFile)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusTestResult(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampustestresult', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    createCampusInterviewSchedule(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createcampusinterviewschedule', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusInterviewScheduleDetail(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusinterviewscheduledetail', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusCampusCandidateVerticalFunction(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCampusCampusCandidateVerticalFunction(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateOffCampusCampusCandidateVerticalFunction(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updateoffcampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusVerticalFunctionRequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusverticalfunctionrequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getRequisitionListForRequisitionMapping(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallrequisitionlistforcampusrequisitionmap', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    umapCampusCandidateRequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/mapcampuscandidaterequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusCampusData(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampusrequisitiondata', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCampusCampusData(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampusrequisitiondata', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCampusCampusProfileData(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusrequisitionprofiledata', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    enableDisableCampusLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/enabledisablecampuslink', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusTestScheduleDetail(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampustestscheduledetail', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusTalkScheduleDetail(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampustalkscheduledetail', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getInterviewScheduleDetailForCandidate(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getinterviewscheduledetailforcandidate', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    CampusgetInterviewScheduleDetailForCandidate(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/campusgetinterviewscheduledetailforcandidate', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    //arg
    updateCampusCandidateInstitute(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuscandidateinstitute', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCampusCandidateProfile(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuscandidateprofile', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCandidateRejctDecline(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecandidaterejectdecline', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateCandidateAcknowledged(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updatecandidateacknowledged', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    cancelPreplacementTalk(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/cancelpreplacementtalk', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    cancelTestSchedule(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/canceltestschedule', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    cancelInterview(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/cancelinterview', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getCandidateDetailsForStageGate(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getcandidatedetailsforstagegate', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getStageGateAssesmentComp(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getstagegateassesmentcomp', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    } //campusrequisition.service.ts
    ViewCanidateListByRequisition(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/viewcanidatelistbyrequisition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    updateselectioncomunication(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/updateselectioncomunication', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    CandidatewisseelectionData(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/candidatewisseelectiondata', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    UpdateCandidateDeatilsForAcknowledge(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/campusCandidateAcknowledgeMent', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllOffCampusLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/getalloffcampuslink', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    createOffCampusLink(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/createoffcampuslink', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    InsertUpdateMapRequistion(formData) {
        return this.httpClient.post(this.apiURL + '/campusrequisition/insertupdatemaprequistion', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        }
        else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    }
};
CampusrequisitionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
CampusrequisitionService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], CampusrequisitionService);



/***/ }),

/***/ "./src/app/sharedservices/shareddata.service.ts":
/*!******************************************************!*\
  !*** ./src/app/sharedservices/shareddata.service.ts ***!
  \******************************************************/
/*! exports provided: ShareddataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareddataService", function() { return ShareddataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let ShareddataService = class ShareddataService {
    constructor() {
        this.sharedPage = "";
        this.sharedData = 0;
        this.sharedPage = "";
    }
    setData(data) {
        this.sharedData = data;
    }
    getData() {
        return this.sharedData;
    }
    setPage(pagename) {
        this.sharedPage = pagename;
    }
    getPage() {
        return this.sharedPage;
    }
};
ShareddataService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ShareddataService);



/***/ })

}]);
//# sourceMappingURL=default~application-application-module~campus-offcampus-registration-campus-offcampus-registration-module-es2015.js.map