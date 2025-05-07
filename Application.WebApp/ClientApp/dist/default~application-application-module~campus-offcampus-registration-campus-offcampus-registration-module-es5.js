function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~application-application-module~campus-offcampus-registration-campus-offcampus-registration-module"], {
  /***/
  "./src/app/services/campus/campusrequisition/campusrequisition.service.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/services/campus/campusrequisition/campusrequisition.service.ts ***!
    \********************************************************************************/

  /*! exports provided: CampusrequisitionService */

  /***/
  function srcAppServicesCampusCampusrequisitionCampusrequisitionServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CampusrequisitionService", function () {
      return CampusrequisitionService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../../../environments/environment */
    "./src/environments/environment.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var CampusrequisitionService =
    /*#__PURE__*/
    function () {
      function CampusrequisitionService(httpClient) {
        _classCallCheck(this, CampusrequisitionService);

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

      _createClass(CampusrequisitionService, [{
        key: "createCampusrequisition",
        value: function createCampusrequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createcampusrequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createOffCampusrequisition",
        value: function createOffCampusrequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createoffcampusrequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusrequisition",
        value: function getAllCampusrequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampusrequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllOffCampusrequisition",
        value: function getAllOffCampusrequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getalloffcampusrequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusLink",
        value: function getAllCampusLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampuslink', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCandidateRegistrationDetail",
        value: function getCandidateRegistrationDetail(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusregistrationdetails', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCandidateRegistrationRemarks",
        value: function getCandidateRegistrationRemarks(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusregistrationremarks', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createCampusLink",
        value: function createCampusLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createcampuslink', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCampusLink",
        value: function updateCampusLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuslink', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "shareCampusLinkToCaollege",
        value: function shareCampusLinkToCaollege(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/sharecampuslinktocollege', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusCollegeSharedLink",
        value: function getAllCampusCollegeSharedLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallsharedcampuslinktocollege', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusRequisitionTitle",
        value: function getAllCampusRequisitionTitle(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampusrequisitiontitle', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveCampusCandidate",
        value: function saveCampusCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/campuscandidateregistration/savecampuscandidate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveOffCampusCandidate",
        value: function saveOffCampusCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/campuscandidateregistration/saveoffcampuscandidate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "editCampusCandidate",
        value: function editCampusCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/campuscandidateregistration/editcampuscandidate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCandidateDataForExcel",
        value: function getCampusCandidateDataForExcel(formData) {
          return this.httpClient.post(this.apiURL + '/campuscandidateregistration/getallcanditatedetailsforexcel', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusCandidateList",
        value: function getAllCampusCandidateList(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampuscandidatelist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusHiringStatus",
        value: function getAllCampusHiringStatus(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampushiringstatus', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCampusCandidateHiringStatus",
        value: function updateCampusCandidateHiringStatus(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampushiringstatus', formData, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createCampusTestSchedule",
        value: function createCampusTestSchedule(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createcampustestschedule', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createPrePlacementTalkSchedule",
        value: function createPrePlacementTalkSchedule(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createPreplacemetSchedule', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusTestScheduleDetail",
        value: function getCampusTestScheduleDetail(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampustestscheduledetail', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "uploadCampusTestResult",
        value: function uploadCampusTestResult(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/uploadtestresult', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusTestResult",
        value: function getCampusTestResult(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampustestresult', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createCampusInterviewSchedule",
        value: function createCampusInterviewSchedule(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createcampusinterviewschedule', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusInterviewScheduleDetail",
        value: function getCampusInterviewScheduleDetail(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusinterviewscheduledetail', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCampusCandidateVerticalFunction",
        value: function getCampusCampusCandidateVerticalFunction(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCampusCampusCandidateVerticalFunction",
        value: function updateCampusCampusCandidateVerticalFunction(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateOffCampusCampusCandidateVerticalFunction",
        value: function updateOffCampusCampusCandidateVerticalFunction(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updateoffcampuscandidateverticalfunction', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusVerticalFunctionRequisition",
        value: function getCampusVerticalFunctionRequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusverticalfunctionrequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getRequisitionListForRequisitionMapping",
        value: function getRequisitionListForRequisitionMapping(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallrequisitionlistforcampusrequisitionmap', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "umapCampusCandidateRequisition",
        value: function umapCampusCandidateRequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/mapcampuscandidaterequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCampusData",
        value: function getCampusCampusData(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampusrequisitiondata', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCampusCampusData",
        value: function updateCampusCampusData(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampusrequisitiondata', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCampusProfileData",
        value: function getCampusCampusProfileData(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcampusrequisitionprofiledata', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "enableDisableCampusLink",
        value: function enableDisableCampusLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/enabledisablecampuslink', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusTestScheduleDetail",
        value: function getAllCampusTestScheduleDetail(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampustestscheduledetail', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCampusTalkScheduleDetail",
        value: function getAllCampusTalkScheduleDetail(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getallcampustalkscheduledetail', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getInterviewScheduleDetailForCandidate",
        value: function getInterviewScheduleDetailForCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getinterviewscheduledetailforcandidate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "CampusgetInterviewScheduleDetailForCandidate",
        value: function CampusgetInterviewScheduleDetailForCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/campusgetinterviewscheduledetailforcandidate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //arg

      }, {
        key: "updateCampusCandidateInstitute",
        value: function updateCampusCandidateInstitute(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuscandidateinstitute', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCampusCandidateProfile",
        value: function updateCampusCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecampuscandidateprofile', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCandidateRejctDecline",
        value: function updateCandidateRejctDecline(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecandidaterejectdecline', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCandidateAcknowledged",
        value: function updateCandidateAcknowledged(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updatecandidateacknowledged', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "cancelPreplacementTalk",
        value: function cancelPreplacementTalk(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/cancelpreplacementtalk', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "cancelTestSchedule",
        value: function cancelTestSchedule(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/canceltestschedule', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "cancelInterview",
        value: function cancelInterview(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/cancelinterview', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCandidateDetailsForStageGate",
        value: function getCandidateDetailsForStageGate(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getcandidatedetailsforstagegate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getStageGateAssesmentComp",
        value: function getStageGateAssesmentComp(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getstagegateassesmentcomp', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //campusrequisition.service.ts

      }, {
        key: "ViewCanidateListByRequisition",
        value: function ViewCanidateListByRequisition(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/viewcanidatelistbyrequisition', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateselectioncomunication",
        value: function updateselectioncomunication(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/updateselectioncomunication', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "CandidatewisseelectionData",
        value: function CandidatewisseelectionData(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/candidatewisseelectiondata', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "UpdateCandidateDeatilsForAcknowledge",
        value: function UpdateCandidateDeatilsForAcknowledge(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/campusCandidateAcknowledgeMent', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllOffCampusLink",
        value: function getAllOffCampusLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/getalloffcampuslink', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createOffCampusLink",
        value: function createOffCampusLink(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/createoffcampuslink', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "InsertUpdateMapRequistion",
        value: function InsertUpdateMapRequistion(formData) {
          return this.httpClient.post(this.apiURL + '/campusrequisition/insertupdatemaprequistion', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "errorHandler",
        value: function errorHandler(error) {
          var errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
          } else {
            errorMessage = "Error Code: ".concat(error.status, "\nMessage: ").concat(error.message);
          }

          return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
        }
      }]);

      return CampusrequisitionService;
    }();

    CampusrequisitionService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    CampusrequisitionService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], CampusrequisitionService);
    /***/
  },

  /***/
  "./src/app/sharedservices/shareddata.service.ts":
  /*!******************************************************!*\
    !*** ./src/app/sharedservices/shareddata.service.ts ***!
    \******************************************************/

  /*! exports provided: ShareddataService */

  /***/
  function srcAppSharedservicesShareddataServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ShareddataService", function () {
      return ShareddataService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __metadata = undefined && undefined.__metadata || function (k, v) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var ShareddataService =
    /*#__PURE__*/
    function () {
      function ShareddataService() {
        _classCallCheck(this, ShareddataService);

        this.sharedPage = "";
        this.sharedData = 0;
        this.sharedPage = "";
      }

      _createClass(ShareddataService, [{
        key: "setData",
        value: function setData(data) {
          this.sharedData = data;
        }
      }, {
        key: "getData",
        value: function getData() {
          return this.sharedData;
        }
      }, {
        key: "setPage",
        value: function setPage(pagename) {
          this.sharedPage = pagename;
        }
      }, {
        key: "getPage",
        value: function getPage() {
          return this.sharedPage;
        }
      }]);

      return ShareddataService;
    }();

    ShareddataService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(), __metadata("design:paramtypes", [])], ShareddataService);
    /***/
  }
}]);
//# sourceMappingURL=default~application-application-module~campus-offcampus-registration-campus-offcampus-registration-module-es5.js.map