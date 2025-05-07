(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~application-application-module~authentication-authentication-module"],{

/***/ "./src/app/auth/authentication.guard.ts":
/*!**********************************************!*\
  !*** ./src/app/auth/authentication.guard.ts ***!
  \**********************************************/
/*! exports provided: AuthenticationGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationGuard", function() { return AuthenticationGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sharedservices/persitence.service */ "./src/app/sharedservices/persitence.service.ts");
/* harmony import */ var _authguardservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authguardservice.service */ "./src/app/auth/authguardservice.service.ts");
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





let AuthenticationGuard = class AuthenticationGuard {
    // canActivate(
    //   next: ActivatedRouteSnapshot,
    //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   return true;
    // }
    constructor(authService, persister, router) {
        this.authService = authService;
        this.persister = persister;
        this.router = router;
    }
    canActivate(next, state) {
        return this.authService.isLoggedIn.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((isLoggedIn) => {
            //console.log(isLoggedIn);
            //if (!isLoggedIn) {
            if (this.persister.get("loggedinuser") == null) {
                this.router.navigate(['/auth/login']);
                return false;
            }
            return true;
        }));
    }
};
AuthenticationGuard.ctorParameters = () => [
    { type: _authguardservice_service__WEBPACK_IMPORTED_MODULE_4__["AuthguardserviceService"] },
    { type: _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_3__["PersistanceService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
];
AuthenticationGuard = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(
    //{
    //providedIn: 'root'
    //}
    ),
    __metadata("design:paramtypes", [_authguardservice_service__WEBPACK_IMPORTED_MODULE_4__["AuthguardserviceService"],
        _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_3__["PersistanceService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
], AuthenticationGuard);



/***/ }),

/***/ "./src/app/services/common/department/department.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/services/common/department/department.service.ts ***!
  \******************************************************************/
/*! exports provided: DepartmentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentService", function() { return DepartmentService; });
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





let DepartmentService = class DepartmentService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    getAllFunctionDepartment(formData) {
        return this.httpClient.post(this.apiURL + '/department/getallfunctiondepartment', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addDepartment(formData) {
        return this.httpClient.post(this.apiURL + '/department/adddepartment', JSON.stringify(formData), this.httpOptions)
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
DepartmentService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
DepartmentService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], DepartmentService);



/***/ }),

/***/ "./src/app/services/common/function/function.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/services/common/function/function.service.ts ***!
  \**************************************************************/
/*! exports provided: FunctionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionService", function() { return FunctionService; });
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





let FunctionService = class FunctionService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    getAllVerticalFunction(formData) {
        return this.httpClient.post(this.apiURL + '/function/getallverticalfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    searchgetAllVerticalFunction(formData) {
        return this.httpClient.post(this.apiURL + '/function/candidatesearchgetallfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllCampusVerticalFunction(formData) {
        return this.httpClient.post(this.apiURL + '/function/getallcampusverticalfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addFunction(formData) {
        return this.httpClient.post(this.apiURL + '/function/addfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addCampusFunction(formData) {
        return this.httpClient.post(this.apiURL + '/function/addcampusfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addVerFunDeptHead(formData) {
        return this.httpClient.post(this.apiURL + '/function/functiondepartmentheadinsertupdate', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllFunctionDepartmentHead(formData) {
        return this.httpClient.post(this.apiURL + '/function/getallfunctiondepartmenthead', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllVerticalFunctionDepartmentHead(formData) {
        return this.httpClient.post(this.apiURL + '/function/getallverticalfunctiondepartmenthead', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllLocationFunction(formData) {
        return this.httpClient.post(this.apiURL + '/function/getalllocationfunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllVerticalFunctionHiringManager(formData) {
        return this.httpClient.post(this.apiURL + '/function/getallverticalfunctionhiringmanager', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addVerticalFunctionHiringManager(formData) {
        return this.httpClient.post(this.apiURL + '/function/addverticalfunctionhiringmanager', JSON.stringify(formData), this.httpOptions)
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
FunctionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
FunctionService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], FunctionService);



/***/ }),

/***/ "./src/app/services/common/location/location.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/services/common/location/location.service.ts ***!
  \**************************************************************/
/*! exports provided: LocationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationService", function() { return LocationService; });
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





let LocationService = class LocationService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    getTestfile(blobName, containername) {
        return this.httpClient.get((this.apiURL + '/location/TestDocumentDownliad?blobName=' + blobName + "&CloudStorageAccountname=" + containername), { observe: 'response', responseType: 'blob' })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllLocation(formData) {
        return this.httpClient.post(this.apiURL + '/location/getalllocation', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllVerticalLocation(formData) {
        return this.httpClient.post(this.apiURL + '/location/getallverticallocation', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllUnmappedLocation(formData) {
        return this.httpClient.post(this.apiURL + '/location/getallunmappedlocation', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addLocation(formData) {
        return this.httpClient.post(this.apiURL + '/location/addlocation', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllLocationFunction(formData) {
        return this.httpClient.post(this.apiURL + '/location/getallLocationwisefunction', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllFunctionwiseLocation(formData) {
        return this.httpClient.post(this.apiURL + '/location/getallfunctionwiselocation', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addLocationFunction(formData) {
        return this.httpClient.post(this.apiURL + '/location/locationwisefunctionsave', JSON.stringify(formData), this.httpOptions)
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
LocationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
LocationService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], LocationService);



/***/ }),

/***/ "./src/app/services/common/position/position.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/services/common/position/position.service.ts ***!
  \**************************************************************/
/*! exports provided: PositionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PositionService", function() { return PositionService; });
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





let PositionService = class PositionService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    getAllVerticalPosition(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallverticalposition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    GetFamilyRelation(formData) {
        return this.httpClient.post(this.apiURL + '/venue/GetFamilyRelation', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllPositionGrade(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallpositiongrade', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllGradePosition(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallgradeposition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllGradePositionNew(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallgradepositionNew', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllVerticalPositionGrade(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallverticalpositiongrade', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllPositionMaster(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallpositionmasterlist', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addPosition(formData) {
        return this.httpClient.post(this.apiURL + '/position/savepositionmaster', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addVerticalPositionList(formData) {
        return this.httpClient.post(this.apiURL + '/position/savevericalwiseposition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllverticalPositionList(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallverticalwisepositionlist', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllverticalPositionForMapping(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallverticalpositionformapping', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addGradePosition(formData) {
        return this.httpClient.post(this.apiURL + '/position/savegradeposition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllFunctionPositionList(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallfunctionwisepositionlist', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    addFunctionPosition(formData) {
        return this.httpClient.post(this.apiURL + '/position/savefunctionwiseposition', JSON.stringify(formData), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
    }
    getAllFunctionPosition(formData) {
        return this.httpClient.post(this.apiURL + '/position/getallfunctionposition', JSON.stringify(formData), this.httpOptions)
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
PositionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
PositionService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], PositionService);



/***/ })

}]);
//# sourceMappingURL=default~application-application-module~authentication-authentication-module-es2015.js.map