function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["campus-offcampus-registration-campus-offcampus-registration-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.html":
  /*!****************************************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.html ***!
    \****************************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppApplicationModuleCampusInterviewAcknowlwdgementInterviewAcknowlwdgementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-sm-8\">\r\n                <div class=\"acknowledge_container\">\r\n                    <div class=\"logo-area text-center\">\r\n                        <img src=\"../../../../assets/images/logo.png\" alt=\"\">\r\n                    </div>\r\n                    <div class=\"content-area\">\r\n                        <div class=\"text-center\">\r\n                            <img src=\"../../../../assets/images/ack_icon.png\" alt=\"\">\r\n                        </div>\r\n                        <h3 class=\"text-center\">Are you acknowledge for the Interview?</h3>\r\n                        <div class=\"wrapper\">\r\n                            <input type=\"radio\" name=\"select\" id=\"option-1\" (change)=\"onClickRadioBtn(1)\">\r\n                            <input type=\"radio\" name=\"select\" id=\"option-2\" (change)=\"onClickRadioBtn(2)\">\r\n                            <label for=\"option-1\" class=\"option option-1\">\r\n                                <div class=\"dot\"></div>\r\n                                <span>Yes</span>\r\n                            </label>\r\n                            <label for=\"option-2\" class=\"option option-2\">\r\n                                <div class=\"dot\"></div>\r\n                                <span>No</span>\r\n                            </label>\r\n                        </div>\r\n                        <div *ngIf=\"isRemarksVisible\">\r\n                            <label for=\"\">Reason</label>\r\n                            <textarea class=\"form-control\" cols=\"30\" rows=\"10\" [(ngModel)]=\"remarks\" placeholder=\"Enter reason...\"></textarea>\r\n                        </div>\r\n                        <div class=\"mt-4 text-center\">\r\n                            <button type=\"button \" class=\"btn-black ml-1\" (click)=\"onSubmit()\">Submit</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.html":
  /*!******************************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.html ***!
    \******************************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppApplicationModuleCampusTestAcknowledgementTestAcknowledgementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-sm-8\">\r\n                <div class=\"acknowledge_container\">\r\n                    <div class=\"logo-area text-center\">\r\n                        <img src=\"../../../../assets/images/logo.png\" alt=\"\">\r\n                    </div>\r\n                    <div class=\"content-area\">\r\n                        <div class=\"text-center\">\r\n                            <img src=\"../../../../assets/images/ack_icon.png\" alt=\"\">\r\n                        </div>\r\n                        <h3 class=\"text-center\">Are you acknowledge for the test?</h3>\r\n                        <div class=\"wrapper\">\r\n                            <input type=\"radio\" name=\"select\" id=\"option-1\" (change)=\"onClickRadioBtn(1)\">\r\n                            <input type=\"radio\" name=\"select\" id=\"option-2\" (change)=\"onClickRadioBtn(2)\">\r\n                            <label for=\"option-1\" class=\"option option-1\">\r\n                                <div class=\"dot\"></div>\r\n                                <span>Yes</span>\r\n                            </label>\r\n                            <label for=\"option-2\" class=\"option option-2\">\r\n                                <div class=\"dot\"></div>\r\n                                <span>No</span>\r\n                            </label>\r\n                        </div>\r\n                        <div *ngIf=\"isRemarksVisible\">\r\n                            <label for=\"\">Reason</label>\r\n                            <textarea class=\"form-control\" cols=\"30\" rows=\"10\" [(ngModel)]=\"remarks\" placeholder=\"Enter reason...\"></textarea>\r\n                        </div>\r\n                        <div class=\"mt-4 text-center\">\r\n                            <button type=\"button \" class=\"btn-black ml-1\" (click)=\"onSubmit()\">Submit</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/shared/viewpdf/viewpdf.component.html":
  /*!****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/shared/viewpdf/viewpdf.component.html ***!
    \****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppApplicationModuleSharedViewpdfViewpdfComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!-- <pdf-viewer [src]=\"src\"\r\n              [original-size]=\"false\"\r\n  ></pdf-viewer> -->";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/campusregistration/campusregistration.component.html":
  /*!************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/campusregistration/campusregistration.component.html ***!
    \************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCommonpagesCampusregistrationCampusregistrationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container\">\r\n    <div *ngIf=\"campusLinks[0]?.disableStatus==1\">\r\n        <h1 class=\"title\">Candidate Registration period has been closed. Your time and effort throughout this process are greatly acknowledged</h1>\r\n    </div>\r\n\r\n    <div class=\"regist_form_container\" *ngIf=\"campusLinks[0]?.disableStatus==0\">\r\n        <h1 class=\"title\">MRF Campus {{campusLinks[0]?.campusYearName}} Student Registration</h1>\r\n\r\n\r\n        <!-- <div class=\"inner-container\">\r\n            <p>The purpose of this form is to collect relevant details of the eligible Students for MRF Campus Drive\r\n                Initial Screening Process.(Shortlisted candidates alone will be considered for\r\n                the selection process.)</p>\r\n            <h6 class=\"red\">Eligibility Criteria</h6>\r\n            <ol>\r\n                <li>Qualification: BSc & MSc ( 2022 Passing out candidates)</li>\r\n                <li>BSc (Preferably Chemistry, Physics, Maths, Statistics), MSc (Preferably Chemistry, Statistics)</li>\r\n                <li>Aggregate Percentage: Minimum 60% up to last semester.</li>\r\n                <li>No active Arrears / Backlogs. Candidates those who have active Arrears/Backlogs (including written\r\n                    Arrears/Backlogs exam but results not published) are not eligible to apply.</li>\r\n                <li>Candidates should be ready to work in Night Shifts and any of our manufacturing plant locations.\r\n                </li>\r\n            </ol>\r\n\r\n            <h6 class=\"red\">MRF Screening Process</h6>\r\n            <ol>\r\n                <li>Technical Test (30 Qtns / 30 Min) Objective Type - Subject Related</li>\r\n                <li>IQ Test (30 Qtns / 40 Min)</li>\r\n                <li>Personality Test(44 Qtns / 10 Min)</li>\r\n                <li>Scheduling Test (7 Qtns /20 Min)</li>\r\n                <li>GD</li>\r\n            </ol>\r\n\r\n            <h6 class=\"red\">Personal Interview</h6>\r\n            <ol>\r\n                <li>Preliminary(Tech & HR)</li>\r\n                <li>Final (Tech & HR)</li>\r\n            </ol>\r\n\r\n            <h6 class=\"red\">Job Role / Designation : Key Responsibilities</h6>\r\n            <p class=\"font-weight-bold\">A. Production / Supervisor(BSc – Specified Streams </p>\r\n            <ol>\r\n                <li>Planning materials for achieving the Daily production target.</li>\r\n                <li>Allocation of Roles & Responsibilities for the Employees & Junior staffs.</li>\r\n                <li>Supervising workers and ensuring that targets are met)</li>\r\n                <li>Ensure Full utilization of Man & Machine to achieve pre set production targets.</li>\r\n                <li>Completing and maintaining Production records as and when batches are over.</li>\r\n            </ol>\r\n\r\n            <p class=\"font-weight-bold\">B. Quality Assurance / Supervisor(BSc [Chemistry, Physics, Maths, Statistics],\r\n                MSc [Statistics])</p>\r\n            <ol>\r\n                <li>Product audit, Process audit, dock audits</li>\r\n                <li>Customer Complaint Analysis and problem solving using 7 QC tools.</li>\r\n                <li>Line return analysis, Reducing the line return.</li>\r\n                <li>Maintaining records and quantifiers for ISO.</li>\r\n                <li>Maintaining quality records in SAP. </li>\r\n            </ol>\r\n\r\n            <p class=\"font-weight-bold\">C. Plant or Corp Technical / Supervisor(BSc [Chemistry, Physics], MSc\r\n                [Chemistry])</p>\r\n            <ol>\r\n                <li>Testing of Raw Materials, Chemicals and products.</li>\r\n                <li>Handling of new products development on the shop floor.</li>\r\n                <li>Handling equipment’s like micro scope, image analyser, Rockwell, hardness tester.</li>\r\n                <li>Product Design, Design Intend, Component Design. </li>\r\n            </ol>\r\n\r\n            \r\n        </div> -->\r\n        <!-- <div class=\"mt-4 text-right\">\r\n                <button type=\"button\" class=\"btn btn-primary\">Next <i class=\"las la-angle-right\"></i></button>\r\n            </div> -->\r\n            <div class=\"inner-container\" [innerHtml]=campusLinks[0]?.campusTemplate>\r\n                \r\n            </div>\r\n            <!-- {{campusLinks[0].campusTemplate}} -->\r\n            <div class=\"alert alert-warning\">\r\n              </div>\r\n        <div class=\"inner-container\">\r\n            <form name=\"saveForm\" (ngSubmit)=\"onSubmit()\" #f=\"ngForm\" autocomplete=\"off\">\r\n                <div class=\"d-flex justify-content-between align-items-center\">\r\n                    <div>\r\n                        <p>(<span class=\"red\">*</span> Mandatory Fields)</p>\r\n                    </div>\r\n                    <!-- <div><button type=\"button\" class=\"btn btn-secondary ml-2\" (click)=\"onclickback()\"><i\r\n                                class=\"las la-angle-left\"></i> Back to\r\n                            Description</button></div> -->\r\n                </div>\r\n                <div>\r\n                    <h6 class=\"text-uppercase\">General Information</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Name<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.FullName\"\r\n                                    placeholder=\"Name as per aadhar card\" name=\"FullName\" #FullName=\"ngModel\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && FullName.invalid) || (FullName.touched && FullName.invalid)\">\r\n                                    <span *ngIf=\"FullName.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Gender<span class=\"required\">*</span></label>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input [(ngModel)]=\"campusCandidate.GenderId\" #GenderId=\"ngModel\" name=\"GenderId\"\r\n                                        value=\"1\" #radio1 id=\"radio1\" type=\"radio\"\r\n                                        [checked]=\"campusCandidate.GenderId==1?true:false\">\r\n                                    <label for=\"radio1\">Male</label>\r\n                                </div>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input [(ngModel)]=\"campusCandidate.GenderId\" #GenderId=\"ngModel\" name=\"GenderId\"\r\n                                        value=\"2\" #radio2 id=\"radio2\" type=\"radio\"\r\n                                        [checked]=\"campusCandidate.GenderId==2?true:false\">\r\n                                    <label for=\"radio2\">Female</label>\r\n                                </div>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input [(ngModel)]=\"campusCandidate.GenderId\" #GenderId=\"ngModel\" name=\"GenderId\"\r\n                                        value=\"3\" #radio3 id=\"radio3\" type=\"radio\"\r\n                                        [checked]=\"campusCandidate.GenderId==3?true:false\">\r\n                                    <label for=\"radio3\">Others</label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Date of Birth</label>\r\n                                <div class=\"input-group datepiker date\">\r\n                                    <input type=\"text\" class=\"form-control pull-right datepicker\"\r\n                                        [(ngModel)]=\"campusCandidate.DOB\" name=\"DOB\" #DOB=\"ngModel\"\r\n                                        placeholder=\"dd-mm-yyyy\" required>\r\n                                    <div class=\"input-group-append\">\r\n                                        <span class=\"input-group-text\" id=\"basic-addon2\"><i\r\n                                                class=\"fa fa-calendar\"></i></span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Age</label>\r\n                                <input type=\"text\" disabled maxlength=\"2\" class=\"form-control\" id=\"txtAge\"\r\n                                    [(ngModel)]=\"campusCandidate.Age\" name=\"Age\" #Age=\"ngModel\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Email ID<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" name=\"EmailId\" #EmailId=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.EmailId\" placeholder=\"Enter correct email. Eg:sample@gmail.com \" (keypress)=\"email($event)\" required />\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && EmailId.invalid) || (EmailId.touched && EmailId.invalid)\">\r\n                                    <span *ngIf=\"EmailId.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Phone No.<span class=\"required\">*</span></label>\r\n                                <input numbersOnly maxlength=\"10\" type=\"text\" class=\"form-control\"\r\n                                    [(ngModel)]=\"campusCandidate.ContactNo\" name=\"ContactNo\" required\r\n                                    #ContactNo=\"ngModel\" placeholder=\"e.g :9800123456\" (keypress)=\"numberOnly($event)\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && ContactNo.invalid) || (ContactNo.touched && ContactNo.invalid)\">\r\n                                    <span *ngIf=\"ContactNo.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Aadhar No.<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" numbersOnly class=\"form-control\"\r\n                                    [(ngModel)]=\"campusCandidate.AadharNo\" required #AadharNo=\"ngModel\" name=\"AadharNo\"\r\n                                    maxlength=\"12\" placeholder=\"e.g :123412341234\" (keypress)=\"numberOnly($event)\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && AadharNo.invalid) || (AadharNo.touched && AadharNo.invalid)\">\r\n                                    <span *ngIf=\"AadharNo.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Home Town<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.HomeTown\"\r\n                                    placeholder=\"Home Town\" name=\"HomeTown\" #HomeTown=\"ngModel\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && HomeTown.invalid) || (HomeTown.touched && HomeTown.invalid)\">\r\n                                    <span *ngIf=\"HomeTown.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Native State<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    [searchable]=\"true\" [clearable]=\"false\" name=\"NativeState\" #NativeState=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.NativeState\" required>\r\n                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                        {{rec.stateName}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && NativeState.invalid) || (NativeState.touched && NativeState.invalid)\">\r\n                                    <span *ngIf=\"NativeState.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Present State<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    [searchable]=\"true\" [clearable]=\"false\" name=\"PresentState\" #PresentState=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.PresentState\" required>\r\n                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                        {{rec.stateName}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && PresentState.invalid) || (PresentState.touched && PresentState.invalid)\">\r\n                                    <span *ngIf=\"PresentState.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Mother Tongue<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"languageName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        [(ngModel)]=\"campusCandidate.MotherTongueId\" name=\"MotherTongueId\"\r\n                                        #MotherTongueId=\"ngModel\" required>\r\n                                        <ng-option [value]=\"rec.languageId\" *ngFor=\"let rec of languages\">\r\n                                            {{rec.languageName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg\"\r\n                                        *ngIf=\"(f.submitted && MotherTongueId.invalid) || (MotherTongueId.touched && MotherTongueId.invalid)\">\r\n                                        <span *ngIf=\"MotherTongueId.errors.required\">Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Languages able to speak<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"languageName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"true\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                        #LanguageIds=\"ngModel\" name=\"LanguageIds\" required\r\n                                        [(ngModel)]=\"campusCandidate.LanguageIds\" (change)=\"changeLanguageKnown()\">\r\n                                        <ng-option [value]=\"rec.languageId\" *ngFor=\"let rec of languages\">\r\n                                            {{rec.languageName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg\"\r\n                                        *ngIf=\"(f.submitted && LanguageIds.invalid) || (LanguageIds.touched && LanguageIds.invalid)\">\r\n                                        <span *ngIf=\"LanguageIds.errors.required\">Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Height(CM)<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.Height\" numbersOnly\r\n                                    placeholder=\"Height in CM\" (keypress)=\"numberOnly($event)\" #Height=\"ngModel\" name=\"Height\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && Height.invalid) || (Height.touched && Height.invalid)\">\r\n                                    <span *ngIf=\"Height.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Weight(KG)<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.Weight\" numbersOnly\r\n                                    placeholder=\"Weight in KG\"  (keypress)=\"numberOnly($event)\" #Weight=\"ngModel\" name=\"Weight\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && Weight.invalid) || (Weight.touched && Weight.invalid)\">\r\n                                    <span *ngIf=\"Weight.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-8\">\r\n                            <label>Eye Sight Corrected<span class=\"required\">*</span></label>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"col\">\r\n                                    <div class=\"form-group\">\r\n                                        <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                            [searchable]=\"false\" [clearable]=\"false\" (change)=\"onchangeeye($event)\"\r\n                                            [(ngModel)]=\"campusCandidate.EyeSightCorrected\" name=\"EyeSightCorrected\"\r\n                                            #EyeSightCorrected=\"ngModel\" required>\r\n                                            <ng-option [value]=\"1\">Yes</ng-option>\r\n                                            <ng-option [value]=\"0\">No</ng-option>\r\n                                        </ng-select>\r\n                                        <p class=\"error-msg\"\r\n                                            *ngIf=\"(f.submitted && EyeSightCorrected.invalid) || (EyeSightCorrected.touched && EyeSightCorrected.invalid)\">\r\n                                            <span *ngIf=\"EyeSightCorrected.errors.required\">Required</span>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col\">\r\n                                    <div class=\"input-group normal\">\r\n                                        <div class=\"input-group-prepend\">\r\n                                            <div class=\"input-group-text\">Right</div>\r\n                                        </div>\r\n                                        <input [(readOnly)]=\"readeye\" type=\"text\" class=\"form-control\" id=\"\" appTwoDigitDecimaNumber (keypress)=\"numberOnlyeye($event)\"\r\n                                        placeholder=\"eye power(e.g : +3.5 -3.5)\"  [(ngModel)]=\"campusCandidate.EyeSightRight\" #EyeSightRight=\"ngModel\"\r\n                                            name=\"EyeSightRight\">\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col\">\r\n                                    <div class=\"input-group normal\">\r\n                                        <div class=\"input-group-prepend\">\r\n                                            <div class=\"input-group-text\">Left</div>\r\n                                        </div>\r\n                                        <input [(readOnly)]=\"readeye\" type=\"text\" class=\"form-control\" id=\"\" appTwoDigitDecimaNumber (keypress)=\"numberOnlyeye($event)\"\r\n                                        placeholder=\"eye power(e.g : +3.5 -3.5)\" [(ngModel)]=\"campusCandidate.EyeSightLeft\" name=\"EyeSightLeft\"\r\n                                            #EyeSightLeft=\"ngModel\">\r\n\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Father’s Occupation<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                    [(ngModel)]=\"campusCandidate.FatherOccupation\" name=\"FatherOccupation\"\r\n                                    #FatherOccupation=\"ngModel\" required>\r\n                                    <ng-option [value]=\"rec.id\" *ngFor=\"let rec of familyOccupations\">\r\n                                        {{rec.name}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && FatherOccupation.invalid) || (FatherOccupation.touched && FatherOccupation.invalid)\">\r\n                                    <span *ngIf=\"FatherOccupation.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Mother’s Occupation<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"MotherOccupation\" #MotherOccupation=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.MotherOccupation\" required>\r\n                                    <ng-option [value]=\"rec.id\" *ngFor=\"let rec of motherOccupations\">\r\n                                        {{rec.name}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && MotherOccupation.invalid) || (MotherOccupation.touched && MotherOccupation.invalid)\">\r\n                                    <span *ngIf=\"MotherOccupation.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Disability<span class=\"required\">*</span></label>\r\n                                <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"Disability\" #Disability=\"ngModel\" [searchable]=\"false\" [clearable]=\"false\" (change)=\"onchangedisab($event)\"\r\n                                    [(ngModel)]=\"campusCandidate.Disability\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && Disability.invalid) || (Disability.touched && Disability.invalid)\">\r\n                                    <span *ngIf=\"Disability.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"form-group\">\r\n                                <label>Disability Details</label>\r\n                                <textarea [(readOnly)]=\"readdisability\" class=\"form-control\" placeholder=\"Enter details\" name=\"DisabilityDetails\"\r\n                                    #DisabilityDetails=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.DisabilityDetails\"></textarea>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Health Issues<span class=\"required\">*</span></label>\r\n                                <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"HealthIssue\" #HealthIssue=\"ngModel\" [searchable]=\"false\" [clearable]=\"false\" (change)=\"onchangehealth($event)\"\r\n                                    [(ngModel)]=\"campusCandidate.HealthIssue\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && HealthIssue.invalid) || (HealthIssue.touched && HealthIssue.invalid)\">\r\n                                    <span *ngIf=\"HealthIssue.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"form-group\">\r\n                                <label>Health Issue Details</label>\r\n                                <textarea [(readOnly)]=\"readhealth\" class=\"form-control\" placeholder=\"Enter details\"\r\n                                    [(ngModel)]=\"campusCandidate.HealthIssueDetails\" name=\"HealthIssueDetails\"\r\n                                    #HealthIssueDetails=\"ngModel\"></textarea>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>How many siblings you have?<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"If NA type 0\" (keypress)=\"numberOnly($event)\"\r\n                                    [(ngModel)]=\"campusCandidate.NoofSiblings\" name=\"NoofSiblings\"\r\n                                    #NoofSiblings=\"ngModel\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && NoofSiblings.invalid) || (NoofSiblings.touched && NoofSiblings.invalid)\">\r\n                                    <span *ngIf=\"NoofSiblings.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <h6 class=\"text-uppercase\">Academic Details</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Highest Qualification <span class=\"required\">*</span>(Choose the relevant qualification, if you are currently pursuing final year *Under Graduation* we will consider your highest qualification as    *Under Graduation*)</label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"HighestQualification\" #HighestQualification=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.HighestQualification\" required\r\n                                    (ngModelChange)=\"changeQualification($event)\">\r\n                                    <!-- <ng-option [value]=\"-1\">10th Standard</ng-option>\r\n                                    <ng-option [value]=\"1\">12th Standard</ng-option> -->\r\n                                    <ng-option [value]=\"5\">Diploma</ng-option>\r\n                                    <ng-option [value]=\"2\">Under Graduation</ng-option>\r\n                                    <!-- <ng-option [value]=\"4\">Professional Degree</ng-option> -->\r\n                                    <ng-option [value]=\"3\">Post Graduation</ng-option>\r\n                                    <ng-option [value]=\"6\">Post Graduate Diploma</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && HighestQualification.invalid) || (HighestQualification.touched && HighestQualification.invalid)\">\r\n                                    <span *ngIf=\"HighestQualification.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div id=\"accordion\" class=\"myaccordion\">\r\n                        <div class=\"card\" *ngIf=\"showTen\">\r\n                            <div class=\"card-header\" id=\"headingOne\">\r\n                                <h2>\r\n                                    <!-- // By Sayandeep on 05-08-2023 -->\r\n                                    <!-- <button\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseOne\">\r\n                                        10 STD / High School\r\n                                        <span>\r\n                                            <i class=\"fa fa-minus\"></i>\r\n                                        </span>\r\n                                    </button> -->\r\n                                    <!-- // By Sayandeep on 05-08-2023 -->\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseOne\">\r\n                                        10 STD / High School\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseOne\" class=\"collapse show\" aria-labelledby=\"headingOne\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TenCourseStatus\" #TenCourseStatus=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TenCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TenCourses\" #TenCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TenCourses\">\r\n                                                    <ng-option [value]=\"rec.courseId\" *ngFor=\"let rec of tenCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                       \r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TenYearOfPassing\"\r\n                                                    #TenYearOfPassing=\"ngModel\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TenYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\" name=\"TenMarks\"\r\n                                                    #TenMarks=\"ngModel\" [(ngModel)]=\"campusCandidate.TenMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chck()\" required>\r\n                                                <p class=\"error-msg\"\r\n                                                    *ngIf=\"(f.submitted && TenMarks.invalid) || (TenMarks.touched && TenMarks.invalid)\">\r\n                                                    <span *ngIf=\"TenMarks.errors.required\">Required</span>\r\n                                                    \r\n                                                </p>\r\n                                                <p class=\"error-msg\" *ngIf=\"(TenMarks.touched && TenMarks.valid)\">\r\n                                                    <span *ngIf=\"markten\">Enter between 30% to 100%</span>\r\n                                                </p>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showTwelve\">\r\n                            <div class=\"card-header\" id=\"headingTwo\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseTwo\">\r\n                                        12 STD(+2) / Higher Secondary\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TwelveCourseStatus\"\r\n                                                    #TwelveCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangecourse($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TwelveCourses\" #TwelveCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\" [disabled]=\"disablecourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveCourses\">\r\n                                                    <ng-option [value]=\"rec.courseId\"\r\n                                                        *ngFor=\"let rec of twelveCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [disabled]=\"disableyear\" [placeholder]=\"'Select'\"\r\n                                                    [appendTo]=\"'body'\" [multiple]=\"false\" name=\"TwelveYearOfPassing\"\r\n                                                    #TwelveYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"TwelveMarks\" #TwelveMarks=\"ngModel\" [disabled]=\"disablemarks\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chcktwelve()\" required>\r\n                                                <p class=\"error-msg\"\r\n                                                    *ngIf=\"(f.submitted && TwelveMarks.invalid) || (TwelveMarks.touched && TwelveMarks.invalid)\">\r\n                                                    <span *ngIf=\"TwelveMarks.errors.required\">Required</span>\r\n                                                    \r\n                                                </p>\r\n                                                <p class=\"error-msg\" *ngIf=\"(TwelveMarks.touched && TwelveMarks.valid)\">\r\n                                                    <span *ngIf=\"marktwelve\">Enter between 30% to 100%</span>\r\n                                                </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showDiploma\">\r\n                            <div class=\"card-header\" id=\"headingThree\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseThree\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseThree\">\r\n                                        Diploma / Equivalent Diploma\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseThree\" class=\"collapse\" aria-labelledby=\"headingThree\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaCourseStatus\"\r\n                                                    #DiplomaCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangediploma($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaCourses\" #DiplomaCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablediplomacourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaCourses\"\r\n                                                    (ngModelChange)=\"getAllDiplomaStream($event)\">\r\n                                                    <ng-option [value]=\"rec.courseId\"\r\n                                                        *ngFor=\"let rec of diplomaCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaStreams\" #DiplomaStreams=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablediplomaspecial\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaStreams\">\r\n                                                    <ng-option [value]=\"rec.streamId\"\r\n                                                        *ngFor=\"let rec of diplomaStreamList\">\r\n                                                        {{rec.streamName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaUniversity\"\r\n                                                    #DiplomaUniversity=\"ngModel\" [searchable]=\"true\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangediplomainstitute($event)\" [disabled]=\"disablediplomainstitute\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaUniversity\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hidediplomainstitutename\" >\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [disabled]=\"disablediplomainstitutename\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaInstituteName\"\r\n                                                    name=\"DiplomaInstituteName\" #DiplomaInstituteName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablediplomainstitutelocation\"\r\n                                                    name=\"DiplomaInstituteLocation\" #DiplomaInstituteLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaInstituteLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaYearOfPassing\"\r\n                                                    #DiplomaYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablediplomayear\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"DiplomaMarks\" #DiplomaMarks=\"ngModel\"\r\n                                                    [disabled]=\"disablediplomamarks\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckdiploma()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && DiplomaMarks.invalid) || (DiplomaMarks.touched && DiplomaMarks.invalid)\">\r\n                                                        <span *ngIf=\"DiplomaMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(DiplomaMarks.touched && DiplomaMarks.valid)\">\r\n                                                        <span *ngIf=\"markdiploma\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showDegree\">\r\n                            <div class=\"card-header\" id=\"headingFour\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseFour\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseFour\">\r\n                                        Under Graduation\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseFour\" class=\"collapse\" aria-labelledby=\"headingFour\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeCourseStatus\"\r\n                                                    #DegreeCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangegraduation($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeCourses\" #DegreeCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablegradcourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeCourses\"\r\n                                                    (ngModelChange)=\"getAllDegreeStream($event)\">\r\n                                                    <ng-option [value]=\"{ courseId: rec.courseId, qualificationId: rec.qualificationId }\"\r\n                                                        *ngFor=\"let rec of degreeCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeStreams\" #DegreeStreams=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablegradspecial\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeStreams\">\r\n                                                    <ng-option [value]=\"rec.streamId\"\r\n                                                        *ngFor=\"let rec of degreeStreamList\">\r\n                                                        {{rec.streamName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeUniversity\"\r\n                                                    #DegreeUniversity=\"ngModel\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                                    (change)=\"onchangeunderinstitute($event)\" [disabled]=\"disablegradinstitute\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeUniversity\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hideunderinstitute\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [disabled]=\"disablegradinstitutename\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeInstituteName\"\r\n                                                    name=\"DegreeInstituteName\" #DegreeInstituteName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablegradinstitutelocation\"\r\n                                                    name=\"DegreeInstituteLocation\" #DegreeInstituteLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeInstituteLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeYearOfPassing\"\r\n                                                    #DegreeYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablegradyear\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"DegreeMarks\" #DegreeMarks=\"ngModel\"\r\n                                                    [disabled]=\"disablegradmarks\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckundergrad()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && DegreeMarks.invalid) || (DegreeMarks.touched && DegreeMarks.invalid)\">\r\n                                                        <span *ngIf=\"DegreeMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(DegreeMarks.touched && DegreeMarks.valid)\">\r\n                                                        <span *ngIf=\"markundergrad\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showPG\">\r\n                            <div class=\"card-header\" id=\"headingFive\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseFive\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseFive\">\r\n                                        Post Graduation / PG Diploma\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseFive\" class=\"collapse\" aria-labelledby=\"headingFive\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeCourseStatus\"\r\n                                                    #PostDegreeCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangepg($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeCourses\"\r\n                                                    #PostDegreeCourses=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablepgcourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeCourses\"\r\n                                                    (ngModelChange)=\"getAllPostDegreeStream($event)\">\r\n                                                    <ng-option [value]=\"{ courseId: rec.courseId, qualificationId: rec.qualificationId }\"\r\n                                                        *ngFor=\"let rec of postDegreeCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeStreams\"\r\n                                                    #PostDegreeStreams=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablepgspecial\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeStreams\">\r\n                                                    <ng-option [value]=\"rec.streamId\"\r\n                                                        *ngFor=\"let rec of postDegreeStreamList\">\r\n                                                        {{rec.streamName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeUniversity\"\r\n                                                    #PostDegreeUniversity=\"ngModel\" [searchable]=\"true\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangepginstitute($event)\" [disabled]=\"disablepginstitute\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeUniversity\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hidepginstitute\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [disabled]=\"disablepginstitutename\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeInstituteName\"\r\n                                                    name=\"PostDegreeInstituteName\" #PostDegreeInstituteName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    name=\"PostDegreeInstituteLocation\"\r\n                                                    [disabled]=\"disablepginstitutelocation\"\r\n                                                    #PostDegreeInstituteLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeInstituteLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeYearOfPassing\"\r\n                                                    #PostDegreeYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablepgyear\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"PostDegreeMarks\" #PostDegreeMarks=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeMarks\"\r\n                                                    [disabled]=\"disablepgmarks\" appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckpostgrad()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && PostDegreeMarks.invalid) || (PostDegreeMarks.touched && PostDegreeMarks.invalid)\">\r\n                                                        <span *ngIf=\"PostDegreeMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(PostDegreeMarks.touched && PostDegreeMarks.valid)\">\r\n                                                        <span *ngIf=\"markpostgrad\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showAnyOther\">\r\n                            <div class=\"card-header\" id=\"headingSix\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseSix\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseSix\">\r\n                                        Any Other Qualification (optional)\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseSix\" class=\"collapse\" aria-labelledby=\"headingSix\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Qualification<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"\"\r\n                                                    name=\"AnyOtherQualification\" #AnyOtherQualification=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualification\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"\"\r\n                                                    name=\"AnyOtherQualificationCourse\"\r\n                                                    #AnyOtherQualificationCourse=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationCourse\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"AnyOtherQualificationCourseStatus\"\r\n                                                    #AnyOtherQualificationCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <!-- <ng-option [value]=\"3\">NA</ng-option> -->\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"\"\r\n                                                    name=\"AnyOtherQualificationStream\"\r\n                                                    #AnyOtherQualificationStream=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationStream\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"AnyOtherQualificationInstitite\"\r\n                                                    #AnyOtherQualificationInstitite=\"ngModel\" [searchable]=\"true\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangeanyotherinstituteinstitute($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationInstitite\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hideanyotherinstitute\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationInstititeName\"\r\n                                                    name=\"AnyOtherQualificationInstititeName\"\r\n                                                    #AnyOtherQualificationInstititeName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    name=\"AnyOtherQualificationInstititeLocation\"\r\n                                                    #AnyOtherQualificationInstititeLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationInstititeLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"AnyOtherQualificationYearOfPassing\"\r\n                                                    #AnyOtherQualificationYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"AnyOtherQualificationMarks\"\r\n                                                    #AnyOtherQualificationMarks=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckanyothr()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && AnyOtherQualificationMarks.invalid) || (AnyOtherQualificationMarks.touched && AnyOtherQualificationMarks.invalid)\">\r\n                                                        <span *ngIf=\"AnyOtherQualificationMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(AnyOtherQualificationMarks.touched && AnyOtherQualificationMarks.valid)\">\r\n                                                        <span *ngIf=\"markanyothr\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <h6 class=\"text-uppercase\">Other Details</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Willing for 3 year commitment<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"YearsCommitments\" #YearsCommitments=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.YearsCommitments\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && YearsCommitments.invalid) || (YearsCommitments.touched && YearsCommitments.invalid)\">\r\n                                    <span *ngIf=\"YearsCommitments.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Willing to work anywhere in India<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"AnyWhereinIndia\" #AnyWhereinIndia=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.AnyWhereinIndia\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && AnyWhereinIndia.invalid) || (AnyWhereinIndia.touched && AnyWhereinIndia.invalid)\">\r\n                                    <span *ngIf=\"AnyWhereinIndia.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label>Do you have any Active Arrears/Backlogs (Highest Qualification)?<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"ActiveArrears\" #ActiveArrears=\"ngModel\"\r\n                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                    [(ngModel)]=\"campusCandidate.ActiveArrears\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && ActiveArrears.invalid) || (ActiveArrears.touched && ActiveArrears.invalid)\">\r\n                                    <span *ngIf=\"ActiveArrears.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Most Preferred Benefit<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"MostPreferdBenifit\" #MostPreferdBenifit=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.MostPreferdBenifit\" required>\r\n                                    <ng-option [value]=\"1\">Subsidized Canteen</ng-option>\r\n                                    <ng-option [value]=\"2\">Travelling Facility</ng-option>\r\n                                    <ng-option [value]=\"3\">Accommodation Facility</ng-option>\r\n                                    <ng-option [value]=\"4\">Regulated Working Hours & 5 Day Week</ng-option>\r\n                                    <ng-option [value]=\"5\">Work From Home Facility</ng-option>\r\n                                    <ng-option [value]=\"6\">Others</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && MostPreferdBenifit.invalid) || (MostPreferdBenifit.touched && MostPreferdBenifit.invalid)\">\r\n                                    <span *ngIf=\"MostPreferdBenifit.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Extra Curricular Activities<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"true\"\r\n                                    name=\"ExtraCurricularActivities\" #ExtraCurricularActivities=\"ngModel\"\r\n                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                    [(ngModel)]=\"campusCandidate.ExtraCurricularActivities\" required>\r\n                                    <ng-option [value]=\"rec.id\" *ngFor=\"let rec of extracuricullar\">\r\n                                        {{rec.name}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && ExtraCurricularActivities.invalid) || (ExtraCurricularActivities.touched && ExtraCurricularActivities.invalid)\">\r\n                                    <span *ngIf=\"ExtraCurricularActivities.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Job Type Priority<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"JobTypePriority\" #JobTypePriority=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.JobTypePriority\" required>\r\n                                    <ng-option [value]=\"1\">Core Manufacturing</ng-option>\r\n                                    <ng-option [value]=\"2\">IT Job</ng-option>\r\n                                    <ng-option [value]=\"3\">Other</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && JobTypePriority.invalid) || (JobTypePriority.touched && JobTypePriority.invalid)\">\r\n                                    <span *ngIf=\"JobTypePriority.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Critical factor which influence Job decision<span\r\n                                        class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"CriticalFactor\" #CriticalFactor=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.CriticalFactor\" required>\r\n                                    <ng-option [value]=\"1\">Job Profile </ng-option>\r\n                                    <ng-option [value]=\"2\">Job Security </ng-option>\r\n                                    <ng-option [value]=\"3\">Career Growth </ng-option>\r\n                                    <ng-option [value]=\"4\">Learning Opportunities </ng-option>\r\n                                    <ng-option [value]=\"5\">Salary & Other benifits </ng-option>\r\n                                    <ng-option [value]=\"6\">Other </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && CriticalFactor.invalid) || (CriticalFactor.touched && CriticalFactor.invalid)\">\r\n                                    <span *ngIf=\"CriticalFactor.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        \r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Willing to work in rotational shift including Night Shift (only plants) &\r\n                                    stretched\r\n                                    working hours<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"WorkinginShift\" #WorkinginShift=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.WorkinginShift\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && WorkinginShift.invalid) || (WorkinginShift.touched && WorkinginShift.invalid)\">\r\n                                    <span *ngIf=\"WorkinginShift.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <label for=\"\">Upload Resume (Max size 500KB) <span class=\"required\">*</span></label>\r\n                            <div class=\"custom-file\">\r\n                                <!-- <input type=\"file\" class=\"custom-file-input\" id=\"customFile\">\r\n                                <label class=\"custom-file-label\" for=\"customFile\"></label> -->\r\n                                <input type=\"file\" class=\"custom-file-input\" id=\"customFile\" accept=\"application/pdf\"\r\n                                    (change)=\"onFileChange($event.target.files)\">\r\n                                <label class=\"custom-file-label\" for=\"customFile\" #candidateResumeImport>Choose\r\n                                    file</label>\r\n                                <p class=\"error-msg msgfile\" style=\"display: none;\">\r\n                                    <span>Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div><br>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-10\">\r\n                          <div class=\"form-group\">\r\n                            <label>\r\n                              <input type=\"checkbox\" (change)=\"checkValue($event)\" />&nbsp;&nbsp;\r\n                              I have read and understood the Job Profiles and other Eligibility Criteria\r\n                              with respect to the MRF Campus Selection Process. I hereby declare that\r\n                              the particulars, including my personal identity details as given in this\r\n                              registration form, are true and with my sole consent. I know that any false\r\n                              information contained in this registration form shall automatically rescind\r\n                              the contract of employment if selected or discontinued during the course of\r\n                              your selection.\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>                      \r\n                    \r\n                </div>\r\n               \r\n                <div class=\"mt-4 clearfix\">\r\n                    <!-- <button type=\"submit\" class=\"btn btn-secondary\"><i class=\"las la-angle-left\"></i> Back</button> -->\r\n                    <button type=\"submit\" class=\"btn btn-primary ml-1\">Submit</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n<ngx-spinner bdColor=\"rgba(51,51,51,0.8)\" size=\"medium\" color=\"#fff\" type=\"ball-scale-multiple\">\r\n    <p style=\"font-size: 20px; color: white\">Loading...</p>\r\n</ngx-spinner>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/off-campus-registration/off-campus-registration.component.html":
  /*!**********************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/off-campus-registration/off-campus-registration.component.html ***!
    \**********************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCommonpagesOffCampusRegistrationOffCampusRegistrationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"container\">\r\n    <div class=\"regist_form_container\" *ngIf=\"campusLinks[0]?.disableStatus==1\">\r\n        <h1 class=\"title\">Candidate Registration period has been closed. Your time and effort throughout this process are greatly acknowledged</h1>\r\n    </div>\r\n    <div class=\"regist_form_container\" *ngIf=\"campusLinks[0]?.disableStatus==0\">\r\n        <h1 class=\"title\">MRF Off Campus {{campusLinks[0]?.campusYearName}} Student Registration</h1>\r\n\r\n\r\n        <!-- <div class=\"inner-container\">\r\n            <p>The purpose of this form is to collect relevant details of the eligible Students for MRF Off Campus Drive\r\n                Initial Screening Process.(Shortlisted candidates alone will be considered for\r\n                the selection process.)</p>\r\n            <h6 class=\"red\">Eligibility Criteria</h6>\r\n            <ol>\r\n                <li>Qualification: BSc & MSc ( 2022 Passing out candidates)</li>\r\n                <li>BSc (Preferably Chemistry, Physics, Maths, Statistics), MSc (Preferably Chemistry, Statistics)</li>\r\n                <li>Aggregate Percentage: Minimum 60% up to last semester.</li>\r\n                <li>No active Arrears / Backlogs. Candidates those who have active Arrears/Backlogs (including written\r\n                    Arrears/Backlogs exam but results not published) are not eligible to apply.</li>\r\n                <li>Candidates should be ready to work in Night Shifts and any of our manufacturing plant locations.\r\n                </li>\r\n            </ol>\r\n\r\n            <h6 class=\"red\">MRF Screening Process</h6>\r\n            <ol>\r\n                <li>Technical Test (30 Qtns / 30 Min) Objective Type - Subject Related</li>\r\n                <li>IQ Test (30 Qtns / 40 Min)</li>\r\n                <li>Personality Test(44 Qtns / 10 Min)</li>\r\n                <li>Scheduling Test (7 Qtns /20 Min)</li>\r\n                <li>GD</li>\r\n            </ol>\r\n\r\n            <h6 class=\"red\">Personal Interview</h6>\r\n            <ol>\r\n                <li>Preliminary(Tech & HR)</li>\r\n                <li>Final (Tech & HR)</li>\r\n            </ol>\r\n\r\n            <h6 class=\"red\">Job Role / Designation : Key Responsibilities</h6>\r\n            <p class=\"font-weight-bold\">A. Production / Supervisor(BSc – Specified Streams </p>\r\n            <ol>\r\n                <li>Planning materials for achieving the Daily production target.</li>\r\n                <li>Allocation of Roles & Responsibilities for the Employees & Junior staffs.</li>\r\n                <li>Supervising workers and ensuring that targets are met)</li>\r\n                <li>Ensure Full utilization of Man & Machine to achieve pre set production targets.</li>\r\n                <li>Completing and maintaining Production records as and when batches are over.</li>\r\n            </ol>\r\n\r\n            <p class=\"font-weight-bold\">B. Quality Assurance / Supervisor(BSc [Chemistry, Physics, Maths, Statistics],\r\n                MSc [Statistics])</p>\r\n            <ol>\r\n                <li>Product audit, Process audit, dock audits</li>\r\n                <li>Customer Complaint Analysis and problem solving using 7 QC tools.</li>\r\n                <li>Line return analysis, Reducing the line return.</li>\r\n                <li>Maintaining records and quantifiers for ISO.</li>\r\n                <li>Maintaining quality records in SAP. </li>\r\n            </ol>\r\n\r\n            <p class=\"font-weight-bold\">C. Plant or Corp Technical / Supervisor(BSc [Chemistry, Physics], MSc\r\n                [Chemistry])</p>\r\n            <ol>\r\n                <li>Testing of Raw Materials, Chemicals and products.</li>\r\n                <li>Handling of new products development on the shop floor.</li>\r\n                <li>Handling equipment’s like micro scope, image analyser, Rockwell, hardness tester.</li>\r\n                <li>Product Design, Design Intend, Component Design. </li>\r\n            </ol>\r\n\r\n            \r\n        </div> -->\r\n        <!-- <div class=\"mt-4 text-right\">\r\n                <button type=\"button\" class=\"btn btn-primary\">Next <i class=\"las la-angle-right\"></i></button>\r\n            </div> -->\r\n            <div class=\"inner-container\" [innerHtml]=campusLinks[0].campusTemplate>\r\n                \r\n            </div>\r\n            <!-- {{campusLinks[0].campusTemplate}} -->\r\n            <div class=\"alert alert-warning\">\r\n              </div>\r\n        <div class=\"inner-container\">\r\n            <form name=\"saveForm\" (ngSubmit)=\"onSubmit()\" #f=\"ngForm\" autocomplete=\"off\">\r\n                <div class=\"d-flex justify-content-between align-items-center\">\r\n                    <div>\r\n                        <p>(<span class=\"red\">*</span> Mandatory Fields)</p>\r\n                    </div>\r\n                    <!-- <div><button type=\"button\" class=\"btn btn-secondary ml-2\" (click)=\"onclickback()\"><i\r\n                                class=\"las la-angle-left\"></i> Back to\r\n                            Description</button></div> -->\r\n                </div>\r\n                <div>\r\n                    <h6 class=\"text-uppercase\">General Information</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Name<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.FullName\"\r\n                                    placeholder=\"Name as per aadhar card\" name=\"FullName\" #FullName=\"ngModel\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && FullName.invalid) || (FullName.touched && FullName.invalid)\">\r\n                                    <span *ngIf=\"FullName.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Gender<span class=\"required\">*</span></label>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input [(ngModel)]=\"campusCandidate.GenderId\" #GenderId=\"ngModel\" name=\"GenderId\"\r\n                                        value=\"1\" #radio1 id=\"radio1\" type=\"radio\"\r\n                                        [checked]=\"campusCandidate.GenderId==1?true:false\">\r\n                                    <label for=\"radio1\">Male</label>\r\n                                </div>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input [(ngModel)]=\"campusCandidate.GenderId\" #GenderId=\"ngModel\" name=\"GenderId\"\r\n                                        value=\"2\" #radio2 id=\"radio2\" type=\"radio\"\r\n                                        [checked]=\"campusCandidate.GenderId==2?true:false\">\r\n                                    <label for=\"radio2\">Female</label>\r\n                                </div>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input [(ngModel)]=\"campusCandidate.GenderId\" #GenderId=\"ngModel\" name=\"GenderId\"\r\n                                        value=\"3\" #radio3 id=\"radio3\" type=\"radio\"\r\n                                        [checked]=\"campusCandidate.GenderId==3?true:false\">\r\n                                    <label for=\"radio3\">Others</label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Date of Birth</label>\r\n                                <div class=\"input-group datepiker date\">\r\n                                    <input type=\"text\" class=\"form-control pull-right datepicker\"\r\n                                        [(ngModel)]=\"campusCandidate.DOB\" name=\"DOB\" #DOB=\"ngModel\"\r\n                                        placeholder=\"dd-mm-yyyy\" required>\r\n                                    <div class=\"input-group-append\">\r\n                                        <span class=\"input-group-text\" id=\"basic-addon2\"><i\r\n                                                class=\"fa fa-calendar\"></i></span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Age</label>\r\n                                <input type=\"text\" disabled maxlength=\"2\" class=\"form-control\" id=\"txtAge\"\r\n                                    [(ngModel)]=\"campusCandidate.Age\" name=\"Age\" #Age=\"ngModel\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Email ID<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" name=\"EmailId\" #EmailId=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.EmailId\" placeholder=\"Enter correct email. Eg:sample@gmail.com \" (keypress)=\"email($event)\" required />\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && EmailId.invalid) || (EmailId.touched && EmailId.invalid)\">\r\n                                    <span *ngIf=\"EmailId.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Phone No.<span class=\"required\">*</span></label>\r\n                                <input numbersOnly maxlength=\"10\" type=\"text\" class=\"form-control\"\r\n                                    [(ngModel)]=\"campusCandidate.ContactNo\" name=\"ContactNo\" required\r\n                                    #ContactNo=\"ngModel\" placeholder=\"e.g :9800123456\" (keypress)=\"numberOnly($event)\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && ContactNo.invalid) || (ContactNo.touched && ContactNo.invalid)\">\r\n                                    <span *ngIf=\"ContactNo.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Aadhar No.<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" numbersOnly class=\"form-control\"\r\n                                    [(ngModel)]=\"campusCandidate.AadharNo\" required #AadharNo=\"ngModel\" name=\"AadharNo\"\r\n                                    maxlength=\"12\" placeholder=\"e.g :123412341234\" (keypress)=\"numberOnly($event)\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && AadharNo.invalid) || (AadharNo.touched && AadharNo.invalid)\">\r\n                                    <span *ngIf=\"AadharNo.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Home Town<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.HomeTown\"\r\n                                    placeholder=\"Home Town\" name=\"HomeTown\" #HomeTown=\"ngModel\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && HomeTown.invalid) || (HomeTown.touched && HomeTown.invalid)\">\r\n                                    <span *ngIf=\"HomeTown.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Native State<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    [searchable]=\"true\" [clearable]=\"false\" name=\"NativeState\" #NativeState=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.NativeState\" required>\r\n                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                        {{rec.stateName}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && NativeState.invalid) || (NativeState.touched && NativeState.invalid)\">\r\n                                    <span *ngIf=\"NativeState.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Present State<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    [searchable]=\"true\" [clearable]=\"false\" name=\"PresentState\" #PresentState=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.PresentState\" required>\r\n                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                        {{rec.stateName}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && PresentState.invalid) || (PresentState.touched && PresentState.invalid)\">\r\n                                    <span *ngIf=\"PresentState.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Mother Tongue<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"languageName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        [(ngModel)]=\"campusCandidate.MotherTongueId\" name=\"MotherTongueId\"\r\n                                        #MotherTongueId=\"ngModel\" required>\r\n                                        <ng-option [value]=\"rec.languageId\" *ngFor=\"let rec of languages\">\r\n                                            {{rec.languageName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg\"\r\n                                        *ngIf=\"(f.submitted && MotherTongueId.invalid) || (MotherTongueId.touched && MotherTongueId.invalid)\">\r\n                                        <span *ngIf=\"MotherTongueId.errors.required\">Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Languages able to speak<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"languageName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"true\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                        #LanguageIds=\"ngModel\" name=\"LanguageIds\" required\r\n                                        [(ngModel)]=\"campusCandidate.LanguageIds\" (change)=\"changeLanguageKnown()\">\r\n                                        <ng-option [value]=\"rec.languageId\" *ngFor=\"let rec of languages\">\r\n                                            {{rec.languageName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg\"\r\n                                        *ngIf=\"(f.submitted && LanguageIds.invalid) || (LanguageIds.touched && LanguageIds.invalid)\">\r\n                                        <span *ngIf=\"LanguageIds.errors.required\">Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Height(CM)<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.Height\" numbersOnly\r\n                                    placeholder=\"Height in CM\" (keypress)=\"numberOnly($event)\" #Height=\"ngModel\" name=\"Height\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && Height.invalid) || (Height.touched && Height.invalid)\">\r\n                                    <span *ngIf=\"Height.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Weight(KG)<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"campusCandidate.Weight\" numbersOnly\r\n                                    placeholder=\"Weight in KG\"  (keypress)=\"numberOnly($event)\" #Weight=\"ngModel\" name=\"Weight\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && Weight.invalid) || (Weight.touched && Weight.invalid)\">\r\n                                    <span *ngIf=\"Weight.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-8\">\r\n                            <label>Eye Sight Corrected<span class=\"required\">*</span></label>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"col\">\r\n                                    <div class=\"form-group\">\r\n                                        <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                            [searchable]=\"false\" [clearable]=\"false\" (change)=\"onchangeeye($event)\"\r\n                                            [(ngModel)]=\"campusCandidate.EyeSightCorrected\" name=\"EyeSightCorrected\"\r\n                                            #EyeSightCorrected=\"ngModel\" required>\r\n                                            <ng-option [value]=\"1\">Yes</ng-option>\r\n                                            <ng-option [value]=\"0\">No</ng-option>\r\n                                        </ng-select>\r\n                                        <p class=\"error-msg\"\r\n                                            *ngIf=\"(f.submitted && EyeSightCorrected.invalid) || (EyeSightCorrected.touched && EyeSightCorrected.invalid)\">\r\n                                            <span *ngIf=\"EyeSightCorrected.errors.required\">Required</span>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col\">\r\n                                    <div class=\"input-group normal\">\r\n                                        <div class=\"input-group-prepend\">\r\n                                            <div class=\"input-group-text\">Right</div>\r\n                                        </div>\r\n                                        <input [(readOnly)]=\"readeye\" type=\"text\" class=\"form-control\" id=\"\" appTwoDigitDecimaNumber (keypress)=\"numberOnlyeye($event)\"\r\n                                        placeholder=\"eye power(e.g : +3.5 -3.5)\"  [(ngModel)]=\"campusCandidate.EyeSightRight\" #EyeSightRight=\"ngModel\"\r\n                                            name=\"EyeSightRight\">\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col\">\r\n                                    <div class=\"input-group normal\">\r\n                                        <div class=\"input-group-prepend\">\r\n                                            <div class=\"input-group-text\">Left</div>\r\n                                        </div>\r\n                                        <input [(readOnly)]=\"readeye\" type=\"text\" class=\"form-control\" id=\"\" appTwoDigitDecimaNumber (keypress)=\"numberOnlyeye($event)\"\r\n                                        placeholder=\"eye power(e.g : +3.5 -3.5)\" [(ngModel)]=\"campusCandidate.EyeSightLeft\" name=\"EyeSightLeft\"\r\n                                            #EyeSightLeft=\"ngModel\">\r\n\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Father’s Occupation<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                    [(ngModel)]=\"campusCandidate.FatherOccupation\" name=\"FatherOccupation\"\r\n                                    #FatherOccupation=\"ngModel\" required>\r\n                                    <ng-option [value]=\"rec.id\" *ngFor=\"let rec of familyOccupations\">\r\n                                        {{rec.name}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && FatherOccupation.invalid) || (FatherOccupation.touched && FatherOccupation.invalid)\">\r\n                                    <span *ngIf=\"FatherOccupation.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Mother’s Occupation<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"MotherOccupation\" #MotherOccupation=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.MotherOccupation\" required>\r\n                                    <ng-option [value]=\"rec.id\" *ngFor=\"let rec of motherOccupations\">\r\n                                        {{rec.name}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && MotherOccupation.invalid) || (MotherOccupation.touched && MotherOccupation.invalid)\">\r\n                                    <span *ngIf=\"MotherOccupation.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Disability<span class=\"required\">*</span></label>\r\n                                <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"Disability\" #Disability=\"ngModel\" [searchable]=\"false\" [clearable]=\"false\" (change)=\"onchangedisab($event)\"\r\n                                    [(ngModel)]=\"campusCandidate.Disability\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && Disability.invalid) || (Disability.touched && Disability.invalid)\">\r\n                                    <span *ngIf=\"Disability.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"form-group\">\r\n                                <label>Disability Details</label>\r\n                                <textarea [(readOnly)]=\"readdisability\" class=\"form-control\" placeholder=\"Enter details\" name=\"DisabilityDetails\"\r\n                                    #DisabilityDetails=\"ngModel\"\r\n                                    [(ngModel)]=\"campusCandidate.DisabilityDetails\"></textarea>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Health Issues<span class=\"required\">*</span></label>\r\n                                <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"HealthIssue\" #HealthIssue=\"ngModel\" [searchable]=\"false\" [clearable]=\"false\" (change)=\"onchangehealth($event)\"\r\n                                    [(ngModel)]=\"campusCandidate.HealthIssue\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && HealthIssue.invalid) || (HealthIssue.touched && HealthIssue.invalid)\">\r\n                                    <span *ngIf=\"HealthIssue.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-10\">\r\n                            <div class=\"form-group\">\r\n                                <label>Health Issue Details</label>\r\n                                <textarea [(readOnly)]=\"readhealth\" class=\"form-control\" placeholder=\"Enter details\"\r\n                                    [(ngModel)]=\"campusCandidate.HealthIssueDetails\" name=\"HealthIssueDetails\"\r\n                                    #HealthIssueDetails=\"ngModel\"></textarea>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>How many siblings you have?<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"If NA type 0\" (keypress)=\"numberOnly($event)\"\r\n                                    [(ngModel)]=\"campusCandidate.NoofSiblings\" name=\"NoofSiblings\"\r\n                                    #NoofSiblings=\"ngModel\" required>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && NoofSiblings.invalid) || (NoofSiblings.touched && NoofSiblings.invalid)\">\r\n                                    <span *ngIf=\"NoofSiblings.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <h6 class=\"text-uppercase\">Academic Details</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Highest Qualification <span class=\"required\">*</span>(Choose the relevant qualification, if you are currently pursuing final year *Under Graduation* we will consider your highest qualification as    *Under Graduation*)</label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"HighestQualification\" #HighestQualification=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.HighestQualification\" required\r\n                                    (ngModelChange)=\"changeQualification($event)\">\r\n                                    <!-- <ng-option [value]=\"-1\">10th Standard</ng-option>\r\n                                    <ng-option [value]=\"1\">12th Standard</ng-option> -->\r\n                                    <ng-option [value]=\"5\">Diploma</ng-option>\r\n                                    <ng-option [value]=\"2\">Under Graduation</ng-option>\r\n                                    <!-- <ng-option [value]=\"4\">Professional Degree</ng-option> -->\r\n                                    <ng-option [value]=\"3\">Post Graduation</ng-option>\r\n                                    <ng-option [value]=\"6\">Post Graduate Diploma</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && HighestQualification.invalid) || (HighestQualification.touched && HighestQualification.invalid)\">\r\n                                    <span *ngIf=\"HighestQualification.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div id=\"accordion\" class=\"myaccordion\">\r\n                        <div class=\"card\" *ngIf=\"showTen\">\r\n                            <div class=\"card-header\" id=\"headingOne\">\r\n                                <h2>\r\n                                    <!-- // By Sayandeep on 05-08-2023 -->\r\n                                    <!-- <button\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseOne\">\r\n                                        10 STD / High School\r\n                                        <span>\r\n                                            <i class=\"fa fa-minus\"></i>\r\n                                        </span>\r\n                                    </button> -->\r\n                                    <!-- // By Sayandeep on 05-08-2023 -->\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseOne\">\r\n                                        10 STD / High School\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseOne\" class=\"collapse show\" aria-labelledby=\"headingOne\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TenCourseStatus\" #TenCourseStatus=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TenCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TenCourses\" #TenCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TenCourses\">\r\n                                                    <ng-option [value]=\"rec.courseId\" *ngFor=\"let rec of tenCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                       \r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TenYearOfPassing\"\r\n                                                    #TenYearOfPassing=\"ngModel\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TenYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\" name=\"TenMarks\"\r\n                                                    #TenMarks=\"ngModel\" [(ngModel)]=\"campusCandidate.TenMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chck()\" required>\r\n                                                <p class=\"error-msg\"\r\n                                                    *ngIf=\"(f.submitted && TenMarks.invalid) || (TenMarks.touched && TenMarks.invalid)\">\r\n                                                    <span *ngIf=\"TenMarks.errors.required\">Required</span>\r\n                                                    \r\n                                                </p>\r\n                                                <p class=\"error-msg\" *ngIf=\"(TenMarks.touched && TenMarks.valid)\">\r\n                                                    <span *ngIf=\"markten\">Enter between 30% to 100%</span>\r\n                                                </p>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showTwelve\">\r\n                            <div class=\"card-header\" id=\"headingTwo\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseTwo\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseTwo\">\r\n                                        12 STD(+2) / Higher Secondary\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseTwo\" class=\"collapse\" aria-labelledby=\"headingTwo\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TwelveCourseStatus\"\r\n                                                    #TwelveCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangecourse($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"TwelveCourses\" #TwelveCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\" [disabled]=\"disablecourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveCourses\">\r\n                                                    <ng-option [value]=\"rec.courseId\"\r\n                                                        *ngFor=\"let rec of twelveCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [disabled]=\"disableyear\" [placeholder]=\"'Select'\"\r\n                                                    [appendTo]=\"'body'\" [multiple]=\"false\" name=\"TwelveYearOfPassing\"\r\n                                                    #TwelveYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"TwelveMarks\" #TwelveMarks=\"ngModel\" [disabled]=\"disablemarks\"\r\n                                                    [(ngModel)]=\"campusCandidate.TwelveMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chcktwelve()\" required>\r\n                                                <p class=\"error-msg\"\r\n                                                    *ngIf=\"(f.submitted && TwelveMarks.invalid) || (TwelveMarks.touched && TwelveMarks.invalid)\">\r\n                                                    <span *ngIf=\"TwelveMarks.errors.required\">Required</span>\r\n                                                    \r\n                                                </p>\r\n                                                <p class=\"error-msg\" *ngIf=\"(TwelveMarks.touched && TwelveMarks.valid)\">\r\n                                                    <span *ngIf=\"marktwelve\">Enter between 30% to 100%</span>\r\n                                                </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showDiploma\">\r\n                            <div class=\"card-header\" id=\"headingThree\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseThree\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseThree\">\r\n                                        Diploma / Equivalent Diploma\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseThree\" class=\"collapse\" aria-labelledby=\"headingThree\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaCourseStatus\"\r\n                                                    #DiplomaCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangediploma($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaCourses\" #DiplomaCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablediplomacourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaCourses\"\r\n                                                    (ngModelChange)=\"getAllDiplomaStream($event)\">\r\n                                                    <ng-option [value]=\"rec.courseId\"\r\n                                                        *ngFor=\"let rec of diplomaCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaStreams\" #DiplomaStreams=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablediplomaspecial\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaStreams\">\r\n                                                    <ng-option [value]=\"rec.streamId\"\r\n                                                        *ngFor=\"let rec of diplomaStreamList\">\r\n                                                        {{rec.streamName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaUniversity\"\r\n                                                    #DiplomaUniversity=\"ngModel\" [searchable]=\"true\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangediplomainstitute($event)\" [disabled]=\"disablediplomainstitute\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaUniversity\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hidediplomainstitutename\" >\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [disabled]=\"disablediplomainstitutename\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaInstituteName\"\r\n                                                    name=\"DiplomaInstituteName\" #DiplomaInstituteName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablediplomainstitutelocation\"\r\n                                                    name=\"DiplomaInstituteLocation\" #DiplomaInstituteLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaInstituteLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DiplomaYearOfPassing\"\r\n                                                    #DiplomaYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablediplomayear\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"DiplomaMarks\" #DiplomaMarks=\"ngModel\"\r\n                                                    [disabled]=\"disablediplomamarks\"\r\n                                                    [(ngModel)]=\"campusCandidate.DiplomaMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckdiploma()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && DiplomaMarks.invalid) || (DiplomaMarks.touched && DiplomaMarks.invalid)\">\r\n                                                        <span *ngIf=\"DiplomaMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(DiplomaMarks.touched && DiplomaMarks.valid)\">\r\n                                                        <span *ngIf=\"markdiploma\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showDegree\">\r\n                            <div class=\"card-header\" id=\"headingFour\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseFour\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseFour\">\r\n                                        Under Graduation\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseFour\" class=\"collapse\" aria-labelledby=\"headingFour\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeCourseStatus\"\r\n                                                    #DegreeCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangegraduation($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeCourses\" #DegreeCourses=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablegradcourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeCourses\"\r\n                                                    (ngModelChange)=\"getAllDegreeStream($event)\">\r\n                                                    <ng-option [value]=\"{ courseId: rec.courseId, qualificationId: rec.qualificationId }\"\r\n                                                        *ngFor=\"let rec of degreeCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeStreams\" #DegreeStreams=\"ngModel\"\r\n                                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablegradspecial\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeStreams\">\r\n                                                    <ng-option [value]=\"rec.streamId\"\r\n                                                        *ngFor=\"let rec of degreeStreamList\">\r\n                                                        {{rec.streamName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeUniversity\"\r\n                                                    #DegreeUniversity=\"ngModel\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                                    (change)=\"onchangeunderinstitute($event)\" [disabled]=\"disablegradinstitute\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeUniversity\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hideunderinstitute\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [disabled]=\"disablegradinstitutename\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeInstituteName\"\r\n                                                    name=\"DegreeInstituteName\" #DegreeInstituteName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    [disabled]=\"disablegradinstitutelocation\"\r\n                                                    name=\"DegreeInstituteLocation\" #DegreeInstituteLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeInstituteLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"DegreeYearOfPassing\"\r\n                                                    #DegreeYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablegradyear\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"DegreeMarks\" #DegreeMarks=\"ngModel\"\r\n                                                    [disabled]=\"disablegradmarks\"\r\n                                                    [(ngModel)]=\"campusCandidate.DegreeMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckundergrad()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && DegreeMarks.invalid) || (DegreeMarks.touched && DegreeMarks.invalid)\">\r\n                                                        <span *ngIf=\"DegreeMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(DegreeMarks.touched && DegreeMarks.valid)\">\r\n                                                        <span *ngIf=\"markundergrad\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showPG\">\r\n                            <div class=\"card-header\" id=\"headingFive\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseFive\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseFive\">\r\n                                        Post Graduation / PG Diploma\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseFive\" class=\"collapse\" aria-labelledby=\"headingFive\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeCourseStatus\"\r\n                                                    #PostDegreeCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangepg($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <ng-option [value]=\"3\">NA</ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeCourses\"\r\n                                                    #PostDegreeCourses=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablepgcourse\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeCourses\"\r\n                                                    (ngModelChange)=\"getAllPostDegreeStream($event)\">\r\n                                                    <ng-option [value]=\"{ courseId: rec.courseId, qualificationId: rec.qualificationId }\"\r\n                                                        *ngFor=\"let rec of postDegreeCourseList\">\r\n                                                        {{rec.courseName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeStreams\"\r\n                                                    #PostDegreeStreams=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablepgspecial\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeStreams\">\r\n                                                    <ng-option [value]=\"rec.streamId\"\r\n                                                        *ngFor=\"let rec of postDegreeStreamList\">\r\n                                                        {{rec.streamName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeUniversity\"\r\n                                                    #PostDegreeUniversity=\"ngModel\" [searchable]=\"true\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangepginstitute($event)\" [disabled]=\"disablepginstitute\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeUniversity\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hidepginstitute\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [disabled]=\"disablepginstitutename\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeInstituteName\"\r\n                                                    name=\"PostDegreeInstituteName\" #PostDegreeInstituteName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    name=\"PostDegreeInstituteLocation\"\r\n                                                    [disabled]=\"disablepginstitutelocation\"\r\n                                                    #PostDegreeInstituteLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeInstituteLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"PostDegreeYearOfPassing\"\r\n                                                    #PostDegreeYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\" [disabled]=\"disablepgyear\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"PostDegreeMarks\" #PostDegreeMarks=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.PostDegreeMarks\"\r\n                                                    [disabled]=\"disablepgmarks\" appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckpostgrad()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && PostDegreeMarks.invalid) || (PostDegreeMarks.touched && PostDegreeMarks.invalid)\">\r\n                                                        <span *ngIf=\"PostDegreeMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(PostDegreeMarks.touched && PostDegreeMarks.valid)\">\r\n                                                        <span *ngIf=\"markpostgrad\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"card\" *ngIf=\"showAnyOther\">\r\n                            <div class=\"card-header\" id=\"headingSix\">\r\n                                <h2>\r\n                                    <a href=\"javascript:void(0)\"\r\n                                        class=\"header-btn d-flex align-items-center justify-content-between btn btn-link collapsed\"\r\n                                        data-toggle=\"collapse\" data-target=\"#collapseSix\" aria-expanded=\"false\"\r\n                                        aria-controls=\"collapseSix\">\r\n                                        Any Other Qualification (optional)\r\n                                        <span>\r\n                                            <i class=\"fa fa-plus\"></i>\r\n                                        </span>\r\n                                    </a>\r\n                                </h2>\r\n                            </div>\r\n                            <div id=\"collapseSix\" class=\"collapse\" aria-labelledby=\"headingSix\"\r\n                                data-parent=\"#accordion\">\r\n                                <div class=\"card-body\">\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Qualification<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"\"\r\n                                                    name=\"AnyOtherQualification\" #AnyOtherQualification=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualification\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"\"\r\n                                                    name=\"AnyOtherQualificationCourse\"\r\n                                                    #AnyOtherQualificationCourse=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationCourse\">\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Course Status<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"AnyOtherQualificationCourseStatus\"\r\n                                                    #AnyOtherQualificationCourseStatus=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationCourseStatus\">\r\n                                                    <ng-option [value]=\"1\">Pursuing</ng-option>\r\n                                                    <ng-option [value]=\"2\">Completed</ng-option>\r\n                                                    <!-- <ng-option [value]=\"3\">NA</ng-option> -->\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Specialization / Stream<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"\"\r\n                                                    name=\"AnyOtherQualificationStream\"\r\n                                                    #AnyOtherQualificationStream=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationStream\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-6\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institution <span class=\"grey\">(If name is not in the list then\r\n                                                        choose “Other” and write the correct name)</span><span\r\n                                                        class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"AnyOtherQualificationInstitite\"\r\n                                                    #AnyOtherQualificationInstitite=\"ngModel\" [searchable]=\"true\"\r\n                                                    [clearable]=\"false\" (change)=\"onchangeanyotherinstituteinstitute($event)\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationInstitite\">\r\n                                                    <ng-option [value]=\"rec.qulificationUniversityBoardId\"\r\n                                                        *ngFor=\"let rec of academicUniversity\">\r\n                                                        {{rec.qulificationUniversityBoardName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-6\" [hidden]=\"hideanyotherinstitute\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Name<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"Enter name\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationInstititeName\"\r\n                                                    name=\"AnyOtherQualificationInstititeName\"\r\n                                                    #AnyOtherQualificationInstititeName=\"ngModel\">\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"row\">\r\n                                        <div class=\"col-md-3\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Institute Location<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                    name=\"AnyOtherQualificationInstititeLocation\"\r\n                                                    #AnyOtherQualificationInstititeLocation=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationInstititeLocation\">\r\n                                                    <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of states\">\r\n                                                        {{rec.stateName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Year of Passing<span class=\"required\">*</span></label>\r\n                                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                                    [multiple]=\"false\" name=\"AnyOtherQualificationYearOfPassing\"\r\n                                                    #AnyOtherQualificationYearOfPassing=\"ngModel\" [searchable]=\"false\"\r\n                                                    [clearable]=\"false\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationYearOfPassing\">\r\n                                                    <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                                        {{rec.yearsName}}\r\n                                                    </ng-option>\r\n                                                </ng-select>\r\n                                            </div>\r\n                                        </div>\r\n                                        <div class=\"col-md-2\">\r\n                                            <div class=\"form-group\">\r\n                                                <label>Mark (%)<span class=\"required\">*</span></label>\r\n                                                <input type=\"text\" class=\"form-control\" placeholder=\"CGPA to be conv %\"\r\n                                                    name=\"AnyOtherQualificationMarks\"\r\n                                                    #AnyOtherQualificationMarks=\"ngModel\"\r\n                                                    [(ngModel)]=\"campusCandidate.AnyOtherQualificationMarks\"\r\n                                                    appTwoDigitDecimaNumberLessThan100 (keypress)=\"numberOnlymarks($event)\" (keyup)=\"chckanyothr()\" required>\r\n                                                    <p class=\"error-msg\"\r\n                                                        *ngIf=\"(f.submitted && AnyOtherQualificationMarks.invalid) || (AnyOtherQualificationMarks.touched && AnyOtherQualificationMarks.invalid)\">\r\n                                                        <span *ngIf=\"AnyOtherQualificationMarks.errors.required\">Required</span>\r\n                                                        \r\n                                                    </p>\r\n                                                    <p class=\"error-msg\" *ngIf=\"(AnyOtherQualificationMarks.touched && AnyOtherQualificationMarks.valid)\">\r\n                                                        <span *ngIf=\"markanyothr\">Enter between 30% to 100%</span>\r\n                                                    </p>   \r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <h6 class=\"text-uppercase\">Other Details</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Willing for 3 year commitment<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"YearsCommitments\" #YearsCommitments=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.YearsCommitments\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && YearsCommitments.invalid) || (YearsCommitments.touched && YearsCommitments.invalid)\">\r\n                                    <span *ngIf=\"YearsCommitments.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Willing to work anywhere in India<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"AnyWhereinIndia\" #AnyWhereinIndia=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.AnyWhereinIndia\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && AnyWhereinIndia.invalid) || (AnyWhereinIndia.touched && AnyWhereinIndia.invalid)\">\r\n                                    <span *ngIf=\"AnyWhereinIndia.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <label>Do you have any Active Arrears/Backlogs (Highest Qualification)?<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"ActiveArrears\" #ActiveArrears=\"ngModel\"\r\n                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                    [(ngModel)]=\"campusCandidate.ActiveArrears\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && ActiveArrears.invalid) || (ActiveArrears.touched && ActiveArrears.invalid)\">\r\n                                    <span *ngIf=\"ActiveArrears.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Most Preferred Benefit<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"MostPreferdBenifit\" #MostPreferdBenifit=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.MostPreferdBenifit\" required>\r\n                                    <ng-option [value]=\"1\">Subsidized Canteen</ng-option>\r\n                                    <ng-option [value]=\"2\">Travelling Facility</ng-option>\r\n                                    <ng-option [value]=\"3\">Accommodation Facility</ng-option>\r\n                                    <ng-option [value]=\"4\">Regulated Working Hours & 5 Day Week</ng-option>\r\n                                    <ng-option [value]=\"5\">Work From Home Facility</ng-option>\r\n                                    <ng-option [value]=\"6\">Others</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && MostPreferdBenifit.invalid) || (MostPreferdBenifit.touched && MostPreferdBenifit.invalid)\">\r\n                                    <span *ngIf=\"MostPreferdBenifit.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Extra Curricular Activities<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"true\"\r\n                                    name=\"ExtraCurricularActivities\" #ExtraCurricularActivities=\"ngModel\"\r\n                                    [searchable]=\"false\" [clearable]=\"false\"\r\n                                    [(ngModel)]=\"campusCandidate.ExtraCurricularActivities\" required>\r\n                                    <ng-option [value]=\"rec.id\" *ngFor=\"let rec of extracuricullar\">\r\n                                        {{rec.name}}\r\n                                    </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && ExtraCurricularActivities.invalid) || (ExtraCurricularActivities.touched && ExtraCurricularActivities.invalid)\">\r\n                                    <span *ngIf=\"ExtraCurricularActivities.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Job Type Priority<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"JobTypePriority\" #JobTypePriority=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.JobTypePriority\" required>\r\n                                    <ng-option [value]=\"1\">Core Manufacturing</ng-option>\r\n                                    <ng-option [value]=\"2\">IT Job</ng-option>\r\n                                    <ng-option [value]=\"3\">Other</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && JobTypePriority.invalid) || (JobTypePriority.touched && JobTypePriority.invalid)\">\r\n                                    <span *ngIf=\"JobTypePriority.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Critical factor which influence Job decision<span\r\n                                        class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"CriticalFactor\" #CriticalFactor=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.CriticalFactor\" required>\r\n                                    <ng-option [value]=\"1\">Job Profile </ng-option>\r\n                                    <ng-option [value]=\"2\">Job Security </ng-option>\r\n                                    <ng-option [value]=\"3\">Career Growth </ng-option>\r\n                                    <ng-option [value]=\"4\">Learning Opportunities </ng-option>\r\n                                    <ng-option [value]=\"5\">Salary & Other benifits </ng-option>\r\n                                    <ng-option [value]=\"6\">Other </ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && CriticalFactor.invalid) || (CriticalFactor.touched && CriticalFactor.invalid)\">\r\n                                    <span *ngIf=\"CriticalFactor.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        \r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <div class=\"form-group\">\r\n                                <label>Willing to work in rotational shift including Night Shift (only plants) &\r\n                                    stretched\r\n                                    working hours<span class=\"required\">*</span></label>\r\n                                <ng-select class=\"\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                    name=\"WorkinginShift\" #WorkinginShift=\"ngModel\" [searchable]=\"false\"\r\n                                    [clearable]=\"false\" [(ngModel)]=\"campusCandidate.WorkinginShift\" required>\r\n                                    <ng-option [value]=\"1\">Yes</ng-option>\r\n                                    <ng-option [value]=\"0\">No</ng-option>\r\n                                </ng-select>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"(f.submitted && WorkinginShift.invalid) || (WorkinginShift.touched && WorkinginShift.invalid)\">\r\n                                    <span *ngIf=\"WorkinginShift.errors.required\">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <label for=\"\">Upload Resume (Max size 500KB) <span class=\"required\">*</span></label>\r\n                            <div class=\"custom-file\">\r\n                                <!-- <input type=\"file\" class=\"custom-file-input\" id=\"customFile\">\r\n                                <label class=\"custom-file-label\" for=\"customFile\"></label> -->\r\n                                <input type=\"file\" class=\"custom-file-input\" id=\"customFile\" accept=\"application/pdf\"\r\n                                    (change)=\"onFileChange($event.target.files)\">\r\n                                <label class=\"custom-file-label\" for=\"customFile\" #candidateResumeImport>Choose\r\n                                    file</label>\r\n                                <p class=\"error-msg msgfile\" style=\"display: none;\">\r\n                                    <span>Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div><br>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-10\">\r\n                          <div class=\"form-group\">\r\n                            <label>\r\n                              <input type=\"checkbox\" (change)=\"checkValue($event)\" />&nbsp;&nbsp;\r\n                              I have read and understood the Job Profiles and other Eligibility Criteria\r\n                              with respect to the MRF Campus Selection Process. I hereby declare that\r\n                              the particulars, including my personal identity details as given in this\r\n                              registration form, are true and with my sole consent. I know that any false\r\n                              information contained in this registration form shall automatically rescind\r\n                              the contract of employment if selected or discontinued during the course of\r\n                              your selection.\r\n                            </label>\r\n                          </div>\r\n                        </div>\r\n                      </div>                      \r\n                    \r\n                </div>\r\n               \r\n                <div class=\"mt-4 clearfix\">\r\n                    <!-- <button type=\"submit\" class=\"btn btn-secondary\"><i class=\"las la-angle-left\"></i> Back</button> -->\r\n                    <button type=\"submit\" class=\"btn btn-primary ml-1\">Submit</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n<ngx-spinner bdColor=\"rgba(51,51,51,0.8)\" size=\"medium\" color=\"#fff\" type=\"ball-scale-multiple\">\r\n    <p style=\"font-size: 20px; color: white\">Loading...</p>\r\n</ngx-spinner>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/windowlayout/windowlayout.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/windowlayout/windowlayout.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLayoutsWindowlayoutWindowlayoutComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<router-outlet></router-outlet>\r\n";
    /***/
  },

  /***/
  "./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.css":
  /*!*************************************************************************************************************!*\
    !*** ./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.css ***!
    \*************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppApplicationModuleCampusInterviewAcknowlwdgementInterviewAcknowlwdgementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');\r\nbody {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: 400;\r\n    font-size: 14px;\r\n\r\n}\r\n.acknowledge_container {\r\n    background-color: #fff;\r\n    border-radius: 0.25rem;\r\n    box-shadow: 0px 0.125rem 0.25rem rgb(126 142 177 / 18%);\r\n    -webkit-box-shadow: 0px 0.125rem 0.25rem rgb(126 142 177 / 18%);\r\n    width: 100%;\r\n    margin-top: 30px;\r\n    -webkit-transition: 0.3s;\r\n    transition: 0.3s;\r\n}\r\n.acknowledge_container .logo-area {\r\n    background-color: #ed1c24;\r\n    font-size: 26px;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    text-transform: uppercase;\r\n    padding: 12px 0;\r\n    border-top-left-radius: 0.25rem;\r\n    border-top-right-radius: 0.25rem;\r\n}\r\n.acknowledge_container .content-area {\r\n    padding: 20px 40px;\r\n}\r\n.acknowledge_container .content-area .wrapper {\r\n    display: -webkit-box;\r\n    display: flex;\r\n    background: #fff;\r\n    height: 100px;\r\n    width: 264px;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: space-evenly;\r\n            justify-content: space-evenly;\r\n    border-radius: 5px;\r\n    padding: 20px 0;\r\n    margin: 0 auto;\r\n}\r\n.acknowledge_container .content-area .wrapper .option {\r\n    background: #fff;\r\n    height: 100%;\r\n    width: 100%;\r\n    display: -webkit-box;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: space-evenly;\r\n            justify-content: space-evenly;\r\n    margin: 0 10px;\r\n    font-size: 16px;\r\n    font-weight: 500;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    padding: 0 10px;\r\n    border: 2px solid #b9b9b9;\r\n    -webkit-transition: all 0.3s ease;\r\n    transition: all 0.3s ease;\r\n}\r\n.acknowledge_container .content-area .wrapper .option .dot {\r\n    height: 20px;\r\n    width: 20px;\r\n    background: #b9b9b9;\r\n    border-radius: 50%;\r\n    position: relative;\r\n}\r\n.acknowledge_container .content-area .wrapper .option .dot::before {\r\n    position: absolute;\r\n    content: \"\";\r\n    top: 4px;\r\n    left: 4px;\r\n    width: 12px;\r\n    height: 12px;\r\n    background: #388e3c;\r\n    border-radius: 50%;\r\n    opacity: 0;\r\n    -webkit-transform: scale(1.5);\r\n            transform: scale(1.5);\r\n    -webkit-transition: all 0.3s ease;\r\n    transition: all 0.3s ease;\r\n}\r\n.acknowledge_container .content-area .wrapper .option.option-2 .dot::before {\r\n    background: #ed1c24;\r\n}\r\n.acknowledge_container .content-area .wrapper input[type=\"radio\"] {\r\n    display: none;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 {\r\n    border-color: #388e3c;\r\n    background: #388e3c;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 {\r\n    border-color: #ed1c24;\r\n    background: #ed1c24;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 .dot,\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 .dot {\r\n    background: #fff;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 .dot::before,\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 .dot::before {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n}\r\n.acknowledge_container .content-area .wrapper .wrapper .option span {\r\n    font-size: 20px;\r\n    color: #808080;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 span,\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 span {\r\n    color: #fff;\r\n}\r\n.acknowledge_container .content-area .form-control {\r\n    font-size: 14px;\r\n    padding: 10px;\r\n}\r\n.acknowledge_container .content-area .btn-black {\r\n    font-size: 14px;\r\n    background-color: #414141;\r\n    color: #fff;\r\n    border: none;\r\n    padding: 10px 40px;\r\n    border-radius: 3px;\r\n    width: 180px;\r\n    -webkit-transition: ease all 0.3s;\r\n    transition: ease all 0.3s;\r\n}\r\n.acknowledge_container .content-area .btn-black:hover,\r\n.acknowledge_container .content-area .btn-black:focus,\r\n.acknowledge_container .content-area .btn-black:visited {\r\n    background-color: #212121;\r\n    color: #fff;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwbGljYXRpb24tbW9kdWxlL2NhbXB1cy9pbnRlcnZpZXctYWNrbm93bHdkZ2VtZW50L2ludGVydmlldy1hY2tub3dsd2RnZW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvR0FBb0c7QUFDcEc7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLGlDQUFpQztJQUNqQyxnQkFBZ0I7SUFDaEIsZUFBZTs7QUFFbkI7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QixzQkFBc0I7SUFDdEIsdURBQXVEO0lBQ3ZELCtEQUErRDtJQUMvRCxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLHdCQUFnQjtJQUFoQixnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsZUFBZTtJQUNmLCtCQUErQjtJQUMvQixnQ0FBZ0M7QUFDcEM7QUFDQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixZQUFZO0lBQ1oseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQiw4QkFBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsY0FBYztBQUNsQjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixXQUFXO0lBQ1gsb0JBQWE7SUFBYixhQUFhO0lBQ2IseUJBQW1CO1lBQW5CLG1CQUFtQjtJQUNuQiw4QkFBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixpQ0FBeUI7SUFBekIseUJBQXlCO0FBQzdCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFFBQVE7SUFDUixTQUFTO0lBQ1QsV0FBVztJQUNYLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDViw2QkFBcUI7WUFBckIscUJBQXFCO0lBQ3JCLGlDQUF5QjtJQUF6Qix5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksYUFBYTtBQUNqQjtBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLG1CQUFtQjtBQUN2QjtBQUNBOztJQUVJLGdCQUFnQjtBQUNwQjtBQUNBOztJQUVJLFVBQVU7SUFDViwyQkFBbUI7WUFBbkIsbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjtBQUNBOztJQUVJLFdBQVc7QUFDZjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7QUFDakI7QUFDQTtJQUNJLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixpQ0FBeUI7SUFBekIseUJBQXlCO0FBQzdCO0FBRUE7OztJQUdJLHlCQUF5QjtJQUN6QixXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9hcHBsaWNhdGlvbi1tb2R1bGUvY2FtcHVzL2ludGVydmlldy1hY2tub3dsd2RnZW1lbnQvaW50ZXJ2aWV3LWFja25vd2x3ZGdlbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRAMTAwOzMwMDs0MDA7NTAwOzcwMCZkaXNwbGF5PXN3YXAnKTtcclxuYm9keSB7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuXHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwLjEyNXJlbSAwLjI1cmVtIHJnYigxMjYgMTQyIDE3NyAvIDE4JSk7XHJcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAwLjEyNXJlbSAwLjI1cmVtIHJnYigxMjYgMTQyIDE3NyAvIDE4JSk7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjNzO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmxvZ28tYXJlYSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWQxYzI0O1xyXG4gICAgZm9udC1zaXplOiAyNnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgcGFkZGluZzogMTJweCAwO1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMC4yNXJlbTtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwLjI1cmVtO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSB7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDQwcHg7XHJcbn1cclxuXHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgICB3aWR0aDogMjY0cHg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgLm9wdGlvbiB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgbWFyZ2luOiAwIDEwcHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgcGFkZGluZzogMCAxMHB4O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2I5YjliOTtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyIC5vcHRpb24gLmRvdCB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICAgIGJhY2tncm91bmQ6ICNiOWI5Yjk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyIC5vcHRpb24gLmRvdDo6YmVmb3JlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICB0b3A6IDRweDtcclxuICAgIGxlZnQ6IDRweDtcclxuICAgIHdpZHRoOiAxMnB4O1xyXG4gICAgaGVpZ2h0OiAxMnB4O1xyXG4gICAgYmFja2dyb3VuZDogIzM4OGUzYztcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNSk7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAub3B0aW9uLm9wdGlvbi0yIC5kb3Q6OmJlZm9yZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZWQxYzI0O1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciBpbnB1dFt0eXBlPVwicmFkaW9cIl0ge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgI29wdGlvbi0xOmNoZWNrZWQ6Y2hlY2tlZCB+IC5vcHRpb24tMSB7XHJcbiAgICBib3JkZXItY29sb3I6ICMzODhlM2M7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzg4ZTNjO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTI6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0yIHtcclxuICAgIGJvcmRlci1jb2xvcjogI2VkMWMyNDtcclxuICAgIGJhY2tncm91bmQ6ICNlZDFjMjQ7XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyICNvcHRpb24tMTpjaGVja2VkOmNoZWNrZWQgfiAub3B0aW9uLTEgLmRvdCxcclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyICNvcHRpb24tMjpjaGVja2VkOmNoZWNrZWQgfiAub3B0aW9uLTIgLmRvdCB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTE6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0xIC5kb3Q6OmJlZm9yZSxcclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyICNvcHRpb24tMjpjaGVja2VkOmNoZWNrZWQgfiAub3B0aW9uLTIgLmRvdDo6YmVmb3JlIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAud3JhcHBlciAub3B0aW9uIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6ICM4MDgwODA7XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyICNvcHRpb24tMTpjaGVja2VkOmNoZWNrZWQgfiAub3B0aW9uLTEgc3BhbixcclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyICNvcHRpb24tMjpjaGVja2VkOmNoZWNrZWQgfiAub3B0aW9uLTIgc3BhbiB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLmZvcm0tY29udHJvbCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAuYnRuLWJsYWNrIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0MTQxNDE7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIHBhZGRpbmc6IDEwcHggNDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIHdpZHRoOiAxODBweDtcclxuICAgIHRyYW5zaXRpb246IGVhc2UgYWxsIDAuM3M7XHJcbn1cclxuXHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAuYnRuLWJsYWNrOmhvdmVyLFxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLmJ0bi1ibGFjazpmb2N1cyxcclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC5idG4tYmxhY2s6dmlzaXRlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyMTIxO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuIl19 */";
    /***/
  },

  /***/
  "./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.ts":
  /*!************************************************************************************************************!*\
    !*** ./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.ts ***!
    \************************************************************************************************************/

  /*! exports provided: InterviewAcknowlwdgementComponent */

  /***/
  function srcAppApplicationModuleCampusInterviewAcknowlwdgementInterviewAcknowlwdgementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "InterviewAcknowlwdgementComponent", function () {
      return InterviewAcknowlwdgementComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/campus/campusrequisition/campusrequisition.service */
    "./src/app/services/campus/campusrequisition/campusrequisition.service.ts");
    /* harmony import */


    var src_app_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");

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

    var InterviewAcknowlwdgementComponent =
    /*#__PURE__*/
    function () {
      function InterviewAcknowlwdgementComponent(_activeRoute, _route, campusRequisitionService, notificationService) {
        _classCallCheck(this, InterviewAcknowlwdgementComponent);

        this._activeRoute = _activeRoute;
        this._route = _route;
        this.campusRequisitionService = campusRequisitionService;
        this.notificationService = notificationService;
        this.isRemarksVisible = false;
        this.candidateId = this._activeRoute.snapshot.queryParamMap.get('CandiateId');
      }

      _createClass(InterviewAcknowlwdgementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.isRemarksVisible = false;
        }
      }, {
        key: "onClickStatusChangeYes",
        value: function onClickStatusChangeYes() {
          var _this = this;

          var formdata = {
            CandidateId: Number(this.candidateId),
            HiringStatusId: 17,
            Remarks: ""
          };
          this.campusRequisitionService.updateCandidateAcknowledged(formdata).subscribe(function (result) {
            if (result) {
              if (result.successFlag == 0) {
                _this.notificationService.showError(result.msg, "Error");
              } else {
                _this.notificationService.showSuccess(result.msg, "Success");
              }
            } else {}
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "onClickStatusChangeNo",
        value: function onClickStatusChangeNo() {
          var _this2 = this;

          var formdata = {
            CandidateId: Number(this.candidateId),
            HiringStatusId: 18,
            Remarks: this.remarks
          };
          this.campusRequisitionService.updateCandidateAcknowledged(formdata).subscribe(function (result) {
            if (result) {
              if (result.successFlag == 0) {
                _this2.notificationService.showError(result.msg, "Error");
              } else {
                _this2.notificationService.showSuccess(result.msg, "Success");
              }
            } else {}
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "onClickRadioBtn",
        value: function onClickRadioBtn(value) {
          if (value == 1) {
            this.isRemarksVisible = false;
            this.radioButtonValue = value;
            this.remarks = "";
          }

          if (value == 2) {
            this.radioButtonValue = value;
            this.isRemarksVisible = true;
            this.remarks = "";
          }
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var flag = 0;

          if (this.radioButtonValue == 1) {
            this.onClickStatusChangeYes();
          }

          if (this.radioButtonValue == 2) {
            if (this.remarks == undefined || this.remarks == null || this.remarks.length == 0) {
              this.notificationService.showError("Please fill the Reason", "Error");
              flag = 0;
            }

            if (this.remarks.length > 0) {
              flag = 1;
            }
          }

          if (flag == 1) {
            this.onClickStatusChangeNo();
          }
        }
      }]);

      return InterviewAcknowlwdgementComponent;
    }();

    InterviewAcknowlwdgementComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_2__["CampusrequisitionService"]
      }, {
        type: src_app_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]
      }];
    };

    InterviewAcknowlwdgementComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-interview-acknowlwdgement',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./interview-acknowlwdgement.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./interview-acknowlwdgement.component.css */
      "./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.css")).default]
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_2__["CampusrequisitionService"], src_app_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])], InterviewAcknowlwdgementComponent);
    /***/
  },

  /***/
  "./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.css":
  /*!***************************************************************************************************!*\
    !*** ./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.css ***!
    \***************************************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppApplicationModuleCampusTestAcknowledgementTestAcknowledgementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');\r\nbody {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: 400;\r\n    font-size: 14px;\r\n\r\n}\r\n.acknowledge_container {\r\n    background-color: #fff;\r\n    border-radius: 0.25rem;\r\n    box-shadow: 0px 0.125rem 0.25rem rgb(126 142 177 / 18%);\r\n    -webkit-box-shadow: 0px 0.125rem 0.25rem rgb(126 142 177 / 18%);\r\n    width: 100%;\r\n    margin-top: 30px;\r\n    -webkit-transition: 0.3s;\r\n    transition: 0.3s;\r\n}\r\n.acknowledge_container .logo-area {\r\n    background-color: #ed1c24;\r\n    font-size: 26px;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    text-transform: uppercase;\r\n    padding: 12px 0;\r\n    border-top-left-radius: 0.25rem;\r\n    border-top-right-radius: 0.25rem;\r\n}\r\n.acknowledge_container .content-area {\r\n    padding: 20px 40px;\r\n}\r\n.acknowledge_container .content-area .wrapper {\r\n    display: -webkit-box;\r\n    display: flex;\r\n    background: #fff;\r\n    height: 100px;\r\n    width: 264px;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: space-evenly;\r\n            justify-content: space-evenly;\r\n    border-radius: 5px;\r\n    padding: 20px 0;\r\n    margin: 0 auto;\r\n}\r\n.acknowledge_container .content-area .wrapper .option {\r\n    background: #fff;\r\n    height: 100%;\r\n    width: 100%;\r\n    display: -webkit-box;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: space-evenly;\r\n            justify-content: space-evenly;\r\n    margin: 0 10px;\r\n    font-size: 16px;\r\n    font-weight: 500;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    padding: 0 10px;\r\n    border: 2px solid #b9b9b9;\r\n    -webkit-transition: all 0.3s ease;\r\n    transition: all 0.3s ease;\r\n}\r\n.acknowledge_container .content-area .wrapper .option .dot {\r\n    height: 20px;\r\n    width: 20px;\r\n    background: #b9b9b9;\r\n    border-radius: 50%;\r\n    position: relative;\r\n}\r\n.acknowledge_container .content-area .wrapper .option .dot::before {\r\n    position: absolute;\r\n    content: \"\";\r\n    top: 4px;\r\n    left: 4px;\r\n    width: 12px;\r\n    height: 12px;\r\n    background: #388e3c;\r\n    border-radius: 50%;\r\n    opacity: 0;\r\n    -webkit-transform: scale(1.5);\r\n            transform: scale(1.5);\r\n    -webkit-transition: all 0.3s ease;\r\n    transition: all 0.3s ease;\r\n}\r\n.acknowledge_container .content-area .wrapper .option.option-2 .dot::before {\r\n    background: #ed1c24;\r\n}\r\n.acknowledge_container .content-area .wrapper input[type=\"radio\"] {\r\n    display: none;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 {\r\n    border-color: #388e3c;\r\n    background: #388e3c;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 {\r\n    border-color: #ed1c24;\r\n    background: #ed1c24;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 .dot,\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 .dot {\r\n    background: #fff;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 .dot::before,\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 .dot::before {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n}\r\n.acknowledge_container .content-area .wrapper .wrapper .option span {\r\n    font-size: 20px;\r\n    color: #808080;\r\n}\r\n.acknowledge_container .content-area .wrapper #option-1:checked:checked ~ .option-1 span,\r\n.acknowledge_container .content-area .wrapper #option-2:checked:checked ~ .option-2 span {\r\n    color: #fff;\r\n}\r\n.acknowledge_container .content-area .form-control {\r\n    font-size: 14px;\r\n    padding: 10px;\r\n}\r\n.acknowledge_container .content-area .btn-black {\r\n    font-size: 14px;\r\n    background-color: #414141;\r\n    color: #fff;\r\n    border: none;\r\n    padding: 10px 40px;\r\n    border-radius: 3px;\r\n    width: 180px;\r\n    -webkit-transition: ease all 0.3s;\r\n    transition: ease all 0.3s;\r\n}\r\n.acknowledge_container .content-area .btn-black:hover,\r\n.acknowledge_container .content-area .btn-black:focus,\r\n.acknowledge_container .content-area .btn-black:visited {\r\n    background-color: #212121;\r\n    color: #fff;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwbGljYXRpb24tbW9kdWxlL2NhbXB1cy90ZXN0LWFja25vd2xlZGdlbWVudC90ZXN0LWFja25vd2xlZGdlbWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9HQUFvRztBQUNwRztJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsaUNBQWlDO0lBQ2pDLGdCQUFnQjtJQUNoQixlQUFlOztBQUVuQjtBQUNBO0lBQ0ksc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0Qix1REFBdUQ7SUFDdkQsK0RBQStEO0lBQy9ELFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsd0JBQWdCO0lBQWhCLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2YsK0JBQStCO0lBQy9CLGdDQUFnQztBQUNwQztBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLFlBQVk7SUFDWix5QkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLDhCQUE2QjtZQUE3Qiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixjQUFjO0FBQ2xCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFdBQVc7SUFDWCxvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLDhCQUE2QjtZQUE3Qiw2QkFBNkI7SUFDN0IsY0FBYztJQUNkLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLGlDQUF5QjtJQUF6Qix5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLDZCQUFxQjtZQUFyQixxQkFBcUI7SUFDckIsaUNBQXlCO0lBQXpCLHlCQUF5QjtBQUM3QjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsbUJBQW1CO0FBQ3ZCO0FBQ0E7O0lBRUksZ0JBQWdCO0FBQ3BCO0FBQ0E7O0lBRUksVUFBVTtJQUNWLDJCQUFtQjtZQUFuQixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGVBQWU7SUFDZixjQUFjO0FBQ2xCO0FBQ0E7O0lBRUksV0FBVztBQUNmO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsYUFBYTtBQUNqQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGlDQUF5QjtJQUF6Qix5QkFBeUI7QUFDN0I7QUFFQTs7O0lBR0kseUJBQXlCO0lBQ3pCLFdBQVc7QUFDZiIsImZpbGUiOiJzcmMvYXBwL2FwcGxpY2F0aW9uLW1vZHVsZS9jYW1wdXMvdGVzdC1hY2tub3dsZWRnZW1lbnQvdGVzdC1hY2tub3dsZWRnZW1lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDEwMDszMDA7NDAwOzUwMDs3MDAmZGlzcGxheT1zd2FwJyk7XHJcbmJvZHkge1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcblxyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XHJcbiAgICBib3gtc2hhZG93OiAwcHggMC4xMjVyZW0gMC4yNXJlbSByZ2IoMTI2IDE0MiAxNzcgLyAxOCUpO1xyXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMC4xMjVyZW0gMC4yNXJlbSByZ2IoMTI2IDE0MiAxNzcgLyAxOCUpO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gICAgdHJhbnNpdGlvbjogMC4zcztcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5sb2dvLWFyZWEge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VkMWMyNDtcclxuICAgIGZvbnQtc2l6ZTogMjZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIHBhZGRpbmc6IDEycHggMDtcclxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDAuMjVyZW07XHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMC4yNXJlbTtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEge1xyXG4gICAgcGFkZGluZzogMjBweCA0MHB4O1xyXG59XHJcblxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgd2lkdGg6IDI2NHB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMjBweCAwO1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyIC5vcHRpb24ge1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcclxuICAgIG1hcmdpbjogMCAxMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHBhZGRpbmc6IDAgMTBweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNiOWI5Yjk7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAub3B0aW9uIC5kb3Qge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjYjliOWI5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAub3B0aW9uIC5kb3Q6OmJlZm9yZSB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgdG9wOiA0cHg7XHJcbiAgICBsZWZ0OiA0cHg7XHJcbiAgICB3aWR0aDogMTJweDtcclxuICAgIGhlaWdodDogMTJweDtcclxuICAgIGJhY2tncm91bmQ6ICMzODhlM2M7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgLm9wdGlvbi5vcHRpb24tMiAuZG90OjpiZWZvcmUge1xyXG4gICAgYmFja2dyb3VuZDogI2VkMWMyNDtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgaW5wdXRbdHlwZT1cInJhZGlvXCJdIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC53cmFwcGVyICNvcHRpb24tMTpjaGVja2VkOmNoZWNrZWQgfiAub3B0aW9uLTEge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjMzg4ZTNjO1xyXG4gICAgYmFja2dyb3VuZDogIzM4OGUzYztcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgI29wdGlvbi0yOmNoZWNrZWQ6Y2hlY2tlZCB+IC5vcHRpb24tMiB7XHJcbiAgICBib3JkZXItY29sb3I6ICNlZDFjMjQ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZWQxYzI0O1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTE6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0xIC5kb3QsXHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTI6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0yIC5kb3Qge1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgI29wdGlvbi0xOmNoZWNrZWQ6Y2hlY2tlZCB+IC5vcHRpb24tMSAuZG90OjpiZWZvcmUsXHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTI6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0yIC5kb3Q6OmJlZm9yZSB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLndyYXBwZXIgLndyYXBwZXIgLm9wdGlvbiBzcGFuIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGNvbG9yOiAjODA4MDgwO1xyXG59XHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTE6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0xIHNwYW4sXHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAud3JhcHBlciAjb3B0aW9uLTI6Y2hlY2tlZDpjaGVja2VkIH4gLm9wdGlvbi0yIHNwYW4ge1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC5mb3JtLWNvbnRyb2wge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLmJ0bi1ibGFjayB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDE0MTQxO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDQwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICB3aWR0aDogMTgwcHg7XHJcbiAgICB0cmFuc2l0aW9uOiBlYXNlIGFsbCAwLjNzO1xyXG59XHJcblxyXG4uYWNrbm93bGVkZ2VfY29udGFpbmVyIC5jb250ZW50LWFyZWEgLmJ0bi1ibGFjazpob3ZlcixcclxuLmFja25vd2xlZGdlX2NvbnRhaW5lciAuY29udGVudC1hcmVhIC5idG4tYmxhY2s6Zm9jdXMsXHJcbi5hY2tub3dsZWRnZV9jb250YWluZXIgLmNvbnRlbnQtYXJlYSAuYnRuLWJsYWNrOnZpc2l0ZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIxMjEyMTtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbiJdfQ== */";
    /***/
  },

  /***/
  "./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.ts":
  /*!**************************************************************************************************!*\
    !*** ./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.ts ***!
    \**************************************************************************************************/

  /*! exports provided: TestAcknowledgementComponent */

  /***/
  function srcAppApplicationModuleCampusTestAcknowledgementTestAcknowledgementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TestAcknowledgementComponent", function () {
      return TestAcknowledgementComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/campus/campusrequisition/campusrequisition.service */
    "./src/app/services/campus/campusrequisition/campusrequisition.service.ts");
    /* harmony import */


    var src_app_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");

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

    var TestAcknowledgementComponent =
    /*#__PURE__*/
    function () {
      function TestAcknowledgementComponent(_activeRoute, _route, campusRequisitionService, notificationService) {
        _classCallCheck(this, TestAcknowledgementComponent);

        this._activeRoute = _activeRoute;
        this._route = _route;
        this.campusRequisitionService = campusRequisitionService;
        this.notificationService = notificationService;
        this.isRemarksVisible = false;
        this.candidateId = this._activeRoute.snapshot.queryParamMap.get('CandiateId');
      }

      _createClass(TestAcknowledgementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.isRemarksVisible = false;
        }
      }, {
        key: "onClickStatusChangeYes",
        value: function onClickStatusChangeYes() {
          var _this3 = this;

          var formdata = {
            CandidateId: Number(this.candidateId),
            HiringStatusId: 15,
            Remarks: ""
          };
          this.campusRequisitionService.updateCandidateAcknowledged(formdata).subscribe(function (result) {
            if (result) {
              if (result.successFlag == 0) {
                _this3.notificationService.showError(result.msg, "Error");
              } else {
                _this3.notificationService.showSuccess(result.msg, "Success");
              }
            } else {}
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "onClickStatusChangeNo",
        value: function onClickStatusChangeNo() {
          var _this4 = this;

          var formdata = {
            CandidateId: Number(this.candidateId),
            HiringStatusId: 16,
            Remarks: this.remarks
          };
          this.campusRequisitionService.updateCandidateAcknowledged(formdata).subscribe(function (result) {
            if (result) {
              if (result.successFlag == 0) {
                _this4.notificationService.showError(result.msg, "Error");
              } else {
                _this4.notificationService.showSuccess(result.msg, "Success");
              }
            } else {}
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "onClickRadioBtn",
        value: function onClickRadioBtn(value) {
          if (value == 1) {
            this.isRemarksVisible = false;
            this.radioButtonValue = value;
            this.remarks = "";
          }

          if (value == 2) {
            this.radioButtonValue = value;
            this.isRemarksVisible = true;
            this.remarks = "";
          }
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var flag = 0;

          if (this.radioButtonValue == 1) {
            this.onClickStatusChangeYes();
          }

          if (this.radioButtonValue == 2) {
            if (this.remarks == undefined || this.remarks == null || this.remarks.length == 0) {
              this.notificationService.showError("Please fill the Reason", "Error");
              flag = 0;
            }

            if (this.remarks.length > 0) {
              flag = 1;
            }
          }

          if (flag == 1) {
            this.onClickStatusChangeNo();
          }
        }
      }]);

      return TestAcknowledgementComponent;
    }();

    TestAcknowledgementComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_2__["CampusrequisitionService"]
      }, {
        type: src_app_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]
      }];
    };

    TestAcknowledgementComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-test-acknowledgement',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./test-acknowledgement.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./test-acknowledgement.component.css */
      "./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.css")).default]
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_2__["CampusrequisitionService"], src_app_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])], TestAcknowledgementComponent);
    /***/
  },

  /***/
  "./src/app/application-module/shared/viewpdf/viewpdf.component.css":
  /*!*************************************************************************!*\
    !*** ./src/app/application-module/shared/viewpdf/viewpdf.component.css ***!
    \*************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppApplicationModuleSharedViewpdfViewpdfComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcGxpY2F0aW9uLW1vZHVsZS9zaGFyZWQvdmlld3BkZi92aWV3cGRmLmNvbXBvbmVudC5jc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/application-module/shared/viewpdf/viewpdf.component.ts":
  /*!************************************************************************!*\
    !*** ./src/app/application-module/shared/viewpdf/viewpdf.component.ts ***!
    \************************************************************************/

  /*! exports provided: ViewpdfComponent */

  /***/
  function srcAppApplicationModuleSharedViewpdfViewpdfComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewpdfComponent", function () {
      return ViewpdfComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
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

    var ViewpdfComponent =
    /*#__PURE__*/
    function () {
      function ViewpdfComponent(route) {
        _classCallCheck(this, ViewpdfComponent);

        this.route = route;
        this.src = "";
        this.apppath = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apppath;
        this.src = this.route.snapshot.queryParamMap.get('q');
      }

      _createClass(ViewpdfComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return ViewpdfComponent;
    }();

    ViewpdfComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]
      }];
    };

    ViewpdfComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-viewpdf',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./viewpdf.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/application-module/shared/viewpdf/viewpdf.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./viewpdf.component.css */
      "./src/app/application-module/shared/viewpdf/viewpdf.component.css")).default]
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])], ViewpdfComponent);
    /***/
  },

  /***/
  "./src/app/campus-offcampus-registration/campus-offcampus-registration-routing.module.ts":
  /*!***********************************************************************************************!*\
    !*** ./src/app/campus-offcampus-registration/campus-offcampus-registration-routing.module.ts ***!
    \***********************************************************************************************/

  /*! exports provided: CampusOffcampusRegistrationRoutingModule */

  /***/
  function srcAppCampusOffcampusRegistrationCampusOffcampusRegistrationRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CampusOffcampusRegistrationRoutingModule", function () {
      return CampusOffcampusRegistrationRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _layouts_windowlayout_windowlayout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../layouts/windowlayout/windowlayout.component */
    "./src/app/layouts/windowlayout/windowlayout.component.ts");
    /* harmony import */


    var src_app_application_module_shared_viewpdf_viewpdf_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/application-module/shared/viewpdf/viewpdf.component */
    "./src/app/application-module/shared/viewpdf/viewpdf.component.ts");
    /* harmony import */


    var src_app_commonpages_campusregistration_campusregistration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/commonpages/campusregistration/campusregistration.component */
    "./src/app/commonpages/campusregistration/campusregistration.component.ts");
    /* harmony import */


    var src_app_commonpages_off_campus_registration_off_campus_registration_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/commonpages/off-campus-registration/off-campus-registration.component */
    "./src/app/commonpages/off-campus-registration/off-campus-registration.component.ts");
    /* harmony import */


    var src_app_application_module_campus_test_acknowledgement_test_acknowledgement_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component */
    "./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.ts");
    /* harmony import */


    var src_app_application_module_campus_interview_acknowlwdgement_interview_acknowlwdgement_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component */
    "./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var routes = [{
      path: '',
      component: _layouts_windowlayout_windowlayout_component__WEBPACK_IMPORTED_MODULE_2__["WindowlayoutComponent"],
      children: [{
        path: 'viewpdf',
        component: src_app_application_module_shared_viewpdf_viewpdf_component__WEBPACK_IMPORTED_MODULE_3__["ViewpdfComponent"]
      }, {
        path: 'campus-registration',
        component: src_app_commonpages_campusregistration_campusregistration_component__WEBPACK_IMPORTED_MODULE_4__["CampusregistrationComponent"]
      }, {
        path: 'off-campus-registration',
        component: src_app_commonpages_off_campus_registration_off_campus_registration_component__WEBPACK_IMPORTED_MODULE_5__["OffCampusRegistrationComponent"]
      }, {
        path: 'testacknowledgement',
        component: src_app_application_module_campus_test_acknowledgement_test_acknowledgement_component__WEBPACK_IMPORTED_MODULE_6__["TestAcknowledgementComponent"]
      }, {
        path: 'interviewacknowledgement',
        component: src_app_application_module_campus_interview_acknowlwdgement_interview_acknowlwdgement_component__WEBPACK_IMPORTED_MODULE_7__["InterviewAcknowlwdgementComponent"]
      }]
    }];

    var CampusOffcampusRegistrationRoutingModule = function CampusOffcampusRegistrationRoutingModule() {
      _classCallCheck(this, CampusOffcampusRegistrationRoutingModule);
    };

    CampusOffcampusRegistrationRoutingModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], CampusOffcampusRegistrationRoutingModule);
    /***/
  },

  /***/
  "./src/app/campus-offcampus-registration/campus-offcampus-registration.module.ts":
  /*!***************************************************************************************!*\
    !*** ./src/app/campus-offcampus-registration/campus-offcampus-registration.module.ts ***!
    \***************************************************************************************/

  /*! exports provided: CampusOffcampusRegistrationModule */

  /***/
  function srcAppCampusOffcampusRegistrationCampusOffcampusRegistrationModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CampusOffcampusRegistrationModule", function () {
      return CampusOffcampusRegistrationModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ng-select/ng-select */
    "./node_modules/@ng-select/ng-select/fesm2015/ng-select-ng-select.js");
    /* harmony import */


    var _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../auth/authguardservice.service */
    "./src/app/auth/authguardservice.service.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../sharedservices/persitence.service */
    "./src/app/sharedservices/persitence.service.ts");
    /* harmony import */


    var _sharedservices_shareddata_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../sharedservices/shareddata.service */
    "./src/app/sharedservices/shareddata.service.ts");
    /* harmony import */


    var _campus_offcampus_registration_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./campus-offcampus-registration-routing.module */
    "./src/app/campus-offcampus-registration/campus-offcampus-registration-routing.module.ts");
    /* harmony import */


    var _layouts_windowlayout_windowlayout_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../layouts/windowlayout/windowlayout.component */
    "./src/app/layouts/windowlayout/windowlayout.component.ts");
    /* harmony import */


    var src_app_application_module_shared_viewpdf_viewpdf_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! src/app/application-module/shared/viewpdf/viewpdf.component */
    "./src/app/application-module/shared/viewpdf/viewpdf.component.ts");
    /* harmony import */


    var src_app_commonpages_campusregistration_campusregistration_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! src/app/commonpages/campusregistration/campusregistration.component */
    "./src/app/commonpages/campusregistration/campusregistration.component.ts");
    /* harmony import */


    var src_app_commonpages_off_campus_registration_off_campus_registration_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! src/app/commonpages/off-campus-registration/off-campus-registration.component */
    "./src/app/commonpages/off-campus-registration/off-campus-registration.component.ts");
    /* harmony import */


    var src_app_application_module_campus_test_acknowledgement_test_acknowledgement_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component */
    "./src/app/application-module/campus/test-acknowledgement/test-acknowledgement.component.ts");
    /* harmony import */


    var src_app_application_module_campus_interview_acknowlwdgement_interview_acknowlwdgement_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component */
    "./src/app/application-module/campus/interview-acknowlwdgement/interview-acknowlwdgement.component.ts");

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var __importDefault = undefined && undefined.__importDefault || function (mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };

    var CampusOffcampusRegistrationModule = function CampusOffcampusRegistrationModule() {
      _classCallCheck(this, CampusOffcampusRegistrationModule);
    };

    CampusOffcampusRegistrationModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      declarations: [_layouts_windowlayout_windowlayout_component__WEBPACK_IMPORTED_MODULE_11__["WindowlayoutComponent"], src_app_application_module_shared_viewpdf_viewpdf_component__WEBPACK_IMPORTED_MODULE_12__["ViewpdfComponent"], src_app_commonpages_campusregistration_campusregistration_component__WEBPACK_IMPORTED_MODULE_13__["CampusregistrationComponent"], src_app_commonpages_off_campus_registration_off_campus_registration_component__WEBPACK_IMPORTED_MODULE_14__["OffCampusRegistrationComponent"], src_app_application_module_campus_test_acknowledgement_test_acknowledgement_component__WEBPACK_IMPORTED_MODULE_15__["TestAcknowledgementComponent"], src_app_application_module_campus_interview_acknowlwdgement_interview_acknowlwdgement_component__WEBPACK_IMPORTED_MODULE_16__["InterviewAcknowlwdgementComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrModule"].forRoot(), _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"], _campus_offcampus_registration_routing_module__WEBPACK_IMPORTED_MODULE_10__["CampusOffcampusRegistrationRoutingModule"]],
      providers: [// AuthenticationGuard,
      _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectConfig"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["ɵs"], _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_6__["AuthguardserviceService"], _sharedservices_shareddata_service__WEBPACK_IMPORTED_MODULE_9__["ShareddataService"], _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_8__["PersistanceService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"]]
    })], CampusOffcampusRegistrationModule);
    /***/
  },

  /***/
  "./src/app/commonpages/campusregistration/campusregistration.component.css":
  /*!*********************************************************************************!*\
    !*** ./src/app/commonpages/campusregistration/campusregistration.component.css ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCommonpagesCampusregistrationCampusregistrationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1vbnBhZ2VzL2NhbXB1c3JlZ2lzdHJhdGlvbi9jYW1wdXNyZWdpc3RyYXRpb24uY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/commonpages/campusregistration/campusregistration.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/commonpages/campusregistration/campusregistration.component.ts ***!
    \********************************************************************************/

  /*! exports provided: CampusregistrationComponent */

  /***/
  function srcAppCommonpagesCampusregistrationCampusregistrationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CampusregistrationComponent", function () {
      return CampusregistrationComponent;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/common/common/common.service */
    "./src/app/services/common/common/common.service.ts");
    /* harmony import */


    var _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../services/common/language/language.service */
    "./src/app/services/common/language/language.service.ts");
    /* harmony import */


    var _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../services/common/stream/stream.service */
    "./src/app/services/common/stream/stream.service.ts");
    /* harmony import */


    var _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../services/common/course/course.service */
    "./src/app/services/common/course/course.service.ts");
    /* harmony import */


    var _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../services/common/qualification/qualification.service */
    "./src/app/services/common/qualification/qualification.service.ts");
    /* harmony import */


    var _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");
    /* harmony import */


    var src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! src/app/services/campus/campusrequisition/campusrequisition.service */
    "./src/app/services/campus/campusrequisition/campusrequisition.service.ts");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! src/environments/environment */
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

    var CampusregistrationComponent =
    /*#__PURE__*/
    function () {
      function CampusregistrationComponent(notificationService, commonService, courseService, streamService, qualificationService, languageService, fb, toasterService, _route, titleService, requisitionService, SpinnerService) {
        _classCallCheck(this, CampusregistrationComponent);

        this.notificationService = notificationService;
        this.commonService = commonService;
        this.courseService = courseService;
        this.streamService = streamService;
        this.qualificationService = qualificationService;
        this.languageService = languageService;
        this.fb = fb;
        this.toasterService = toasterService;
        this._route = _route;
        this.titleService = titleService;
        this.requisitionService = requisitionService;
        this.SpinnerService = SpinnerService;
        this.pageTitle = "Registration";
        this.campusCandidate = {};
        this.campusCandidateAcademic = [];
        this.campusCandidateAcademicAnyOtherQualification = [];
        this.states = [];
        this.languages = [];
        this.searchLanguages = {
          languageId: null,
          isActive: null
        };
        this.campusLinks = [];
        this.searchCampusLink = {
          campusCourseId: null,
          campusYearId: null,
          createdBy: null,
          campusLinkId: null
        };
        this.CompletionYear = [];
        this.tenCourseList = [];
        this.twelveCourseList = [];
        this.diplomaCourseList = [];
        this.degreeCourses = [];
        this.degreeCourseList = [];
        this.postDegreeCourseList = [];
        this.postDegreeCourses = [];
        this.searchCourse = {
          qualificationId: null,
          courseId: null,
          isActive: true
        };
        this.readeye = false;
        this.readdisability = false;
        this.readhealth = false;
        this.degreeStreamList = [];
        this.diplomaStreamList = [];
        this.postDegreeStreamList = [];
        this.searchStream = {
          qualificationId: null,
          courseId: null,
          streamId: null,
          isActive: true
        };
        this.searchUniversity = {
          qulificationUniversityBoardId: null,
          isActive: true
        };
        this.familyOccupations = [];
        this.motherOccupations = [];
        this.candidatefileToUpload = null;
        this.calcAge = "0";
        this.showTen = false;
        this.showTwelve = false;
        this.showDegree = false;
        this.showDiploma = false;
        this.showPG = false;
        this.showAnyOther = false;
        this.disableyear = false;
        this.disablemarks = false;
        this.disablecourse = false;
        this.disablediplomayear = false;
        this.disablediplomamarks = false;
        this.disablediplomacourse = false;
        this.disablediplomaspecial = false;
        this.disablediplomainstitute = false;
        this.disablediplomainstitutename = false;
        this.disablediplomainstitutelocation = false;
        this.disablegradyear = false;
        this.disablegradmarks = false;
        this.disablegradcourse = false;
        this.disablegradspecial = false;
        this.disablegradinstitute = false;
        this.disablegradinstitutename = false;
        this.disablegradinstitutelocation = false;
        this.disablepgyear = false;
        this.disablepgmarks = false;
        this.disablepgcourse = false;
        this.disablepgspecial = false;
        this.disablepginstitute = false;
        this.disablepginstitutename = false;
        this.disablepginstitutelocation = false;
        this.showsign = true; // By Sayandeep on 05-08-2023

        this.isChecked = false;
        this.extracuricullar = [];
        this.hidepginstitute = true;
        this.hideunderinstitute = true;
        this.hideanyotherinstitute = true;
        this.hidediplomainstitutename = true;
        this.markten = false;
        this.marktwelve = false;
        this.markdiploma = false;
        this.markundergrad = false;
        this.markpostgrad = false;
        this.markanyothr = false;
        this.invalidFileName = false;
        this.currentUrl = this._route.url;
        this.currentUrl = this.currentUrl.replace("%3D", "=").replace("%3D", "=").replace("%3D", "=");
        this.getAllCampusLink();
        this.getAllState();
        this.getAllLanguages();
        this.getAllCompletionYears();
        this.getAll10Course();
        this.getAll12Course();
        this.getAllDiplomaCourse();
        this.getAllDegreeCourses();
        this.getAllPGCourses();
        this.getAllUniversity();
        this.getAllFatherOccupations();
        this.getAllMotherOccupations();
        this.getALlExtraCuricullarActivities();
      }

      _createClass(CampusregistrationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          this.loadDatePicker();
        }
      }, {
        key: "chck",
        value: function chck() {
          if (this.campusCandidate.TenMarks < 30 || this.campusCandidate.TenMarks > 100) {
            this.markten = true;
          } else {
            this.markten = false;
          }
        }
      }, {
        key: "chcktwelve",
        value: function chcktwelve() {
          if (this.campusCandidate.TwelveMarks < 30 || this.campusCandidate.TwelveMarks > 100) {
            this.marktwelve = true;
          } else {
            this.marktwelve = false;
          }
        }
      }, {
        key: "chckdiploma",
        value: function chckdiploma() {
          if (this.campusCandidate.DiplomaMarks < 30 || this.campusCandidate.DiplomaMarks > 100) {
            this.markdiploma = true;
          } else {
            this.markdiploma = false;
          }
        }
      }, {
        key: "chckundergrad",
        value: function chckundergrad() {
          if (this.campusCandidate.DegreeMarks < 30 || this.campusCandidate.DegreeMarks > 100) {
            this.markundergrad = true;
          } else {
            this.markundergrad = false;
          }
        }
      }, {
        key: "chckpostgrad",
        value: function chckpostgrad() {
          if (this.campusCandidate.PostDegreeMarks < 30 || this.campusCandidate.PostDegreeMarks > 100) {
            this.markpostgrad = true;
          } else {
            this.markpostgrad = false;
          }
        }
      }, {
        key: "chckanyothr",
        value: function chckanyothr() {
          if (this.campusCandidate.AnyOtherQualificationMarks < 30 || this.campusCandidate.AnyOtherQualificationMarks > 100) {
            this.markanyothr = true;
          } else {
            this.markanyothr = false;
          }
        }
      }, {
        key: "getAllCampusLink",
        value: function getAllCampusLink() {
          var _this5 = this;

          this.SpinnerService.show();
          this.searchCampusLink.campusYearId = 0;
          this.searchCampusLink.createdBy = 0;
          this.requisitionService.getAllCampusLink(this.searchCampusLink).subscribe(function (response) {
            if (response) {
              _this5.campusLinks = response;
              _this5.campusLinks = _this5.campusLinks.filter(function (x) {
                return x.campusLink == src_environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"].campuslink + _this5.currentUrl;
              });
              setTimeout(function () {
                _this5.loadDatePicker();
              }, 200);
            } else {
              _this5.campusLinks = [];
            }
          }, function (error) {
            _this5.notificationService.showError("Something went wrong.. Try again later..", "");

            console.log(error);
          }, function () {
            _this5.SpinnerService.hide();
          });
        }
      }, {
        key: "changeLanguageKnown",
        value: function changeLanguageKnown() {}
      }, {
        key: "loadDatePicker",
        value: function loadDatePicker() {
          var today = new Date();
          var dothis = this;
          jQuery(".datepicker").parent(".input-group").datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            endDate: today,
            todayHighlight: true
          }).on("change", function (e) {
            var selecteddate = e.target.value;

            if (selecteddate != "") {
              var birthDate = new Date(selecteddate.substring(6, 10) + "/" + selecteddate.substring(3, 5) + "/" + selecteddate.substring(0, 2));
              var age = today.getFullYear() - birthDate.getFullYear();
              var m = today.getMonth() - birthDate.getMonth();

              if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
                age--;
              }

              dothis.DOB = e.target.value; //dothis.saveForm.patchValue({ DOB: e.target.value });

              dothis.calcAge = age.toString(); //this.saveForm.value.Age=age;

              jQuery("#txtAge").val(age);
            } else {
              jQuery("#txtAge").val("");
              dothis.calcAge = "0";
              dothis.saveForm.patchValue({
                DOB: ""
              });
            }
          });
        }
      }, {
        key: "getAllState",
        value: function getAllState() {
          var _this6 = this;

          this.states = [];
          this.commonService.getAllState().subscribe(function (result) {
            if (result) {
              _this6.states = result;
            } else {
              _this6.states = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllLanguages",
        value: function getAllLanguages() {
          var _this7 = this;

          this.languages = [];
          this.searchLanguages.languageId = 0;
          this.searchLanguages.isActive = true;
          this.languageService.getAllLanguage(this.searchLanguages).subscribe(function (result) {
            if (result) {
              _this7.languages = result;
            } else {
              _this7.languages = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            setTimeout(function () {
              jQuery('.selectpicker').selectpicker('refresh');
            });
          });
        }
      }, {
        key: "getAllCompletionYears",
        value: function getAllCompletionYears() {
          this.CompletionYear = [];
          var currentyear = new Date().getFullYear() + 1;
          this.CompletionYear.push({
            yearsId: parseInt("0"),
            yearsName: "Select"
          });

          for (var i = currentyear; i > currentyear - 40; i--) {
            this.CompletionYear.push({
              yearsId: parseInt(i.toString()),
              yearsName: i.toString()
            });
          }
        }
      }, {
        key: "getAll10Course",
        value: function getAll10Course() {
          var _this8 = this;

          this.tenCourseList = [];
          this.searchCourse.qualificationId = 10;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this8.tenCourseList = result;
            } else {
              _this8.tenCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAll12Course",
        value: function getAll12Course() {
          var _this9 = this;

          this.twelveCourseList = [];
          this.searchCourse.qualificationId = 16;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this9.twelveCourseList = result;
            } else {
              _this9.twelveCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDiplomaCourse",
        value: function getAllDiplomaCourse() {
          var _this10 = this;

          this.diplomaCourseList = [];
          this.searchCourse.qualificationId = 5;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this10.diplomaCourseList = result;
            } else {
              _this10.diplomaCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDegreeCourses",
        value: function getAllDegreeCourses() {
          var _this11 = this;

          this.degreeCourses = [];
          this.degreeCourseList = [];
          this.searchCourse.qualificationId = 2;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this11.degreeCourses = result;

              for (var i = 0; i < _this11.degreeCourses.length; i++) {
                _this11.degreeCourseList.push({
                  qualificationId: 2,
                  qualificationName: "",
                  courseId: _this11.degreeCourses[i].courseId,
                  courseName: _this11.degreeCourses[i].courseName,
                  isActive: _this11.degreeCourses[i].isActive
                });
              }
            } else {
              _this11.degreeCourses = [];
              _this11.degreeCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
          this.searchCourse.qualificationId = 4;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this11.degreeCourses = result;

              for (var i = 0; i < _this11.degreeCourses.length; i++) {
                _this11.degreeCourseList.push({
                  qualificationId: 4,
                  qualificationName: "",
                  courseId: _this11.degreeCourses[i].courseId,
                  courseName: _this11.degreeCourses[i].courseName,
                  isActive: _this11.degreeCourses[i].isActive
                });
              }
            } else {
              _this11.degreeCourses = []; //this.degreeCourseList=[];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllPGCourses",
        value: function getAllPGCourses() {
          var _this12 = this;

          this.postDegreeCourseList = [];
          this.postDegreeCourses = [];
          this.searchCourse.qualificationId = 6;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this12.postDegreeCourses = result;

              for (var i = 0; i < _this12.postDegreeCourses.length; i++) {
                _this12.postDegreeCourseList.push({
                  qualificationId: 6,
                  qualificationName: "",
                  courseId: _this12.postDegreeCourses[i].courseId,
                  courseName: _this12.postDegreeCourses[i].courseName,
                  isActive: _this12.postDegreeCourses[i].isActive
                });
              }
            } else {
              _this12.postDegreeCourses = [];
              _this12.postDegreeCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
          this.searchCourse.qualificationId = 3;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this12.postDegreeCourses = result;

              for (var i = 0; i < _this12.postDegreeCourses.length; i++) {
                _this12.postDegreeCourseList.push({
                  qualificationId: 3,
                  qualificationName: "",
                  courseId: _this12.postDegreeCourses[i].courseId,
                  courseName: _this12.postDegreeCourses[i].courseName,
                  isActive: _this12.postDegreeCourses[i].isActive
                });
              }
            } else {
              _this12.postDegreeCourses = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDegreeStream",
        value: function getAllDegreeStream(data) {
          var _this13 = this;

          this.degreeStreamList = [];
          this.searchStream.qualificationId = data.qualificationId; //this.searchStream.qualificationId = 2;

          this.searchStream.courseId = data.courseId;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this13.degreeStreamList = result;
            } else {
              _this13.degreeStreamList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDiplomaStream",
        value: function getAllDiplomaStream(data) {
          var _this14 = this;

          this.diplomaStreamList = [];
          this.searchStream.qualificationId = 5;
          this.searchStream.courseId = data;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this14.diplomaStreamList = result;
            } else {
              _this14.diplomaStreamList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllPostDegreeStream",
        value: function getAllPostDegreeStream(data) {
          var _this15 = this;

          this.postDegreeStreamList = [];
          this.searchStream.qualificationId = data.qualificationId;
          this.searchStream.courseId = data.courseId;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this15.postDegreeStreamList = result;
            } else {
              _this15.postDegreeStreamList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllUniversity",
        value: function getAllUniversity() {
          var _this16 = this;

          this.academicUniversity = [];
          this.commonService.getAllQualificationUniversityBoard(this.searchUniversity).subscribe(function (result) {
            if (result) {
              _this16.academicUniversity = result;

              _this16.academicUniversity.push({
                qulificationUniversityBoardId: 0,
                qulificationUniversityBoardName: "Others",
                isActive: true
              });
            } else {
              _this16.academicUniversity = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllFatherOccupations",
        value: function getAllFatherOccupations() {
          this.familyOccupations = [];
          this.familyOccupations.push({
            name: "Business",
            id: 1
          });
          this.familyOccupations.push({
            name: "Govt. Employee",
            id: 2
          });
          this.familyOccupations.push({
            name: "Private Sector",
            id: 3
          }); // this.familyOccupations.push({ name: "Housewife", id: 4 });

          this.familyOccupations.push({
            name: "Retired",
            id: 5
          });
          this.familyOccupations.push({
            name: "Public Sector",
            id: 6
          });
          this.familyOccupations.push({
            name: "Self Employed",
            id: 7
          });
          this.familyOccupations.push({
            name: "Others",
            id: 8
          });
        }
      }, {
        key: "getAllMotherOccupations",
        value: function getAllMotherOccupations() {
          this.motherOccupations = [];
          this.motherOccupations.push({
            name: "Business",
            id: 1
          });
          this.motherOccupations.push({
            name: "Govt. Employee",
            id: 2
          });
          this.motherOccupations.push({
            name: "Private Sector",
            id: 3
          });
          this.motherOccupations.push({
            name: "Homemaker",
            id: 4
          });
          this.motherOccupations.push({
            name: "Retired",
            id: 5
          });
          this.motherOccupations.push({
            name: "Public Sector",
            id: 6
          });
          this.motherOccupations.push({
            name: "Self Employed",
            id: 7
          });
          this.motherOccupations.push({
            name: "Others",
            id: 8
          });
        }
      }, {
        key: "getALlExtraCuricullarActivities",
        value: function getALlExtraCuricullarActivities() {
          this.extracuricullar = [];
          this.extracuricullar.push({
            name: "NCC / Scouts",
            id: 1
          });
          this.extracuricullar.push({
            name: "National Service Scheme",
            id: 2
          });
          this.extracuricullar.push({
            name: "Sports",
            id: 3
          });
          this.extracuricullar.push({
            name: "Athletics",
            id: 4
          });
          this.extracuricullar.push({
            name: "Arts (Acting, Dance, Photography, Painting, etc)",
            id: 5
          });
          this.extracuricullar.push({
            name: "College Clubs (Cultural, Academic, OtherCometitions)",
            id: 6
          });
          this.extracuricullar.push({
            name: "Others",
            id: 7
          });
        }
      }, {
        key: "changeQualification",
        value: function changeQualification(data) {
          if (data == "-1") {
            this.showTen = true;
            this.showTwelve = false;
            this.showDegree = false;
            this.showDiploma = false;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "1") {
            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = false;
            this.showDiploma = false;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "5") {
            if (this.campusCandidate.TwelveCourseStatus == 3) {}

            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = false;
            this.showDiploma = true;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "2" || data == "4") {
            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = true;
            this.showDiploma = true;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "3" || data == "6") {
            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = true;
            this.showDiploma = true;
            this.showPG = true;
            this.showAnyOther = true;
          }
        }
      }, {
        key: "onchangeeye",
        value: function onchangeeye(rec) {
          if (rec == 0) {
            this.readeye = true;
            this.campusCandidate.EyeSightRight = "";
            this.campusCandidate.EyeSightLeft = "";
          } else {
            this.readeye = false;
          }
        }
      }, {
        key: "onchangedisab",
        value: function onchangedisab(rec) {
          if (rec == 0) {
            this.readdisability = true;
            this.campusCandidate.DisabilityDetails = "";
          } else {
            this.readdisability = false;
          }
        }
      }, {
        key: "onchangehealth",
        value: function onchangehealth(rec) {
          if (rec == 0) {
            this.readhealth = true;
            this.campusCandidate.HealthIssueDetails = "";
          } else {
            this.readhealth = false;
          }
        }
      }, {
        key: "onchangecourse",
        value: function onchangecourse(rec) {
          // console.log("defaultval",this.campusCandidate.TwelveCourses)
          if (rec == 3) {
            this.disableyear = true;
            this.disablemarks = true;
            this.disablecourse = true;
            this.campusCandidate.TwelveCourses = undefined;
            this.campusCandidate.TwelveYearOfPassing = undefined;
            this.campusCandidate.TwelveMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disableyear = false;
            this.disablemarks = false;
            this.disablecourse = false;
          }
        }
      }, {
        key: "onchangediploma",
        value: function onchangediploma(rec) {
          if (rec == 3) {
            this.disablediplomaspecial = true;
            this.disablediplomainstitute = true;
            this.disablediplomainstitutename = true;
            this.disablediplomainstitutelocation = true;
            this.disablediplomayear = true;
            this.disablediplomamarks = true;
            this.disablediplomacourse = true;
            this.campusCandidate.DiplomaCourses = undefined;
            this.campusCandidate.DiplomaStreams = undefined;
            this.campusCandidate.DiplomaUniversity = undefined;
            this.campusCandidate.DiplomaInstituteName = undefined;
            this.campusCandidate.DiplomaInstituteLocation = undefined;
            this.campusCandidate.DiplomaYearOfPassing = undefined;
            this.campusCandidate.DiplomaMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disablediplomaspecial = false;
            this.disablediplomainstitute = false;
            this.disablediplomainstitutename = false;
            this.disablediplomainstitutelocation = false;
            this.disablediplomayear = false;
            this.disablediplomamarks = false;
            this.disablediplomacourse = false;
          }
        }
      }, {
        key: "onchangediplomainstitute",
        value: function onchangediplomainstitute(rec) {
          if (rec == 0) {
            this.hidediplomainstitutename = false;
          } else {
            this.hidediplomainstitutename = true;
          }
        }
      }, {
        key: "onchangeunderinstitute",
        value: function onchangeunderinstitute(rec) {
          if (rec == 0) {
            this.hideunderinstitute = false;
          } else {
            this.hideunderinstitute = true;
          }
        }
      }, {
        key: "onchangepginstitute",
        value: function onchangepginstitute(rec) {
          if (rec == 0) {
            this.hidepginstitute = false;
          } else {
            this.hidepginstitute = true;
          }
        }
      }, {
        key: "onchangeanyotherinstituteinstitute",
        value: function onchangeanyotherinstituteinstitute(rec) {
          if (rec == 0) {
            this.hideanyotherinstitute = false;
          } else {
            this.hideanyotherinstitute = true;
          }
        }
      }, {
        key: "onchangegraduation",
        value: function onchangegraduation(rec) {
          if (rec == 3) {
            this.disablegradspecial = true;
            this.disablegradinstitute = true;
            this.disablegradinstitutename = true;
            this.disablegradinstitutelocation = true;
            this.disablegradyear = true;
            this.disablegradmarks = true;
            this.disablegradcourse = true;
            this.campusCandidate.DegreeCourses = undefined;
            this.campusCandidate.DegreeStreams = undefined;
            this.campusCandidate.DegreeUniversity = undefined;
            this.campusCandidate.DegreeInstituteName = undefined;
            this.campusCandidate.DegreeInstituteLocation = undefined;
            this.campusCandidate.DegreeYearOfPassing = undefined;
            this.campusCandidate.DegreeMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disablegradspecial = false;
            this.disablegradinstitute = false;
            this.disablegradinstitutename = false;
            this.disablegradinstitutelocation = false;
            this.disablegradyear = false;
            this.disablegradmarks = false;
            this.disablegradcourse = false;
          }
        }
      }, {
        key: "onchangepg",
        value: function onchangepg(rec) {
          if (rec == 3) {
            this.disablepgspecial = true;
            this.disablepginstitute = true;
            this.disablepginstitutename = true;
            this.disablepginstitutelocation = true;
            this.disablepgyear = true;
            this.disablepgmarks = true;
            this.disablepgcourse = true;
            this.campusCandidate.PostDegreeCourses = undefined;
            this.campusCandidate.PostDegreeStreams = undefined;
            this.campusCandidate.PostDegreeUniversity = undefined;
            this.campusCandidate.PostDegreeInstituteName = undefined;
            this.campusCandidate.PostDegreeInstituteLocation = undefined;
            this.campusCandidate.PostDegreeYearOfPassing = undefined;
            this.campusCandidate.PostDegreeMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disablepgspecial = false;
            this.disablepginstitute = false;
            this.disablepginstitutename = false;
            this.disablepginstitutelocation = false;
            this.disablepgyear = false;
            this.disablepgmarks = false;
            this.disablepgcourse = false;
          }
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this17 = this;

          if (this.campusCandidate.EmailId != "" || this.campusCandidate.EmailId != undefined) {
            this.validateEmail(this.campusCandidate.EmailId);
          }

          if (this.isvalid()) {
            this.SpinnerService.show();
            this.campusCandidateAcademic = [];
            this.campusCandidateAcademicAnyOtherQualification = [];

            if (this.campusCandidate.HighestQualification == "-1") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
            }

            if (this.campusCandidate.HighestQualification == "1") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });
            }

            if (this.campusCandidate.HighestQualification == "5") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });

              if (this.campusCandidate.DiplomaCourses != undefined) {
                this.campusCandidateAcademic.push({
                  CampusCandidateAcademicId: 0,
                  CampusCandidateId: 0,
                  VisualOrder: 3,
                  Qualification: 5,
                  Course: this.campusCandidate.DiplomaCourses,
                  CourseStatus: this.campusCandidate.DiplomaCourseStatus,
                  StreamName: this.campusCandidate.DiplomaStreams,
                  Specalization: "",
                  Instutation: this.campusCandidate.DiplomaUniversity,
                  InstutationName: this.campusCandidate.DiplomaInstituteName == undefined ? "" : this.campusCandidate.DiplomaInstituteName,
                  InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
                  YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
                  Marks: this.campusCandidate.DiplomaMarks
                });
              }
            }

            if (this.campusCandidate.HighestQualification == "2" || this.campusCandidate.HighestQualification == "4") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });

              if (this.campusCandidate.DiplomaCourses != undefined) {
                this.campusCandidateAcademic.push({
                  CampusCandidateAcademicId: 0,
                  CampusCandidateId: 0,
                  VisualOrder: 3,
                  Qualification: 5,
                  Course: this.campusCandidate.DiplomaCourses,
                  CourseStatus: this.campusCandidate.DiplomaCourseStatus,
                  StreamName: this.campusCandidate.DiplomaStreams,
                  Specalization: "",
                  Instutation: this.campusCandidate.DiplomaUniversity,
                  InstutationName: this.campusCandidate.DiplomaInstituteName == undefined ? "" : this.campusCandidate.DiplomaInstituteName,
                  InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
                  YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
                  Marks: this.campusCandidate.DiplomaMarks
                });
              }

              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 4,
                Qualification: 2,
                Course: this.campusCandidate.DegreeCourses.courseId,
                CourseStatus: this.campusCandidate.DegreeCourseStatus,
                StreamName: this.campusCandidate.DegreeStreams,
                Specalization: "",
                Instutation: this.campusCandidate.DegreeUniversity,
                InstutationName: this.campusCandidate.DegreeInstituteName == undefined ? "" : this.campusCandidate.DegreeInstituteName,
                InstutationLocation: this.campusCandidate.DegreeInstituteLocation,
                YearOfPassing: this.campusCandidate.DegreeYearOfPassing,
                Marks: this.campusCandidate.DegreeMarks
              });
            }

            if (this.campusCandidate.HighestQualification == "3" || this.campusCandidate.HighestQualification == "6") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });

              if (this.campusCandidate.DiplomaCourses != undefined) {
                this.campusCandidateAcademic.push({
                  CampusCandidateAcademicId: 0,
                  CampusCandidateId: 0,
                  VisualOrder: 3,
                  Qualification: 5,
                  Course: this.campusCandidate.DiplomaCourses,
                  CourseStatus: this.campusCandidate.DiplomaCourseStatus,
                  StreamName: this.campusCandidate.DiplomaStreams,
                  Specalization: "",
                  Instutation: this.campusCandidate.DiplomaUniversity,
                  InstutationName: this.campusCandidate.DiplomaInstituteName == undefined ? "" : this.campusCandidate.DiplomaInstituteName,
                  InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
                  YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
                  Marks: this.campusCandidate.DiplomaMarks
                });
              }

              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 4,
                Qualification: 2,
                Course: this.campusCandidate.DegreeCourses.courseId,
                CourseStatus: this.campusCandidate.DegreeCourseStatus,
                StreamName: this.campusCandidate.DegreeStreams,
                Specalization: "",
                Instutation: this.campusCandidate.DegreeUniversity,
                InstutationName: this.campusCandidate.DegreeInstituteName == undefined ? "" : this.campusCandidate.DegreeInstituteName,
                InstutationLocation: this.campusCandidate.DegreeInstituteLocation,
                YearOfPassing: this.campusCandidate.DegreeYearOfPassing,
                Marks: this.campusCandidate.DegreeMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 5,
                Qualification: 3,
                Course: this.campusCandidate.PostDegreeCourses.courseId,
                CourseStatus: this.campusCandidate.PostDegreeCourseStatus,
                StreamName: this.campusCandidate.PostDegreeStreams,
                Specalization: "",
                Instutation: this.campusCandidate.PostDegreeUniversity,
                InstutationName: this.campusCandidate.PostDegreeInstituteName == undefined ? "" : this.campusCandidate.PostDegreeInstituteName,
                InstutationLocation: this.campusCandidate.PostDegreeInstituteLocation,
                YearOfPassing: this.campusCandidate.PostDegreeYearOfPassing,
                Marks: this.campusCandidate.PostDegreeMarks
              });
            }

            if ((this.campusCandidate.AnyOtherQualification != undefined || this.campusCandidate.AnyOtherQualification != "") && (this.campusCandidate.AnyOtherQualificationCourse != undefined || this.campusCandidate.AnyOtherQualificationCourse != "") && this.campusCandidate.AnyOtherQualificationCourseStatus != undefined && (this.campusCandidate.AnyOtherQualificationStream != undefined || this.campusCandidate.AnyOtherQualificationStream != "") && this.campusCandidate.AnyOtherQualificationInstitite != undefined && this.campusCandidate.AnyOtherQualificationInstititeLocation != undefined && this.campusCandidate.AnyOtherQualificationYearOfPassing != undefined && this.campusCandidate.AnyOtherQualificationMarks != undefined) {
              this.campusCandidateAcademicAnyOtherQualification = [];
              this.campusCandidateAcademicAnyOtherQualification.push({
                CampusCandidateAnyOtherQualificationId: 0,
                CampusCandidateId: 0,
                QualificationName: this.campusCandidate.AnyOtherQualification,
                CourseName: this.campusCandidate.AnyOtherQualificationCourse,
                CourseStatus: this.campusCandidate.AnyOtherQualificationCourseStatus,
                Specalization: this.campusCandidate.AnyOtherQualificationStream,
                Instutation: this.campusCandidate.AnyOtherQualificationInstitite,
                InstutationName: this.campusCandidate.AnyOtherQualificationInstititeName == undefined ? "" : this.campusCandidate.AnyOtherQualificationInstititeName,
                InstutationLocation: this.campusCandidate.AnyOtherQualificationInstititeLocation,
                YearOfPassing: this.campusCandidate.AnyOtherQualificationYearOfPassing,
                Marks: this.campusCandidate.AnyOtherQualificationMarks
              });
            } else {
              this.campusCandidateAcademicAnyOtherQualification = [];
            }

            var formData = new FormData();
            formData.append("CampusCandidateId", "0");
            formData.append("CampusLinkId", this.campusLinks[0].campusLinkId.toString());
            formData.append("CandidateId", "0");
            formData.append("FullName", this.campusCandidate.FullName);
            formData.append("Gender", this.campusCandidate.GenderId);
            formData.append("DOB", this.DOB);
            formData.append("Age", this.calcAge);
            formData.append("EmailId", this.campusCandidate.EmailId);
            formData.append("PhoneNo", this.campusCandidate.ContactNo);
            formData.append("AadharNo", this.campusCandidate.AadharNo);
            formData.append("MotherTongue", this.campusCandidate.MotherTongueId);
            formData.append("LanguageKnown", this.campusCandidate.LanguageIds);
            formData.append("Height", this.campusCandidate.Height);
            formData.append("Weight", this.campusCandidate.Weight);
            formData.append("HomeTown", this.campusCandidate.HomeTown);
            formData.append("NativeState", this.campusCandidate.NativeState);
            formData.append("PresentState", this.campusCandidate.PresentState);
            formData.append("HighestQualification", this.campusCandidate.HighestQualification);
            formData.append("EyeSightCorrected", this.campusCandidate.EyeSightCorrected == 1 ? "true" : "false");
            formData.append("EyeSightRight", this.campusCandidate.EyeSightRight == undefined ? "0" : this.campusCandidate.EyeSightRight);
            formData.append("EyeSightLeft", this.campusCandidate.EyeSightLeft == undefined ? "0" : this.campusCandidate.EyeSightLeft);
            formData.append("FatherOccupation", this.campusCandidate.FatherOccupation);
            formData.append("MotherOccupation", this.campusCandidate.MotherOccupation);
            formData.append("Disability", this.campusCandidate.Disability == 1 ? "true" : "false");
            formData.append("DisabilityDetails", this.campusCandidate.DisabilityDetails == undefined ? "" : this.campusCandidate.DisabilityDetails);
            formData.append("HealthIssue", this.campusCandidate.HealthIssue == 1 ? "true" : "false");
            formData.append("HealthIssueDetails", this.campusCandidate.HealthIssueDetails == undefined ? "" : this.campusCandidate.HealthIssueDetails);
            formData.append("NoofSiblings", this.campusCandidate.NoofSiblings);
            formData.append("YearsCommitments", this.campusCandidate.YearsCommitments);
            formData.append("AnyWhereinIndia", this.campusCandidate.AnyWhereinIndia);
            formData.append("WorkinginShift", this.campusCandidate.WorkinginShift);
            formData.append("JobTypePriority", this.campusCandidate.JobTypePriority);
            formData.append("CriticalFactor", this.campusCandidate.CriticalFactor);
            formData.append("MostPreferdBenifit", this.campusCandidate.MostPreferdBenifit);
            formData.append("ExtraCurricularActivities", this.campusCandidate.ExtraCurricularActivities);
            formData.append("ActiveArrears", this.campusCandidate.ActiveArrears);
            formData.append("DeletedIds", "0");
            formData.append("CreatedBy", "0");
            formData.append("CampusCandidateAcademic", JSON.stringify(this.campusCandidateAcademic));
            formData.append("CampusCandidateAnyOtherAcademic", JSON.stringify(this.campusCandidateAcademicAnyOtherQualification));
            formData.append("CandidateResumeFile", this.candidatefileToUpload); // this.SpinnerService.show();

            this.requisitionService.saveCampusCandidate(formData).subscribe(function (result) {
              if (result.successFlag == 1) {
                _this17.notificationService.showSuccess(result.msg, "Success");

                _this17.SpinnerService.hide();
              } else {
                _this17.notificationService.showError(result.msg, "Error");

                _this17.SpinnerService.hide();
              }
            }, function (error) {
              // display form values on success
              _this17.notificationService.showError("Something went wrong.. Try again later..", "");

              _this17.SpinnerService.hide();
            });
          }
        }
      }, {
        key: "isvalid",
        value: function isvalid() {
          debugger;

          if (this.campusCandidate.FullName == "" || this.campusCandidate.FullName == undefined) {
            this.notificationService.showError("Please Enter Name", "");
            return false;
          } else if (this.campusCandidate.GenderId == null || this.campusCandidate.GenderId == undefined) {
            this.notificationService.showError("Please Enter Gender", "");
            return false;
          } else if (this.campusCandidate.EmailId == "" || this.campusCandidate.EmailId == undefined) {
            this.notificationService.showError("Please Enter Email", "");
            return false;
          } else if (this.isValidEmail == false) {
            this.notificationService.showError("Please Enter valid Email", "");
            return false;
          } else if (this.campusCandidate.ContactNo == "" || this.campusCandidate.ContactNo == undefined) {
            this.notificationService.showError("Please Enter Phone No", "");
            return false;
          } else if (this.campusCandidate.ContactNo.length < 10) {
            this.notificationService.showError("Please Enter 10 digits of Contact No", "");
            return false;
          } else if (this.campusCandidate.AadharNo == "" || this.campusCandidate.AadharNo == undefined) {
            this.notificationService.showError("Please Enter Aadhar No", "");
            return false;
          } else if (this.campusCandidate.AadharNo.length < 12) {
            this.notificationService.showError("Please Enter 12 digits of Aadhar No", "");
            return false;
          } else if (this.campusCandidate.HomeTown == "" || this.campusCandidate.HomeTown == undefined) {
            this.notificationService.showError("Please Enter Home Town ", "");
            return false;
          } else if (this.campusCandidate.NativeState == "" || this.campusCandidate.NativeState == undefined) {
            this.notificationService.showError("Please Enter Native State ", "");
            return false;
          } else if (this.campusCandidate.PresentState == "" || this.campusCandidate.PresentState == undefined) {
            this.notificationService.showError("Please Enter Present State ", "");
            return false;
          } else if (this.campusCandidate.MotherTongueId == "" || this.campusCandidate.MotherTongueId == undefined) {
            this.notificationService.showError("Please Enter Mother Tongue ", "");
            return false;
          } else if (this.campusCandidate.LanguageIds == "" || this.campusCandidate.LanguageIds == undefined) {
            this.notificationService.showError("Please Enter Languages ", "");
            return false;
          } else if (this.campusCandidate.Height == null || this.campusCandidate.Height == undefined) {
            this.notificationService.showError("Please Enter Height ", "");
            return false;
          } else if (Number(this.campusCandidate.Height) < 100) {
            this.notificationService.showError("Height less than 100cm is not accepted ", "");
            return false;
          } else if (this.campusCandidate.Weight == null || this.campusCandidate.Weight == undefined) {
            this.notificationService.showError("Please Enter Weight ", "");
            return false;
          } else if (Number(this.campusCandidate.Weight) < 30) {
            this.notificationService.showError("Weight less than 30kg is not accepted ", "");
            return false;
          } else if (this.campusCandidate.EyeSightCorrected == null || this.campusCandidate.EyeSightCorrected == undefined) {
            this.notificationService.showError("Please Enter Eye Sight Corrected ", "");
            return false;
          } else if ((this.campusCandidate.EyeSightRight == null || this.campusCandidate.EyeSightRight == undefined) && this.campusCandidate.EyeSightCorrected == 1) {
            this.notificationService.showError("Please Enter Eye Sight Right value ", "");
            return false;
          } else if ((this.campusCandidate.EyeSightLeft == null || this.campusCandidate.EyeSightLeft == undefined) && this.campusCandidate.EyeSightCorrected == 1) {
            this.notificationService.showError("Please Enter Eye Sight Left value ", "");
            return false;
          } else if (this.campusCandidate.FatherOccupation == "" || this.campusCandidate.FatherOccupation == undefined) {
            this.notificationService.showError("Please Enter Father Occupation ", "");
            return false;
          } else if (this.campusCandidate.MotherOccupation == "" || this.campusCandidate.MotherOccupation == undefined) {
            this.notificationService.showError("Please Enter Mother Occupation ", "");
            return false;
          } else if (this.campusCandidate.Disability == null || this.campusCandidate.Disability == undefined) {
            this.notificationService.showError("Please Enter Disability ", "");
            return false;
          } else if ((this.campusCandidate.DisabilityDetails == null || this.campusCandidate.DisabilityDetails == undefined) && this.campusCandidate.Disability == 1) {
            this.notificationService.showError("Please Enter Disability Details", "");
            return false;
          } else if (this.campusCandidate.HealthIssue == null || this.campusCandidate.HealthIssue == undefined) {
            this.notificationService.showError("Please Enter Health Issue ", "");
            return false;
          } else if ((this.campusCandidate.HealthIssueDetails == null || this.campusCandidate.HealthIssueDetails == undefined) && this.campusCandidate.HealthIssue == 1) {
            this.notificationService.showError("Please Enter Health Issue Details", "");
            return false;
          } else if (this.campusCandidate.NoofSiblings == "" || this.campusCandidate.NoofSiblings == undefined) {
            this.notificationService.showError("Please Enter No of Siblings ", "");
            return false;
          } else if (Number(this.campusCandidate.NoofSiblings) > 10) {
            this.notificationService.showError("More than 10 siblings is not applicable ", "");
            return false;
          } else if (this.campusCandidate.HighestQualification == null || this.campusCandidate.HighestQualification == undefined) {
            this.notificationService.showError("Please select Highest Qualification ", "");
            return false;
          } // ten validation
          else if (this.campusCandidate.TenCourseStatus == null || this.campusCandidate.TenCourseStatus == undefined) {
              this.notificationService.showError("Please select High School Course Status ", "");
              return false;
            } else if (this.campusCandidate.TenCourses == null || this.campusCandidate.TenCourses == undefined) {
              this.notificationService.showError("Please select High School Course", "");
              return false;
            } else if (this.campusCandidate.TenYearOfPassing == null || this.campusCandidate.TenYearOfPassing == undefined) {
              this.notificationService.showError("Please select High School Year of Passing", "");
              return false;
            } else if (this.campusCandidate.TenMarks == "" || this.campusCandidate.TenMarks == undefined) {
              this.notificationService.showError("Please select High School Marks", "");
              return false;
            } else if (this.campusCandidate.TenMarks < 30 || this.campusCandidate.TenMarks > 100) {
              this.notificationService.showError("Enter between 30% to 100%", "");
              return false;
            } // higher secondary validation
            else if (this.campusCandidate.TwelveCourseStatus == null || this.campusCandidate.TwelveCourseStatus == undefined) {
                this.notificationService.showError("Please select Higher Secondary Course Status ", "");
                return false;
              } else if ((this.campusCandidate.TwelveCourses == null || this.campusCandidate.TwelveCourses == undefined) && this.campusCandidate.TwelveCourseStatus != 3) {
                this.notificationService.showError("Please select Higher Secondary Course", "");
                return false;
              } else if ((this.campusCandidate.TwelveYearOfPassing == null || this.campusCandidate.TwelveYearOfPassing == undefined) && this.campusCandidate.TwelveCourseStatus != 3) {
                this.notificationService.showError("Please select Higher Secondary Year of Passing", "");
                return false;
              } else if ((this.campusCandidate.TwelveMarks == "" || this.campusCandidate.TwelveMarks == undefined) && this.campusCandidate.TwelveCourseStatus != 3) {
                this.notificationService.showError("Please select Higher Secondary Marks", "");
                return false;
              } else if (this.campusCandidate.TwelveMarks < 30 || this.campusCandidate.TwelveMarks > 100) {
                this.notificationService.showError("Enter between 30% to 100%", "");
                return false;
              } // diploma validation
              else if (this.campusCandidate.DiplomaCourseStatus == null || this.campusCandidate.DiplomaCourseStatus == undefined) {
                  this.notificationService.showError("Please select Diploma Course Status ", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaCourses == null || this.campusCandidate.DiplomaCourses == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Course", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaStreams == null || this.campusCandidate.DiplomaStreams == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Stream", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaUniversity == null || this.campusCandidate.DiplomaUniversity == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Institution", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaInstituteName == null || this.campusCandidate.DiplomaInstituteName == undefined) && this.campusCandidate.DiplomaCourseStatus != 3 && this.campusCandidate.DiplomaUniversity == 0) {
                  this.notificationService.showError("Please select Diploma Institute Name", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaInstituteLocation == null || this.campusCandidate.DiplomaInstituteLocation == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Institution Location", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaYearOfPassing == null || this.campusCandidate.DiplomaYearOfPassing == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Year of Passing", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaMarks == "" || this.campusCandidate.DiplomaMarks == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Marks", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaMarks < 30 || this.campusCandidate.DiplomaMarks > 100) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Enter between 30% to 100% ", "");
                  return false;
                } // Under Grad Validation
                else if ((this.campusCandidate.DegreeCourseStatus == null || this.campusCandidate.DegreeCourseStatus == undefined) && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Course Status ", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeCourses == null || this.campusCandidate.DegreeCourses == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Course", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeStreams == null || this.campusCandidate.DegreeStreams == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Stream", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeUniversity == null || this.campusCandidate.DegreeUniversity == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Institution", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeInstituteName == null || this.campusCandidate.DegreeInstituteName == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && this.campusCandidate.DegreeUniversity == 0 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Institute Name", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeInstituteLocation == null || this.campusCandidate.DegreeInstituteLocation == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Institution Location", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeYearOfPassing == null || this.campusCandidate.DegreeYearOfPassing == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Year of Passing", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeMarks == "" || this.campusCandidate.DegreeMarks == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Marks", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeMarks < 30 || this.campusCandidate.DegreeMarks > 100) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Enter between 30% to 100% ", "");
                    return false;
                  } // pg / pg diploma validation
                  else if ((this.campusCandidate.PostDegreeCourseStatus == null || this.campusCandidate.PostDegreeCourseStatus == undefined) && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Course Status ", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeCourses == null || this.campusCandidate.PostDegreeCourses == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Course", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeStreams == null || this.campusCandidate.PostDegreeStreams == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Stream", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeUniversity == null || this.campusCandidate.PostDegreeUniversity == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Institution", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeInstituteName == null || this.campusCandidate.PostDegreeInstituteName == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && this.campusCandidate.PostDegreeUniversity == 0 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Institute Name", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeInstituteLocation == null || this.campusCandidate.PostDegreeInstituteLocation == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Institution Location", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeYearOfPassing == null || this.campusCandidate.PostDegreeYearOfPassing == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Year of Passing", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeMarks == "" || this.campusCandidate.PostDegreeMarks == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Marks", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeMarks < 30 || this.campusCandidate.PostDegreeMarks > 100) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Enter between 30% to 100%", "");
                      return false;
                    } else if ((this.campusCandidate.AnyOtherQualificationMarks < 30 || this.campusCandidate.AnyOtherQualificationMarks > 100) && this.campusCandidate.AnyOtherQualificationMarks != undefined && this.campusCandidate.AnyOtherQualificationMarks != "") {
                      this.notificationService.showError("Enter between 30% to 100%", "");
                      return false;
                    } // else if(this.campusCandidateAcademic.length==0){
                    //   this.notificationService.showError("Please Enter Academic Details ","");
                    //   return false;
                    // }
                    else if (this.campusCandidate.YearsCommitments == null || this.campusCandidate.YearsCommitments == undefined) {
                        this.notificationService.showError("Please Enter Years Commitments ", "");
                        return false;
                      } else if (this.campusCandidate.AnyWhereinIndia == null || this.campusCandidate.AnyWhereinIndia == undefined) {
                        this.notificationService.showError("Please Enter AnyWhere in India ", "");
                        return false;
                      } else if (this.campusCandidate.WorkinginShift == null || this.campusCandidate.WorkinginShift == undefined) {
                        this.notificationService.showError("Please Enter Working Shift ", "");
                        return false;
                      } else if (this.campusCandidate.JobTypePriority == "" || this.campusCandidate.JobTypePriority == undefined) {
                        this.notificationService.showError("Please Enter Job Type Priority ", "");
                        return false;
                      } else if (this.campusCandidate.CriticalFactor == "" || this.campusCandidate.CriticalFactor == undefined) {
                        this.notificationService.showError("Please Enter Critical Factor ", "");
                        return false;
                      } else if (this.campusCandidate.MostPreferdBenifit == null || this.campusCandidate.MostPreferdBenifit == undefined) {
                        this.notificationService.showError("Please Enter Most Preferd Benifit ", "");
                        return false;
                      } else if (this.campusCandidate.ExtraCurricularActivities == null || this.campusCandidate.ExtraCurricularActivities == undefined) {
                        this.notificationService.showError("Please Enter Extra Curricular Activities ", "");
                        return false;
                      } else if (this.campusCandidate.ActiveArrears == null || this.campusCandidate.ActiveArrears == undefined) {
                        this.notificationService.showError("Please Enter Active Arrears ", "");
                        return false;
                      } // else if(this.campusCandidate.candidatefileToUpload==""||this.campusCandidate.candidatefileToUpload==undefined){
                      //   this.notificationService.showError("Please Enter Resume ","");
                      // return false;
                      // }
                      else if (this.candidatefileToUpload == null) {
                          this.notificationService.showError("Please upload Resume ", "");
                          return false;
                        } else if (this.candidatefileToUpload.size > 512000) {
                          this.notificationService.showError("Resume Size Can't be greater than 500KB", "");
                          return false;
                        } else if (this.isChecked == false) {
                          this.notificationService.showError("Please Accept the Terms and Conditions ", "");
                          return false;
                        } else {
                          return true;
                        }
        }
      }, {
        key: "validateEmail",
        value: function validateEmail(email) {
          // Regular expression to validate email format
          var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          this.isValidEmail = emailPattern.test(email);
        }
      }, {
        key: "onFileChange",
        value: function onFileChange(files) {
          var _this18 = this;

          this.invalidFileName = false;
          var filenameforValidationCheck = files[0].name.replace(".pdf", "");
          var specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
          specialChars.forEach(function (element) {
            if (filenameforValidationCheck.includes(element)) {
              _this18.invalidFileName = true;
            }
          });
          var mimeType = files[0].type;

          if (mimeType.match(/pdf\/*/) == null) {
            this.notificationService.showError("Only pdf files are supported", "Error");
            return;
          }

          if (this.invalidFileName) {
            this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
            this.candidateResumeImport.nativeElement.innerText = "Choose file";
            this.candidatefileToUpload = null;
            return;
          }

          if (files.length > 0) {
            if (files[0].size > 2097152) {
              this.notificationService.showError("File should be less than 2MB!", "Error");
              this.candidateResumeImport.nativeElement.innerText = "Choose file";
              this.candidatefileToUpload = null;
            } else {
              this.candidateResumeImport.nativeElement.innerText = files[0].name;
              this.candidatefileToUpload = files.item(0);
            }
          } else {
            this.candidateResumeImport.nativeElement.innerText = "Choose file";
            this.candidatefileToUpload = null;
          }
        }
      }, {
        key: "onclickback",
        value: function onclickback() {}
      }, {
        key: "numberOnly",
        value: function numberOnly(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
          }

          return true;
        }
      }, {
        key: "numberOnlymarks",
        value: function numberOnlymarks(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode == 46) {
            return true;
          } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
          } else {
            return true;
          }
        }
      }, {
        key: "numberOnlyeye",
        value: function numberOnlyeye(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode > 47 && charCode < 58 || charCode == 43 || charCode == 45 || charCode == 46) {
            return true;
          }

          return false;
        }
      }, {
        key: "email",
        value: function email(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode > 47 && charCode < 58 || charCode > 96 && charCode < 123 || charCode == 64 || charCode == 46) {
            return true;
          }

          return false;
        }
      }, {
        key: "checkValue",
        value: function checkValue(event) {
          if (event.target.checked == true) {
            this.isChecked = true;
          } else {
            this.isChecked = false;
          }
        }
      }, {
        key: "getCandidateDetails",
        value: function getCandidateDetails(status) {// if(status==true){
          // }
          // else{
          // this.campusCandidate={
          //   PrefixId:undefined,
          //   FullName:"",
          //   DOB:"",
          //   Age:undefined,
          //   GenderId:undefined,
          //   EmailId:"",
          //   ContactNo:"",
          //   AadharNo:"",
          //   MotherTongueId:undefined,
          //   LanguageIds:"",
          //   HomeTown:"",
          //   NativeState:undefined,
          //   PresentState:undefined,
          //   Height:undefined,
          //   Weight:undefined,
          //   EyeSightCorrected:undefined,
          //   EyeSightRight:undefined,
          //   EyeSightLeft:undefined,
          //   FatherOccupation:undefined,
          //   MotherOccupation:undefined,
          //   Disability:undefined,
          //   DisabilityDetails:"",
          //   HealthIssue:undefined,
          //   HealthIssueDetails:"",
          //   NoofSiblings:undefined,
          // }
          //}
        }
      }]);

      return CampusregistrationComponent;
    }();

    CampusregistrationComponent.ctorParameters = function () {
      return [{
        type: _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_9__["NotificationService"]
      }, {
        type: _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]
      }, {
        type: _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_7__["CourseService"]
      }, {
        type: _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_6__["StreamService"]
      }, {
        type: _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_8__["QualificationService"]
      }, {
        type: _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"]
      }, {
        type: src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_10__["CampusrequisitionService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_12__["NgxSpinnerService"]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('tDate', {
      static: false
    }), __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], CampusregistrationComponent.prototype, "tDate", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('candidateResumeImport', {
      static: false
    }), __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], CampusregistrationComponent.prototype, "candidateResumeImport", void 0);

    CampusregistrationComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-campusregistration',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./campusregistration.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/campusregistration/campusregistration.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./campusregistration.component.css */
      "./src/app/commonpages/campusregistration/campusregistration.component.css")).default]
    }), __metadata("design:paramtypes", [_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_9__["NotificationService"], _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_7__["CourseService"], _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_6__["StreamService"], _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_8__["QualificationService"], _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"], src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_10__["CampusrequisitionService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_12__["NgxSpinnerService"]])], CampusregistrationComponent);
    /***/
  },

  /***/
  "./src/app/commonpages/off-campus-registration/off-campus-registration.component.css":
  /*!*******************************************************************************************!*\
    !*** ./src/app/commonpages/off-campus-registration/off-campus-registration.component.css ***!
    \*******************************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCommonpagesOffCampusRegistrationOffCampusRegistrationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1vbnBhZ2VzL29mZi1jYW1wdXMtcmVnaXN0cmF0aW9uL29mZi1jYW1wdXMtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5jc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/commonpages/off-campus-registration/off-campus-registration.component.ts":
  /*!******************************************************************************************!*\
    !*** ./src/app/commonpages/off-campus-registration/off-campus-registration.component.ts ***!
    \******************************************************************************************/

  /*! exports provided: OffCampusRegistrationComponent */

  /***/
  function srcAppCommonpagesOffCampusRegistrationOffCampusRegistrationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OffCampusRegistrationComponent", function () {
      return OffCampusRegistrationComponent;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/common/common/common.service */
    "./src/app/services/common/common/common.service.ts");
    /* harmony import */


    var _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../services/common/language/language.service */
    "./src/app/services/common/language/language.service.ts");
    /* harmony import */


    var _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../services/common/stream/stream.service */
    "./src/app/services/common/stream/stream.service.ts");
    /* harmony import */


    var _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../services/common/course/course.service */
    "./src/app/services/common/course/course.service.ts");
    /* harmony import */


    var _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../services/common/qualification/qualification.service */
    "./src/app/services/common/qualification/qualification.service.ts");
    /* harmony import */


    var _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");
    /* harmony import */


    var src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! src/app/services/campus/campusrequisition/campusrequisition.service */
    "./src/app/services/campus/campusrequisition/campusrequisition.service.ts");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var src_app_services_common_domain_domain_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! src/app/services/common/domain/domain.service */
    "./src/app/services/common/domain/domain.service.ts");
    /* harmony import */


    var src_environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! src/environments/environment */
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

    var OffCampusRegistrationComponent =
    /*#__PURE__*/
    function () {
      function OffCampusRegistrationComponent(notificationService, domainService, commonService, courseService, streamService, qualificationService, languageService, fb, toasterService, _route, titleService, requisitionService, SpinnerService) {
        _classCallCheck(this, OffCampusRegistrationComponent);

        this.notificationService = notificationService;
        this.domainService = domainService;
        this.commonService = commonService;
        this.courseService = courseService;
        this.streamService = streamService;
        this.qualificationService = qualificationService;
        this.languageService = languageService;
        this.fb = fb;
        this.toasterService = toasterService;
        this._route = _route;
        this.titleService = titleService;
        this.requisitionService = requisitionService;
        this.SpinnerService = SpinnerService;
        this.pageTitle = "Registration";
        this.campusCandidate = {};
        this.campusCandidateAcademic = [];
        this.campusCandidateAcademicAnyOtherQualification = [];
        this.states = [];
        this.languages = [];
        this.searchLanguages = {
          languageId: null,
          isActive: null
        };
        this.campusLinks = [];
        this.searchCampusLink = {
          campusCourseId: null,
          campusYearId: null,
          createdBy: null,
          campusLinkId: null
        };
        this.domain = [];
        this.searchDomain = {
          domainId: null,
          parentDomainId: null,
          isActive: true
        };
        this.subdomain = [];
        this.searchSubDomain = {
          domainId: null,
          parentDomainId: null,
          isActive: true
        };
        this.CompletionYear = [];
        this.tenCourseList = [];
        this.twelveCourseList = [];
        this.diplomaCourseList = [];
        this.degreeCourses = [];
        this.degreeCourseList = [];
        this.postDegreeCourseList = [];
        this.postDegreeCourses = [];
        this.searchCourse = {
          qualificationId: null,
          courseId: null,
          isActive: true
        };
        this.degreeStreamList = [];
        this.diplomaStreamList = [];
        this.postDegreeStreamList = [];
        this.searchStream = {
          qualificationId: null,
          courseId: null,
          streamId: null,
          isActive: true
        };
        this.searchUniversity = {
          qulificationUniversityBoardId: null,
          isActive: null
        };
        this.familyOccupations = [];
        this.candidatefileToUpload = null;
        this.calcAge = "0";
        this.showTen = false;
        this.showTwelve = false;
        this.showDegree = false;
        this.showDiploma = false;
        this.showPG = false;
        this.showAnyOther = false;
        this.disableyear = false;
        this.disablemarks = false;
        this.disableDipyear = false;
        this.disableDipmarks = false;
        this.disableDipCourse = false;
        this.disableDipSpecial = false;
        this.disableDipInstitute = false;
        this.disableDipInsname = false;
        this.disableDipInsloc = false;
        this.disabletweCourse = false;
        this.experiences = [];
        this.Months = [];
        this.isExperienced = false;
        this.ExperienceMonth = "";
        this.ExperienceYear = "";
        this.isRelativeVisible = false;
        this.motherOccupations = [];
        this.extracuricullar = [];
        this.hidepginstitute = true;
        this.hideunderinstitute = true;
        this.hideanyotherinstitute = true;
        this.hidediplomainstitutename = true;
        this.markten = false;
        this.marktwelve = false;
        this.markdiploma = false;
        this.markundergrad = false;
        this.markpostgrad = false;
        this.markanyothr = false;
        this.readeye = false;
        this.readdisability = false;
        this.readhealth = false;
        this.disablecourse = false;
        this.disablediplomayear = false;
        this.disablediplomamarks = false;
        this.disablediplomacourse = false;
        this.disablediplomaspecial = false;
        this.disablediplomainstitute = false;
        this.disablediplomainstitutename = false;
        this.disablediplomainstitutelocation = false;
        this.disablegradyear = false;
        this.disablegradmarks = false;
        this.disablegradcourse = false;
        this.disablegradspecial = false;
        this.disablegradinstitute = false;
        this.disablegradinstitutename = false;
        this.disablegradinstitutelocation = false;
        this.disablepgyear = false;
        this.disablepgmarks = false;
        this.disablepgcourse = false;
        this.disablepgspecial = false;
        this.disablepginstitute = false;
        this.disablepginstitutename = false;
        this.disablepginstitutelocation = false;
        this.isChecked = false;
        this.invalidFileName = false;
        this.currentUrl = this._route.url;
        this.currentUrl = this.currentUrl.replace("%3D", "=").replace("%3D", "=").replace("%3D", "=");
        this.getAllCampusLink();
        this.getAllState();
        this.getAllLanguages();
        this.getAllCompletionYears();
        this.getAll10Course();
        this.getAll12Course();
        this.getAllDiplomaCourse();
        this.getAllDegreeCourses();
        this.getAllPGCourses();
        this.getAllUniversity(); // this.getAllFamilyOccupations();
        // this.getAllExperience()
        // this. getAllCompletionYearsAndMonths();
        // this.getAllDomain()

        this.getAllFatherOccupations();
        this.getAllMotherOccupations();
        this.getALlExtraCuricullarActivities();
        this.isExperienced = true;
      }

      _createClass(OffCampusRegistrationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          this.loadDatePicker();
        }
      }, {
        key: "chck",
        value: function chck() {
          if (this.campusCandidate.TenMarks < 30 || this.campusCandidate.TenMarks > 100) {
            this.markten = true;
          } else {
            this.markten = false;
          }
        }
      }, {
        key: "chcktwelve",
        value: function chcktwelve() {
          if (this.campusCandidate.TwelveMarks < 30 || this.campusCandidate.TwelveMarks > 100) {
            this.marktwelve = true;
          } else {
            this.marktwelve = false;
          }
        }
      }, {
        key: "chckdiploma",
        value: function chckdiploma() {
          if (this.campusCandidate.DiplomaMarks < 30 || this.campusCandidate.DiplomaMarks > 100) {
            this.markdiploma = true;
          } else {
            this.markdiploma = false;
          }
        }
      }, {
        key: "chckundergrad",
        value: function chckundergrad() {
          if (this.campusCandidate.DegreeMarks < 30 || this.campusCandidate.DegreeMarks > 100) {
            this.markundergrad = true;
          } else {
            this.markundergrad = false;
          }
        }
      }, {
        key: "chckpostgrad",
        value: function chckpostgrad() {
          if (this.campusCandidate.PostDegreeMarks < 30 || this.campusCandidate.PostDegreeMarks > 100) {
            this.markpostgrad = true;
          } else {
            this.markpostgrad = false;
          }
        }
      }, {
        key: "chckanyothr",
        value: function chckanyothr() {
          if (this.campusCandidate.AnyOtherQualificationMarks < 30 || this.campusCandidate.AnyOtherQualificationMarks > 100) {
            this.markanyothr = true;
          } else {
            this.markanyothr = false;
          }
        }
      }, {
        key: "getAllCampusLink",
        value: function getAllCampusLink() {
          var _this19 = this;

          this.SpinnerService.show();
          this.searchCampusLink.campusYearId = 0;
          this.searchCampusLink.createdBy = 0;
          this.requisitionService.getAllOffCampusLink(this.searchCampusLink).subscribe(function (response) {
            if (response) {
              _this19.campusLinks = response;
              _this19.campusLinks = _this19.campusLinks.filter(function (x) {
                return x.campusLink == src_environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].campuslink + _this19.currentUrl;
              });
              setTimeout(function () {
                _this19.loadDatePicker();
              }, 200);
            } else {
              _this19.campusLinks = [];
            }
          }, function (error) {
            _this19.notificationService.showError("Something went wrong.. Try again later..", "");

            console.log(error);
          }, function () {
            _this19.SpinnerService.hide();
          });
        }
      }, {
        key: "changeLanguageKnown",
        value: function changeLanguageKnown() {}
      }, {
        key: "loadDatePicker",
        value: function loadDatePicker() {
          var today = new Date();
          var dothis = this;
          jQuery(".datepicker").parent(".input-group").datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            endDate: today,
            todayHighlight: true
          }).on("change", function (e) {
            var selecteddate = e.target.value;

            if (selecteddate != "") {
              var birthDate = new Date(selecteddate.substring(6, 10) + "/" + selecteddate.substring(3, 5) + "/" + selecteddate.substring(0, 2));
              var age = today.getFullYear() - birthDate.getFullYear();
              var m = today.getMonth() - birthDate.getMonth();

              if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
                age--;
              }

              dothis.DOB = e.target.value; //dothis.saveForm.patchValue({ DOB: e.target.value });

              dothis.calcAge = age.toString(); //this.saveForm.value.Age=age;

              jQuery("#txtAge").val(age);
            } else {
              jQuery("#txtAge").val("");
              dothis.calcAge = "0";
              dothis.saveForm.patchValue({
                DOB: ""
              });
            }
          });
        }
      }, {
        key: "getAllState",
        value: function getAllState() {
          var _this20 = this;

          this.states = [];
          this.commonService.getAllState().subscribe(function (result) {
            if (result) {
              _this20.states = result;
            } else {
              _this20.states = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllLanguages",
        value: function getAllLanguages() {
          var _this21 = this;

          this.languages = [];
          this.searchLanguages.languageId = 0;
          this.searchLanguages.isActive = true;
          this.languageService.getAllLanguage(this.searchLanguages).subscribe(function (result) {
            if (result) {
              _this21.languages = result;
            } else {
              _this21.languages = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            setTimeout(function () {
              jQuery('.selectpicker').selectpicker('refresh');
            });
          });
        }
      }, {
        key: "getAllCompletionYears",
        value: function getAllCompletionYears() {
          this.CompletionYear = [];
          var currentyear = new Date().getFullYear() + 1;
          this.CompletionYear.push({
            yearsId: parseInt("0"),
            yearsName: "Select"
          });

          for (var i = currentyear; i > currentyear - 40; i--) {
            this.CompletionYear.push({
              yearsId: parseInt(i.toString()),
              yearsName: i.toString()
            });
          }
        }
      }, {
        key: "getAll10Course",
        value: function getAll10Course() {
          var _this22 = this;

          this.tenCourseList = [];
          this.searchCourse.qualificationId = 10;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this22.tenCourseList = result;
            } else {
              _this22.tenCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAll12Course",
        value: function getAll12Course() {
          var _this23 = this;

          this.twelveCourseList = [];
          this.searchCourse.qualificationId = 16;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this23.twelveCourseList = result;
            } else {
              _this23.twelveCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDiplomaCourse",
        value: function getAllDiplomaCourse() {
          var _this24 = this;

          this.diplomaCourseList = [];
          this.searchCourse.qualificationId = 5;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this24.diplomaCourseList = result;
            } else {
              _this24.diplomaCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDegreeCourses",
        value: function getAllDegreeCourses() {
          var _this25 = this;

          this.degreeCourses = [];
          this.degreeCourseList = [];
          this.searchCourse.qualificationId = 2;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this25.degreeCourses = result;

              for (var i = 0; i < _this25.degreeCourses.length; i++) {
                _this25.degreeCourseList.push({
                  qualificationId: 2,
                  qualificationName: "",
                  courseId: _this25.degreeCourses[i].courseId,
                  courseName: _this25.degreeCourses[i].courseName,
                  isActive: _this25.degreeCourses[i].isActive
                });
              }
            } else {
              _this25.degreeCourses = [];
              _this25.degreeCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
          this.searchCourse.qualificationId = 4;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this25.degreeCourses = result;

              for (var i = 0; i < _this25.degreeCourses.length; i++) {
                _this25.degreeCourseList.push({
                  qualificationId: 4,
                  qualificationName: "",
                  courseId: _this25.degreeCourses[i].courseId,
                  courseName: _this25.degreeCourses[i].courseName,
                  isActive: _this25.degreeCourses[i].isActive
                });
              }
            } else {
              _this25.degreeCourses = []; //this.degreeCourseList=[];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllPGCourses",
        value: function getAllPGCourses() {
          var _this26 = this;

          this.postDegreeCourseList = [];
          this.postDegreeCourses = [];
          this.searchCourse.qualificationId = 6;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this26.postDegreeCourses = result;

              for (var i = 0; i < _this26.postDegreeCourses.length; i++) {
                _this26.postDegreeCourseList.push({
                  qualificationId: 6,
                  qualificationName: "",
                  courseId: _this26.postDegreeCourses[i].courseId,
                  courseName: _this26.postDegreeCourses[i].courseName,
                  isActive: _this26.postDegreeCourses[i].isActive
                });
              }
            } else {
              _this26.postDegreeCourses = [];
              _this26.postDegreeCourseList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
          this.searchCourse.qualificationId = 3;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this26.postDegreeCourses = result;

              for (var i = 0; i < _this26.postDegreeCourses.length; i++) {
                _this26.postDegreeCourseList.push({
                  qualificationId: 3,
                  qualificationName: "",
                  courseId: _this26.postDegreeCourses[i].courseId,
                  courseName: _this26.postDegreeCourses[i].courseName,
                  isActive: _this26.postDegreeCourses[i].isActive
                });
              }
            } else {
              _this26.postDegreeCourses = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDegreeStream",
        value: function getAllDegreeStream(data) {
          var _this27 = this;

          this.degreeStreamList = [];
          this.searchStream.qualificationId = data.qualificationId; //this.searchStream.qualificationId = 2;

          this.searchStream.courseId = data.courseId;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this27.degreeStreamList = result;
            } else {
              _this27.degreeStreamList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllDiplomaStream",
        value: function getAllDiplomaStream(data) {
          var _this28 = this;

          this.diplomaStreamList = [];
          this.searchStream.qualificationId = 5;
          this.searchStream.courseId = data;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this28.diplomaStreamList = result;
            } else {
              _this28.diplomaStreamList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllPostDegreeStream",
        value: function getAllPostDegreeStream(data) {
          var _this29 = this;

          this.postDegreeStreamList = [];
          this.searchStream.qualificationId = data.qualificationId;
          this.searchStream.courseId = data.courseId;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this29.postDegreeStreamList = result;
            } else {
              _this29.postDegreeStreamList = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllUniversity",
        value: function getAllUniversity() {
          var _this30 = this;

          this.academicUniversity = [];
          this.commonService.getAllQualificationUniversityBoard(this.searchUniversity).subscribe(function (result) {
            if (result) {
              _this30.academicUniversity = result;

              _this30.academicUniversity.push({
                qulificationUniversityBoardId: 0,
                qulificationUniversityBoardName: "Others",
                isActive: true
              });
            } else {
              _this30.academicUniversity = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "getAllFatherOccupations",
        value: function getAllFatherOccupations() {
          this.familyOccupations = [];
          this.familyOccupations.push({
            name: "Business",
            id: 1
          });
          this.familyOccupations.push({
            name: "Govt. Employee",
            id: 2
          });
          this.familyOccupations.push({
            name: "Private Sector",
            id: 3
          }); // this.familyOccupations.push({ name: "Housewife", id: 4 });

          this.familyOccupations.push({
            name: "Retired",
            id: 5
          });
          this.familyOccupations.push({
            name: "Public Sector",
            id: 6
          });
          this.familyOccupations.push({
            name: "Self Employed",
            id: 7
          });
          this.familyOccupations.push({
            name: "Others",
            id: 8
          });
        }
      }, {
        key: "getAllMotherOccupations",
        value: function getAllMotherOccupations() {
          this.motherOccupations = [];
          this.motherOccupations.push({
            name: "Business",
            id: 1
          });
          this.motherOccupations.push({
            name: "Govt. Employee",
            id: 2
          });
          this.motherOccupations.push({
            name: "Private Sector",
            id: 3
          });
          this.motherOccupations.push({
            name: "Homemaker",
            id: 4
          });
          this.motherOccupations.push({
            name: "Retired",
            id: 5
          });
          this.motherOccupations.push({
            name: "Public Sector",
            id: 6
          });
          this.motherOccupations.push({
            name: "Self Employed",
            id: 7
          });
          this.motherOccupations.push({
            name: "Others",
            id: 8
          });
        }
      }, {
        key: "getALlExtraCuricullarActivities",
        value: function getALlExtraCuricullarActivities() {
          this.extracuricullar = [];
          this.extracuricullar.push({
            name: "NCC / Scouts",
            id: 1
          });
          this.extracuricullar.push({
            name: "National Service Scheme",
            id: 2
          });
          this.extracuricullar.push({
            name: "Sports",
            id: 3
          });
          this.extracuricullar.push({
            name: "Athletics",
            id: 4
          });
          this.extracuricullar.push({
            name: "Arts (Acting, Dance, Photography, Painting, etc)",
            id: 5
          });
          this.extracuricullar.push({
            name: "College Clubs (Cultural, Academic, OtherCometitions)",
            id: 6
          });
          this.extracuricullar.push({
            name: "Others",
            id: 7
          });
        }
      }, {
        key: "changeQualification",
        value: function changeQualification(data) {
          if (data == "-1") {
            this.showTen = true;
            this.showTwelve = false;
            this.showDegree = false;
            this.showDiploma = false;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "1") {
            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = false;
            this.showDiploma = false;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "5") {
            if (this.campusCandidate.TwelveCourseStatus == 3) {}

            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = false;
            this.showDiploma = true;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "2" || data == "4") {
            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = true;
            this.showDiploma = true;
            this.showPG = false;
            this.showAnyOther = true;
          } else if (data == "3" || data == "6") {
            this.showTen = true;
            this.showTwelve = true;
            this.showDegree = true;
            this.showDiploma = true;
            this.showPG = true;
            this.showAnyOther = true;
          }
        }
      }, {
        key: "onchangeeye",
        value: function onchangeeye(rec) {
          if (rec == 0) {
            this.readeye = true;
            this.campusCandidate.EyeSightRight = "";
            this.campusCandidate.EyeSightLeft = "";
          } else {
            this.readeye = false;
          }
        }
      }, {
        key: "onchangedisab",
        value: function onchangedisab(rec) {
          if (rec == 0) {
            this.readdisability = true;
            this.campusCandidate.DisabilityDetails = "";
          } else {
            this.readdisability = false;
          }
        }
      }, {
        key: "onchangehealth",
        value: function onchangehealth(rec) {
          if (rec == 0) {
            this.readhealth = true;
            this.campusCandidate.HealthIssueDetails = "";
          } else {
            this.readhealth = false;
          }
        }
      }, {
        key: "onchangecourse",
        value: function onchangecourse(rec) {
          // console.log("defaultval",this.campusCandidate.TwelveCourses)
          if (rec == 3) {
            this.disableyear = true;
            this.disablemarks = true;
            this.disablecourse = true;
            this.campusCandidate.TwelveCourses = undefined;
            this.campusCandidate.TwelveYearOfPassing = undefined;
            this.campusCandidate.TwelveMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disableyear = false;
            this.disablemarks = false;
            this.disablecourse = false;
          }
        }
      }, {
        key: "onchangediploma",
        value: function onchangediploma(rec) {
          if (rec == 3) {
            this.disablediplomaspecial = true;
            this.disablediplomainstitute = true;
            this.disablediplomainstitutename = true;
            this.disablediplomainstitutelocation = true;
            this.disablediplomayear = true;
            this.disablediplomamarks = true;
            this.disablediplomacourse = true;
            this.campusCandidate.DiplomaCourses = undefined;
            this.campusCandidate.DiplomaStreams = undefined;
            this.campusCandidate.DiplomaUniversity = undefined;
            this.campusCandidate.DiplomaInstituteName = undefined;
            this.campusCandidate.DiplomaInstituteLocation = undefined;
            this.campusCandidate.DiplomaYearOfPassing = undefined;
            this.campusCandidate.DiplomaMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disablediplomaspecial = false;
            this.disablediplomainstitute = false;
            this.disablediplomainstitutename = false;
            this.disablediplomainstitutelocation = false;
            this.disablediplomayear = false;
            this.disablediplomamarks = false;
            this.disablediplomacourse = false;
          }
        }
      }, {
        key: "onchangediplomainstitute",
        value: function onchangediplomainstitute(rec) {
          if (rec == 0) {
            this.hidediplomainstitutename = false;
          } else {
            this.hidediplomainstitutename = true;
          }
        }
      }, {
        key: "onchangeunderinstitute",
        value: function onchangeunderinstitute(rec) {
          if (rec == 0) {
            this.hideunderinstitute = false;
          } else {
            this.hideunderinstitute = true;
          }
        }
      }, {
        key: "onchangepginstitute",
        value: function onchangepginstitute(rec) {
          if (rec == 0) {
            this.hidepginstitute = false;
          } else {
            this.hidepginstitute = true;
          }
        }
      }, {
        key: "onchangeanyotherinstituteinstitute",
        value: function onchangeanyotherinstituteinstitute(rec) {
          if (rec == 0) {
            this.hideanyotherinstitute = false;
          } else {
            this.hideanyotherinstitute = true;
          }
        }
      }, {
        key: "onchangegraduation",
        value: function onchangegraduation(rec) {
          if (rec == 3) {
            this.disablegradspecial = true;
            this.disablegradinstitute = true;
            this.disablegradinstitutename = true;
            this.disablegradinstitutelocation = true;
            this.disablegradyear = true;
            this.disablegradmarks = true;
            this.disablegradcourse = true;
            this.campusCandidate.DegreeCourses = undefined;
            this.campusCandidate.DegreeStreams = undefined;
            this.campusCandidate.DegreeUniversity = undefined;
            this.campusCandidate.DegreeInstituteName = undefined;
            this.campusCandidate.DegreeInstituteLocation = undefined;
            this.campusCandidate.DegreeYearOfPassing = undefined;
            this.campusCandidate.DegreeMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disablegradspecial = false;
            this.disablegradinstitute = false;
            this.disablegradinstitutename = false;
            this.disablegradinstitutelocation = false;
            this.disablegradyear = false;
            this.disablegradmarks = false;
            this.disablegradcourse = false;
          }
        }
      }, {
        key: "onchangepg",
        value: function onchangepg(rec) {
          if (rec == 3) {
            this.disablepgspecial = true;
            this.disablepginstitute = true;
            this.disablepginstitutename = true;
            this.disablepginstitutelocation = true;
            this.disablepgyear = true;
            this.disablepgmarks = true;
            this.disablepgcourse = true;
            this.campusCandidate.PostDegreeCourses = undefined;
            this.campusCandidate.PostDegreeStreams = undefined;
            this.campusCandidate.PostDegreeUniversity = undefined;
            this.campusCandidate.PostDegreeInstituteName = undefined;
            this.campusCandidate.PostDegreeInstituteLocation = undefined;
            this.campusCandidate.PostDegreeYearOfPassing = undefined;
            this.campusCandidate.PostDegreeMarks = undefined;
          } else if (rec == 1 || rec == 2) {
            this.disablepgspecial = false;
            this.disablepginstitute = false;
            this.disablepginstitutename = false;
            this.disablepginstitutelocation = false;
            this.disablepgyear = false;
            this.disablepgmarks = false;
            this.disablepgcourse = false;
          }
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this31 = this;

          if (this.campusCandidate.EmailId != "" || this.campusCandidate.EmailId != undefined) {
            this.validateEmail(this.campusCandidate.EmailId);
          }

          if (this.isvalid()) {
            this.SpinnerService.show();
            this.campusCandidateAcademic = [];
            this.campusCandidateAcademicAnyOtherQualification = [];

            if (this.campusCandidate.HighestQualification == "-1") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
            }

            if (this.campusCandidate.HighestQualification == "1") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });
            }

            if (this.campusCandidate.HighestQualification == "5") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });

              if (this.campusCandidate.DiplomaCourses != undefined) {
                this.campusCandidateAcademic.push({
                  CampusCandidateAcademicId: 0,
                  CampusCandidateId: 0,
                  VisualOrder: 3,
                  Qualification: 5,
                  Course: this.campusCandidate.DiplomaCourses,
                  CourseStatus: this.campusCandidate.DiplomaCourseStatus,
                  StreamName: this.campusCandidate.DiplomaStreams,
                  Specalization: "",
                  Instutation: this.campusCandidate.DiplomaUniversity,
                  InstutationName: this.campusCandidate.DiplomaInstituteName == undefined ? "" : this.campusCandidate.DiplomaInstituteName,
                  InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
                  YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
                  Marks: this.campusCandidate.DiplomaMarks
                });
              }
            }

            if (this.campusCandidate.HighestQualification == "2" || this.campusCandidate.HighestQualification == "4") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });

              if (this.campusCandidate.DiplomaCourses != undefined) {
                this.campusCandidateAcademic.push({
                  CampusCandidateAcademicId: 0,
                  CampusCandidateId: 0,
                  VisualOrder: 3,
                  Qualification: 5,
                  Course: this.campusCandidate.DiplomaCourses,
                  CourseStatus: this.campusCandidate.DiplomaCourseStatus,
                  StreamName: this.campusCandidate.DiplomaStreams,
                  Specalization: "",
                  Instutation: this.campusCandidate.DiplomaUniversity,
                  InstutationName: this.campusCandidate.DiplomaInstituteName == undefined ? "" : this.campusCandidate.DiplomaInstituteName,
                  InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
                  YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
                  Marks: this.campusCandidate.DiplomaMarks
                });
              }

              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 4,
                Qualification: 2,
                Course: this.campusCandidate.DegreeCourses.courseId,
                CourseStatus: this.campusCandidate.DegreeCourseStatus,
                StreamName: this.campusCandidate.DegreeStreams,
                Specalization: "",
                Instutation: this.campusCandidate.DegreeUniversity,
                InstutationName: this.campusCandidate.DegreeInstituteName == undefined ? "" : this.campusCandidate.DegreeInstituteName,
                InstutationLocation: this.campusCandidate.DegreeInstituteLocation,
                YearOfPassing: this.campusCandidate.DegreeYearOfPassing,
                Marks: this.campusCandidate.DegreeMarks
              });
            }

            if (this.campusCandidate.HighestQualification == "3" || this.campusCandidate.HighestQualification == "6") {
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 1,
                Qualification: 1,
                Course: this.campusCandidate.TenCourses,
                CourseStatus: this.campusCandidate.TenCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TenYearOfPassing,
                Marks: this.campusCandidate.TenMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 2,
                Qualification: 1,
                Course: this.campusCandidate.TwelveCourses,
                CourseStatus: this.campusCandidate.TwelveCourseStatus,
                StreamName: 0,
                Specalization: "",
                Instutation: 0,
                InstutationName: "",
                InstutationLocation: 0,
                YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
                Marks: this.campusCandidate.TwelveMarks
              });

              if (this.campusCandidate.DiplomaCourses != undefined) {
                this.campusCandidateAcademic.push({
                  CampusCandidateAcademicId: 0,
                  CampusCandidateId: 0,
                  VisualOrder: 3,
                  Qualification: 5,
                  Course: this.campusCandidate.DiplomaCourses,
                  CourseStatus: this.campusCandidate.DiplomaCourseStatus,
                  StreamName: this.campusCandidate.DiplomaStreams,
                  Specalization: "",
                  Instutation: this.campusCandidate.DiplomaUniversity,
                  InstutationName: this.campusCandidate.DiplomaInstituteName == undefined ? "" : this.campusCandidate.DiplomaInstituteName,
                  InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
                  YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
                  Marks: this.campusCandidate.DiplomaMarks
                });
              }

              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 4,
                Qualification: 2,
                Course: this.campusCandidate.DegreeCourses.courseId,
                CourseStatus: this.campusCandidate.DegreeCourseStatus,
                StreamName: this.campusCandidate.DegreeStreams,
                Specalization: "",
                Instutation: this.campusCandidate.DegreeUniversity,
                InstutationName: this.campusCandidate.DegreeInstituteName == undefined ? "" : this.campusCandidate.DegreeInstituteName,
                InstutationLocation: this.campusCandidate.DegreeInstituteLocation,
                YearOfPassing: this.campusCandidate.DegreeYearOfPassing,
                Marks: this.campusCandidate.DegreeMarks
              });
              this.campusCandidateAcademic.push({
                CampusCandidateAcademicId: 0,
                CampusCandidateId: 0,
                VisualOrder: 5,
                Qualification: 3,
                Course: this.campusCandidate.PostDegreeCourses.courseId,
                CourseStatus: this.campusCandidate.PostDegreeCourseStatus,
                StreamName: this.campusCandidate.PostDegreeStreams,
                Specalization: "",
                Instutation: this.campusCandidate.PostDegreeUniversity,
                InstutationName: this.campusCandidate.PostDegreeInstituteName == undefined ? "" : this.campusCandidate.PostDegreeInstituteName,
                InstutationLocation: this.campusCandidate.PostDegreeInstituteLocation,
                YearOfPassing: this.campusCandidate.PostDegreeYearOfPassing,
                Marks: this.campusCandidate.PostDegreeMarks
              });
            }

            if ((this.campusCandidate.AnyOtherQualification != undefined || this.campusCandidate.AnyOtherQualification != "") && (this.campusCandidate.AnyOtherQualificationCourse != undefined || this.campusCandidate.AnyOtherQualificationCourse != "") && this.campusCandidate.AnyOtherQualificationCourseStatus != undefined && (this.campusCandidate.AnyOtherQualificationStream != undefined || this.campusCandidate.AnyOtherQualificationStream != "") && this.campusCandidate.AnyOtherQualificationInstitite != undefined && this.campusCandidate.AnyOtherQualificationInstititeLocation != undefined && this.campusCandidate.AnyOtherQualificationYearOfPassing != undefined && this.campusCandidate.AnyOtherQualificationMarks != undefined) {
              this.campusCandidateAcademicAnyOtherQualification = [];
              this.campusCandidateAcademicAnyOtherQualification.push({
                CampusCandidateAnyOtherQualificationId: 0,
                CampusCandidateId: 0,
                QualificationName: this.campusCandidate.AnyOtherQualification,
                CourseName: this.campusCandidate.AnyOtherQualificationCourse,
                CourseStatus: this.campusCandidate.AnyOtherQualificationCourseStatus,
                Specalization: this.campusCandidate.AnyOtherQualificationStream,
                Instutation: this.campusCandidate.AnyOtherQualificationInstitite,
                InstutationName: this.campusCandidate.AnyOtherQualificationInstititeName == undefined ? "" : this.campusCandidate.AnyOtherQualificationInstititeName,
                InstutationLocation: this.campusCandidate.AnyOtherQualificationInstititeLocation,
                YearOfPassing: this.campusCandidate.AnyOtherQualificationYearOfPassing,
                Marks: this.campusCandidate.AnyOtherQualificationMarks
              });
            } else {
              this.campusCandidateAcademicAnyOtherQualification = [];
            }

            var formData = new FormData();
            formData.append("CampusCandidateId", "0");
            formData.append("CampusLinkId", this.campusLinks[0].campusLinkId.toString());
            formData.append("CandidateId", "0");
            formData.append("FullName", this.campusCandidate.FullName);
            formData.append("Gender", this.campusCandidate.GenderId);
            formData.append("DOB", this.DOB);
            formData.append("Age", this.calcAge);
            formData.append("EmailId", this.campusCandidate.EmailId);
            formData.append("PhoneNo", this.campusCandidate.ContactNo);
            formData.append("AadharNo", this.campusCandidate.AadharNo);
            formData.append("MotherTongue", this.campusCandidate.MotherTongueId);
            formData.append("LanguageKnown", this.campusCandidate.LanguageIds);
            formData.append("Height", this.campusCandidate.Height);
            formData.append("Weight", this.campusCandidate.Weight);
            formData.append("HomeTown", this.campusCandidate.HomeTown);
            formData.append("NativeState", this.campusCandidate.NativeState);
            formData.append("PresentState", this.campusCandidate.PresentState);
            formData.append("HighestQualification", this.campusCandidate.HighestQualification);
            formData.append("EyeSightCorrected", this.campusCandidate.EyeSightCorrected == 1 ? "true" : "false");
            formData.append("EyeSightRight", this.campusCandidate.EyeSightRight == undefined ? "0" : this.campusCandidate.EyeSightRight);
            formData.append("EyeSightLeft", this.campusCandidate.EyeSightLeft == undefined ? "0" : this.campusCandidate.EyeSightLeft);
            formData.append("FatherOccupation", this.campusCandidate.FatherOccupation);
            formData.append("MotherOccupation", this.campusCandidate.MotherOccupation);
            formData.append("Disability", this.campusCandidate.Disability == 1 ? "true" : "false");
            formData.append("DisabilityDetails", this.campusCandidate.DisabilityDetails == undefined ? "" : this.campusCandidate.DisabilityDetails);
            formData.append("HealthIssue", this.campusCandidate.HealthIssue == 1 ? "true" : "false");
            formData.append("HealthIssueDetails", this.campusCandidate.HealthIssueDetails == undefined ? "" : this.campusCandidate.HealthIssueDetails);
            formData.append("NoofSiblings", this.campusCandidate.NoofSiblings);
            formData.append("YearsCommitments", this.campusCandidate.YearsCommitments);
            formData.append("AnyWhereinIndia", this.campusCandidate.AnyWhereinIndia);
            formData.append("WorkinginShift", this.campusCandidate.WorkinginShift);
            formData.append("JobTypePriority", this.campusCandidate.JobTypePriority);
            formData.append("CriticalFactor", this.campusCandidate.CriticalFactor);
            formData.append("MostPreferdBenifit", this.campusCandidate.MostPreferdBenifit);
            formData.append("ExtraCurricularActivities", this.campusCandidate.ExtraCurricularActivities);
            formData.append("ActiveArrears", this.campusCandidate.ActiveArrears);
            formData.append("DeletedIds", "0");
            formData.append("CreatedBy", "0");
            formData.append("CampusCandidateAcademic", JSON.stringify(this.campusCandidateAcademic));
            formData.append("CampusCandidateAnyOtherAcademic", JSON.stringify(this.campusCandidateAcademicAnyOtherQualification));
            formData.append("CandidateResumeFile", this.candidatefileToUpload); // this.SpinnerService.show();

            this.requisitionService.saveOffCampusCandidate(formData).subscribe(function (result) {
              if (result.successFlag == 1) {
                _this31.notificationService.showSuccess(result.msg, "Success");

                _this31.SpinnerService.hide();
              } else {
                _this31.notificationService.showError(result.msg, "Error");

                _this31.SpinnerService.hide();
              }
            }, function (error) {
              // display form values on success
              _this31.notificationService.showError("Something went wrong.. Try again later..", "");

              _this31.SpinnerService.hide();
            });
          }
        }
      }, {
        key: "isvalid",
        value: function isvalid() {
          debugger;

          if (this.campusCandidate.FullName == "" || this.campusCandidate.FullName == undefined) {
            this.notificationService.showError("Please Enter Name", "");
            return false;
          } else if (this.campusCandidate.GenderId == null || this.campusCandidate.GenderId == undefined) {
            this.notificationService.showError("Please Enter Gender", "");
            return false;
          } else if (this.campusCandidate.EmailId == "" || this.campusCandidate.EmailId == undefined) {
            this.notificationService.showError("Please Enter Email", "");
            return false;
          } else if (this.isValidEmail == false) {
            this.notificationService.showError("Please Enter valid Email", "");
            return false;
          } else if (this.campusCandidate.ContactNo == "" || this.campusCandidate.ContactNo == undefined) {
            this.notificationService.showError("Please Enter Phone No", "");
            return false;
          } else if (this.campusCandidate.ContactNo.length < 10) {
            this.notificationService.showError("Please Enter 10 digits of Contact No", "");
            return false;
          } else if (this.campusCandidate.AadharNo == "" || this.campusCandidate.AadharNo == undefined) {
            this.notificationService.showError("Please Enter Aadhar No", "");
            return false;
          } else if (this.campusCandidate.AadharNo.length < 12) {
            this.notificationService.showError("Please Enter 12 digits of Aadhar No", "");
            return false;
          } else if (this.campusCandidate.HomeTown == "" || this.campusCandidate.HomeTown == undefined) {
            this.notificationService.showError("Please Enter Home Town ", "");
            return false;
          } else if (this.campusCandidate.NativeState == "" || this.campusCandidate.NativeState == undefined) {
            this.notificationService.showError("Please Enter Native State ", "");
            return false;
          } else if (this.campusCandidate.PresentState == "" || this.campusCandidate.PresentState == undefined) {
            this.notificationService.showError("Please Enter Present State ", "");
            return false;
          } else if (this.campusCandidate.MotherTongueId == "" || this.campusCandidate.MotherTongueId == undefined) {
            this.notificationService.showError("Please Enter Mother Tongue ", "");
            return false;
          } else if (this.campusCandidate.LanguageIds == "" || this.campusCandidate.LanguageIds == undefined) {
            this.notificationService.showError("Please Enter Languages ", "");
            return false;
          } else if (this.campusCandidate.Height == null || this.campusCandidate.Height == undefined) {
            this.notificationService.showError("Please Enter Height ", "");
            return false;
          } else if (Number(this.campusCandidate.Height) < 100) {
            this.notificationService.showError("Height less than 100cm is not accepted ", "");
            return false;
          } else if (this.campusCandidate.Weight == null || this.campusCandidate.Weight == undefined) {
            this.notificationService.showError("Please Enter Weight ", "");
            return false;
          } else if (Number(this.campusCandidate.Weight) < 30) {
            this.notificationService.showError("Weight less than 30kg is not accepted ", "");
            return false;
          } else if (this.campusCandidate.EyeSightCorrected == null || this.campusCandidate.EyeSightCorrected == undefined) {
            this.notificationService.showError("Please Enter Eye Sight Corrected ", "");
            return false;
          } else if ((this.campusCandidate.EyeSightRight == null || this.campusCandidate.EyeSightRight == undefined) && this.campusCandidate.EyeSightCorrected == 1) {
            this.notificationService.showError("Please Enter Eye Sight Right value ", "");
            return false;
          } else if ((this.campusCandidate.EyeSightLeft == null || this.campusCandidate.EyeSightLeft == undefined) && this.campusCandidate.EyeSightCorrected == 1) {
            this.notificationService.showError("Please Enter Eye Sight Left value ", "");
            return false;
          } else if (this.campusCandidate.FatherOccupation == "" || this.campusCandidate.FatherOccupation == undefined) {
            this.notificationService.showError("Please Enter Father Occupation ", "");
            return false;
          } else if (this.campusCandidate.MotherOccupation == "" || this.campusCandidate.MotherOccupation == undefined) {
            this.notificationService.showError("Please Enter Mother Occupation ", "");
            return false;
          } else if (this.campusCandidate.Disability == null || this.campusCandidate.Disability == undefined) {
            this.notificationService.showError("Please Enter Disability ", "");
            return false;
          } else if ((this.campusCandidate.DisabilityDetails == null || this.campusCandidate.DisabilityDetails == undefined) && this.campusCandidate.Disability == 1) {
            this.notificationService.showError("Please Enter Disability Details", "");
            return false;
          } else if (this.campusCandidate.HealthIssue == null || this.campusCandidate.HealthIssue == undefined) {
            this.notificationService.showError("Please Enter Health Issue ", "");
            return false;
          } else if ((this.campusCandidate.HealthIssueDetails == null || this.campusCandidate.HealthIssueDetails == undefined) && this.campusCandidate.HealthIssue == 1) {
            this.notificationService.showError("Please Enter Health Issue Details", "");
            return false;
          } else if (this.campusCandidate.NoofSiblings == "" || this.campusCandidate.NoofSiblings == undefined) {
            this.notificationService.showError("Please Enter No of Siblings ", "");
            return false;
          } else if (Number(this.campusCandidate.NoofSiblings) > 10) {
            this.notificationService.showError("More than 10 siblings is not applicable ", "");
            return false;
          } else if (this.campusCandidate.HighestQualification == null || this.campusCandidate.HighestQualification == undefined) {
            this.notificationService.showError("Please select Highest Qualification ", "");
            return false;
          } // ten validation
          else if (this.campusCandidate.TenCourseStatus == null || this.campusCandidate.TenCourseStatus == undefined) {
              this.notificationService.showError("Please select High School Course Status ", "");
              return false;
            } else if (this.campusCandidate.TenCourses == null || this.campusCandidate.TenCourses == undefined) {
              this.notificationService.showError("Please select High School Course", "");
              return false;
            } else if (this.campusCandidate.TenYearOfPassing == null || this.campusCandidate.TenYearOfPassing == undefined) {
              this.notificationService.showError("Please select High School Year of Passing", "");
              return false;
            } else if (this.campusCandidate.TenMarks == "" || this.campusCandidate.TenMarks == undefined) {
              this.notificationService.showError("Please select High School Marks", "");
              return false;
            } else if (this.campusCandidate.TenMarks < 30 || this.campusCandidate.TenMarks > 100) {
              this.notificationService.showError("Enter between 30% to 100%", "");
              return false;
            } // higher secondary validation
            else if (this.campusCandidate.TwelveCourseStatus == null || this.campusCandidate.TwelveCourseStatus == undefined) {
                this.notificationService.showError("Please select Higher Secondary Course Status ", "");
                return false;
              } else if ((this.campusCandidate.TwelveCourses == null || this.campusCandidate.TwelveCourses == undefined) && this.campusCandidate.TwelveCourseStatus != 3) {
                this.notificationService.showError("Please select Higher Secondary Course", "");
                return false;
              } else if ((this.campusCandidate.TwelveYearOfPassing == null || this.campusCandidate.TwelveYearOfPassing == undefined) && this.campusCandidate.TwelveCourseStatus != 3) {
                this.notificationService.showError("Please select Higher Secondary Year of Passing", "");
                return false;
              } else if ((this.campusCandidate.TwelveMarks == "" || this.campusCandidate.TwelveMarks == undefined) && this.campusCandidate.TwelveCourseStatus != 3) {
                this.notificationService.showError("Please select Higher Secondary Marks", "");
                return false;
              } else if (this.campusCandidate.TwelveMarks < 30 || this.campusCandidate.TwelveMarks > 100) {
                this.notificationService.showError("Enter between 30% to 100%", "");
                return false;
              } // diploma validation
              else if (this.campusCandidate.DiplomaCourseStatus == null || this.campusCandidate.DiplomaCourseStatus == undefined) {
                  this.notificationService.showError("Please select Diploma Course Status ", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaCourses == null || this.campusCandidate.DiplomaCourses == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Course", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaStreams == null || this.campusCandidate.DiplomaStreams == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Stream", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaUniversity == null || this.campusCandidate.DiplomaUniversity == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Institution", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaInstituteName == null || this.campusCandidate.DiplomaInstituteName == undefined) && this.campusCandidate.DiplomaCourseStatus != 3 && this.campusCandidate.DiplomaUniversity == 0) {
                  this.notificationService.showError("Please select Diploma Institute Name", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaInstituteLocation == null || this.campusCandidate.DiplomaInstituteLocation == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Institution Location", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaYearOfPassing == null || this.campusCandidate.DiplomaYearOfPassing == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Year of Passing", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaMarks == "" || this.campusCandidate.DiplomaMarks == undefined) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Please select Diploma Marks", "");
                  return false;
                } else if ((this.campusCandidate.DiplomaMarks < 30 || this.campusCandidate.DiplomaMarks > 100) && this.campusCandidate.DiplomaCourseStatus != 3) {
                  this.notificationService.showError("Enter between 30% to 100% ", "");
                  return false;
                } // Under Grad Validation
                else if ((this.campusCandidate.DegreeCourseStatus == null || this.campusCandidate.DegreeCourseStatus == undefined) && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Course Status ", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeCourses == null || this.campusCandidate.DegreeCourses == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Course", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeStreams == null || this.campusCandidate.DegreeStreams == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Stream", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeUniversity == null || this.campusCandidate.DegreeUniversity == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Institution", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeInstituteName == null || this.campusCandidate.DegreeInstituteName == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && this.campusCandidate.DegreeUniversity == 0 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Institute Name", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeInstituteLocation == null || this.campusCandidate.DegreeInstituteLocation == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Institution Location", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeYearOfPassing == null || this.campusCandidate.DegreeYearOfPassing == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Year of Passing", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeMarks == "" || this.campusCandidate.DegreeMarks == undefined) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Please select Under Graduation Marks", "");
                    return false;
                  } else if ((this.campusCandidate.DegreeMarks < 30 || this.campusCandidate.DegreeMarks > 100) && this.campusCandidate.DegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 2 || this.campusCandidate.HighestQualification == 6 || this.campusCandidate.HighestQualification == 3)) {
                    this.notificationService.showError("Enter between 30% to 100% ", "");
                    return false;
                  } // pg / pg diploma validation
                  else if ((this.campusCandidate.PostDegreeCourseStatus == null || this.campusCandidate.PostDegreeCourseStatus == undefined) && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Course Status ", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeCourses == null || this.campusCandidate.PostDegreeCourses == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Course", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeStreams == null || this.campusCandidate.PostDegreeStreams == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Stream", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeUniversity == null || this.campusCandidate.PostDegreeUniversity == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Institution", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeInstituteName == null || this.campusCandidate.PostDegreeInstituteName == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && this.campusCandidate.PostDegreeUniversity == 0 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Institute Name", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeInstituteLocation == null || this.campusCandidate.PostDegreeInstituteLocation == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Institution Location", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeYearOfPassing == null || this.campusCandidate.PostDegreeYearOfPassing == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Year of Passing", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeMarks == "" || this.campusCandidate.PostDegreeMarks == undefined) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Please select Post Graduation / PG Diploma Marks", "");
                      return false;
                    } else if ((this.campusCandidate.PostDegreeMarks < 30 || this.campusCandidate.PostDegreeMarks > 100) && this.campusCandidate.PostDegreeCourseStatus != 3 && (this.campusCandidate.HighestQualification == 3 || this.campusCandidate.HighestQualification == 6)) {
                      this.notificationService.showError("Enter between 30% to 100%", "");
                      return false;
                    } else if ((this.campusCandidate.AnyOtherQualificationMarks < 30 || this.campusCandidate.AnyOtherQualificationMarks > 100) && this.campusCandidate.AnyOtherQualificationMarks != undefined && this.campusCandidate.AnyOtherQualificationMarks != "") {
                      this.notificationService.showError("Enter between 30% to 100%", "");
                      return false;
                    } // else if(this.campusCandidateAcademic.length==0){
                    //   this.notificationService.showError("Please Enter Academic Details ","");
                    //   return false;
                    // }
                    else if (this.campusCandidate.YearsCommitments == null || this.campusCandidate.YearsCommitments == undefined) {
                        this.notificationService.showError("Please Enter Years Commitments ", "");
                        return false;
                      } else if (this.campusCandidate.AnyWhereinIndia == null || this.campusCandidate.AnyWhereinIndia == undefined) {
                        this.notificationService.showError("Please Enter AnyWhere in India ", "");
                        return false;
                      } else if (this.campusCandidate.WorkinginShift == null || this.campusCandidate.WorkinginShift == undefined) {
                        this.notificationService.showError("Please Enter Working Shift ", "");
                        return false;
                      } else if (this.campusCandidate.JobTypePriority == "" || this.campusCandidate.JobTypePriority == undefined) {
                        this.notificationService.showError("Please Enter Job Type Priority ", "");
                        return false;
                      } else if (this.campusCandidate.CriticalFactor == "" || this.campusCandidate.CriticalFactor == undefined) {
                        this.notificationService.showError("Please Enter Critical Factor ", "");
                        return false;
                      } else if (this.campusCandidate.MostPreferdBenifit == null || this.campusCandidate.MostPreferdBenifit == undefined) {
                        this.notificationService.showError("Please Enter Most Preferd Benifit ", "");
                        return false;
                      } else if (this.campusCandidate.ExtraCurricularActivities == null || this.campusCandidate.ExtraCurricularActivities == undefined) {
                        this.notificationService.showError("Please Enter Extra Curricular Activities ", "");
                        return false;
                      } else if (this.campusCandidate.ActiveArrears == null || this.campusCandidate.ActiveArrears == undefined) {
                        this.notificationService.showError("Please Enter Active Arrears ", "");
                        return false;
                      } // else if(this.campusCandidate.candidatefileToUpload==""||this.campusCandidate.candidatefileToUpload==undefined){
                      //   this.notificationService.showError("Please Enter Resume ","");
                      // return false;
                      // }
                      else if (this.candidatefileToUpload == null) {
                          this.notificationService.showError("Please upload Resume ", "");
                          return false;
                        } else if (this.candidatefileToUpload.size > 512000) {
                          this.notificationService.showError("Resume Size Can't be greater than 500KB", "");
                          return false;
                        } else if (this.isChecked == false) {
                          this.notificationService.showError("Please Accept the Terms and Conditions ", "");
                          return false;
                        } else {
                          return true;
                        }
        }
      }, {
        key: "validateEmail",
        value: function validateEmail(email) {
          // Regular expression to validate email format
          var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          this.isValidEmail = emailPattern.test(email);
        }
      }, {
        key: "onFileChange",
        value: function onFileChange(files) {
          var _this32 = this;

          this.invalidFileName = false;
          var filenameforValidationCheck = files[0].name.replace(".pdf", "");
          var specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
          specialChars.forEach(function (element) {
            if (filenameforValidationCheck.includes(element)) {
              _this32.invalidFileName = true;
            }
          });
          var mimeType = files[0].type;

          if (mimeType.match(/pdf\/*/) == null) {
            this.notificationService.showError("Only pdf files are supported", "Error");
            return;
          }

          if (this.invalidFileName) {
            this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
            this.candidateResumeImport.nativeElement.innerText = "Choose file";
            this.candidatefileToUpload = null;
            return;
          }

          if (files.length > 0) {
            if (files[0].size > 2097152) {
              this.notificationService.showError("File should be less than 2MB!", "Error");
              this.candidateResumeImport.nativeElement.innerText = "Choose file";
              this.candidatefileToUpload = null;
            } else {
              this.candidateResumeImport.nativeElement.innerText = files[0].name;
              this.candidatefileToUpload = files.item(0);
            }
          } else {
            this.candidateResumeImport.nativeElement.innerText = "Choose file";
            this.candidatefileToUpload = null;
          }
        }
      }, {
        key: "onclickback",
        value: function onclickback() {}
      }, {
        key: "numberOnly",
        value: function numberOnly(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
          }

          return true;
        }
      }, {
        key: "numberOnlymarks",
        value: function numberOnlymarks(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode == 46) {
            return true;
          } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
          } else {
            return true;
          }
        }
      }, {
        key: "numberOnlyeye",
        value: function numberOnlyeye(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode > 47 && charCode < 58 || charCode == 43 || charCode == 45 || charCode == 46) {
            return true;
          }

          return false;
        }
      }, {
        key: "email",
        value: function email(event) {
          var charCode = event.which ? event.which : event.keyCode;

          if (charCode > 47 && charCode < 58 || charCode > 96 && charCode < 123 || charCode == 64 || charCode == 46) {
            return true;
          }

          return false;
        }
      }, {
        key: "checkValue",
        value: function checkValue(event) {
          if (event.target.checked == true) {
            this.isChecked = true;
          } else {
            this.isChecked = false;
          }
        }
      }, {
        key: "getCandidateDetails",
        value: function getCandidateDetails(status) {// if(status==true){
          // }
          // else{
          // this.campusCandidate={
          //   PrefixId:undefined,
          //   FullName:"",
          //   DOB:"",
          //   Age:undefined,
          //   GenderId:undefined,
          //   EmailId:"",
          //   ContactNo:"",
          //   AadharNo:"",
          //   MotherTongueId:undefined,
          //   LanguageIds:"",
          //   HomeTown:"",
          //   NativeState:undefined,
          //   PresentState:undefined,
          //   Height:undefined,
          //   Weight:undefined,
          //   EyeSightCorrected:undefined,
          //   EyeSightRight:undefined,
          //   EyeSightLeft:undefined,
          //   FatherOccupation:undefined,
          //   MotherOccupation:undefined,
          //   Disability:undefined,
          //   DisabilityDetails:"",
          //   HealthIssue:undefined,
          //   HealthIssueDetails:"",
          //   NoofSiblings:undefined,
          // }
          //}
        }
      }]);

      return OffCampusRegistrationComponent;
    }();

    OffCampusRegistrationComponent.ctorParameters = function () {
      return [{
        type: _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_9__["NotificationService"]
      }, {
        type: src_app_services_common_domain_domain_service__WEBPACK_IMPORTED_MODULE_13__["DomainService"]
      }, {
        type: _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]
      }, {
        type: _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_7__["CourseService"]
      }, {
        type: _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_6__["StreamService"]
      }, {
        type: _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_8__["QualificationService"]
      }, {
        type: _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"]
      }, {
        type: src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_10__["CampusrequisitionService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_12__["NgxSpinnerService"]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('tDate', {
      static: false
    }), __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], OffCampusRegistrationComponent.prototype, "tDate", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('candidateResumeImport', {
      static: false
    }), __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])], OffCampusRegistrationComponent.prototype, "candidateResumeImport", void 0);

    OffCampusRegistrationComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-off-campus-registration',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./off-campus-registration.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/off-campus-registration/off-campus-registration.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./off-campus-registration.component.css */
      "./src/app/commonpages/off-campus-registration/off-campus-registration.component.css")).default]
    }), __metadata("design:paramtypes", [_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_9__["NotificationService"], src_app_services_common_domain_domain_service__WEBPACK_IMPORTED_MODULE_13__["DomainService"], _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_7__["CourseService"], _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_6__["StreamService"], _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_8__["QualificationService"], _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"], src_app_services_campus_campusrequisition_campusrequisition_service__WEBPACK_IMPORTED_MODULE_10__["CampusrequisitionService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_12__["NgxSpinnerService"]])], OffCampusRegistrationComponent);
    /***/
  },

  /***/
  "./src/app/layouts/windowlayout/windowlayout.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/layouts/windowlayout/windowlayout.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLayoutsWindowlayoutWindowlayoutComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvd2luZG93bGF5b3V0L3dpbmRvd2xheW91dC5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/layouts/windowlayout/windowlayout.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/layouts/windowlayout/windowlayout.component.ts ***!
    \****************************************************************/

  /*! exports provided: WindowlayoutComponent */

  /***/
  function srcAppLayoutsWindowlayoutWindowlayoutComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "WindowlayoutComponent", function () {
      return WindowlayoutComponent;
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

    var WindowlayoutComponent =
    /*#__PURE__*/
    function () {
      function WindowlayoutComponent() {
        _classCallCheck(this, WindowlayoutComponent);

        document.body.style.paddingTop = "0px";
      }

      _createClass(WindowlayoutComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return WindowlayoutComponent;
    }();

    WindowlayoutComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-windowlayout',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./windowlayout.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/windowlayout/windowlayout.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./windowlayout.component.css */
      "./src/app/layouts/windowlayout/windowlayout.component.css")).default]
    }), __metadata("design:paramtypes", [])], WindowlayoutComponent);
    /***/
  }
}]);
//# sourceMappingURL=campus-offcampus-registration-campus-offcampus-registration-module-es5.js.map