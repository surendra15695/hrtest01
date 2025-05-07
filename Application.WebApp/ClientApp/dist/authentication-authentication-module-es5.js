function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["authentication-authentication-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/createaccount/createaccount.component.html":
  /*!**************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/createaccount/createaccount.component.html ***!
    \**************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCommonpagesCreateaccountCreateaccountComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!-- <div class=\"login-form\">\r\n    <div class=\"mrf-logo\">\r\n        <img src=\"assets/images/MRF_logo.jpg\" alt=\"\">\r\n        \r\n        <div class=\"pt-3 pb-3\">\r\n            <h4>CREATE ACCOUNT</h4>\r\n        </div>\r\n\r\n    </div>\r\n    \r\n    <form class=\"needs-validation\" class=\"signUpForm\" novalidate [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n        <div class=\"form_area\">\r\n            <div class=\"form-group\">\r\n                \r\n                <input type=\"text\" class=\"form-control\" id=\"validationCustomUsername\" placeholder=\"Name\"\r\n                    autocomplete=\"off\" formControlName=\"name\" aria-describedby=\"inputGroupPrepend\" required>\r\n                <div class=\"invalid-feedback\">\r\n                    Please enter name.\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                \r\n                <input type=\"text\" class=\"form-control\" id=\"validationCustomUsername\" placeholder=\"Email Id\"\r\n                    autocomplete=\"off\" formControlName=\"emailId\" aria-describedby=\"inputGroupPrepend\" required>\r\n                <div class=\"invalid-feedback\">\r\n                    Please enter name.\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group \">\r\n                \r\n                <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"Password\"\r\n                    id=\"validationCustomPassword\" aria-describedby=\"inputGroupPrepend\" required>\r\n\r\n                <div class=\"invalid-feedback\">\r\n                    Please enter Password.\r\n                </div>\r\n\r\n            </div>\r\n            <div class=\"form-group \">\r\n                \r\n                <input [type]=\"passwordhide ? 'password' : 'text'\" placeholder=\"ReType Password\" class=\"form-control\"\r\n                    id=\"id_password\" formControlName=\"repassword\" autocomplete=\"off\"\r\n                    aria-describedby=\"inputGroupPrepend\" required>\r\n                <i [class]=\"passwordhide ? 'fa fa-fw field-icon toggle-password fa-eye pass-blind-icon' :'fa fa-fw field-icon toggle-password fa-eye-slash pass-blind-icon'\"\r\n                    id=\"togglePassword\" (click)=\"onclickeye()\"></i>\r\n                <div class=\"invalid-feedback\">\r\n                    Please re type password\r\n                </div>\r\n            </div>\r\n            <button type=\"button\" class=\"btn login-btn\" type=\"submit\">Submit</button>\r\n            <p class=\"my-3\">Already have an account? <a routerLink=\"/auth/login\" class=\"red\">Sign In</a></p>\r\n            <p class=\"my-3\">If you face any issues please write us on <a routerLink=\"javascript:void(0)\"\r\n                    class=\"red\">recruiter2.dahej@mrfmail.com</a></p>\r\n        </div>\r\n    </form>\r\n</div>\r\n\r\n<ngx-spinner bdColor=\"rgba(51,51,51,0.8)\" size=\"medium\" color=\"#fff\" type=\"ball-scale-multiple\">\r\n    <p style=\"font-size: 20px; color: white\">Loading...</p>\r\n</ngx-spinner> -->\r\n\r\n\r\n<!--the whole page is comemnted by Amartya on 21-08-2023 for new requirement-->\r\n<div class=\"createAccount\">\r\n    <div class=\"headerpart\">\r\n        <div class=\"mrf-logo\">\r\n            <img src=\"assets/images/MRF_logo.jpg\" alt=\"\" style=\"text-align: center;\">\r\n        </div>\r\n    </div>\r\n    <div class=\"\">\r\n        <div class=\"container-fluid\">\r\n\r\n            <div class=\"page-title-area pb-2 mb-0\">\r\n                <!-- <a href=\"javascript:void(0)\" routerLink=\"/auth/login\" class=\"back-btn\"><i\r\n                class=\"las la-arrow-circle-left\"></i></a> -->\r\n                <h1 class=\"f-l\">Candidate Create Profile</h1>\r\n            </div>\r\n            <form [formGroup]=\"saveForm\" (ngSubmit)=\"onSubmit()\" autocomplete=\"off\">\r\n                <div class=\"content-box m-b-15 m-t-10\">\r\n\r\n                    <!-- <div class=\"page-title-area pb-2 mb-2\">\r\n                <a href=\"javascript:void(0)\" routerLink=\"/auth/login\" class=\"back-btn\"><i\r\n                        class=\"las la-arrow-circle-left\"></i></a>\r\n                <h1 class=\"f-l\">Create Profile</h1>\r\n            </div> -->\r\n                    <h6 class=\"red\">General information</h6>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Name<span class=\"required\">*</span></label>\r\n                                <div class=\"form-row\">\r\n                                    <div class=\"col-3\">\r\n                                        <div class=\"dropdown bootstrap-select form-control\">\r\n                                            <ng-select bindLabel=\"prefixName\" [placeholder]=\"'Select'\"\r\n                                                [appendTo]=\"'body'\" [multiple]=\"false\" [searchable]=\"false\"\r\n                                                [clearable]=\"false\" formControlName=\"PrefixId\">\r\n                                                <ng-option [value]=\"rec.prefixId\" *ngFor=\"let rec of prefix\">\r\n                                                    {{rec.prefixName}}\r\n                                                </ng-option>\r\n                                            </ng-select>\r\n                                            <p class=\"error-msg\"\r\n                                                *ngIf=\"saveForm.controls['PrefixId'].touched && !saveForm.controls['PrefixId'].valid\">\r\n                                                <span\r\n                                                    *ngIf=\"saveForm.controls['PrefixId'].hasError('required') || saveForm.controls['PrefixId']==undefined \">Required</span>\r\n                                            </p>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-9\">\r\n                                        <input type=\"text\" class=\"form-control\" formControlName=\"FullName\"\r\n                                            name=\"FullName\" placeholder=\"Name as per Aadhar card\">\r\n                                        <p class=\"error-msg\"\r\n                                            *ngIf=\"saveForm.controls['FullName'].touched && !saveForm.controls['FullName'].valid\">\r\n                                            <span\r\n                                                *ngIf=\"saveForm.controls['FullName'].hasError('required') \">Required</span>\r\n                                        </p>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Gender<span class=\"required\">*</span></label>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input formControlName=\"GenderId\" name=\"GenderId\" value=\"1\" #radio1 id=\"radio1\"\r\n                                        type=\"radio\" [checked]=\"selectedGenderId==1?true:false\">\r\n                                    <label for=\"radio1\">Male</label>\r\n                                </div>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input formControlName=\"GenderId\" name=\"GenderId\" value=\"2\" #radio2 id=\"radio2\"\r\n                                        type=\"radio\" [checked]=\"selectedGenderId==2?true:false\">\r\n                                    <label for=\"radio2\">Female</label>\r\n                                </div>\r\n                                <div class=\"rdio rdio-primary d-inline-block\">\r\n                                    <input formControlName=\"GenderId\" name=\"GenderId\" value=\"3\" #radio3 id=\"radio3\"\r\n                                        type=\"radio\" [checked]=\"selectedGenderId==3?true:false\">\r\n                                    <label for=\"radio3\">Others</label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Date of Birth<span class=\"required\">*</span></label>\r\n                                <div class=\"input-group datepiker date\">\r\n                                    <input type=\"text\" class=\"form-control pull-right datepicker\" formControlName=\"DOB\"\r\n                                        name=\"DOB\" placeholder=\"dd-mm-yyyy\">\r\n                                    <div class=\"input-group-append\">\r\n                                        <span class=\"input-group-text\" id=\"basic-addon2\"><i\r\n                                                class=\"fa fa-calendar\"></i></span>\r\n                                    </div>\r\n                                </div>\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['DOB'].touched && !saveForm.controls['DOB'].valid\">\r\n                                    <span *ngIf=\"saveForm.controls['DOB'].hasError('required') \">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Age</label>\r\n                                <input type=\"text\" (keypress)=\"keyPress($event)\" disabled id=\"txtAge\" maxlength=\"2\"\r\n                                    class=\"form-control\" formControlName=\"Age\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Email ID<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" name=\"EmailId\" formControlName=\"EmailId\"\r\n                                    placeholder=\"Enter email\" />\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['EmailId'].touched && !saveForm.controls['EmailId'].valid\">\r\n                                    <span *ngIf=\"saveForm.controls['EmailId'].hasError('required') \">Required</span>\r\n                                    <span *ngIf=\"saveForm.controls['EmailId'].hasError('pattern') \">Invalid data</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Phone No.<span class=\"required\">*</span></label>\r\n                                <input (keypress)=\"keyPress($event)\" maxlength=\"10\" type=\"text\" class=\"form-control\"\r\n                                    formControlName=\"ContactNo\" placeholder=\"Eg:9800123456\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['ContactNo'].touched && !saveForm.controls['ContactNo'].valid\">\r\n                                    <span *ngIf=\"saveForm.controls['ContactNo'].hasError('required') \">Required\r\n                                        no.</span>\r\n                                    <span *ngIf=\"saveForm.controls['ContactNo'].hasError('pattern') \">Should be 10\r\n                                        digit</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Aadhar No.<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" (keypress)=\"keyPress($event)\" class=\"form-control\"\r\n                                    formControlName=\"AadharNo\" maxlength=\"12\" placeholder=\"Eg:123412341234\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['AadharNo'].touched && !saveForm.controls['AadharNo'].valid\">\r\n                                    <span *ngIf=\"saveForm.controls['AadharNo'].hasError('required') \">Required</span>\r\n                                    <span *ngIf=\"saveForm.controls['AadharNo'].hasError('pattern') \">Should be 12\r\n                                        digit</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Mother Tongue<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"languageName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        formControlName=\"MotherTongueId\">\r\n                                        <ng-option [value]=\"rec.languageId\" *ngFor=\"let rec of languages\">\r\n                                            {{rec.languageName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg\"\r\n                                        *ngIf=\"saveForm.controls['MotherTongueId'].touched && !saveForm.controls['MotherTongueId'].valid\">\r\n                                        <span\r\n                                            *ngIf=\"saveForm.controls['MotherTongueId'].hasError('required') || saveForm.controls['MotherTongueId']==undefined \">Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <!--<div class=\"col-md-2\">\r\n                <div class=\"form-group\">\r\n                    <label>Languages Known<span class=\"required\">*</span></label>\r\n                    <div class=\"dropdown bootstrap-select form-control\">\r\n                        <ng-select bindLabel=\"languageName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\" \r\n                            [multiple]=\"true\" [searchable]=\"true\" [clearable]=\"false\" formControlName=\"LanguageIds\"\r\n                            (change)=\"changeLanguageKnown()\">\r\n                            <ng-option [value]=\"rec.languageId\" *ngFor=\"let rec of languages\">\r\n                                {{rec.languageName}}\r\n                            </ng-option>\r\n                        </ng-select>\r\n                        <p class=\"error-msg\"\r\n                            *ngIf=\"saveForm.controls['LanguageIds'].touched && !saveForm.controls['LanguageIds'].valid\">\r\n                            <span *ngIf=\"saveForm.controls['LanguageIds'].hasError('required') || saveForm.controls['LanguageIds']==undefined \">Required</span>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>-->\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label>Languages Known<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <select class=\"selectpicker form-control md-size-list\" multiple title=\"Select\"\r\n                                        formControlName=\"LanguageIds\" tabindex=\"-98\">\r\n                                        <option *ngFor=\"let rec of languages\" [ngValue]=\"rec.languageId\">\r\n                                            {{rec.languageName}}\r\n                                        </option>\r\n                                    </select>\r\n                                    <p class=\"error-msg\"\r\n                                        *ngIf=\"saveForm.controls['LanguageIds'].touched && !saveForm.controls['LanguageIds'].valid\">\r\n                                        <span\r\n                                            *ngIf=\"saveForm.controls['LanguageIds'].hasError('required') || saveForm.controls['LanguageIds']==undefined \">Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Highest Qualification<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"qualificationName\" [placeholder]=\"'Select'\"\r\n                                        [appendTo]=\"'body'\" [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        (change)=\"changeQualification($event)\" formControlName=\"QualificationId\">\r\n                                        <ng-option [value]=\"rec.qualificationId\" *ngFor=\"let rec of qualifications\">\r\n                                            {{rec.qualificationName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgqualificationid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Course<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"courseName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        (change)=\"changeCourse($event)\" formControlName=\"CourseId\">\r\n                                        <ng-option [value]=\"rec.courseId\" *ngFor=\"let rec of courses\">\r\n                                            {{rec.courseName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgcourseid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Stream<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"streamName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        formControlName=\"StreamId\">\r\n                                        <ng-option [value]=\"rec.streamId\" *ngFor=\"let rec of streams\">\r\n                                            {{rec.streamName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgstreamid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Percentage<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" appTwoDigitDecimaNumber maxlength=\"5\" class=\"form-control\"\r\n                                    formControlName=\"MarksPercentage\" placeholder=\"CGPA to be conv. to %\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['MarksPercentage'].touched && !saveForm.controls['MarksPercentage'].valid\">\r\n                                    <span\r\n                                        *ngIf=\"saveForm.controls['MarksPercentage'].hasError('required') \">Required</span>\r\n                                    <span *ngIf=\"saveForm.controls['MarksPercentage'].hasError('pattern') \">Invalid\r\n                                        data</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Year of Completion<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"yearsName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        formControlName=\"CompletionYear\">\r\n                                        <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of CompletionYear\">\r\n                                            {{rec.yearsName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg mscompletionyearid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Qualification Type<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"qualificationTypeName\" [placeholder]=\"'Select'\"\r\n                                        [appendTo]=\"'body'\" [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                        formControlName=\"QualificationTypeId\">\r\n                                        <ng-option [value]=\"rec.qualificationTypeId\"\r\n                                            *ngFor=\"let rec of qualificationType\">\r\n                                            {{rec.qualificationTypeName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgqualificationtypeid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <label>Total Experience <span class=\"required\">*</span></label>\r\n                            <div class=\"form-row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"dropdown bootstrap-select form-control\">\r\n                                            <ng-select bindLabel=\"yearsName\" [placeholder]=\"'YY'\" [appendTo]=\"'body'\"\r\n                                                [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                formControlName=\"ExperienceYear\" (change)=\"changeExperience()\">\r\n                                                <ng-option [value]=\"rec.yearsId\" *ngFor=\"let rec of experiences\">\r\n                                                    {{rec.yearsName}}\r\n                                                </ng-option>\r\n                                            </ng-select>\r\n                                            <p class=\"error-msg msgyearid\" style=\"display: none;\">\r\n                                                <span>Required</span>\r\n                                            </p>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"col-md-6\">\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"dropdown bootstrap-select form-control\">\r\n                                            <ng-select bindLabel=\"monthId\" [placeholder]=\"'MM'\" [appendTo]=\"'body'\"\r\n                                                [multiple]=\"false\" [searchable]=\"false\" [clearable]=\"false\"\r\n                                                formControlName=\"ExperienceMonth\" (change)=\"changeExperience()\">\r\n                                                <ng-option [value]=\"rec.monthId\" *ngFor=\"let rec of Months\">\r\n                                                    {{rec.monthId}}\r\n                                                </ng-option>\r\n                                            </ng-select>\r\n                                            <p class=\"error-msg msgmonthid\" style=\"display: none;\">\r\n                                                <span>Required</span>\r\n                                            </p>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\" *ngIf=\"isExperience\">\r\n                            <div class=\"form-group\">\r\n                                <label>Current CTC(PA)<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" (keypress)=\"keyPress($event)\" formControlName=\"CurrentCTC\" style=\"text-align: right;\"\r\n                                    class=\"form-control\" maxlength=\"8\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['CurrentCTC'].touched && !saveForm.controls['CurrentCTC'].valid\">\r\n                                    <span *ngIf=\"saveForm.controls['CurrentCTC'].hasError('required') \">Required</span>\r\n                                    <span *ngIf=\"saveForm.controls['CurrentCTC'].hasError('pattern') \">Invalid\r\n                                        data</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\" *ngIf=\"isExperience\">\r\n                            <div class=\"form-group\">\r\n                                <label>Current Employer<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" formControlName=\"CurrentEmployer\" class=\"form-control\"\r\n                                    placeholder=\"Employer Name\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['CurrentEmployer'].touched && !saveForm.controls['CurrentEmployer'].valid\">\r\n                                    <span\r\n                                        *ngIf=\"saveForm.controls['CurrentEmployer'].hasError('required') \">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\" *ngIf=\"isExperience\">\r\n                            <div class=\"form-group\">\r\n                                <label>Designation<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" formControlName=\"CurrentDesignation\" class=\"form-control\"\r\n                                    placeholder=\"Enter Designation\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['CurrentDesignation'].touched && !saveForm.controls['CurrentDesignation'].valid\">\r\n                                    <span\r\n                                        *ngIf=\"saveForm.controls['CurrentDesignation'].hasError('required') \">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\" *ngIf=\"isExperience\">\r\n                            <div class=\"form-group\">\r\n                                <label>Domain<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"domainName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        formControlName=\"DomainId\" (change)=\"changeDomain($event)\">\r\n                                        <ng-option [value]=\"rec.domainId\" *ngFor=\"let rec of domain\">\r\n                                            {{rec.domainName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgdomainid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\" *ngIf=\"isExperience\">\r\n                            <div class=\"form-group\">\r\n                                <label>Sub-Domain<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"domainName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        formControlName=\"SubDomainId\">\r\n                                        <ng-option [value]=\"rec.domainId\" *ngFor=\"let rec of subdomain\">\r\n                                            {{rec.domainName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgsubdomainid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <div class=\"form-group\">\r\n                                <label>Current Location<span class=\"required\">*</span></label>\r\n                                <div class=\"dropdown bootstrap-select form-control\">\r\n                                    <ng-select bindLabel=\"stateName\" [placeholder]=\"'Select'\" [appendTo]=\"'body'\"\r\n                                        [multiple]=\"false\" [searchable]=\"true\" [clearable]=\"false\"\r\n                                        formControlName=\"StateId\">\r\n                                        <ng-option [value]=\"rec.stateId\" *ngFor=\"let rec of State\">\r\n                                            {{rec.stateName}}\r\n                                        </ng-option>\r\n                                    </ng-select>\r\n                                    <p class=\"error-msg msgstateid\" style=\"display: none;\">\r\n                                        <span>Required</span>\r\n                                    </p>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <label>Any Previous Application History in MRF<span class=\"required\">*</span></label>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-6\">\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"dropdown bootstrap-select form-control\">\r\n                                            <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                                [searchable]=\"false\" [clearable]=\"false\"\r\n                                                formControlName=\"PreviousApplied\">\r\n                                                <ng-option [value]=\"1\">Yes</ng-option>\r\n                                                <ng-option [value]=\"0\">No</ng-option>\r\n                                            </ng-select>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"swichLabel\">Any Relative Working in MRF<span\r\n                                        class=\"required\">*</span></label>\r\n                                <label class=\"switch\">\r\n                                    <ng-select [placeholder]=\"'Select'\" [appendTo]=\"'body'\" [multiple]=\"false\"\r\n                                        [searchable]=\"false\" [clearable]=\"false\" formControlName=\"RelativeStatus\"\r\n                                        (change)=\"changeRelativeStatus($event)\">\r\n                                        <ng-option [value]=\"1\">Yes</ng-option>\r\n                                        <ng-option [value]=\"0\">No</ng-option>\r\n                                    </ng-select>\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\" *ngIf=\"!isRelative\">\r\n                            <div class=\"form-group\">\r\n                                <label>Relative Name<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [disabled]=\"isRelative\"\r\n                                    formControlName=\"RelativeName\" placeholder=\"Enter Name\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['RelativeName'].touched && !saveForm.controls['RelativeName'].valid\">\r\n                                    <span\r\n                                        *ngIf=\"saveForm.controls['RelativeName'].hasError('required') \">Required</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-2\" *ngIf=\"!isRelative\">\r\n                            <div class=\"form-group\">\r\n                                <label>Relative's Mobile No.<span class=\"required\">*</span></label>\r\n                                <input type=\"text\" class=\"form-control\" [disabled]=\"isRelative\"\r\n                                    formControlName=\"RelativeContactNo\" (keypress)=\"keyPress($event)\" maxlength=\"10\"\r\n                                    placeholder=\"Eg:9800123456\">\r\n                                <p class=\"error-msg\"\r\n                                    *ngIf=\"saveForm.controls['RelativeContactNo'].touched && !saveForm.controls['RelativeContactNo'].valid\">\r\n                                    <span\r\n                                        *ngIf=\"saveForm.controls['RelativeContactNo'].hasError('required') \">Required</span>\r\n                                    <span *ngIf=\"saveForm.controls['RelativeContactNo'].hasError('pattern') \">Invalid\r\n                                        contact\r\n                                        no.</span>\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <label for=\"\">Attach Resume <span class=\"required\">*</span></label>\r\n                            <div class=\"custom-file\">\r\n                                <!-- <input type=\"file\" class=\"custom-file-input\" id=\"customFile\" accept=\"application/pdf\"\r\n                        (change)=\"handleUpload($event)\">\r\n                    <label class=\"custom-file-label\" for=\"customFile\" #candidateResumeImport>Choose file</label> -->\r\n                                <input type=\"file\" class=\"custom-file-input\" id=\"customFile\" accept=\"application/pdf\"\r\n                                    (change)=\"onFileChange($event.target.files)\">\r\n                                <label class=\"custom-file-label\" for=\"customFile\" #candidateResumeImport>Choose\r\n                                    file</label>\r\n                                <p class=\"error-msg msgfile\" style=\"display: none;\">\r\n                                    <span>Required</span>\r\n                                </p>\r\n                            </div>\r\n                            <div class=\"col-md-6 attach-file\" *ngIf=\"isResume\">\r\n                                <a (click)=\"openFile(resume)\" style=\"cursor: pointer;\" title=\"Download\"><i\r\n                                        class=\"las color-black la-paperclip\"></i>Resume doc </a>\r\n                                <a (click)=\"openFile(resume)\" style=\"cursor: pointer;\"><i class=\"las la-download red\"></i></a>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-3\">\r\n                            <label>Password<span class=\"required\">*</span></label>\r\n                            <input class=\"form-control\" formControlName=\"Password\" (keyup)=\"chck()\"\r\n                                [type]=\"passwordhide ? 'password' : 'text'\" placeholder=\"Password\">\r\n                            <i [class]=\"passwordhide ? 'fa fa-fw field-icon toggle-password fa-eye pass-blind-icon' :'fa fa-fw field-icon toggle-password fa-eye-slash pass-blind-icon'\"\r\n                                id=\"togglePassword\" (click)=\"onclickeye()\"></i>\r\n                            <p class=\"error-msg\"\r\n                                *ngIf=\"saveForm.controls['Password'].touched && !saveForm.controls['Password'].valid\">\r\n                                <span *ngIf=\"saveForm.controls['Password'].hasError('required')\">Required</span>\r\n                            </p>\r\n                            <p class=\"error-msg\"\r\n                            *ngIf=\"validpassword==false\">\r\n                            <span >Password should contain atleast one uppercase, one numeric, one special character and eight characters</span>\r\n                            </p>\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <label>Retype Password<span class=\"required\">*</span></label>\r\n                            <input [type]=\"repasswordhide ? 'password' : 'text'\" formControlName=\"RePassword\"\r\n                                class=\"form-control\" placeholder=\"Please re type password\">\r\n                            <i [class]=\"repasswordhide ? 'fa fa-fw field-icon toggle-password fa-eye pass-blind-icon' :'fa fa-fw field-icon toggle-password fa-eye-slash pass-blind-icon'\"\r\n                                id=\"toggleRePassword\" (click)=\"onclickeyeRetypePwd()\"></i>\r\n                            <p class=\"error-msg\"\r\n                                *ngIf=\"saveForm.controls['RePassword'].touched && !saveForm.controls['RePassword'].valid\">\r\n                                <span *ngIf=\"saveForm.controls['RePassword'].hasError('required')\">Required</span>\r\n                            </p>\r\n                        </div>\r\n                    </div><br>\r\n                    <div class=\"my-3\" style=\"display: none;\">\r\n                        <span class=\"red\">Aadhar Disclaimer:</span>\r\n                        <span></span>\r\n                    </div>\r\n\r\n                    <div class=\"mt-4\">\r\n                        <button type=\"submit\" class=\"btn btn-black\">Submit</button>&nbsp;\r\n                        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onclickCancel()\">Cancel</button>\r\n                    </div>\r\n\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class=\"modal fade\" id=\"confirmPopup\" role=\"dialog\">\r\n            <div class=\"modal-dialog modal-sm\">\r\n\r\n                <!-- Modal content-->\r\n                <div class=\"modal-content\">\r\n\r\n                    <div class=\"modal-body\">\r\n                        <div class=\"conPopIcon\"><i class=\"las la-question-circle\"></i></div>\r\n                        <h6 class=\"conComment text-center\">Please read the following instructions carefully. </h6>\r\n                        <h6 class=\"conComment text-center\">1. Check your email Id and correct if any changes here. </h6>\r\n                        <h6 class=\"conComment text-center\">2. Use the login credentials(User Id) sent to your email Id\r\n                            for\r\n                            future login to the portal. </h6>\r\n                        <div class=\"mt-4 text-center\">\r\n                            <!-- <button type=\"button\" class=\"btn btn-primary\" #closeModal data-dismiss=\"modal\">No</button> -->\r\n                            <button type=\"button\" class=\"btn btn-primary ml-2\" (click)=\"closePopUp()\">I\r\n                                Understand</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ngx-spinner bdColor=\"rgba(51,51,51,0.8)\" size=\"medium\" color=\"#fff\" type=\"ball-scale-multiple\">\r\n    <p style=\"font-size: 20px; color: white\">Loading...</p>\r\n</ngx-spinner>\r\n\r\n<!-- Anif -->";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/login/login.component.html":
  /*!**********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/login/login.component.html ***!
    \**********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCommonpagesLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!-- <div class=\"mrf-logo\">\r\n  <img src=\"assets/images/MRF_logo.jpg\" alt=\"\">\r\n  <p class=\"mt-2 mb-5\">HUMAN RESOURCES</p>\r\n</div> -->\r\n<!-- <form class=\"needs-validation\" novalidate [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n  <div class=\"form_area\">\r\n    <div class=\"form-group\">\r\n      <label for=\"\">User Name</label>\r\n      <input type=\"text\" id=\"validationCustomUsername\" autocomplete=\"off\"\r\n             formControlName=\"userId\" aria-describedby=\"inputGroupPrepend\" required>\r\n      <div class=\"invalid-feedback\">\r\n        Please enter User ID.\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"\">Password</label>\r\n      <input type=\"password\" formControlName=\"password\" id=\"validationCustomPassword\"\r\n             aria-describedby=\"inputGroupPrepend\" required>\r\n      <div class=\"invalid-feedback\">\r\n        Please enter Password.\r\n      </div>\r\n    </div>\r\n    <button type=\"button\" class=\"btn login-btn\" type=\"submit\">Login</button>\r\n    <a href=\"javascript:void(0)\" class=\"text-center my-4 d-block forgot_password\" (click)=\"ForgotPassword()\">Forgot password?</a>\r\n    <p class=\"my-2 text-center\">Don't have an account yet? <a routerLink=\"/createaccount\" class=\"red\">Create Account.</a></p>\r\n  </div>\r\n</form> -->\r\n<div class=\"login-new\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-7 login_bg\">\r\n        <img src=\"assets/images/banner.jpg\" alt=\"\">\r\n        <!-- <p>MRF CONNECT</p> -->\r\n      </div>\r\n      <div class=\"col-md-5 login-card\">\r\n        <div *ngIf=\"showLoginSection\">\r\n          <form class=\"login-form needs-validation\" novalidate [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n            <div class=\"brand-login text-center\">\r\n              <img src=\"assets/images/logo_1.png\" alt=\"logo\">\r\n            </div>\r\n            <div class=\"l-tagline\">\r\n              <img src=\"assets/images/mrf-connect.svg\" alt=\"logo\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <input class=\"form-control\" type=\"text\" required=\"\" placeholder=\"User ID\" id=\"validationCustomUsername\"\r\n                autocomplete=\"off\" formControlName=\"userId\" aria-describedby=\"inputGroupPrepend\" required>\r\n              <div class=\"invalid-feedback\">\r\n                Please enter User ID.\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <input class=\"form-control\" [type]=\"hidePassword? 'password':'text'\" formControlName=\"password\"\r\n                id=\"validationCustomPassword\" aria-describedby=\"inputGroupPrepend\" required placeholder=\"Password\">\r\n              <i [class]=\"!hidePassword ? 'fa fa-fw field-icon toggle-password fa-eye pass-blind-icon' :'fa fa-fw field-icon toggle-password fa-eye-slash pass-blind-icon'\"\r\n                id=\"togglePassword\" (click)=\"onShowHidePassword()\"></i>\r\n              <div class=\"invalid-feedback\">\r\n                Please enter Password.\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"form-group pt-2\">\r\n              <button class=\"btn btn-primary btn-block\" type=\"submit\">Login</button>\r\n            </div>\r\n            <div class=\"l-footer-info\">\r\n              <a href=\"javascript:void(0)\" (click)=\"ForgotPassword()\">Forgot Password?</a>\r\n              <p>Don’t have an account yet ? <a href=\"javascript:void(0)\" routerLink=\"/auth/createaccount\">Create\r\n                  Account</a></p>\r\n              <p>By logging in you agree and accept the\r\n                <a href=\"javascript:void(0)\">Terms & Conditions</a> defined herein for this HR Portal\r\n              </p>\r\n              <p class=\"my-3\">If you face any issues please write us on <a routerLink=\"javascript:void(0)\"\r\n                  class=\"red\">recruiter2.dahej@mrfmail.com</a></p>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <!-- OTP Details   *ngIf=\"!firstDivShow\"    {{LoginDeatils.emailId}}-->\r\n        <div *ngIf=\"!showLoginSection\">\r\n\r\n          <div class=\"brand-login text-center\">\r\n            <img src=\"assets/images/logo_1.png\" alt=\"logo\">\r\n          </div>\r\n          <div class=\"l-tagline\">\r\n            <img src=\"assets/images/mrf-connect.svg\" alt=\"logo\">\r\n          </div>\r\n\r\n          <div class=\"otp-container\">\r\n            <h5 class=\"mt-4\" style=\"font-weight: bold;\">OTP VERIFICATION</h5>\r\n            <p class=\"padding mt-2\">Enter OTP received your email address</p>\r\n            <p>{{OTPDetails.userOTP?.userEmail}}</p>\r\n            <div class=\"otp-inputs p-d-flex p-flex-row p-align-center p-justify-center\">\r\n              <input #otpInput1 type=\"text\" [(ngModel)]=\"otp[0]\" pInputText class=\"otp-digit\" maxlength=\"1\"\r\n                (input)=\"moveToNextInput($event, otpInput2)\" />\r\n              <input #otpInput2 type=\"text\" [(ngModel)]=\"otp[1]\" pInputText class=\"otp-digit\" maxlength=\"1\"\r\n                (input)=\"moveToNextInput($event, otpInput3)\" />\r\n              <input #otpInput3 type=\"text\" [(ngModel)]=\"otp[2]\" pInputText class=\"otp-digit\" maxlength=\"1\"\r\n                (input)=\"moveToNextInput($event, otpInput4)\" />\r\n              <input #otpInput4 type=\"text\" [(ngModel)]=\"otp[3]\" pInputText class=\"otp-digit\" maxlength=\"1\" />\r\n              <!-- <p-toast></p-toast>\r\n      <ngx-spinner type=\"ball-scale-multiple\"></ngx-spinner> -->\r\n            </div>\r\n            <p class=\"OTP-msg text-danger text-decoration-underline mb-4\">Didn't receive OTP?\r\n              <a href=\"javascript:void(0)\" (click)=\"resendOTP()\" class=\"fw-bold text-danger\">Resend</a>\r\n            </p>\r\n\r\n            <button (click)=\"VerifyOTP()\" class=\"mt-3 submitBtn mr-2 btn\">Verify OTP</button>\r\n            <button (click)=\"cancelClick()\" class=\"mt-3 submitBtn btn\">Cancel</button>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n\r\n\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- <p class=\"text-center terms-text \">\r\n  By logging in you agree and accept the <br /><a href=\"#\">Terms & Conditions</a>\r\n  defined herein for this\r\n  HR Portal\r\n</p> -->\r\n\r\n\r\n\r\n\r\n\r\n<ngx-spinner bdColor=\"rgba(51,51,51,0.8)\" size=\"medium\" color=\"#fff\" type=\"ball-scale-multiple\">\r\n  <p style=\"font-size: 20px; color: white\">Loading...</p>\r\n</ngx-spinner>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/loginlayout/loginlayout.component.html":
  /*!******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/loginlayout/loginlayout.component.html ***!
    \******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLayoutsLoginlayoutLoginlayoutComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!-- <div class=\"header\">\r\n    <div class=\"d-flex justify-content-center\"><img src=\"assets/images/logo.png\" alt=\"\"></div>\r\n</div> -->\r\n<!-- <div class=\"login-new\">\r\n    <div class=\"container-fluid\"> -->\r\n        <!-- <div class=\"row\">\r\n            <div class=\"col-md-7 login_bg\">\r\n                <img src=\"assets/images/banner.jpg\" alt=\"\">\r\n                \r\n            </div>\r\n            <div class=\"col-md-5 login-card\"> -->\r\n                <router-outlet></router-outlet>\r\n            <!-- </div> -->\r\n        <!-- </div> -->\r\n    <!-- </div>\r\n</div> -->";
    /***/
  },

  /***/
  "./src/app/authentication/authentication-routing.module.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/authentication/authentication-routing.module.ts ***!
    \*****************************************************************/

  /*! exports provided: AuthenticationRoutingModule */

  /***/
  function srcAppAuthenticationAuthenticationRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthenticationRoutingModule", function () {
      return AuthenticationRoutingModule;
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


    var _layouts_loginlayout_loginlayout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../layouts/loginlayout/loginlayout.component */
    "./src/app/layouts/loginlayout/loginlayout.component.ts");
    /* harmony import */


    var _app_commonpages_createaccount_createaccount_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../app/commonpages/createaccount/createaccount.component */
    "./src/app/commonpages/createaccount/createaccount.component.ts");
    /* harmony import */


    var _app_commonpages_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../app/commonpages/login/login.component */
    "./src/app/commonpages/login/login.component.ts");

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
      component: _layouts_loginlayout_loginlayout_component__WEBPACK_IMPORTED_MODULE_2__["LoginlayoutComponent"],
      children: [{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }, {
        path: 'login',
        component: _app_commonpages_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
      }, {
        path: 'createaccount',
        component: _app_commonpages_createaccount_createaccount_component__WEBPACK_IMPORTED_MODULE_3__["CreateaccountComponent"]
      }]
    }];

    var AuthenticationRoutingModule = function AuthenticationRoutingModule() {
      _classCallCheck(this, AuthenticationRoutingModule);
    };

    AuthenticationRoutingModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })], AuthenticationRoutingModule);
    /***/
  },

  /***/
  "./src/app/authentication/authentication.module.ts":
  /*!*********************************************************!*\
    !*** ./src/app/authentication/authentication.module.ts ***!
    \*********************************************************/

  /*! exports provided: AuthenticationModule */

  /***/
  function srcAppAuthenticationAuthenticationModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthenticationModule", function () {
      return AuthenticationModule;
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


    var _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../sharedservices/persitence.service */
    "./src/app/sharedservices/persitence.service.ts");
    /* harmony import */


    var _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../auth/authguardservice.service */
    "./src/app/auth/authguardservice.service.ts");
    /* harmony import */


    var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ng-select/ng-select */
    "./node_modules/@ng-select/ng-select/fesm2015/ng-select-ng-select.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _authentication_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./authentication-routing.module */
    "./src/app/authentication/authentication-routing.module.ts");
    /* harmony import */


    var _layouts_loginlayout_loginlayout_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../layouts/loginlayout/loginlayout.component */
    "./src/app/layouts/loginlayout/loginlayout.component.ts");
    /* harmony import */


    var _app_commonpages_createaccount_createaccount_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../app/commonpages/createaccount/createaccount.component */
    "./src/app/commonpages/createaccount/createaccount.component.ts");
    /* harmony import */


    var _app_commonpages_login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../../app/commonpages/login/login.component */
    "./src/app/commonpages/login/login.component.ts");
    /* harmony import */


    var _auth_authentication_guard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../auth/authentication.guard */
    "./src/app/auth/authentication.guard.ts");

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

    var AuthenticationModule = function AuthenticationModule() {
      _classCallCheck(this, AuthenticationModule);
    };

    AuthenticationModule = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
      declarations: [_layouts_loginlayout_loginlayout_component__WEBPACK_IMPORTED_MODULE_9__["LoginlayoutComponent"], _app_commonpages_createaccount_createaccount_component__WEBPACK_IMPORTED_MODULE_10__["CreateaccountComponent"], _app_commonpages_login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrModule"].forRoot(), _authentication_routing_module__WEBPACK_IMPORTED_MODULE_8__["AuthenticationRoutingModule"]],
      providers: [_auth_authentication_guard__WEBPACK_IMPORTED_MODULE_12__["AuthenticationGuard"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectConfig"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["ɵs"], _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_3__["AuthguardserviceService"], _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_2__["PersistanceService"]]
    })], AuthenticationModule);
    /***/
  },

  /***/
  "./src/app/commonpages/createaccount/createaccount.component.css":
  /*!***********************************************************************!*\
    !*** ./src/app/commonpages/createaccount/createaccount.component.css ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCommonpagesCreateaccountCreateaccountComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1vbnBhZ2VzL2NyZWF0ZWFjY291bnQvY3JlYXRlYWNjb3VudC5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/commonpages/createaccount/createaccount.component.ts":
  /*!**********************************************************************!*\
    !*** ./src/app/commonpages/createaccount/createaccount.component.ts ***!
    \**********************************************************************/

  /*! exports provided: CreateaccountComponent */

  /***/
  function srcAppCommonpagesCreateaccountCreateaccountComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CreateaccountComponent", function () {
      return CreateaccountComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_common_location_location_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../services/common/location/location.service */
    "./src/app/services/common/location/location.service.ts");
    /* harmony import */


    var _services_common_function_function_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/common/function/function.service */
    "./src/app/services/common/function/function.service.ts");
    /* harmony import */


    var _services_common_department_department_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../services/common/department/department.service */
    "./src/app/services/common/department/department.service.ts");
    /* harmony import */


    var _services_common_position_position_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../services/common/position/position.service */
    "./src/app/services/common/position/position.service.ts");
    /* harmony import */


    var _services_candidate_candidate_candidate_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../services/candidate/candidate/candidate.service */
    "./src/app/services/candidate/candidate/candidate.service.ts");
    /* harmony import */


    var _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../../services/common/common/common.service */
    "./src/app/services/common/common/common.service.ts");
    /* harmony import */


    var _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../services/common/language/language.service */
    "./src/app/services/common/language/language.service.ts");
    /* harmony import */


    var _services_common_domain_domain_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../services/common/domain/domain.service */
    "./src/app/services/common/domain/domain.service.ts");
    /* harmony import */


    var _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../../services/common/stream/stream.service */
    "./src/app/services/common/stream/stream.service.ts");
    /* harmony import */


    var _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../../services/common/course/course.service */
    "./src/app/services/common/course/course.service.ts");
    /* harmony import */


    var _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ../../services/common/qualification/qualification.service */
    "./src/app/services/common/qualification/qualification.service.ts");
    /* harmony import */


    var _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ../../sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ../../sharedservices/persitence.service */
    "./src/app/sharedservices/persitence.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var src_app_auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! src/app/auth/authguardservice.service */
    "./src/app/auth/authguardservice.service.ts"); // import { Title } from '@angular/platform-browser';
    // import { Component, OnInit } from '@angular/core';
    // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    // import { CandidateService } from '../../services/candidate/candidate/candidate.service';
    // import { ToastrService } from 'ngx-toastr';
    // import { NotificationService } from '../../sharedservices/notification.service';
    // import { NgxSpinnerService } from "ngx-spinner";
    // import { ActivatedRoute, Router } from '@angular/router';
    // import { AuthguardserviceService } from 'src/app/auth/authguardservice.service';
    // import { PersistanceService } from 'src/app/sharedservices/persitence.service';


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
    }; //import { Title } from '@angular/platform-browser';


    var CreateaccountComponent =
    /*#__PURE__*/
    function () {
      function CreateaccountComponent( // private fb: FormBuilder,
      // private candidateService: CandidateService,
      // private notificationService: NotificationService,
      // private SpinnerService: NgxSpinnerService,
      // private titleService: Title,
      // private _route: Router,
      // private authService: AuthguardserviceService,
      // private persistance: PersistanceService,
      notificationService, locationService, positionService, functionService, departmentService, commonService, courseService, streamService, qualificationService, languageService, candidateService, domainService, fb, toasterService, _route, //private titleService: Title,
      SpinnerService, persistance, authService) {
        _classCallCheck(this, CreateaccountComponent);

        this.notificationService = notificationService;
        this.locationService = locationService;
        this.positionService = positionService;
        this.functionService = functionService;
        this.departmentService = departmentService;
        this.commonService = commonService;
        this.courseService = courseService;
        this.streamService = streamService;
        this.qualificationService = qualificationService;
        this.languageService = languageService;
        this.candidateService = candidateService;
        this.domainService = domainService;
        this.fb = fb;
        this.toasterService = toasterService;
        this._route = _route;
        this.SpinnerService = SpinnerService;
        this.persistance = persistance;
        this.authService = authService; // pageTitle: string = "MRF Connect Us";
        // form: FormGroup;

        this.passwordhide = false;
        this.repasswordhide = false; // retypedPassword: any;
        // private formSubmitAttempt: boolean;
        // passwordOnCreateAccount: any;
        //pageTitle: string = "Create Profile";

        this.year = "";
        this.saveForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
          Name: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('')
        }); //  

        this.isAadhar = false;
        this.searchCandidateData = {
          candidateId: null
        };
        this.submitted = false;
        this.showTable = false; //domain

        this.domain = [];
        this.searchDomain = {
          domainId: null,
          parentDomainId: null,
          isActive: true
        }; //subdomain

        this.subdomain = [];
        this.searchSubDomain = {
          domainId: null,
          parentDomainId: null,
          isActive: true
        }; //qualification

        this.qualifications = [];
        this.searchQualification = {
          qualificationId: null,
          isActive: true
        }; //qualification type

        this.qualificationType = []; //course

        this.courses = [];
        this.searchCourse = {
          qualificationId: null,
          courseId: null,
          isActive: true
        }; //stream

        this.streams = [];
        this.searchStream = {
          qualificationId: null,
          courseId: null,
          streamId: null,
          isActive: true
        }; //languages

        this.languages = [];
        this.searchLanguages = {
          languageId: null,
          isActive: null
        }; //prefix

        this.prefix = [];
        this.searchPrefix = {
          prefixId: null,
          isActive: null
        }; //location

        this.locations = [];
        this.selectedLocationCode = "";
        this.selectedLocationOffice = "";
        this.searchLocation = {
          locationId: null,
          verticalId: null,
          locationCode: null,
          locationNo: null,
          isActive: true
        }; //position

        this.positions = [];
        this.searchPosition = {
          verticalId: null,
          positionId: null,
          isActive: true
        }; //grade

        this.grades = [];
        this.searchGrade = {
          verticalId: null,
          positionId: null,
          isActive: true
        }; //function

        this.functions = [];
        this.searchFunction = {
          verticalId: null,
          functionId: null,
          isActive: true
        }; //department

        this.departments = [];
        this.searchDepartment = {
          departmentId: null,
          functionId: null,
          verticalId: null,
          isActive: true
        }; //jobtype

        this.jobtypes = [];
        this.searchJobType = {
          jobTypeId: null,
          isActive: true
        }; //jobdescription

        this.jobdescriptions = [];
        this.searchJobDescription = {
          jobDescriptionId: null,
          verticalId: null,
          isActive: true
        };
        this.isAutoApproved = false;
        this.candidatefileToUpload = null; //

        this.ages = [];
        this.experiences = [];
        this.CompletionYear = [];
        this.Months = [];
        this.State = [];
        this.isRelative = true;
        this.isExperience = false;
        this.resume = "";
        this.isResume = false;
        this.invalidFileName = false; //this.titleService.setTitle(this.pageTitle);
        // this.createdBy = this.persistance.get('loggedinuser').autoUserId;
        // this.candidateId = this.persistance.get('loggedinuser').mapId;
        // this.isNewRegistration = this.persistance.get('NewRegistration');

        this.SpinnerService.show();
        this.getAllDomain();
        this.getAllExperience();
        this.getAllLocation();
        this.getAllState();
        this.getAllFunction();
        this.getAllPosition();
        this.getAllPrefix();
        this.getAllLanguages();
        this.getAllCompletionYearsAndMonths();
        this.getAllQualification();
      }

      _createClass(CreateaccountComponent, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          this.loadDatePicker();

          if (this.isNewRegistration == 1) {
            jQuery("#confirmPopup").modal({
              backdrop: 'static',
              keyboard: false
            }, 'show');
          }
        }
      }, {
        key: "closePopUp",
        value: function closePopUp() {
          jQuery("#confirmPopup").modal('hide');
          var obj = {
            userId: this.userid,
            password: this.saveForm.value.Password
          };
          this.authService.login(obj);
          this.persistance.set('NewRegistration', null);
        }
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

              dothis.saveForm.patchValue({
                DOB: e.target.value
              });
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
        } //only number will be add

      }, {
        key: "keyPress",
        value: function keyPress(event) {
          var pattern = /[0-9\+\-\ ]/;
          var inputChar = String.fromCharCode(event.charCode);

          if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
          }
        }
      }, {
        key: "getAllState",
        value: function getAllState() {
          var _this = this;

          this.State = [];
          this.commonService.getAllState().subscribe(function (result) {
            if (result) {
              _this.State = result;
            } else {
              _this.State = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this.loadSelectPicker();
          });
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          this.passwordhide = true;
          this.repasswordhide = true;
          this.saveForm = this.fb.group({
            PrefixId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            FullName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            DOB: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            Age: [''],
            GenderId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            EmailId: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]],
            ContactNo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            AadharNo: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^((\\+91-?)|0)?[0-9]{12}$")]],
            MotherTongueId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            LanguageIds: ['0', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            QualificationId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            CourseId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            StreamId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            MarksPercentage: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^(?!0\\d)\\d{1,2}(\\.\\d{1,2})?$|^100$")]],
            CompletionYear: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            QualificationTypeId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            ExperienceYear: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            ExperienceMonth: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            CurrentCTC: [''],
            CurrentEmployer: [''],
            CurrentDesignation: [''],
            DomainId: ['0'],
            SubDomainId: ['0'],
            StateId: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            PreviousApplied: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            RelativeStatus: [undefined],
            RelativeName: [''],
            RelativeContactNo: [''],
            SourceChannelId: [0],
            ParentRelationshipId: [0],
            ChildRelationshipId: [0],
            RelationshipNotes: [''],
            CreatedBy: [0],
            VendorId: [0],
            RequisitionDetailId: [0],
            Password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            RePassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
          }); // console.log("check pageLoad-",this.saveForm.value);             

          this.loadSelectPicker();
        } //prefix

      }, {
        key: "getAllPrefix",
        value: function getAllPrefix() {
          var _this2 = this;

          this.prefix = [];
          this.commonService.getAllPrefix(this.searchPrefix).subscribe(function (result) {
            if (result) {
              _this2.prefix = result;
            } else {
              _this2.prefix = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this2.loadSelectPicker();
          });
        }
      }, {
        key: "getAllCompletionYearsAndMonths",
        value: function getAllCompletionYearsAndMonths() {
          this.CompletionYear = [];
          var currentyear = new Date().getFullYear() + 1; //this.CompletionYear.push({ yearsId: parseInt("0"), yearsName: "Select" });

          for (var i = currentyear; i > currentyear - 40; i--) {
            this.CompletionYear.push({
              yearsId: parseInt(i.toString()),
              yearsName: i.toString()
            });
          } //console.log(this.CompletionYear);


          this.Months = [];

          for (var i = 0; i < 12; i++) {
            this.Months.push({
              monthId: parseInt(i.toString()),
              monthName: i.toString()
            });
          }
        } //experience

      }, {
        key: "getAllExperience",
        value: function getAllExperience() {
          this.experiences = [];

          for (var i = 0; i < 41; i++) {
            this.experiences.push({
              yearsId: parseInt(i.toString()),
              yearsName: i.toString()
            });
          }
        } //languages

      }, {
        key: "getAllLanguages",
        value: function getAllLanguages() {
          var _this3 = this;

          this.languages = [];
          this.searchLanguages.languageId = 0;
          this.searchLanguages.isActive = true;
          this.languageService.getAllLanguage(this.searchLanguages).subscribe(function (result) {
            if (result) {
              _this3.languages = result; //console.log(result);
            } else {
              _this3.languages = [];
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
        key: "handleUpload",
        value: function handleUpload(event) {
          var _this4 = this;

          var file = event.target.files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = function () {
            _this4.fileDocument = reader.result.toString(); //   if (file.type == "application/pdf") { 
            //   if ((file.size / 1024) > 5) {
            //     this.flag=1;
            //     this.toasterService.error('Maximum file size allowed is 5MB!', 'Error!', {
            //       timeOut: 3000,
            //     });
            //   }
            //   else{
            //     this.flag=0;
            //   }
            // }
            // else{
            //   this.flag=1;
            //   this.toasterService.error('Only PDF files are allowed!', 'Error!', {
            //     timeOut: 3000,
            //   });
            // }
          };
        } //qualification

      }, {
        key: "getAllQualification",
        value: function getAllQualification() {
          var _this5 = this;

          this.qualifications = [];
          this.qualificationService.getAllQualification(this.searchQualification).subscribe(function (result) {
            if (result) {
              _this5.qualifications = result; //console.log(result);
            } else {
              _this5.qualifications = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            setTimeout(function () {
              jQuery('.selectpicker').selectpicker('refresh');
            });
          });
          this.qualificationType = [];
          this.qualificationService.getAllQualificationType(this.searchQualification).subscribe(function (result) {
            if (result) {
              _this5.qualificationType = result; //console.log(result);
              //this.getCandidate();

              _this5.SpinnerService.hide();
            } else {
              _this5.qualificationType = [];
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
        key: "changeQualification",
        value: function changeQualification(evt) {
          var qualificationId = evt;
          this.selectedQualification = this.qualifications.filter(function (x) {
            return x.qualificationId == qualificationId;
          })[0];
          this.saveForm.patchValue({
            CourseId: undefined,
            StreamId: undefined
          });
          this.getAllCourse();
        } //Course

      }, {
        key: "getAllCourse",
        value: function getAllCourse() {
          var _this6 = this;

          this.courses = [];
          this.searchCourse.qualificationId = this.selectedQualification.qualificationId;
          this.courseService.getAllQualificationCourse(this.searchCourse).subscribe(function (result) {
            if (result) {
              _this6.courses = result; // console.log(result);

              _this6.streams = [];
            } else {
              _this6.courses = [];
              _this6.streams = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this6.loadSelectPicker();
          });
        }
      }, {
        key: "changeCourse",
        value: function changeCourse(evt) {
          var courseId = evt;
          var qualificationId = this.saveForm.get("QualificationId").value;
          this.selectedCourse = this.courses.filter(function (x) {
            return x.courseId == courseId && x.qualificationId == qualificationId;
          })[0];
          this.saveForm.patchValue({
            StreamId: undefined
          });
          this.getAllStream();
        } //Stream

      }, {
        key: "loadSpecificStream",
        value: function loadSpecificStream(qualificationId, courseId) {
          var _this7 = this;

          this.streams = [];
          this.searchStream.qualificationId = qualificationId;
          this.searchStream.courseId = courseId;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this7.streams = result; // console.log(result);
            } else {
              _this7.streams = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this7.loadSelectPicker();
          });
        }
      }, {
        key: "getAllStream",
        value: function getAllStream() {
          var _this8 = this;

          this.streams = [];
          this.searchStream.qualificationId = this.selectedQualification.qualificationId;
          this.searchStream.courseId = this.selectedCourse.courseId;
          this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe(function (result) {
            if (result) {
              _this8.streams = result; // console.log(result);
            } else {
              _this8.streams = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            setTimeout(function () {
              jQuery('.selectpicker').selectpicker('refresh');
            });
          });
        } //domain

      }, {
        key: "getAllDomain",
        value: function getAllDomain() {
          var _this9 = this;

          this.domain = [];
          this.searchDomain.parentDomainId = 0;
          this.domainService.getAllDomain(this.searchDomain).subscribe(function (result) {
            if (result) {
              _this9.domain = result; //console.log(this.domain);
            } else {
              _this9.domain = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this9.loadSelectPicker();
          });
        }
      }, {
        key: "changeDomain",
        value: function changeDomain(evt) {
          var domainId = evt;
          this.selectedDomain = this.domain.filter(function (x) {
            return x.domainId == domainId;
          })[0];
          this.saveForm.patchValue({
            SubDomainId: undefined
          });
          this.getAllSubDomain();
        } //subdomain

      }, {
        key: "getAllSubDomain",
        value: function getAllSubDomain() {
          var _this10 = this;

          this.subdomain = [];
          this.searchSubDomain.parentDomainId = this.selectedDomain.domainId;
          this.domainService.getAllDomain(this.searchSubDomain).subscribe(function (result) {
            if (result) {
              _this10.subdomain = result;
            } else {
              _this10.subdomain = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this10.loadSelectPicker();
          });
        }
      }, {
        key: "loadSpecificSubDomain",
        value: function loadSpecificSubDomain(domainId) {
          var _this11 = this;

          this.subdomain = [];
          this.searchSubDomain.parentDomainId = domainId;
          this.domainService.getAllDomain(this.searchSubDomain).subscribe(function (result) {
            if (result) {
              _this11.subdomain = result;
            } else {
              _this11.subdomain = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this11.loadSelectPicker();
          });
        } //locations

      }, {
        key: "getAllLocation",
        value: function getAllLocation() {
          var _this12 = this;

          this.locations = [];
          this.locationService.getAllLocation(this.searchLocation).subscribe(function (result) {
            if (result) {
              _this12.locations = result;
            } else {
              _this12.locations = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this12.loadSelectPicker();
          });
        }
      }, {
        key: "onLocationChange",
        value: function onLocationChange() {} // this.selectedLocationCode = this.selectedLocation.locationCode;
        // this.selectedLocationOffice = this.selectedLocation.locationOffice;
        //functions

      }, {
        key: "getAllFunction",
        value: function getAllFunction() {
          var _this13 = this;

          this.functions = [];
          this.searchFunction.verticalId = 1;
          this.functionService.getAllVerticalFunction(this.searchFunction).subscribe(function (result) {
            if (result) {
              _this13.functions = result;
            } else {
              _this13.functions = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this13.loadSelectPicker();
          });
        }
      }, {
        key: "onFunctionChange",
        value: function onFunctionChange() {
          // console.log(this.selectedFunction);
          this.functionId = this.selectedFunction.functionId;
          this.getAllDepartment();
        } //department

      }, {
        key: "getAllDepartment",
        value: function getAllDepartment() {
          var _this14 = this;

          this.departments = [];
          this.searchDepartment.verticalId = 1;
          this.searchDepartment.functionId = this.functionId;
          this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe(function (result) {
            if (result) {
              _this14.departments = result; // console.log(this.departments);
            } else {
              _this14.departments = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this14.loadSelectPicker();
          });
        } //position

      }, {
        key: "getAllPosition",
        value: function getAllPosition() {
          var _this15 = this;

          this.positions = [];
          this.searchPosition.verticalId = 1;
          this.positionService.getAllVerticalPosition(this.searchPosition).subscribe(function (result) {
            if (result) {
              _this15.positions = result;
            } else {
              _this15.positions = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {//this.loadSelectPicker();
          });
        } //position

      }, {
        key: "getCandidate",
        value: function getCandidate() {
          var _this16 = this;

          this.searchCandidateData.candidateId = this.candidateId;
          this.candidateService.getCandidateData(this.searchCandidateData).subscribe(function (result) {
            if (result) {
              //  console.log("chck", result);
              _this16.persistance.set('emailId', result.emailId);

              _this16.persistance.set('name', result.fullName);

              _this16.persistance.set('candidateid', result.candidateNo); // this.saveForm.value.ExperienceYear = result.experienceYear == 0 ? null : result.experienceYear
              //console.log("Candidate Frofile form", result);


              if (result.aadharNo != "") {
                _this16.selectedGenderId = result.genderId;
                _this16.selectedQualification = _this16.qualifications.filter(function (x) {
                  return x.qualificationId == result.qualificationId;
                })[0];

                _this16.getAllCourse();

                _this16.loadSpecificStream(result.qualificationId, result.courseId);

                _this16.loadSpecificSubDomain(result.domainId);

                _this16.getAllCompletionYearsAndMonths();
              } else {
                _this16.selectedGenderId = result.genderId;
              }

              var larr = result.languageIds.split(',');
              var arr = [];

              for (var i = 0; i < larr.length; i++) {
                if (larr[i].toString() != "") {
                  arr.push(parseInt(larr[i]));
                }
              }

              _this16.saveForm.patchValue({
                GenderId: result.genderId
              }); //console.log("Language Array in External",arr);


              _this16.getAge = result.age;
              setTimeout(function () {
                //this.loadMultiSelectPicker();
                _this16.candidateData = result;

                _this16.saveForm.patchValue({
                  PrefixId: result.prefixId == 0 ? undefined : result.prefixId,
                  FullName: result.fullName,
                  DOB: result.dob,
                  Age: result.age == 0 ? "" : result.age,
                  //GenderId: result.genderId,
                  EmailId: result.emailId,
                  ContactNo: result.contactNo,
                  AadharNo: result.aadharNo,
                  MotherTongueId: result.motherTongueId == 0 ? undefined : result.motherTongueId,
                  LanguageIds: arr,
                  QualificationId: result.qualificationId == 0 ? undefined : result.qualificationId,
                  CourseId: result.courseId == 0 ? undefined : result.courseId,
                  StreamId: result.streamId == 0 ? undefined : result.streamId,
                  MarksPercentage: result.marksPercentage == 0 ? "" : result.marksPercentage,
                  CompletionYear: parseInt(result.completionYear) == 0 ? undefined : parseInt(result.completionYear),
                  QualificationTypeId: result.qualificationTypeId == 0 ? undefined : result.qualificationTypeId,
                  ExperienceYear: result.experienceYear == 0 ? null : result.experienceYear,
                  ExperienceMonth: result.experienceMonth == 0 ? null : result.experienceMonth,
                  //CurrentCTC: result.currentCTC,
                  CurrentCTC: result.currentCTC == 0 ? "" : result.currentCTC,
                  CurrentEmployer: result.currentEmployer,
                  CurrentDesignation: result.currentDesignation,
                  DomainId: result.domainId == 0 ? undefined : result.domainId,
                  SubDomainId: result.subDomainId == 0 ? undefined : result.subDomainId,
                  StateId: result.stateId == 0 ? undefined : result.stateId,
                  PreviousApplied: result.previousApplied == 2 ? undefined : result.previousApplied,
                  RelativeStatus: result.relativeStatus == 2 ? undefined : result.relativeStatus,
                  RelativeName: result.relativeName,
                  RelativeContactNo: result.relativeContactNo
                });

                if (result.aadharNo == "") {
                  _this16.isAadhar = false;
                } else {
                  _this16.isAadhar = true;
                }

                if (result.resume != null && result.resume != "") {
                  _this16.isResume = true;
                  _this16.resume = result.resume;
                } else {
                  _this16.resume = null;
                } //this.isAadhar=true;


                var dothis = _this16;

                if (_this16.saveForm.value.ExperienceYear > 0 || _this16.saveForm.value.ExperienceMonth > 0) {
                  _this16.isExperience = true;
                  var domainidval = ""; // console.log("Domains");
                  // console.log(dothis.domain);

                  for (var d = 0; d < dothis.domain.length; d++) {
                    var nextd = parseInt(d.toString()) + 1;

                    if (dothis.domain[d].domainId == result.domainId) {
                      domainidval = nextd + ": " + dothis.domain[d].domainId;
                    }
                  }

                  setTimeout(function () {
                    jQuery('select[name=DomainId]').val(domainidval);
                    jQuery('.domainid').selectpicker('refresh');
                  });
                }

                if (_this16.saveForm.value.RelativeStatus == 1) {
                  _this16.isRelative = false;
                }
              }); //
            } else {
              _this16.positions = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this16.loadSelectPicker();
          });
        }
      }, {
        key: "onPositionChange",
        value: function onPositionChange() {
          this.positionId = this.selectedPosition.positionId;
          this.getAllGrade();
        } //grade

      }, {
        key: "getAllGrade",
        value: function getAllGrade() {
          var _this17 = this;

          this.grades = [];
          this.searchGrade.verticalId = 1;
          this.searchGrade.positionId = this.positionId;
          this.positionService.getAllPositionGrade(this.searchGrade).subscribe(function (result) {
            if (result) {
              _this17.grades = result;
            } else {
              _this17.grades = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this17.loadSelectPicker();
          });
        }
      }, {
        key: "startCandidate",
        value: function startCandidate() {
          var _this18 = this;

          var flag = 0;

          if (this.selectedLocation == undefined) {
            flag = 1;
          } else {}

          if (this.iom == undefined) {
            flag = 1;
          } else {}

          if (flag == 0) {
            this.candidateDetailData = [];
            this.showTable = true;
            this.iomNo = this.iom;
            setTimeout(function () {
              jQuery('.selectpicker').selectpicker({
                size: 4
              });
              jQuery('.selectpicker').selectpicker('refresh');

              _this18.loadDatePicker();
            });
          } else {
            this.showTable = false;
          }
        }
      }, {
        key: "loadSelectPicker",
        value: function loadSelectPicker() {
          setTimeout(function () {
            jQuery('.selectpicker').selectpicker({
              size: 6
            });
            jQuery('.selectpicker').selectpicker('refresh');
          });
        }
      }, {
        key: "loadMultiSelectPicker",
        value: function loadMultiSelectPicker() {
          setTimeout(function () {
            jQuery('.selectpickermulti').selectpicker({
              size: 6
            });
            var select_items = ["0"];
            jQuery('.selectpickermulti').selectpicker('val', select_items);
            jQuery('.selectpickermulti').selectpicker('refresh');
          });
        }
      }, {
        key: "clearForm",
        value: function clearForm() {
          var _this19 = this;

          setTimeout(function () {
            jQuery('.selectpicker').val('').trigger('change');
            jQuery('.selectpicker').not(".no-remove").find('option').remove();
            jQuery('.selectpicker').selectpicker('refresh');
            jQuery(".datepicker").parent(".input-group").datepicker('setDate', null);

            _this19.loadDatePicker();
          });
        }
      }, {
        key: "onReset",
        value: function onReset() {
          this.submitted = false;
          this.saveForm.reset();
          this.getAllExperience();
          this.getAllLocation();
          this.getAllState();
          this.getAllFunction();
          this.getAllPosition();
          this.getAllPrefix();
          this.getAllLanguages();
          this.getAllQualification();
          this.getAllDomain();
          this.getAllCompletionYearsAndMonths();
        }
      }, {
        key: "isFieldValid",
        value: function isFieldValid(field) {
          return !this.saveForm.get(field).valid && this.saveForm.get(field).touched || this.saveForm.get(field).untouched && this.onSubmit;
        }
      }, {
        key: "validateAllFormFields",
        value: function validateAllFormFields(formGroup) {
          var _this20 = this;

          Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);

            if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]) {
              control.markAsTouched({
                onlySelf: true
              });
            } else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]) {
              _this20.validateAllFormFields(control);
            }
          });
        }
      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this21 = this;

          debugger;
          var flag = 0;
          this.calcGenderId = this.saveForm.get("GenderId").value;
          this.submitted = true;

          if (this.saveForm.invalid) {
            flag = 1;
            this.validateAllFormFields(this.saveForm);
          }

          if (this.saveForm.value.PrefixId == undefined || this.saveForm.value.PrefixId == 0) {
            jQuery(".msgprefixid").show();
            flag = 1;
          } else {
            jQuery(".msgprefixid").hide();
          }

          if (this.saveForm.value.MotherTongueId == undefined || this.saveForm.value.MotherTongueId == 0) {
            jQuery(".msgmothertongurid").show();
            flag = 1;
          } else {
            jQuery(".msgmothertongurid").hide();
          }

          if (this.saveForm.value.LanguageIds.length == 0) {
            jQuery(".msglanguagesknown").show();
            flag = 1;
          } else {
            jQuery(".msglanguagesknown").hide();
          }

          if (this.saveForm.value.QualificationId == undefined || this.saveForm.value.QualificationId == 0) {
            jQuery(".msgqualificationid").show();
            flag = 1;
          } else {
            jQuery(".msgqualificationid").hide();
          }

          if (this.saveForm.value.CourseId == undefined || this.saveForm.value.CourseId == 0) {
            jQuery(".msgcourseid").show();
            flag = 1;
          } else {
            jQuery(".msgcourseid").hide();
          }

          if (this.saveForm.value.StreamId == undefined || this.saveForm.value.StreamId == 0) {
            jQuery(".msgstreamid").show();
            flag = 1;
          } else {
            jQuery(".msgstreamid").hide();
          }

          if (this.saveForm.value.CompletionYear == undefined || this.saveForm.value.CompletionYear == "0") {
            jQuery(".mscompletionyearid").show();
            flag = 1;
          } else {
            jQuery(".mscompletionyearid").hide();
          }

          if (this.saveForm.value.QualificationTypeId == undefined || this.saveForm.value.QualificationTypeId == 0) {
            jQuery(".msgqualificationtypeid").show();
            flag = 1;
          } else {
            jQuery(".msgqualificationtypeid").hide();
          }

          if (this.saveForm.value.StateId == undefined || this.saveForm.value.StateId == "") {
            jQuery(".msgstateid").show();
            flag = 1;
          } else {
            jQuery(".msgstateid").hide();
          }

          if (this.isExperience == true) {
            if (this.saveForm.value.ExperienceYear > 0) {
              jQuery(".msgyearid").hide();

              if (parseInt(this.saveForm.value.ExperienceMonth) >= 0 || this.saveForm.value.ExperienceMonth != "") {
                jQuery(".msgmonthid").hide();
              } else {
                jQuery(".msgmonthid").show();
                flag = 1;
              }
            } else if (this.saveForm.value.ExperienceYear == 0) {
              if (this.saveForm.value.ExperienceMonth > 0) {
                jQuery(".msgmonthid").hide();
                jQuery(".msgyearid").hide();
              } else {
                jQuery(".msgyearid").show();
                jQuery(".msgmonthid").show();
                flag = 1;
              }
            } else {
              jQuery(".msgyearid").show();
              flag = 1;
            }

            if (this.saveForm.value.DomainId == undefined || this.saveForm.value.DomainId == "" || this.saveForm.value.DomainId == "0") {
              jQuery(".msgdomainid").show();
              flag = 1;
            } else {
              jQuery(".msgdomainid").hide();
            }

            if (this.saveForm.value.SubDomainId == undefined || this.saveForm.value.SubDomainId == "" || this.saveForm.value.SubDomainId == "0") {
              jQuery(".msgsubdomainid").show();
              flag = 1;
            } else {
              jQuery(".msgsubdomainid").hide();
            }
          } else {
            if (this.saveForm.value.ExperienceYear == "0") {
              jQuery(".msgyearid").hide();
            } else {
              jQuery(".msgyearid").show();
              flag = 1;
            }

            if (this.saveForm.value.ExperienceMonth == "0") {
              jQuery(".msgmonthid").hide();
            } else {
              jQuery(".msgmonthid").show();
              flag = 1;
            }
          } // if (this.candidatefileToUpload == null) {
          //   flag = 1;
          //   //this.notificationService.showError("Please attach the resume !!", "Error");
          //   jQuery(".msgfile").show();
          // }
          // else {
          //   jQuery(".msgfile").hide();
          // }


          if (this.resume != null) {
            jQuery(".msgfile").hide();
          } else if (this.candidatefileToUpload != null) {
            jQuery(".msgfile").hide();
          } else {
            flag = 1;
            jQuery(".msgfile").show();
          }

          if (this.validpassword == false) {
            flag = 1;
            this.notificationService.showError("Password should contain atleast one uppercase, one numeric, one special character and eight characters", "Error");
          }

          if (flag == 0) {
            if (this.saveForm.get("Password").value == this.saveForm.get("RePassword").value) {
              this.SpinnerService.show();
              this.saveForm.patchValue({
                GenderId: Number(this.saveForm.get("GenderId").value),
                Age: Number(this.saveForm.get("Age").value),
                // LanguageIds: String(this.saveForm.get("LanguageIds").value), // previous        
                LanguageIds: this.saveForm.get("LanguageIds").value,
                MarksPercentage: parseFloat(this.saveForm.get("MarksPercentage").value),
                CurrentCTC: parseFloat(this.saveForm.get("CurrentCTC").value),
                PreviousApplied: this.saveForm.get("PreviousApplied").value,
                RelativeStatus: this.saveForm.get("RelativeStatus").value,
                CreatedBy: this.createdBy,
                SourceChannelId: 5,
                VendorId: this.candidateId,
                RequisitionDetailId: this.requisitionDetailId
              });
              var formData = new FormData();
              formData.append("CandidateId", "0");
              formData.append("PrefixId", this.saveForm.value.PrefixId);
              formData.append("FullName", this.saveForm.value.FullName);
              formData.append("DOB", this.saveForm.value.DOB);
              formData.append("Age", this.saveForm.value.Age);
              formData.append("GenderId", this.saveForm.value.GenderId);
              formData.append("EmailId", this.saveForm.value.EmailId);
              formData.append("ContactNo", this.saveForm.value.ContactNo);
              formData.append("AadharNo", this.saveForm.value.AadharNo);
              formData.append("MotherTongueId", this.saveForm.value.MotherTongueId);
              formData.append("LanguageIds", String(this.saveForm.value.LanguageIds));
              formData.append("QualificationId", this.saveForm.value.QualificationId);
              formData.append("StreamId", this.saveForm.value.StreamId);
              formData.append("CourseId", this.saveForm.value.CourseId);
              formData.append("MarksPercentage", this.saveForm.value.MarksPercentage);
              formData.append("CompletionYear", this.saveForm.value.CompletionYear);
              formData.append("QualificationTypeId", this.saveForm.value.QualificationTypeId);
              formData.append("ExperienceYear", this.saveForm.value.ExperienceYear);
              formData.append("ExperienceMonth", this.saveForm.value.ExperienceMonth); // if (this.saveForm.value.CurrentCTC == '' || this.saveForm.value.CurrentCTC == undefined || this.saveForm.value.CurrentCTC == 'nan') {  // Previous

              if (this.saveForm.value.ExperienceYear == 0 && this.saveForm.value.ExperienceMonth == 0) {
                // Changed By Anif on 01-12-2022
                formData.append("CurrentCTC", "0");
              } else {
                // Added by anif on 01-12-2022 as value was not passes to API because condition not get satisfied
                formData.append("CurrentCTC", this.saveForm.value.CurrentCTC);
              }

              formData.append("CurrentEmployer", this.saveForm.value.CurrentEmployer);
              formData.append("CurrentDesignation", this.saveForm.value.CurrentDesignation);
              formData.append("DomainId", this.saveForm.value.DomainId == undefined ? 0 : this.saveForm.value.DomainId);
              formData.append("SubDomainId", this.saveForm.value.SubDomainId == undefined ? 0 : this.saveForm.value.SubDomainId);
              formData.append("StateId", this.saveForm.value.StateId);
              formData.append("PreviousApplied", this.saveForm.value.PreviousApplied);
              formData.append("RelativeStatus", this.saveForm.value.RelativeStatus);
              formData.append("RelativeName", this.saveForm.value.RelativeName);
              formData.append("RelativeContactNo", this.saveForm.value.RelativeContactNo);
              formData.append("SourceChannelId", "2");
              formData.append("ParentRelationshipId", this.saveForm.value.ParentRelationshipId);
              formData.append("ChildRelationshipId", this.saveForm.value.ChildRelationshipId);
              formData.append("RelationshipNotes", this.saveForm.value.RelationshipNotes);
              formData.append("CreatedBy", "0");
              formData.append("VendorId", "0");
              formData.append("RequisitionDetailId", "0");
              formData.append("Password", this.saveForm.value.Password); //formData.append("CandidateResumeFile", this.candidatefileToUpload);

              if (this.candidatefileToUpload != null) {
                formData.append("CandidateResumeFile", this.candidatefileToUpload);
              } // else if(this.resume == null){
              //   formData.append("CandidateResumeFile", this.candidatefileToUpload);
              // }


              var agedata = this.calcAge;
              this.candidateService.CreateOnlyCandidateProfile(formData).subscribe(function (result) {
                if (result.successFlag == 1) {
                  //this.SpinnerService.hide();
                  _this21.notificationService.showSuccess(result.msg, "Success"); //jQuery("#txtAge").val(agedata); // previously was there i removed as no need as the data assigned via form by default
                  // if (this.calcGenderId == 1) {
                  //   document.getElementById("radio1").click();
                  // }
                  // else if (this.calcGenderId == 2) {
                  //   document.getElementById("radio2").click();
                  // }
                  // else {
                  //   document.getElementById("radio3").click();
                  // }
                  // let obj = {
                  //   userId: result.refNo,
                  //   password: this.saveForm.value.Password
                  // }
                  // this.authService.login(obj);


                  _this21.userid = result.refNo; // setTimeout(() => {

                  _this21.SpinnerService.hide();

                  jQuery("#confirmPopup").modal({
                    backdrop: 'static',
                    keyboard: false
                  }, 'show'); // }, 1000)
                } else {
                  _this21.notificationService.showError(result.msg, "Error");

                  _this21.SpinnerService.hide();

                  jQuery("#txtAge").val(agedata);

                  if (_this21.calcGenderId == 1) {
                    document.getElementById("radio1").click();
                  } else if (_this21.calcGenderId == 2) {
                    document.getElementById("radio2").click();
                  } else {
                    document.getElementById("radio3").click();
                  }
                }
              }, function (error) {
                // display form values on success
                _this21.notificationService.showError("Something went wrong.. Try again later..", "");

                _this21.SpinnerService.hide();

                jQuery("#txtAge").val(agedata);

                if (_this21.calcGenderId == 1) {
                  document.getElementById("radio1").click();
                } else if (_this21.calcGenderId == 2) {
                  document.getElementById("radio2").click();
                } else {
                  document.getElementById("radio3").click();
                }
              });
            } else {
              this.notificationService.showError("Passwords do not match. Please Retype the correct password !!", "Error");
              this.SpinnerService.hide();
            }
          } else {
            this.notificationService.showError("Please fill all the required fields !!", "Error");
            this.SpinnerService.hide();
          }
        }
      }, {
        key: "changeRelativeStatus",
        value: function changeRelativeStatus() {
          if (this.saveForm.value.RelativeStatus == 1) {
            this.isRelative = false;
            this.saveForm.controls['RelativeName'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            this.saveForm.controls['RelativeContactNo'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
            this.saveForm.controls['RelativeName'].updateValueAndValidity();
            this.saveForm.controls['RelativeContactNo'].updateValueAndValidity();
          } else {
            this.isRelative = true;
            this.saveForm.controls['RelativeName'].clearValidators();
            this.saveForm.controls['RelativeContactNo'].clearValidators();
            this.saveForm.controls['RelativeName'].updateValueAndValidity();
            this.saveForm.controls['RelativeContactNo'].updateValueAndValidity();
          }
        }
      }, {
        key: "changeExperience",
        value: function changeExperience() {
          if (this.saveForm.value.ExperienceYear > 0 || this.saveForm.value.ExperienceMonth > 0) {
            this.isExperience = true; //console.log(this.isExperience);

            this.saveForm.controls['CurrentEmployer'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
            this.saveForm.controls['CurrentCTC'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("^(?!0\\d)\\d{1,12}(\\.\\d{1,2})?$")]);
            this.saveForm.controls['CurrentDesignation'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]); // this.saveForm.controls['DomainId'].setValidators([Validators.pattern("[^0]+")]);
            // this.saveForm.controls['SubDomainId'].setValidators([Validators.pattern("[^0]+")]);

            this.saveForm.controls['DomainId'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]); // Added By anif on 01-12-2022

            this.saveForm.controls['SubDomainId'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]); // Added By anif on 01-12-2022  as if domain if contaon any 0 then patter got failed

            this.saveForm.controls['CurrentCTC'].updateValueAndValidity();
            this.saveForm.controls['CurrentEmployer'].updateValueAndValidity();
            this.saveForm.controls['CurrentDesignation'].updateValueAndValidity();
            this.saveForm.controls['DomainId'].updateValueAndValidity();
            this.saveForm.controls['SubDomainId'].updateValueAndValidity();
          } else {
            this.isExperience = false;
            this.saveForm.controls['CurrentCTC'].clearValidators();
            this.saveForm.controls['CurrentDesignation'].clearValidators();
            this.saveForm.controls['CurrentEmployer'].clearValidators();
            this.saveForm.controls['DomainId'].clearValidators();
            this.saveForm.controls['SubDomainId'].clearValidators();
            this.saveForm.controls['CurrentCTC'].updateValueAndValidity();
            this.saveForm.controls['CurrentEmployer'].updateValueAndValidity();
            this.saveForm.controls['CurrentDesignation'].updateValueAndValidity();
            this.saveForm.controls['DomainId'].updateValueAndValidity();
            this.saveForm.controls['SubDomainId'].updateValueAndValidity();
          }

          setTimeout(function () {
            jQuery(".domains").selectpicker({
              size: 6
            });
            jQuery(".domains").selectpicker("refresh");
          });
        }
      }, {
        key: "onFileChange",
        value: function onFileChange(files) {
          var _this22 = this;

          this.invalidFileName = false;
          var filenameforValidationCheck = files[0].name.replace(".pdf", "");
          var specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
          specialChars.forEach(function (element) {
            if (filenameforValidationCheck.includes(element)) {
              _this22.invalidFileName = true;
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
        key: "onclickCancel",
        value: function onclickCancel() {
          this._route.navigate(['auth/login']);
        }
      }, {
        key: "changeLanguageKnown",
        value: function changeLanguageKnown() {} //console.log(this.saveForm.value);
        // ngOnInit() {
        //   // this.titleService.setTitle(this.pageTitle);
        //   this.passwordhide = true;
        //   this.form = this.fb.group({
        //     name: ['', Validators.required],
        //     emailId: ['', Validators.required],
        //     password: ['', Validators.required],
        //     repassword: ['', Validators.required]
        //   });
        // }

      }, {
        key: "onclickeye",
        value: function onclickeye() {
          this.passwordhide == true ? this.passwordhide = false : this.passwordhide = true;
        }
      }, {
        key: "onclickeyeRetypePwd",
        value: function onclickeyeRetypePwd() {
          this.repasswordhide == true ? this.repasswordhide = false : this.repasswordhide = true;
        }
      }, {
        key: "chck",
        value: function chck() {
          this.validatepassword(this.saveForm.value.Password);
        }
      }, {
        key: "validatepassword",
        value: function validatepassword(pass) {
          if (pass == "") {
            this.validpassword = true;
          } else {
            var passwordpattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            this.validpassword = passwordpattern.test(pass);
          }
        }
      }, {
        key: "openFile",
        value: function openFile(blobName) {
          var regex = /\.net(.*)/;
          var match = blobName.match(regex);
          var extractedString = match ? match[1] : '';
          var filename = extractedString.split('/')[2];
          var containername = extractedString.split('/')[1];
          this.locationService.getTestfile(filename, containername).subscribe(function (response) {
            var blob = response.body;
            var url = window.URL.createObjectURL(blob); // Open the file in a new tab

            window.open(url);
          }, function (error) {
            console.error('Failed to download file:', error);
          });
        }
      }]);

      return CreateaccountComponent;
    }();

    CreateaccountComponent.ctorParameters = function () {
      return [{
        type: _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_14__["NotificationService"]
      }, {
        type: _services_common_location_location_service__WEBPACK_IMPORTED_MODULE_3__["LocationService"]
      }, {
        type: _services_common_position_position_service__WEBPACK_IMPORTED_MODULE_6__["PositionService"]
      }, {
        type: _services_common_function_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"]
      }, {
        type: _services_common_department_department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"]
      }, {
        type: _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]
      }, {
        type: _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_12__["CourseService"]
      }, {
        type: _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_11__["StreamService"]
      }, {
        type: _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_13__["QualificationService"]
      }, {
        type: _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_9__["LanguageService"]
      }, {
        type: _services_candidate_candidate_candidate_service__WEBPACK_IMPORTED_MODULE_7__["CandidateService"]
      }, {
        type: _services_common_domain_domain_service__WEBPACK_IMPORTED_MODULE_10__["DomainService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_15__["ToastrService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_17__["NgxSpinnerService"]
      }, {
        type: _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_16__["PersistanceService"]
      }, {
        type: src_app_auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_18__["AuthguardserviceService"]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('tDate', {
      static: false
    }), __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])], CreateaccountComponent.prototype, "tDate", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('candidateResumeImport', {
      static: false
    }), __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])], CreateaccountComponent.prototype, "candidateResumeImport", void 0);

    CreateaccountComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-createaccount',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./createaccount.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/createaccount/createaccount.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./createaccount.component.css */
      "./src/app/commonpages/createaccount/createaccount.component.css")).default]
    }), __metadata("design:paramtypes", [_sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_14__["NotificationService"], _services_common_location_location_service__WEBPACK_IMPORTED_MODULE_3__["LocationService"], _services_common_position_position_service__WEBPACK_IMPORTED_MODULE_6__["PositionService"], _services_common_function_function_service__WEBPACK_IMPORTED_MODULE_4__["FunctionService"], _services_common_department_department_service__WEBPACK_IMPORTED_MODULE_5__["DepartmentService"], _services_common_common_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"], _services_common_course_course_service__WEBPACK_IMPORTED_MODULE_12__["CourseService"], _services_common_stream_stream_service__WEBPACK_IMPORTED_MODULE_11__["StreamService"], _services_common_qualification_qualification_service__WEBPACK_IMPORTED_MODULE_13__["QualificationService"], _services_common_language_language_service__WEBPACK_IMPORTED_MODULE_9__["LanguageService"], _services_candidate_candidate_candidate_service__WEBPACK_IMPORTED_MODULE_7__["CandidateService"], _services_common_domain_domain_service__WEBPACK_IMPORTED_MODULE_10__["DomainService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], ngx_toastr__WEBPACK_IMPORTED_MODULE_15__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], ngx_spinner__WEBPACK_IMPORTED_MODULE_17__["NgxSpinnerService"], _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_16__["PersistanceService"], src_app_auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_18__["AuthguardserviceService"]])], CreateaccountComponent);
    /***/
  },

  /***/
  "./src/app/commonpages/login/login.component.css":
  /*!*******************************************************!*\
    !*** ./src/app/commonpages/login/login.component.css ***!
    \*******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCommonpagesLoginLoginComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".otp-container {\r\n    text-align: center;\r\n}\r\n\r\n.otp-inputs {\r\n    display: -webkit-box;\r\n    display: flex;\r\n    margin-top: 1rem;\r\n    -webkit-box-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n            justify-content: center;\r\n}\r\n\r\n.otp-inputs input {\r\n    margin: 0px 5px;\r\n}\r\n\r\n.otp-digit {\r\n    width: 2rem;\r\n    text-align: center;\r\n    background: #efecf2;\r\n    border:1px solid rgb(136, 133, 133);\r\n    border-radius: 5px;\r\n    height: 29px;\r\n}\r\n\r\n.OTP-msg {\r\n    margin-top: 1em;\r\n}\r\n\r\n.padding {\r\n    font-size: 17px;\r\n  }\r\n\r\n.submitBtn {\r\n    border-radius: 3px;\r\n    background: #EA363E !important;\r\n    padding: 8px 25px;\r\n    border: none;\r\n    color: #fff !important;\r\n    text-transform: uppercase;\r\n    font-size: 14px;\r\n    letter-spacing: 1px;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tbW9ucGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQix5QkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLHdCQUF1QjtZQUF2Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsbUNBQW1DO0lBQ25DLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFDQTtJQUNJLGVBQWU7RUFDakI7O0FBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsOEJBQThCO0lBQzlCLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2YsbUJBQW1CO0VBQ3JCIiwiZmlsZSI6InNyYy9hcHAvY29tbW9ucGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5vdHAtY29udGFpbmVyIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLm90cC1pbnB1dHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIG1hcmdpbi10b3A6IDFyZW07XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuXHJcbi5vdHAtaW5wdXRzIGlucHV0IHtcclxuICAgIG1hcmdpbjogMHB4IDVweDtcclxufVxyXG5cclxuLm90cC1kaWdpdCB7XHJcbiAgICB3aWR0aDogMnJlbTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6ICNlZmVjZjI7XHJcbiAgICBib3JkZXI6MXB4IHNvbGlkIHJnYigxMzYsIDEzMywgMTMzKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGhlaWdodDogMjlweDtcclxufVxyXG5cclxuLk9UUC1tc2cge1xyXG4gICAgbWFyZ2luLXRvcDogMWVtO1xyXG59XHJcbi5wYWRkaW5nIHtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICB9XHJcbiAgLnN1Ym1pdEJ0biB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRUEzNjNFICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiA4cHggMjVweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcclxuICB9Il19 */";
    /***/
  },

  /***/
  "./src/app/commonpages/login/login.component.ts":
  /*!******************************************************!*\
    !*** ./src/app/commonpages/login/login.component.ts ***!
    \******************************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppCommonpagesLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
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


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./../../auth/authguardservice.service */
    "./src/app/auth/authguardservice.service.ts");
    /* harmony import */


    var _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var src_app_sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/app/sharedservices/persitence.service */
    "./src/app/sharedservices/persitence.service.ts");
    /* harmony import */


    var src_app_services_common_user_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! src/app/services/common/user/user.service */
    "./src/app/services/common/user/user.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

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

    var LoginComponent =
    /*#__PURE__*/
    function () {
      function LoginComponent(router, activateRoute, fb, authService, notificationService, titleService, persister, userService, SpinnerService) {
        var _this23 = this;

        _classCallCheck(this, LoginComponent);

        this.router = router;
        this.activateRoute = activateRoute;
        this.fb = fb;
        this.authService = authService;
        this.notificationService = notificationService;
        this.titleService = titleService;
        this.persister = persister;
        this.userService = userService;
        this.SpinnerService = SpinnerService;
        this.pageTitle = "MRF Connect Us"; //Operation: string;

        this.saveForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
          Name: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('')
        });
        this.hidePassword = true;
        this.ByCosmos = 0;
        this.EmpNo = ""; // OTP Authentication

        this.otp = ['', '', '', ''];
        this.showLoginSection = true;
        this.activateRoute.queryParams.subscribe(function (params) {
          if (params["ByCosmos"] == "1") {
            var data = {
              userId: params["EmpNo"],
              password: '1'
            };

            _this23.authService.loginByCosmos(data);

            _this23.formSubmitAttempt = true;
          }
        });
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subscription"]();
          this.titleService.setTitle(this.pageTitle);
          this.form = this.fb.group({
            userId: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
          });
        }
      }, {
        key: "isFieldInvalid",
        value: function isFieldInvalid(field) {
          return !this.form.get(field).valid && this.form.get(field).touched || this.form.get(field).untouched && this.formSubmitAttempt;
        } // OTP Authentication

      }, {
        key: "onSubmit",
        value: function onSubmit() {
          var _this24 = this;

          if (this.form.value.userId != "" && this.form.value.password != "") {
            this.SpinnerService.show();
            var user = {
              userId: this.form.value.userId,
              password: this.form.value.password
            };
            this.userService.validateUserToSendOTP(user).subscribe(function (result) {
              if (result) {
                if (result.status == 1) {
                  _this24.OTPDetails = result;

                  if (result.userOTP.isOTPRequired == 1) {
                    _this24.showLoginSection = false;

                    _this24.SpinnerService.hide();
                  } else {
                    _this24.showLoginSection = true;

                    _this24.loginAfterSuccessfulOTPVerification();
                  }
                } else if (result.status == 2) {
                  _this24.notificationService.showError("Your account is blocked !\n            Reset your password by clicking on the \"Forgot Password\" after entering your User ID", "Error");

                  console.log("Error");

                  _this24.SpinnerService.hide();
                } else if (result.status == 3) {
                  _this24.notificationService.showError("Invalid Password !!", "Error");

                  console.log("Error");

                  _this24.SpinnerService.hide();
                } else if (result.status == 4) {
                  _this24.notificationService.showError("Invalid User OR Inactive User. Please Contact Your IT Administrator.", "Error");

                  console.log("Error");

                  _this24.SpinnerService.hide();
                } else {
                  _this24.notificationService.showError(result.ErrorMsg, "Error");

                  console.log("Error");

                  _this24.SpinnerService.hide();
                }
              } else {
                _this24.SpinnerService.hide();
              }
            }, function (error) {
              console.log(error);
            }, function () {});
          } else {
            this.notificationService.showError("Please fill required fields !!", "Error");
          }
        }
      }, {
        key: "loginAfterSuccessfulOTPVerification",
        value: function loginAfterSuccessfulOTPVerification() {
          if (this.form.valid) {
            this.authService.login(this.form.value);
          } else {
            this.notificationService.showError("Please fill required fields !!", "Error");
          }

          this.formSubmitAttempt = true;
        } //by kuntal

      }, {
        key: "ForgotPassword",
        value: function ForgotPassword() {
          if (this.form.value.userId != "") {
            this.authService.forgotPassword(this.form.value);
          } else {
            this.notificationService.showError("Please enter User ID !!", "Error");
          }
        } //createForm() {
        //  //this.Operation = 'add';
        //  this.saveForm = this.fb.group({
        //    OldPw: ['', Validators.required],
        //    NewPw: ['', Validators.required],
        //    ConfPw: ['', Validators.required],
        //    //DomainId: [0]
        //  })
        //}

      }, {
        key: "onShowHidePassword",
        value: function onShowHidePassword() {
          this.hidePassword = !this.hidePassword;
        } // OTP Authentication

      }, {
        key: "moveToNextInput",
        value: function moveToNextInput(event, nextInput) {
          if (event.target.value && event.target.value.length === 1) {
            nextInput.focus();
          }
        }
      }, {
        key: "cancelClick",
        value: function cancelClick() {
          this.showLoginSection = true;
        }
      }, {
        key: "VerifyOTP",
        value: function VerifyOTP() {
          if (Number(this.otp.join('')) == Number(this.OTPDetails.userOTP.otp)) {
            this.notificationService.showSuccess("OTP Verified Successfully", "Success");
            this.loginAfterSuccessfulOTPVerification();
          } else {
            this.notificationService.showError("Invalid OTP !!", "Error");
          }
        }
      }, {
        key: "resendOTP",
        value: function resendOTP() {
          var _this25 = this;

          this.SpinnerService.show();
          var user = {
            userId: this.form.value.userId,
            password: this.form.value.password
          };
          this.userService.validateUserToSendOTP(user).subscribe(function (result) {
            if (result) {
              if (result.status == 1) {
                _this25.OTPDetails = result;
                _this25.showLoginSection = false;

                _this25.SpinnerService.hide();

                _this25.notificationService.showSuccess("OTP resend Successfully", "Success");
              }
            } else {
              _this25.SpinnerService.hide();
            }
          }, function (error) {
            console.log(error);
          }, function () {
            _this25.SpinnerService.show();
          });
        }
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_4__["AuthguardserviceService"]
      }, {
        type: _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"]
      }, {
        type: src_app_sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_7__["PersistanceService"]
      }, {
        type: src_app_services_common_user_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerService"]
      }];
    };

    LoginComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/commonpages/login/login.component.html")).default,
      styles: [__importDefault(__webpack_require__(
      /*! ./login.component.css */
      "./src/app/commonpages/login/login.component.css")).default]
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _auth_authguardservice_service__WEBPACK_IMPORTED_MODULE_4__["AuthguardserviceService"], _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["Title"], src_app_sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_7__["PersistanceService"], src_app_services_common_user_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_9__["NgxSpinnerService"]])], LoginComponent);
    /***/
  },

  /***/
  "./src/app/layouts/loginlayout/loginlayout.component.css":
  /*!***************************************************************!*\
    !*** ./src/app/layouts/loginlayout/loginlayout.component.css ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppLayoutsLoginlayoutLoginlayoutComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".header{\r\n    position: fixed;\r\n    width: 100%;\r\n    top: 0;\r\n    z-index: 1;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0cy9sb2dpbmxheW91dC9sb2dpbmxheW91dC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxNQUFNO0lBQ04sVUFBVTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0cy9sb2dpbmxheW91dC9sb2dpbmxheW91dC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlcntcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgei1pbmRleDogMTtcclxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/layouts/loginlayout/loginlayout.component.ts":
  /*!**************************************************************!*\
    !*** ./src/app/layouts/loginlayout/loginlayout.component.ts ***!
    \**************************************************************/

  /*! exports provided: LoginlayoutComponent */

  /***/
  function srcAppLayoutsLoginlayoutLoginlayoutComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginlayoutComponent", function () {
      return LoginlayoutComponent;
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

    var LoginlayoutComponent =
    /*#__PURE__*/
    function () {
      function LoginlayoutComponent() {
        _classCallCheck(this, LoginlayoutComponent);
      }

      _createClass(LoginlayoutComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return LoginlayoutComponent;
    }();

    LoginlayoutComponent = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
      selector: 'app-loginlayout',
      template: __importDefault(__webpack_require__(
      /*! raw-loader!./loginlayout.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/layouts/loginlayout/loginlayout.component.html")).default,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
      styles: [__importDefault(__webpack_require__(
      /*! ./loginlayout.component.css */
      "./src/app/layouts/loginlayout/loginlayout.component.css")).default]
    }), __metadata("design:paramtypes", [])], LoginlayoutComponent);
    /***/
  }
}]);
//# sourceMappingURL=authentication-authentication-module-es5.js.map