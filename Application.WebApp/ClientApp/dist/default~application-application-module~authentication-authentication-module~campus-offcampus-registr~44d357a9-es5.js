function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~application-application-module~authentication-authentication-module~campus-offcampus-registr~44d357a9"], {
  /***/
  "./node_modules/@ng-select/ng-select/fesm2015/ng-select-ng-select.js":
  /*!***************************************************************************!*\
    !*** ./node_modules/@ng-select/ng-select/fesm2015/ng-select-ng-select.js ***!
    \***************************************************************************/

  /*! exports provided: NgSelectComponent, NgSelectConfig, NgSelectModule, SELECTION_MODEL_FACTORY, ɵb, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵj, ɵk, ɵl, ɵm, ɵn, ɵo, ɵp, ɵq, ɵr, ɵs */

  /***/
  function node_modulesNgSelectNgSelectFesm2015NgSelectNgSelectJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgSelectComponent", function () {
      return NgSelectComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgSelectConfig", function () {
      return NgSelectConfig;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgSelectModule", function () {
      return NgSelectModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SELECTION_MODEL_FACTORY", function () {
      return SELECTION_MODEL_FACTORY;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵb", function () {
      return DefaultSelectionModelFactory;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵc", function () {
      return DefaultSelectionModel;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵd", function () {
      return NgDropdownPanelService;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵe", function () {
      return NgItemLabelDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵf", function () {
      return NgOptionTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵg", function () {
      return NgOptgroupTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵh", function () {
      return NgLabelTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵi", function () {
      return NgMultiLabelTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵj", function () {
      return NgHeaderTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵk", function () {
      return NgFooterTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵl", function () {
      return NgNotFoundTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵm", function () {
      return NgTypeToSearchTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵn", function () {
      return NgLoadingTextTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵo", function () {
      return NgTagTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵp", function () {
      return NgLoadingSpinnerTemplateDirective;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵq", function () {
      return NgDropdownPanelComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵr", function () {
      return NgOptionComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ɵs", function () {
      return ConsoleService;
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


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    var unescapedHTMLExp = /[&<>"']/g;
    /** @type {?} */

    var hasUnescapedHTMLExp = RegExp(unescapedHTMLExp.source);
    /** @type {?} */

    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;'
    };
    /**
     * @param {?} string
     * @return {?}
     */

    function escapeHTML(string) {
      return string && hasUnescapedHTMLExp.test(string) ? string.replace(unescapedHTMLExp,
      /**
      * @param {?} chr
      * @return {?}
      */
      function (chr) {
        return htmlEscapes[chr];
      }) : string;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    function isDefined(value) {
      return value !== undefined && value !== null;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    function isObject(value) {
      return typeof value === 'object' && isDefined(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */


    function isPromise(value) {
      return value instanceof Promise;
    }
    /**
     * @param {?} value
     * @return {?}
     */


    function isFunction(value) {
      return value instanceof Function;
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var NgItemLabelDirective =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} element
       */
      function NgItemLabelDirective(element) {
        _classCallCheck(this, NgItemLabelDirective);

        this.element = element;
        this.escape = true;
      }
      /**
       * @param {?} changes
       * @return {?}
       */


      _createClass(NgItemLabelDirective, [{
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          this.element.nativeElement.innerHTML = this.escape ? escapeHTML(this.ngItemLabel) : this.ngItemLabel;
        }
      }]);

      return NgItemLabelDirective;
    }();

    NgItemLabelDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ngItemLabel]'
      }]
    }];
    /** @nocollapse */

    NgItemLabelDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }];
    };

    NgItemLabelDirective.propDecorators = {
      ngItemLabel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      escape: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}

    var NgOptionTemplateDirective =
    /**
     * @param {?} template
     */
    function NgOptionTemplateDirective(template) {
      _classCallCheck(this, NgOptionTemplateDirective);

      this.template = template;
    };

    NgOptionTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-option-tmp]'
      }]
    }];
    /** @nocollapse */

    NgOptionTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgOptgroupTemplateDirective =
    /**
     * @param {?} template
     */
    function NgOptgroupTemplateDirective(template) {
      _classCallCheck(this, NgOptgroupTemplateDirective);

      this.template = template;
    };

    NgOptgroupTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-optgroup-tmp]'
      }]
    }];
    /** @nocollapse */

    NgOptgroupTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgLabelTemplateDirective =
    /**
     * @param {?} template
     */
    function NgLabelTemplateDirective(template) {
      _classCallCheck(this, NgLabelTemplateDirective);

      this.template = template;
    };

    NgLabelTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-label-tmp]'
      }]
    }];
    /** @nocollapse */

    NgLabelTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgMultiLabelTemplateDirective =
    /**
     * @param {?} template
     */
    function NgMultiLabelTemplateDirective(template) {
      _classCallCheck(this, NgMultiLabelTemplateDirective);

      this.template = template;
    };

    NgMultiLabelTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-multi-label-tmp]'
      }]
    }];
    /** @nocollapse */

    NgMultiLabelTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgHeaderTemplateDirective =
    /**
     * @param {?} template
     */
    function NgHeaderTemplateDirective(template) {
      _classCallCheck(this, NgHeaderTemplateDirective);

      this.template = template;
    };

    NgHeaderTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-header-tmp]'
      }]
    }];
    /** @nocollapse */

    NgHeaderTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgFooterTemplateDirective =
    /**
     * @param {?} template
     */
    function NgFooterTemplateDirective(template) {
      _classCallCheck(this, NgFooterTemplateDirective);

      this.template = template;
    };

    NgFooterTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-footer-tmp]'
      }]
    }];
    /** @nocollapse */

    NgFooterTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgNotFoundTemplateDirective =
    /**
     * @param {?} template
     */
    function NgNotFoundTemplateDirective(template) {
      _classCallCheck(this, NgNotFoundTemplateDirective);

      this.template = template;
    };

    NgNotFoundTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-notfound-tmp]'
      }]
    }];
    /** @nocollapse */

    NgNotFoundTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgTypeToSearchTemplateDirective =
    /**
     * @param {?} template
     */
    function NgTypeToSearchTemplateDirective(template) {
      _classCallCheck(this, NgTypeToSearchTemplateDirective);

      this.template = template;
    };

    NgTypeToSearchTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-typetosearch-tmp]'
      }]
    }];
    /** @nocollapse */

    NgTypeToSearchTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgLoadingTextTemplateDirective =
    /**
     * @param {?} template
     */
    function NgLoadingTextTemplateDirective(template) {
      _classCallCheck(this, NgLoadingTextTemplateDirective);

      this.template = template;
    };

    NgLoadingTextTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-loadingtext-tmp]'
      }]
    }];
    /** @nocollapse */

    NgLoadingTextTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgTagTemplateDirective =
    /**
     * @param {?} template
     */
    function NgTagTemplateDirective(template) {
      _classCallCheck(this, NgTagTemplateDirective);

      this.template = template;
    };

    NgTagTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-tag-tmp]'
      }]
    }];
    /** @nocollapse */

    NgTagTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}

    var NgLoadingSpinnerTemplateDirective =
    /**
     * @param {?} template
     */
    function NgLoadingSpinnerTemplateDirective(template) {
      _classCallCheck(this, NgLoadingSpinnerTemplateDirective);

      this.template = template;
    };

    NgLoadingSpinnerTemplateDirective.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
      args: [{
        selector: '[ng-loadingspinner-tmp]'
      }]
    }];
    /** @nocollapse */

    NgLoadingSpinnerTemplateDirective.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var ConsoleService =
    /*#__PURE__*/
    function () {
      function ConsoleService() {
        _classCallCheck(this, ConsoleService);
      }

      _createClass(ConsoleService, [{
        key: "warn",

        /**
         * @param {?} message
         * @return {?}
         */
        value: function warn(message) {
          console.warn(message);
        }
      }]);

      return ConsoleService;
    }();

    ConsoleService.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    ConsoleService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({
      factory: function ConsoleService_Factory() {
        return new ConsoleService();
      },
      token: ConsoleService,
      providedIn: "root"
    });
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @return {?}
     */

    function newId() {
      // First character is an 'a', it's good practice to tag id to begin with a letter
      return 'axxxxxxxxxxx'.replace(/[x]/g,
      /**
      * @param {?} _
      * @return {?}
      */
      function (_) {
        // tslint:disable-next-line:no-bitwise

        /** @type {?} */
        var val = Math.random() * 16 | 0;
        return val.toString(16);
      });
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    var diacritics = {
      "\u24B6": 'A',
      "\uFF21": 'A',
      "\xC0": 'A',
      "\xC1": 'A',
      "\xC2": 'A',
      "\u1EA6": 'A',
      "\u1EA4": 'A',
      "\u1EAA": 'A',
      "\u1EA8": 'A',
      "\xC3": 'A',
      "\u0100": 'A',
      "\u0102": 'A',
      "\u1EB0": 'A',
      "\u1EAE": 'A',
      "\u1EB4": 'A',
      "\u1EB2": 'A',
      "\u0226": 'A',
      "\u01E0": 'A',
      "\xC4": 'A',
      "\u01DE": 'A',
      "\u1EA2": 'A',
      "\xC5": 'A',
      "\u01FA": 'A',
      "\u01CD": 'A',
      "\u0200": 'A',
      "\u0202": 'A',
      "\u1EA0": 'A',
      "\u1EAC": 'A',
      "\u1EB6": 'A',
      "\u1E00": 'A',
      "\u0104": 'A',
      "\u023A": 'A',
      "\u2C6F": 'A',
      "\uA732": 'AA',
      "\xC6": 'AE',
      "\u01FC": 'AE',
      "\u01E2": 'AE',
      "\uA734": 'AO',
      "\uA736": 'AU',
      "\uA738": 'AV',
      "\uA73A": 'AV',
      "\uA73C": 'AY',
      "\u24B7": 'B',
      "\uFF22": 'B',
      "\u1E02": 'B',
      "\u1E04": 'B',
      "\u1E06": 'B',
      "\u0243": 'B',
      "\u0182": 'B',
      "\u0181": 'B',
      "\u24B8": 'C',
      "\uFF23": 'C',
      "\u0106": 'C',
      "\u0108": 'C',
      "\u010A": 'C',
      "\u010C": 'C',
      "\xC7": 'C',
      "\u1E08": 'C',
      "\u0187": 'C',
      "\u023B": 'C',
      "\uA73E": 'C',
      "\u24B9": 'D',
      "\uFF24": 'D',
      "\u1E0A": 'D',
      "\u010E": 'D',
      "\u1E0C": 'D',
      "\u1E10": 'D',
      "\u1E12": 'D',
      "\u1E0E": 'D',
      "\u0110": 'D',
      "\u018B": 'D',
      "\u018A": 'D',
      "\u0189": 'D',
      "\uA779": 'D',
      "\u01F1": 'DZ',
      "\u01C4": 'DZ',
      "\u01F2": 'Dz',
      "\u01C5": 'Dz',
      "\u24BA": 'E',
      "\uFF25": 'E',
      "\xC8": 'E',
      "\xC9": 'E',
      "\xCA": 'E',
      "\u1EC0": 'E',
      "\u1EBE": 'E',
      "\u1EC4": 'E',
      "\u1EC2": 'E',
      "\u1EBC": 'E',
      "\u0112": 'E',
      "\u1E14": 'E',
      "\u1E16": 'E',
      "\u0114": 'E',
      "\u0116": 'E',
      "\xCB": 'E',
      "\u1EBA": 'E',
      "\u011A": 'E',
      "\u0204": 'E',
      "\u0206": 'E',
      "\u1EB8": 'E',
      "\u1EC6": 'E',
      "\u0228": 'E',
      "\u1E1C": 'E',
      "\u0118": 'E',
      "\u1E18": 'E',
      "\u1E1A": 'E',
      "\u0190": 'E',
      "\u018E": 'E',
      "\u24BB": 'F',
      "\uFF26": 'F',
      "\u1E1E": 'F',
      "\u0191": 'F',
      "\uA77B": 'F',
      "\u24BC": 'G',
      "\uFF27": 'G',
      "\u01F4": 'G',
      "\u011C": 'G',
      "\u1E20": 'G',
      "\u011E": 'G',
      "\u0120": 'G',
      "\u01E6": 'G',
      "\u0122": 'G',
      "\u01E4": 'G',
      "\u0193": 'G',
      "\uA7A0": 'G',
      "\uA77D": 'G',
      "\uA77E": 'G',
      "\u24BD": 'H',
      "\uFF28": 'H',
      "\u0124": 'H',
      "\u1E22": 'H',
      "\u1E26": 'H',
      "\u021E": 'H',
      "\u1E24": 'H',
      "\u1E28": 'H',
      "\u1E2A": 'H',
      "\u0126": 'H',
      "\u2C67": 'H',
      "\u2C75": 'H',
      "\uA78D": 'H',
      "\u24BE": 'I',
      "\uFF29": 'I',
      "\xCC": 'I',
      "\xCD": 'I',
      "\xCE": 'I',
      "\u0128": 'I',
      "\u012A": 'I',
      "\u012C": 'I',
      "\u0130": 'I',
      "\xCF": 'I',
      "\u1E2E": 'I',
      "\u1EC8": 'I',
      "\u01CF": 'I',
      "\u0208": 'I',
      "\u020A": 'I',
      "\u1ECA": 'I',
      "\u012E": 'I',
      "\u1E2C": 'I',
      "\u0197": 'I',
      "\u24BF": 'J',
      "\uFF2A": 'J',
      "\u0134": 'J',
      "\u0248": 'J',
      "\u24C0": 'K',
      "\uFF2B": 'K',
      "\u1E30": 'K',
      "\u01E8": 'K',
      "\u1E32": 'K',
      "\u0136": 'K',
      "\u1E34": 'K',
      "\u0198": 'K',
      "\u2C69": 'K',
      "\uA740": 'K',
      "\uA742": 'K',
      "\uA744": 'K',
      "\uA7A2": 'K',
      "\u24C1": 'L',
      "\uFF2C": 'L',
      "\u013F": 'L',
      "\u0139": 'L',
      "\u013D": 'L',
      "\u1E36": 'L',
      "\u1E38": 'L',
      "\u013B": 'L',
      "\u1E3C": 'L',
      "\u1E3A": 'L',
      "\u0141": 'L',
      "\u023D": 'L',
      "\u2C62": 'L',
      "\u2C60": 'L',
      "\uA748": 'L',
      "\uA746": 'L',
      "\uA780": 'L',
      "\u01C7": 'LJ',
      "\u01C8": 'Lj',
      "\u24C2": 'M',
      "\uFF2D": 'M',
      "\u1E3E": 'M',
      "\u1E40": 'M',
      "\u1E42": 'M',
      "\u2C6E": 'M',
      "\u019C": 'M',
      "\u24C3": 'N',
      "\uFF2E": 'N',
      "\u01F8": 'N',
      "\u0143": 'N',
      "\xD1": 'N',
      "\u1E44": 'N',
      "\u0147": 'N',
      "\u1E46": 'N',
      "\u0145": 'N',
      "\u1E4A": 'N',
      "\u1E48": 'N',
      "\u0220": 'N',
      "\u019D": 'N',
      "\uA790": 'N',
      "\uA7A4": 'N',
      "\u01CA": 'NJ',
      "\u01CB": 'Nj',
      "\u24C4": 'O',
      "\uFF2F": 'O',
      "\xD2": 'O',
      "\xD3": 'O',
      "\xD4": 'O',
      "\u1ED2": 'O',
      "\u1ED0": 'O',
      "\u1ED6": 'O',
      "\u1ED4": 'O',
      "\xD5": 'O',
      "\u1E4C": 'O',
      "\u022C": 'O',
      "\u1E4E": 'O',
      "\u014C": 'O',
      "\u1E50": 'O',
      "\u1E52": 'O',
      "\u014E": 'O',
      "\u022E": 'O',
      "\u0230": 'O',
      "\xD6": 'O',
      "\u022A": 'O',
      "\u1ECE": 'O',
      "\u0150": 'O',
      "\u01D1": 'O',
      "\u020C": 'O',
      "\u020E": 'O',
      "\u01A0": 'O',
      "\u1EDC": 'O',
      "\u1EDA": 'O',
      "\u1EE0": 'O',
      "\u1EDE": 'O',
      "\u1EE2": 'O',
      "\u1ECC": 'O',
      "\u1ED8": 'O',
      "\u01EA": 'O',
      "\u01EC": 'O',
      "\xD8": 'O',
      "\u01FE": 'O',
      "\u0186": 'O',
      "\u019F": 'O',
      "\uA74A": 'O',
      "\uA74C": 'O',
      "\u01A2": 'OI',
      "\uA74E": 'OO',
      "\u0222": 'OU',
      "\u24C5": 'P',
      "\uFF30": 'P',
      "\u1E54": 'P',
      "\u1E56": 'P',
      "\u01A4": 'P',
      "\u2C63": 'P',
      "\uA750": 'P',
      "\uA752": 'P',
      "\uA754": 'P',
      "\u24C6": 'Q',
      "\uFF31": 'Q',
      "\uA756": 'Q',
      "\uA758": 'Q',
      "\u024A": 'Q',
      "\u24C7": 'R',
      "\uFF32": 'R',
      "\u0154": 'R',
      "\u1E58": 'R',
      "\u0158": 'R',
      "\u0210": 'R',
      "\u0212": 'R',
      "\u1E5A": 'R',
      "\u1E5C": 'R',
      "\u0156": 'R',
      "\u1E5E": 'R',
      "\u024C": 'R',
      "\u2C64": 'R',
      "\uA75A": 'R',
      "\uA7A6": 'R',
      "\uA782": 'R',
      "\u24C8": 'S',
      "\uFF33": 'S',
      "\u1E9E": 'S',
      "\u015A": 'S',
      "\u1E64": 'S',
      "\u015C": 'S',
      "\u1E60": 'S',
      "\u0160": 'S',
      "\u1E66": 'S',
      "\u1E62": 'S',
      "\u1E68": 'S',
      "\u0218": 'S',
      "\u015E": 'S',
      "\u2C7E": 'S',
      "\uA7A8": 'S',
      "\uA784": 'S',
      "\u24C9": 'T',
      "\uFF34": 'T',
      "\u1E6A": 'T',
      "\u0164": 'T',
      "\u1E6C": 'T',
      "\u021A": 'T',
      "\u0162": 'T',
      "\u1E70": 'T',
      "\u1E6E": 'T',
      "\u0166": 'T',
      "\u01AC": 'T',
      "\u01AE": 'T',
      "\u023E": 'T',
      "\uA786": 'T',
      "\uA728": 'TZ',
      "\u24CA": 'U',
      "\uFF35": 'U',
      "\xD9": 'U',
      "\xDA": 'U',
      "\xDB": 'U',
      "\u0168": 'U',
      "\u1E78": 'U',
      "\u016A": 'U',
      "\u1E7A": 'U',
      "\u016C": 'U',
      "\xDC": 'U',
      "\u01DB": 'U',
      "\u01D7": 'U',
      "\u01D5": 'U',
      "\u01D9": 'U',
      "\u1EE6": 'U',
      "\u016E": 'U',
      "\u0170": 'U',
      "\u01D3": 'U',
      "\u0214": 'U',
      "\u0216": 'U',
      "\u01AF": 'U',
      "\u1EEA": 'U',
      "\u1EE8": 'U',
      "\u1EEE": 'U',
      "\u1EEC": 'U',
      "\u1EF0": 'U',
      "\u1EE4": 'U',
      "\u1E72": 'U',
      "\u0172": 'U',
      "\u1E76": 'U',
      "\u1E74": 'U',
      "\u0244": 'U',
      "\u24CB": 'V',
      "\uFF36": 'V',
      "\u1E7C": 'V',
      "\u1E7E": 'V',
      "\u01B2": 'V',
      "\uA75E": 'V',
      "\u0245": 'V',
      "\uA760": 'VY',
      "\u24CC": 'W',
      "\uFF37": 'W',
      "\u1E80": 'W',
      "\u1E82": 'W',
      "\u0174": 'W',
      "\u1E86": 'W',
      "\u1E84": 'W',
      "\u1E88": 'W',
      "\u2C72": 'W',
      "\u24CD": 'X',
      "\uFF38": 'X',
      "\u1E8A": 'X',
      "\u1E8C": 'X',
      "\u24CE": 'Y',
      "\uFF39": 'Y',
      "\u1EF2": 'Y',
      "\xDD": 'Y',
      "\u0176": 'Y',
      "\u1EF8": 'Y',
      "\u0232": 'Y',
      "\u1E8E": 'Y',
      "\u0178": 'Y',
      "\u1EF6": 'Y',
      "\u1EF4": 'Y',
      "\u01B3": 'Y',
      "\u024E": 'Y',
      "\u1EFE": 'Y',
      "\u24CF": 'Z',
      "\uFF3A": 'Z',
      "\u0179": 'Z',
      "\u1E90": 'Z',
      "\u017B": 'Z',
      "\u017D": 'Z',
      "\u1E92": 'Z',
      "\u1E94": 'Z',
      "\u01B5": 'Z',
      "\u0224": 'Z',
      "\u2C7F": 'Z',
      "\u2C6B": 'Z',
      "\uA762": 'Z',
      "\u24D0": 'a',
      "\uFF41": 'a',
      "\u1E9A": 'a',
      "\xE0": 'a',
      "\xE1": 'a',
      "\xE2": 'a',
      "\u1EA7": 'a',
      "\u1EA5": 'a',
      "\u1EAB": 'a',
      "\u1EA9": 'a',
      "\xE3": 'a',
      "\u0101": 'a',
      "\u0103": 'a',
      "\u1EB1": 'a',
      "\u1EAF": 'a',
      "\u1EB5": 'a',
      "\u1EB3": 'a',
      "\u0227": 'a',
      "\u01E1": 'a',
      "\xE4": 'a',
      "\u01DF": 'a',
      "\u1EA3": 'a',
      "\xE5": 'a',
      "\u01FB": 'a',
      "\u01CE": 'a',
      "\u0201": 'a',
      "\u0203": 'a',
      "\u1EA1": 'a',
      "\u1EAD": 'a',
      "\u1EB7": 'a',
      "\u1E01": 'a',
      "\u0105": 'a',
      "\u2C65": 'a',
      "\u0250": 'a',
      "\uA733": 'aa',
      "\xE6": 'ae',
      "\u01FD": 'ae',
      "\u01E3": 'ae',
      "\uA735": 'ao',
      "\uA737": 'au',
      "\uA739": 'av',
      "\uA73B": 'av',
      "\uA73D": 'ay',
      "\u24D1": 'b',
      "\uFF42": 'b',
      "\u1E03": 'b',
      "\u1E05": 'b',
      "\u1E07": 'b',
      "\u0180": 'b',
      "\u0183": 'b',
      "\u0253": 'b',
      "\u24D2": 'c',
      "\uFF43": 'c',
      "\u0107": 'c',
      "\u0109": 'c',
      "\u010B": 'c',
      "\u010D": 'c',
      "\xE7": 'c',
      "\u1E09": 'c',
      "\u0188": 'c',
      "\u023C": 'c',
      "\uA73F": 'c',
      "\u2184": 'c',
      "\u24D3": 'd',
      "\uFF44": 'd',
      "\u1E0B": 'd',
      "\u010F": 'd',
      "\u1E0D": 'd',
      "\u1E11": 'd',
      "\u1E13": 'd',
      "\u1E0F": 'd',
      "\u0111": 'd',
      "\u018C": 'd',
      "\u0256": 'd',
      "\u0257": 'd',
      "\uA77A": 'd',
      "\u01F3": 'dz',
      "\u01C6": 'dz',
      "\u24D4": 'e',
      "\uFF45": 'e',
      "\xE8": 'e',
      "\xE9": 'e',
      "\xEA": 'e',
      "\u1EC1": 'e',
      "\u1EBF": 'e',
      "\u1EC5": 'e',
      "\u1EC3": 'e',
      "\u1EBD": 'e',
      "\u0113": 'e',
      "\u1E15": 'e',
      "\u1E17": 'e',
      "\u0115": 'e',
      "\u0117": 'e',
      "\xEB": 'e',
      "\u1EBB": 'e',
      "\u011B": 'e',
      "\u0205": 'e',
      "\u0207": 'e',
      "\u1EB9": 'e',
      "\u1EC7": 'e',
      "\u0229": 'e',
      "\u1E1D": 'e',
      "\u0119": 'e',
      "\u1E19": 'e',
      "\u1E1B": 'e',
      "\u0247": 'e',
      "\u025B": 'e',
      "\u01DD": 'e',
      "\u24D5": 'f',
      "\uFF46": 'f',
      "\u1E1F": 'f',
      "\u0192": 'f',
      "\uA77C": 'f',
      "\u24D6": 'g',
      "\uFF47": 'g',
      "\u01F5": 'g',
      "\u011D": 'g',
      "\u1E21": 'g',
      "\u011F": 'g',
      "\u0121": 'g',
      "\u01E7": 'g',
      "\u0123": 'g',
      "\u01E5": 'g',
      "\u0260": 'g',
      "\uA7A1": 'g',
      "\u1D79": 'g',
      "\uA77F": 'g',
      "\u24D7": 'h',
      "\uFF48": 'h',
      "\u0125": 'h',
      "\u1E23": 'h',
      "\u1E27": 'h',
      "\u021F": 'h',
      "\u1E25": 'h',
      "\u1E29": 'h',
      "\u1E2B": 'h',
      "\u1E96": 'h',
      "\u0127": 'h',
      "\u2C68": 'h',
      "\u2C76": 'h',
      "\u0265": 'h',
      "\u0195": 'hv',
      "\u24D8": 'i',
      "\uFF49": 'i',
      "\xEC": 'i',
      "\xED": 'i',
      "\xEE": 'i',
      "\u0129": 'i',
      "\u012B": 'i',
      "\u012D": 'i',
      "\xEF": 'i',
      "\u1E2F": 'i',
      "\u1EC9": 'i',
      "\u01D0": 'i',
      "\u0209": 'i',
      "\u020B": 'i',
      "\u1ECB": 'i',
      "\u012F": 'i',
      "\u1E2D": 'i',
      "\u0268": 'i',
      "\u0131": 'i',
      "\u24D9": 'j',
      "\uFF4A": 'j',
      "\u0135": 'j',
      "\u01F0": 'j',
      "\u0249": 'j',
      "\u24DA": 'k',
      "\uFF4B": 'k',
      "\u1E31": 'k',
      "\u01E9": 'k',
      "\u1E33": 'k',
      "\u0137": 'k',
      "\u1E35": 'k',
      "\u0199": 'k',
      "\u2C6A": 'k',
      "\uA741": 'k',
      "\uA743": 'k',
      "\uA745": 'k',
      "\uA7A3": 'k',
      "\u24DB": 'l',
      "\uFF4C": 'l',
      "\u0140": 'l',
      "\u013A": 'l',
      "\u013E": 'l',
      "\u1E37": 'l',
      "\u1E39": 'l',
      "\u013C": 'l',
      "\u1E3D": 'l',
      "\u1E3B": 'l',
      "\u017F": 'l',
      "\u0142": 'l',
      "\u019A": 'l',
      "\u026B": 'l',
      "\u2C61": 'l',
      "\uA749": 'l',
      "\uA781": 'l',
      "\uA747": 'l',
      "\u01C9": 'lj',
      "\u24DC": 'm',
      "\uFF4D": 'm',
      "\u1E3F": 'm',
      "\u1E41": 'm',
      "\u1E43": 'm',
      "\u0271": 'm',
      "\u026F": 'm',
      "\u24DD": 'n',
      "\uFF4E": 'n',
      "\u01F9": 'n',
      "\u0144": 'n',
      "\xF1": 'n',
      "\u1E45": 'n',
      "\u0148": 'n',
      "\u1E47": 'n',
      "\u0146": 'n',
      "\u1E4B": 'n',
      "\u1E49": 'n',
      "\u019E": 'n',
      "\u0272": 'n',
      "\u0149": 'n',
      "\uA791": 'n',
      "\uA7A5": 'n',
      "\u01CC": 'nj',
      "\u24DE": 'o',
      "\uFF4F": 'o',
      "\xF2": 'o',
      "\xF3": 'o',
      "\xF4": 'o',
      "\u1ED3": 'o',
      "\u1ED1": 'o',
      "\u1ED7": 'o',
      "\u1ED5": 'o',
      "\xF5": 'o',
      "\u1E4D": 'o',
      "\u022D": 'o',
      "\u1E4F": 'o',
      "\u014D": 'o',
      "\u1E51": 'o',
      "\u1E53": 'o',
      "\u014F": 'o',
      "\u022F": 'o',
      "\u0231": 'o',
      "\xF6": 'o',
      "\u022B": 'o',
      "\u1ECF": 'o',
      "\u0151": 'o',
      "\u01D2": 'o',
      "\u020D": 'o',
      "\u020F": 'o',
      "\u01A1": 'o',
      "\u1EDD": 'o',
      "\u1EDB": 'o',
      "\u1EE1": 'o',
      "\u1EDF": 'o',
      "\u1EE3": 'o',
      "\u1ECD": 'o',
      "\u1ED9": 'o',
      "\u01EB": 'o',
      "\u01ED": 'o',
      "\xF8": 'o',
      "\u01FF": 'o',
      "\u0254": 'o',
      "\uA74B": 'o',
      "\uA74D": 'o',
      "\u0275": 'o',
      "\u01A3": 'oi',
      "\u0223": 'ou',
      "\uA74F": 'oo',
      "\u24DF": 'p',
      "\uFF50": 'p',
      "\u1E55": 'p',
      "\u1E57": 'p',
      "\u01A5": 'p',
      "\u1D7D": 'p',
      "\uA751": 'p',
      "\uA753": 'p',
      "\uA755": 'p',
      "\u24E0": 'q',
      "\uFF51": 'q',
      "\u024B": 'q',
      "\uA757": 'q',
      "\uA759": 'q',
      "\u24E1": 'r',
      "\uFF52": 'r',
      "\u0155": 'r',
      "\u1E59": 'r',
      "\u0159": 'r',
      "\u0211": 'r',
      "\u0213": 'r',
      "\u1E5B": 'r',
      "\u1E5D": 'r',
      "\u0157": 'r',
      "\u1E5F": 'r',
      "\u024D": 'r',
      "\u027D": 'r',
      "\uA75B": 'r',
      "\uA7A7": 'r',
      "\uA783": 'r',
      "\u24E2": 's',
      "\uFF53": 's',
      "\xDF": 's',
      "\u015B": 's',
      "\u1E65": 's',
      "\u015D": 's',
      "\u1E61": 's',
      "\u0161": 's',
      "\u1E67": 's',
      "\u1E63": 's',
      "\u1E69": 's',
      "\u0219": 's',
      "\u015F": 's',
      "\u023F": 's',
      "\uA7A9": 's',
      "\uA785": 's',
      "\u1E9B": 's',
      "\u24E3": 't',
      "\uFF54": 't',
      "\u1E6B": 't',
      "\u1E97": 't',
      "\u0165": 't',
      "\u1E6D": 't',
      "\u021B": 't',
      "\u0163": 't',
      "\u1E71": 't',
      "\u1E6F": 't',
      "\u0167": 't',
      "\u01AD": 't',
      "\u0288": 't',
      "\u2C66": 't',
      "\uA787": 't',
      "\uA729": 'tz',
      "\u24E4": 'u',
      "\uFF55": 'u',
      "\xF9": 'u',
      "\xFA": 'u',
      "\xFB": 'u',
      "\u0169": 'u',
      "\u1E79": 'u',
      "\u016B": 'u',
      "\u1E7B": 'u',
      "\u016D": 'u',
      "\xFC": 'u',
      "\u01DC": 'u',
      "\u01D8": 'u',
      "\u01D6": 'u',
      "\u01DA": 'u',
      "\u1EE7": 'u',
      "\u016F": 'u',
      "\u0171": 'u',
      "\u01D4": 'u',
      "\u0215": 'u',
      "\u0217": 'u',
      "\u01B0": 'u',
      "\u1EEB": 'u',
      "\u1EE9": 'u',
      "\u1EEF": 'u',
      "\u1EED": 'u',
      "\u1EF1": 'u',
      "\u1EE5": 'u',
      "\u1E73": 'u',
      "\u0173": 'u',
      "\u1E77": 'u',
      "\u1E75": 'u',
      "\u0289": 'u',
      "\u24E5": 'v',
      "\uFF56": 'v',
      "\u1E7D": 'v',
      "\u1E7F": 'v',
      "\u028B": 'v',
      "\uA75F": 'v',
      "\u028C": 'v',
      "\uA761": 'vy',
      "\u24E6": 'w',
      "\uFF57": 'w',
      "\u1E81": 'w',
      "\u1E83": 'w',
      "\u0175": 'w',
      "\u1E87": 'w',
      "\u1E85": 'w',
      "\u1E98": 'w',
      "\u1E89": 'w',
      "\u2C73": 'w',
      "\u24E7": 'x',
      "\uFF58": 'x',
      "\u1E8B": 'x',
      "\u1E8D": 'x',
      "\u24E8": 'y',
      "\uFF59": 'y',
      "\u1EF3": 'y',
      "\xFD": 'y',
      "\u0177": 'y',
      "\u1EF9": 'y',
      "\u0233": 'y',
      "\u1E8F": 'y',
      "\xFF": 'y',
      "\u1EF7": 'y',
      "\u1E99": 'y',
      "\u1EF5": 'y',
      "\u01B4": 'y',
      "\u024F": 'y',
      "\u1EFF": 'y',
      "\u24E9": 'z',
      "\uFF5A": 'z',
      "\u017A": 'z',
      "\u1E91": 'z',
      "\u017C": 'z',
      "\u017E": 'z',
      "\u1E93": 'z',
      "\u1E95": 'z',
      "\u01B6": 'z',
      "\u0225": 'z',
      "\u0240": 'z',
      "\u2C6C": 'z',
      "\uA763": 'z',
      "\u0386": "\u0391",
      "\u0388": "\u0395",
      "\u0389": "\u0397",
      "\u038A": "\u0399",
      "\u03AA": "\u0399",
      "\u038C": "\u039F",
      "\u038E": "\u03A5",
      "\u03AB": "\u03A5",
      "\u038F": "\u03A9",
      "\u03AC": "\u03B1",
      "\u03AD": "\u03B5",
      "\u03AE": "\u03B7",
      "\u03AF": "\u03B9",
      "\u03CA": "\u03B9",
      "\u0390": "\u03B9",
      "\u03CC": "\u03BF",
      "\u03CD": "\u03C5",
      "\u03CB": "\u03C5",
      "\u03B0": "\u03C5",
      "\u03C9": "\u03C9",
      "\u03C2": "\u03C3"
    };
    /**
     * @param {?} text
     * @return {?}
     */

    function stripSpecialChars(text) {
      /** @type {?} */
      var match =
      /**
      * @param {?} a
      * @return {?}
      */
      function match(a) {
        return diacritics[a] || a;
      };

      return text.replace(/[^\u0000-\u007E]/g, match);
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var ItemsList =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} _ngSelect
       * @param {?} _selectionModel
       */
      function ItemsList(_ngSelect, _selectionModel) {
        _classCallCheck(this, ItemsList);

        this._ngSelect = _ngSelect;
        this._selectionModel = _selectionModel;
        this._items = [];
        this._filteredItems = [];
        this._markedIndex = -1;
      }
      /**
       * @return {?}
       */


      _createClass(ItemsList, [{
        key: "setItems",

        /**
         * @param {?} items
         * @return {?}
         */
        value: function setItems(items) {
          var _this = this;

          this._items = items.map(
          /**
          * @param {?} item
          * @param {?} index
          * @return {?}
          */
          function (item, index) {
            return _this.mapItem(item, index);
          });

          if (this._ngSelect.groupBy) {
            this._groups = this._groupBy(this._items, this._ngSelect.groupBy);
            this._items = this._flatten(this._groups);
          } else {
            this._groups = new Map();

            this._groups.set(undefined, this._items);
          }

          this._filteredItems = _toConsumableArray(this._items);
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "select",
        value: function select(item) {
          if (item.selected || this.maxItemsSelected) {
            return;
          }
          /** @type {?} */


          var multiple = this._ngSelect.multiple;

          if (!multiple) {
            this.clearSelected();
          }

          this._selectionModel.select(item, multiple, this._ngSelect.selectableGroupAsModel);

          if (this._ngSelect.hideSelected) {
            this._hideSelected(item);
          }
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "unselect",
        value: function unselect(item) {
          if (!item.selected) {
            return;
          }

          this._selectionModel.unselect(item, this._ngSelect.multiple);

          if (this._ngSelect.hideSelected && isDefined(item.index) && this._ngSelect.multiple) {
            this._showSelected(item);
          }
        }
        /**
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "findItem",
        value: function findItem(value) {
          var _this2 = this;

          /** @type {?} */
          var findBy;

          if (this._ngSelect.compareWith) {
            findBy =
            /**
            * @param {?} item
            * @return {?}
            */
            function findBy(item) {
              return _this2._ngSelect.compareWith(item.value, value);
            };
          } else if (this._ngSelect.bindValue) {
            findBy =
            /**
            * @param {?} item
            * @return {?}
            */
            function findBy(item) {
              return !item.children && _this2.resolveNested(item.value, _this2._ngSelect.bindValue) === value;
            };
          } else {
            findBy =
            /**
            * @param {?} item
            * @return {?}
            */
            function findBy(item) {
              return item.value === value || !item.children && item.label && item.label === _this2.resolveNested(value, _this2._ngSelect.bindLabel);
            };
          }

          return this._items.find(
          /**
          * @param {?} item
          * @return {?}
          */
          function (item) {
            return findBy(item);
          });
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "addItem",
        value: function addItem(item) {
          /** @type {?} */
          var option = this.mapItem(item, this._items.length);

          this._items.push(option);

          this._filteredItems.push(option);

          return option;
        }
        /**
         * @param {?=} keepDisabled
         * @return {?}
         */

      }, {
        key: "clearSelected",
        value: function clearSelected() {
          var keepDisabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          this._selectionModel.clear(keepDisabled);

          this._items.forEach(
          /**
          * @param {?} item
          * @return {?}
          */
          function (item) {
            item.selected = keepDisabled && item.selected && item.disabled;
            item.marked = false;
          });

          if (this._ngSelect.hideSelected) {
            this.resetFilteredItems();
          }
        }
        /**
         * @param {?} term
         * @return {?}
         */

      }, {
        key: "findByLabel",
        value: function findByLabel(term) {
          term = stripSpecialChars(term).toLocaleLowerCase();
          return this.filteredItems.find(
          /**
          * @param {?} item
          * @return {?}
          */
          function (item) {
            /** @type {?} */
            var label = stripSpecialChars(item.label).toLocaleLowerCase();
            return label.substr(0, term.length) === term;
          });
        }
        /**
         * @param {?} term
         * @return {?}
         */

      }, {
        key: "filter",
        value: function filter(term) {
          var _this3 = this;

          if (!term) {
            this.resetFilteredItems();
            return;
          }

          this._filteredItems = [];
          term = this._ngSelect.searchFn ? term : stripSpecialChars(term).toLocaleLowerCase();
          /** @type {?} */

          var match = this._ngSelect.searchFn || this._defaultSearchFn;
          /** @type {?} */

          var hideSelected = this._ngSelect.hideSelected;

          for (var _i = 0, _Array$from = Array.from(this._groups.keys()); _i < _Array$from.length; _i++) {
            var key = _Array$from[_i];

            /** @type {?} */
            var matchedItems = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this._groups.get(key)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (hideSelected && (item.parent && item.parent.selected || item.selected)) {
                  continue;
                }
                /** @type {?} */


                var searchItem = this._ngSelect.searchFn ? item.value : item;

                if (match(term, searchItem)) {
                  matchedItems.push(item);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            if (matchedItems.length > 0) {
              (function () {
                var _this3$_filteredItems;

                var _matchedItems$slice = matchedItems.slice(-1),
                    _matchedItems$slice2 = _slicedToArray(_matchedItems$slice, 1),
                    last = _matchedItems$slice2[0];

                if (last.parent) {
                  /** @type {?} */
                  var head = _this3._items.find(
                  /**
                  * @param {?} x
                  * @return {?}
                  */
                  function (x) {
                    return x === last.parent;
                  });

                  _this3._filteredItems.push(head);
                }

                (_this3$_filteredItems = _this3._filteredItems).push.apply(_this3$_filteredItems, matchedItems);
              })();
            }
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "resetFilteredItems",
        value: function resetFilteredItems() {
          if (this._filteredItems.length === this._items.length) {
            return;
          }

          if (this._ngSelect.hideSelected && this.selectedItems.length > 0) {
            this._filteredItems = this._items.filter(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return !x.selected;
            });
          } else {
            this._filteredItems = this._items;
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "unmarkItem",
        value: function unmarkItem() {
          this._markedIndex = -1;
        }
        /**
         * @return {?}
         */

      }, {
        key: "markNextItem",
        value: function markNextItem() {
          this._stepToItem(+1);
        }
        /**
         * @return {?}
         */

      }, {
        key: "markPreviousItem",
        value: function markPreviousItem() {
          this._stepToItem(-1);
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "markItem",
        value: function markItem(item) {
          this._markedIndex = this._filteredItems.indexOf(item);
        }
        /**
         * @param {?=} markDefault
         * @return {?}
         */

      }, {
        key: "markSelectedOrDefault",
        value: function markSelectedOrDefault(markDefault) {
          if (this._filteredItems.length === 0) {
            return;
          }
          /** @type {?} */


          var lastMarkedIndex = this._getLastMarkedIndex();

          if (lastMarkedIndex > -1) {
            this._markedIndex = lastMarkedIndex;
          } else {
            this._markedIndex = markDefault ? this.filteredItems.findIndex(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return !x.disabled;
            }) : -1;
          }
        }
        /**
         * @param {?} option
         * @param {?} key
         * @return {?}
         */

      }, {
        key: "resolveNested",
        value: function resolveNested(option, key) {
          if (!isObject(option)) {
            return option;
          }

          if (key.indexOf('.') === -1) {
            return option[key];
          } else {
            /** @type {?} */
            var keys = key.split('.');
            /** @type {?} */

            var value = option;

            for (var i = 0, len = keys.length; i < len; ++i) {
              if (value == null) {
                return null;
              }

              value = value[keys[i]];
            }

            return value;
          }
        }
        /**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */

      }, {
        key: "mapItem",
        value: function mapItem(item, index) {
          /** @type {?} */
          var label = isDefined(item.$ngOptionLabel) ? item.$ngOptionLabel : this.resolveNested(item, this._ngSelect.bindLabel);
          /** @type {?} */

          var value = isDefined(item.$ngOptionValue) ? item.$ngOptionValue : item;
          return {
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: "".concat(this._ngSelect.dropdownId, "-").concat(index)
          };
        }
        /**
         * @return {?}
         */

      }, {
        key: "mapSelectedItems",
        value: function mapSelectedItems() {
          var _this4 = this;

          /** @type {?} */
          var multiple = this._ngSelect.multiple;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.selectedItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var selected = _step2.value;

              /** @type {?} */
              var value = this._ngSelect.bindValue ? this.resolveNested(selected.value, this._ngSelect.bindValue) : selected.value;
              /** @type {?} */

              var item = isDefined(value) ? this.findItem(value) : null;

              this._selectionModel.unselect(selected, multiple);

              this._selectionModel.select(item || selected, multiple, this._ngSelect.selectableGroupAsModel);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (this._ngSelect.hideSelected) {
            this._filteredItems = this.filteredItems.filter(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return _this4.selectedItems.indexOf(x) === -1;
            });
          }
        }
        /**
         * @private
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "_showSelected",
        value: function _showSelected(item) {
          this._filteredItems.push(item);

          if (item.parent) {
            /** @type {?} */
            var _parent = item.parent;
            /** @type {?} */

            var parentExists = this._filteredItems.find(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return x === _parent;
            });

            if (!parentExists) {
              this._filteredItems.push(_parent);
            }
          } else if (item.children) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = item.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var child = _step3.value;
                child.selected = false;

                this._filteredItems.push(child);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }

          this._filteredItems = _toConsumableArray(this._filteredItems.sort(
          /**
          * @param {?} a
          * @param {?} b
          * @return {?}
          */
          function (a, b) {
            return a.index - b.index;
          }));
        }
        /**
         * @private
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "_hideSelected",
        value: function _hideSelected(item) {
          this._filteredItems = this._filteredItems.filter(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x !== item;
          });

          if (item.parent) {
            /** @type {?} */
            var children = item.parent.children;

            if (children.every(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return x.selected;
            })) {
              this._filteredItems = this._filteredItems.filter(
              /**
              * @param {?} x
              * @return {?}
              */
              function (x) {
                return x !== item.parent;
              });
            }
          } else if (item.children) {
            this._filteredItems = this.filteredItems.filter(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return x.parent !== item;
            });
          }
        }
        /**
         * @private
         * @param {?} search
         * @param {?} opt
         * @return {?}
         */

      }, {
        key: "_defaultSearchFn",
        value: function _defaultSearchFn(search, opt) {
          /** @type {?} */
          var label = stripSpecialChars(opt.label).toLocaleLowerCase();
          return label.indexOf(search) > -1;
        }
        /**
         * @private
         * @param {?} steps
         * @return {?}
         */

      }, {
        key: "_getNextItemIndex",
        value: function _getNextItemIndex(steps) {
          if (steps > 0) {
            return this._markedIndex === this._filteredItems.length - 1 ? 0 : this._markedIndex + 1;
          }

          return this._markedIndex <= 0 ? this._filteredItems.length - 1 : this._markedIndex - 1;
        }
        /**
         * @private
         * @param {?} steps
         * @return {?}
         */

      }, {
        key: "_stepToItem",
        value: function _stepToItem(steps) {
          if (this._filteredItems.length === 0 || this._filteredItems.every(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.disabled;
          })) {
            return;
          }

          this._markedIndex = this._getNextItemIndex(steps);

          if (this.markedItem.disabled) {
            this._stepToItem(steps);
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_getLastMarkedIndex",
        value: function _getLastMarkedIndex() {
          if (this._ngSelect.hideSelected) {
            return -1;
          }

          if (this._markedIndex > -1 && this.markedItem === undefined) {
            return -1;
          }
          /** @type {?} */


          var selectedIndex = this._filteredItems.indexOf(this.lastSelectedItem);

          if (this.lastSelectedItem && selectedIndex < 0) {
            return -1;
          }

          return Math.max(this.markedIndex, selectedIndex);
        }
        /**
         * @private
         * @param {?} items
         * @param {?} prop
         * @return {?}
         */

      }, {
        key: "_groupBy",
        value: function _groupBy(items, prop) {
          var _this5 = this;

          /** @type {?} */
          var groups = new Map();

          if (items.length === 0) {
            return groups;
          } // Check if items are already grouped by given key.


          if (Array.isArray(items[0].value[
          /** @type {?} */
          prop])) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;

                /** @type {?} */
                var children = (item.value[
                /** @type {?} */
                prop] || []).map(
                /**
                * @param {?} x
                * @param {?} index
                * @return {?}
                */
                function (x, index) {
                  return _this5.mapItem(x, index);
                });
                groups.set(item, children);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            return groups;
          }
          /** @type {?} */


          var isFnKey = isFunction(this._ngSelect.groupBy);
          /** @type {?} */

          var keyFn =
          /**
          * @param {?} item
          * @return {?}
          */
          function keyFn(item) {
            /** @type {?} */
            var key = isFnKey ?
            /** @type {?} */
            prop(item.value) : item.value[
            /** @type {?} */
            prop];
            return isDefined(key) ? key : undefined;
          }; // Group items by key.


          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _item = _step5.value;

              /** @type {?} */
              var key = keyFn(_item);
              /** @type {?} */

              var group = groups.get(key);

              if (group) {
                group.push(_item);
              } else {
                groups.set(key, [_item]);
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          return groups;
        }
        /**
         * @private
         * @param {?} groups
         * @return {?}
         */

      }, {
        key: "_flatten",
        value: function _flatten(groups) {
          var _this6 = this;

          /** @type {?} */
          var isGroupByFn = isFunction(this._ngSelect.groupBy);
          /** @type {?} */

          var items = [];

          var _loop = function _loop() {
            var key = _Array$from2[_i2];

            /** @type {?} */
            var i = items.length;

            if (key === undefined) {
              /** @type {?} */
              var withoutGroup = groups.get(undefined) || [];
              items.push.apply(items, _toConsumableArray(withoutGroup.map(
              /**
              * @param {?} x
              * @return {?}
              */
              function (x) {
                return Object.assign({}, x, {
                  index: i++
                });
              })));
              return "continue";
            }
            /** @type {?} */


            var isObjectKey = isObject(key);
            /** @type {?} */

            var parent = {
              label: isObjectKey ? '' : String(key),
              children: undefined,
              parent: null,
              index: i++,
              disabled: !_this6._ngSelect.selectableGroup,
              htmlId: newId()
            };
            /** @type {?} */

            var groupKey = isGroupByFn ? _this6._ngSelect.bindLabel :
            /** @type {?} */
            _this6._ngSelect.groupBy;
            /** @type {?} */

            var groupValue = _this6._ngSelect.groupValue ||
            /**
            * @return {?}
            */
            function () {
              if (isObjectKey) {
                return (
                  /** @type {?} */
                  key.value
                );
              }

              return _defineProperty({}, groupKey, key);
            };
            /** @type {?} */


            var children = groups.get(key).map(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              x.parent = parent;
              x.children = undefined;
              x.index = i++;
              return x;
            });
            parent.children = children;
            parent.value = groupValue(key, children.map(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return x.value;
            }));
            items.push(parent);
            items.push.apply(items, _toConsumableArray(children));
          };

          for (var _i2 = 0, _Array$from2 = Array.from(groups.keys()); _i2 < _Array$from2.length; _i2++) {
            var _ret = _loop();

            if (_ret === "continue") continue;
          }

          return items;
        }
      }, {
        key: "items",
        get: function get() {
          return this._items;
        }
        /**
         * @return {?}
         */

      }, {
        key: "filteredItems",
        get: function get() {
          return this._filteredItems;
        }
        /**
         * @return {?}
         */

      }, {
        key: "markedIndex",
        get: function get() {
          return this._markedIndex;
        }
        /**
         * @return {?}
         */

      }, {
        key: "selectedItems",
        get: function get() {
          return this._selectionModel.value;
        }
        /**
         * @return {?}
         */

      }, {
        key: "markedItem",
        get: function get() {
          return this._filteredItems[this._markedIndex];
        }
        /**
         * @return {?}
         */

      }, {
        key: "noItemsToSelect",
        get: function get() {
          return this._ngSelect.hideSelected && this._items.length === this.selectedItems.length;
        }
        /**
         * @return {?}
         */

      }, {
        key: "maxItemsSelected",
        get: function get() {
          return this._ngSelect.multiple && this._ngSelect.maxSelectedItems <= this.selectedItems.length;
        }
        /**
         * @return {?}
         */

      }, {
        key: "lastSelectedItem",
        get: function get() {
          /** @type {?} */
          var i = this.selectedItems.length - 1;

          for (; i >= 0; i--) {
            /** @type {?} */
            var item = this.selectedItems[i];

            if (!item.disabled) {
              return item;
            }
          }

          return null;
        }
      }]);

      return ItemsList;
    }();

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @record
     */


    function NgOption() {}

    if (false) {}
    /** @enum {number} */


    var KeyCode = {
      Tab: 9,
      Enter: 13,
      Esc: 27,
      Space: 32,
      ArrowUp: 38,
      ArrowDown: 40,
      Backspace: 8
    };
    KeyCode[KeyCode.Tab] = 'Tab';
    KeyCode[KeyCode.Enter] = 'Enter';
    KeyCode[KeyCode.Esc] = 'Esc';
    KeyCode[KeyCode.Space] = 'Space';
    KeyCode[KeyCode.ArrowUp] = 'ArrowUp';
    KeyCode[KeyCode.ArrowDown] = 'ArrowDown';
    KeyCode[KeyCode.Backspace] = 'Backspace';
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @record
     */

    function ItemsRangeResult() {}

    if (false) {}
    /**
     * @record
     */


    function PanelDimensions() {}

    if (false) {}

    var NgDropdownPanelService =
    /*#__PURE__*/
    function () {
      function NgDropdownPanelService() {
        _classCallCheck(this, NgDropdownPanelService);

        this._dimensions = {
          itemHeight: 0,
          panelHeight: 0,
          itemsPerViewport: 0
        };
      }
      /**
       * @return {?}
       */


      _createClass(NgDropdownPanelService, [{
        key: "calculateItems",

        /**
         * @param {?} scrollPos
         * @param {?} itemsLength
         * @param {?} buffer
         * @return {?}
         */
        value: function calculateItems(scrollPos, itemsLength, buffer) {
          /** @type {?} */
          var d = this._dimensions;
          /** @type {?} */

          var scrollHeight = d.itemHeight * itemsLength;
          /** @type {?} */

          var scrollTop = Math.max(0, scrollPos);
          /** @type {?} */

          var indexByScrollTop = scrollTop / scrollHeight * itemsLength;
          /** @type {?} */

          var end = Math.min(itemsLength, Math.ceil(indexByScrollTop) + (d.itemsPerViewport + 1));
          /** @type {?} */

          var maxStartEnd = end;
          /** @type {?} */

          var maxStart = Math.max(0, maxStartEnd - d.itemsPerViewport);
          /** @type {?} */

          var start = Math.min(maxStart, Math.floor(indexByScrollTop));
          /** @type {?} */

          var topPadding = d.itemHeight * Math.ceil(start) - d.itemHeight * Math.min(start, buffer);
          topPadding = !isNaN(topPadding) ? topPadding : 0;
          start = !isNaN(start) ? start : -1;
          end = !isNaN(end) ? end : -1;
          start -= buffer;
          start = Math.max(0, start);
          end += buffer;
          end = Math.min(itemsLength, end);
          return {
            topPadding: topPadding,
            scrollHeight: scrollHeight,
            start: start,
            end: end
          };
        }
        /**
         * @param {?} itemHeight
         * @param {?} panelHeight
         * @return {?}
         */

      }, {
        key: "setDimensions",
        value: function setDimensions(itemHeight, panelHeight) {
          /** @type {?} */
          var itemsPerViewport = Math.max(1, Math.floor(panelHeight / itemHeight));
          this._dimensions = {
            itemHeight: itemHeight,
            panelHeight: panelHeight,
            itemsPerViewport: itemsPerViewport
          };
        }
        /**
         * @param {?} itemTop
         * @param {?} itemHeight
         * @param {?} lastScroll
         * @return {?}
         */

      }, {
        key: "getScrollTo",
        value: function getScrollTo(itemTop, itemHeight, lastScroll) {
          var panelHeight = this.dimensions.panelHeight;
          /** @type {?} */

          var itemBottom = itemTop + itemHeight;
          /** @type {?} */

          var top = lastScroll;
          /** @type {?} */

          var bottom = top + panelHeight;

          if (panelHeight >= itemBottom && lastScroll === itemTop) {
            return null;
          }

          if (itemBottom > bottom) {
            return top + itemBottom - bottom;
          } else if (itemTop <= top) {
            return itemTop;
          }

          return null;
        }
      }, {
        key: "dimensions",
        get: function get() {
          return this._dimensions;
        }
      }]);

      return NgDropdownPanelService;
    }();

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    var TOP_CSS_CLASS = 'ng-select-top';
    /** @type {?} */

    var BOTTOM_CSS_CLASS = 'ng-select-bottom';
    /** @type {?} */

    var SCROLL_SCHEDULER = typeof requestAnimationFrame !== 'undefined' ? rxjs__WEBPACK_IMPORTED_MODULE_3__["animationFrameScheduler"] : rxjs__WEBPACK_IMPORTED_MODULE_3__["asapScheduler"];

    var NgDropdownPanelComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} _renderer
       * @param {?} _zone
       * @param {?} _panelService
       * @param {?} _elementRef
       * @param {?} _document
       */
      function NgDropdownPanelComponent(_renderer, _zone, _panelService, _elementRef, _document) {
        _classCallCheck(this, NgDropdownPanelComponent);

        this._renderer = _renderer;
        this._zone = _zone;
        this._panelService = _panelService;
        this._document = _document;
        this.items = [];
        this.position = 'auto';
        this.virtualScroll = false;
        this.filterValue = null;
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.scroll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.scrollToEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.outsideClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._scrollToEndFired = false;
        this._updateScrollHeight = false;
        this._lastScrollPosition = 0;
        this._dropdown = _elementRef.nativeElement;
      }
      /**
       * @return {?}
       */


      _createClass(NgDropdownPanelComponent, [{
        key: "handleMousedown",

        /**
         * @param {?} $event
         * @return {?}
         */
        value: function handleMousedown($event) {
          /** @type {?} */
          var target =
          /** @type {?} */
          $event.target;

          if (target.tagName === 'INPUT') {
            return;
          }

          $event.preventDefault();
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          this._select = this._dropdown.parentElement;
          this._virtualPadding = this.paddingElementRef.nativeElement;
          this._scrollablePanel = this.scrollElementRef.nativeElement;
          this._contentPanel = this.contentElementRef.nativeElement;

          this._handleScroll();

          this._handleOutsideClick();

          this._appendDropdown();
        }
        /**
         * @param {?} changes
         * @return {?}
         */

      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          if (changes.items) {
            /** @type {?} */
            var change = changes.items;

            this._onItemsChange(change.currentValue, change.firstChange);
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this._destroy$.next();

          this._destroy$.complete();

          this._destroy$.unsubscribe();

          if (this.appendTo) {
            this._renderer.removeChild(this._dropdown.parentNode, this._dropdown);
          }
        }
        /**
         * @param {?} option
         * @param {?=} startFromOption
         * @return {?}
         */

      }, {
        key: "scrollTo",
        value: function scrollTo(option) {
          var startFromOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (!option) {
            return;
          }
          /** @type {?} */


          var index = this.items.indexOf(option);

          if (index < 0 || index >= this.itemsLength) {
            return;
          }
          /** @type {?} */


          var scrollTo;

          if (this.virtualScroll) {
            /** @type {?} */
            var itemHeight = this._panelService.dimensions.itemHeight;
            scrollTo = this._panelService.getScrollTo(index * itemHeight, itemHeight, this._lastScrollPosition);
          } else {
            /** @type {?} */
            var item = this._dropdown.querySelector("#".concat(option.htmlId));
            /** @type {?} */


            var lastScroll = startFromOption ? item.offsetTop : this._lastScrollPosition;
            scrollTo = this._panelService.getScrollTo(item.offsetTop, item.clientHeight, lastScroll);
          }

          if (isDefined(scrollTo)) {
            this._scrollablePanel.scrollTop = scrollTo;
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "scrollToTag",
        value: function scrollToTag() {
          /** @type {?} */
          var panel = this._scrollablePanel;
          panel.scrollTop = panel.scrollHeight - panel.clientHeight;
        }
        /**
         * @return {?}
         */

      }, {
        key: "adjustPosition",
        value: function adjustPosition() {
          /** @type {?} */
          var parent = this._parent.getBoundingClientRect();
          /** @type {?} */


          var select = this._select.getBoundingClientRect();

          this._setOffset(parent, select);
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_handleDropdownPosition",
        value: function _handleDropdownPosition() {
          this._currentPosition = this._calculateCurrentPosition(this._dropdown);

          if (this._currentPosition === 'top') {
            this._renderer.addClass(this._dropdown, TOP_CSS_CLASS);

            this._renderer.removeClass(this._dropdown, BOTTOM_CSS_CLASS);

            this._renderer.addClass(this._select, TOP_CSS_CLASS);

            this._renderer.removeClass(this._select, BOTTOM_CSS_CLASS);
          } else {
            this._renderer.addClass(this._dropdown, BOTTOM_CSS_CLASS);

            this._renderer.removeClass(this._dropdown, TOP_CSS_CLASS);

            this._renderer.addClass(this._select, BOTTOM_CSS_CLASS);

            this._renderer.removeClass(this._select, TOP_CSS_CLASS);
          }

          if (this.appendTo) {
            this._updatePosition();
          }

          this._dropdown.style.opacity = '1';
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_handleScroll",
        value: function _handleScroll() {
          var _this7 = this;

          this._zone.runOutsideAngular(
          /**
          * @return {?}
          */
          function () {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(_this7.scrollElementRef.nativeElement, 'scroll').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(_this7._destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["auditTime"])(0, SCROLL_SCHEDULER)).subscribe(
            /**
            * @param {?} e
            * @return {?}
            */
            function (e) {
              return _this7._onContentScrolled(e.target.scrollTop);
            });
          });
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_handleOutsideClick",
        value: function _handleOutsideClick() {
          var _this8 = this;

          if (!this._document) {
            return;
          }

          this._zone.runOutsideAngular(
          /**
          * @return {?}
          */
          function () {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(_this8._document, 'touchstart', {
              capture: true
            }), Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(_this8._document, 'mousedown', {
              capture: true
            })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(_this8._destroy$)).subscribe(
            /**
            * @param {?} $event
            * @return {?}
            */
            function ($event) {
              return _this8._checkToClose($event);
            });
          });
        }
        /**
         * @private
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "_checkToClose",
        value: function _checkToClose($event) {
          var _this9 = this;

          if (this._select.contains($event.target) || this._dropdown.contains($event.target)) {
            return;
          }
          /** @type {?} */


          var path = $event.path || $event.composedPath && $event.composedPath();

          if ($event.target && $event.target.shadowRoot && path && path[0] && this._select.contains(path[0])) {
            return;
          }

          this._zone.run(
          /**
          * @return {?}
          */
          function () {
            return _this9.outsideClick.emit();
          });
        }
        /**
         * @private
         * @param {?} items
         * @param {?} firstChange
         * @return {?}
         */

      }, {
        key: "_onItemsChange",
        value: function _onItemsChange(items, firstChange) {
          this.items = items || [];
          this._scrollToEndFired = false;
          this.itemsLength = items.length;

          if (this.virtualScroll) {
            this._updateItemsRange(firstChange);
          } else {
            this._updateItems(firstChange);
          }
        }
        /**
         * @private
         * @param {?} firstChange
         * @return {?}
         */

      }, {
        key: "_updateItems",
        value: function _updateItems(firstChange) {
          var _this10 = this;

          this.update.emit(this.items);

          if (firstChange === false) {
            return;
          }

          this._zone.runOutsideAngular(
          /**
          * @return {?}
          */
          function () {
            Promise.resolve().then(
            /**
            * @return {?}
            */
            function () {
              /** @type {?} */
              var panelHeight = _this10._scrollablePanel.clientHeight;

              _this10._panelService.setDimensions(0, panelHeight);

              _this10._handleDropdownPosition();

              _this10.scrollTo(_this10.markedItem, firstChange);
            });
          });
        }
        /**
         * @private
         * @param {?} firstChange
         * @return {?}
         */

      }, {
        key: "_updateItemsRange",
        value: function _updateItemsRange(firstChange) {
          var _this11 = this;

          this._zone.runOutsideAngular(
          /**
          * @return {?}
          */
          function () {
            _this11._measureDimensions().then(
            /**
            * @return {?}
            */
            function () {
              if (firstChange) {
                _this11._renderItemsRange(_this11._startOffset);

                _this11._handleDropdownPosition();
              } else {
                _this11._renderItemsRange();
              }
            });
          });
        }
        /**
         * @private
         * @param {?} scrollTop
         * @return {?}
         */

      }, {
        key: "_onContentScrolled",
        value: function _onContentScrolled(scrollTop) {
          if (this.virtualScroll) {
            this._renderItemsRange(scrollTop);
          }

          this._lastScrollPosition = scrollTop;

          this._fireScrollToEnd(scrollTop);
        }
        /**
         * @private
         * @param {?} height
         * @return {?}
         */

      }, {
        key: "_updateVirtualHeight",
        value: function _updateVirtualHeight(height) {
          if (this._updateScrollHeight) {
            this._virtualPadding.style.height = "".concat(height, "px");
            this._updateScrollHeight = false;
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_onItemsLengthChanged",
        value: function _onItemsLengthChanged() {
          this._updateScrollHeight = true;
        }
        /**
         * @private
         * @param {?=} scrollTop
         * @return {?}
         */

      }, {
        key: "_renderItemsRange",
        value: function _renderItemsRange() {
          var _this12 = this;

          var scrollTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          if (scrollTop && this._lastScrollPosition === scrollTop) {
            return;
          }

          scrollTop = scrollTop || this._scrollablePanel.scrollTop;
          /** @type {?} */

          var range = this._panelService.calculateItems(scrollTop, this.itemsLength, this.bufferAmount);

          this._updateVirtualHeight(range.scrollHeight);

          this._contentPanel.style.transform = "translateY(".concat(range.topPadding, "px)");

          this._zone.run(
          /**
          * @return {?}
          */
          function () {
            _this12.update.emit(_this12.items.slice(range.start, range.end));

            _this12.scroll.emit({
              start: range.start,
              end: range.end
            });
          });

          if (isDefined(scrollTop) && this._lastScrollPosition === 0) {
            this._scrollablePanel.scrollTop = scrollTop;
            this._lastScrollPosition = scrollTop;
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_measureDimensions",
        value: function _measureDimensions() {
          var _this13 = this;

          if (this._panelService.dimensions.itemHeight > 0 || this.itemsLength === 0) {
            return Promise.resolve(this._panelService.dimensions);
          }

          var _this$items = _slicedToArray(this.items, 1),
              first = _this$items[0];

          this.update.emit([first]);
          return Promise.resolve().then(
          /**
          * @return {?}
          */
          function () {
            /** @type {?} */
            var option = _this13._dropdown.querySelector("#".concat(first.htmlId));
            /** @type {?} */


            var optionHeight = option.clientHeight;
            _this13._virtualPadding.style.height = "".concat(optionHeight * _this13.itemsLength, "px");
            /** @type {?} */

            var panelHeight = _this13._scrollablePanel.clientHeight;

            _this13._panelService.setDimensions(optionHeight, panelHeight);

            return _this13._panelService.dimensions;
          });
        }
        /**
         * @private
         * @param {?} scrollTop
         * @return {?}
         */

      }, {
        key: "_fireScrollToEnd",
        value: function _fireScrollToEnd(scrollTop) {
          var _this14 = this;

          if (this._scrollToEndFired || scrollTop === 0) {
            return;
          }
          /** @type {?} */


          var padding = this.virtualScroll ? this._virtualPadding : this._contentPanel;

          if (scrollTop + this._dropdown.clientHeight >= padding.clientHeight) {
            this._zone.run(
            /**
            * @return {?}
            */
            function () {
              return _this14.scrollToEnd.emit();
            });

            this._scrollToEndFired = true;
          }
        }
        /**
         * @private
         * @param {?} dropdownEl
         * @return {?}
         */

      }, {
        key: "_calculateCurrentPosition",
        value: function _calculateCurrentPosition(dropdownEl) {
          if (this.position !== 'auto') {
            return this.position;
          }
          /** @type {?} */


          var selectRect = this._select.getBoundingClientRect();
          /** @type {?} */


          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          /** @type {?} */

          var offsetTop = selectRect.top + window.pageYOffset;
          /** @type {?} */

          var height = selectRect.height;
          /** @type {?} */

          var dropdownHeight = dropdownEl.getBoundingClientRect().height;

          if (offsetTop + height + dropdownHeight > scrollTop + document.documentElement.clientHeight) {
            return 'top';
          } else {
            return 'bottom';
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_appendDropdown",
        value: function _appendDropdown() {
          if (!this.appendTo) {
            return;
          }

          this._parent = document.querySelector(this.appendTo);

          if (!parent) {
            throw new Error("appendTo selector ".concat(this.appendTo, " did not found any parent element"));
          }

          this._parent.appendChild(this._dropdown);
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_updatePosition",
        value: function _updatePosition() {
          /** @type {?} */
          var select = this._select.getBoundingClientRect();
          /** @type {?} */


          var parent = this._parent.getBoundingClientRect();
          /** @type {?} */


          var offsetLeft = select.left - parent.left;

          this._setOffset(parent, select);

          this._dropdown.style.left = offsetLeft + 'px';
          this._dropdown.style.width = select.width + 'px';
          this._dropdown.style.minWidth = select.width + 'px';
        }
        /**
         * @private
         * @param {?} parent
         * @param {?} select
         * @return {?}
         */

      }, {
        key: "_setOffset",
        value: function _setOffset(parent, select) {
          /** @type {?} */
          var delta = select.height;

          if (this._currentPosition === 'top') {
            /** @type {?} */
            var offsetBottom = parent.bottom - select.bottom;
            this._dropdown.style.bottom = offsetBottom + delta + 'px';
            this._dropdown.style.top = 'auto';
          } else if (this._currentPosition === 'bottom') {
            /** @type {?} */
            var offsetTop = select.top - parent.top;
            this._dropdown.style.top = offsetTop + delta + 'px';
            this._dropdown.style.bottom = 'auto';
          }
        }
      }, {
        key: "currentPosition",
        get: function get() {
          return this._currentPosition;
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "itemsLength",
        get: function get() {
          return this._itemsLength;
        }
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
          if (value !== this._itemsLength) {
            this._itemsLength = value;

            this._onItemsLengthChanged();
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_startOffset",
        get: function get() {
          if (this.markedItem) {
            var _this$_panelService$d = this._panelService.dimensions,
                itemHeight = _this$_panelService$d.itemHeight,
                panelHeight = _this$_panelService$d.panelHeight;
            /** @type {?} */

            var offset = this.markedItem.index * itemHeight;
            return panelHeight > offset ? 0 : offset;
          }

          return 0;
        }
      }]);

      return NgDropdownPanelComponent;
    }();

    NgDropdownPanelComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
        selector: 'ng-dropdown-panel',
        template: "\n        <div *ngIf=\"headerTemplate\" class=\"ng-dropdown-header\">\n            <ng-container [ngTemplateOutlet]=\"headerTemplate\" [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\"></ng-container>\n        </div>\n        <div #scroll class=\"ng-dropdown-panel-items scroll-host\">\n            <div #padding [class.total-padding]=\"virtualScroll\"></div>\n            <div #content [class.scrollable-content]=\"virtualScroll && items.length\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n        <div *ngIf=\"footerTemplate\" class=\"ng-dropdown-footer\">\n            <ng-container [ngTemplateOutlet]=\"footerTemplate\" [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\"></ng-container>\n        </div>\n    "
      }]
    }];
    /** @nocollapse */

    NgDropdownPanelComponent.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
      }, {
        type: NgDropdownPanelService
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
          args: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DOCUMENT"]]
        }]
      }];
    };

    NgDropdownPanelComponent.propDecorators = {
      items: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      markedItem: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      position: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      appendTo: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      bufferAmount: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      virtualScroll: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      headerTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      footerTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      filterValue: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      update: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      scroll: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      scrollToEnd: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      outsideClick: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
      }],
      contentElementRef: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['content', {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
          static: true
        }]
      }],
      scrollElementRef: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['scroll', {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
          static: true
        }]
      }],
      paddingElementRef: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['padding', {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
          static: true
        }]
      }],
      handleMousedown: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
        args: ['mousedown', ['$event']]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var NgOptionComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} elementRef
       */
      function NgOptionComponent(elementRef) {
        _classCallCheck(this, NgOptionComponent);

        this.elementRef = elementRef;
        this.stateChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._disabled = false;
      }
      /**
       * @return {?}
       */


      _createClass(NgOptionComponent, [{
        key: "ngOnChanges",

        /**
         * @param {?} changes
         * @return {?}
         */
        value: function ngOnChanges(changes) {
          if (changes.disabled) {
            this.stateChange$.next({
              value: this.value,
              disabled: this._disabled
            });
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngAfterViewChecked",
        value: function ngAfterViewChecked() {
          if (this.label !== this._previousLabel) {
            this._previousLabel = this.label;
            this.stateChange$.next({
              value: this.value,
              disabled: this._disabled,
              label: this.elementRef.nativeElement.innerHTML
            });
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.stateChange$.complete();
        }
        /**
         * @private
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_isDisabled",
        value: function _isDisabled(value) {
          return value != null && "".concat(value) !== 'false';
        }
      }, {
        key: "disabled",
        get: function get() {
          return this._disabled;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        ,
        set: function set(value) {
          this._disabled = this._isDisabled(value);
        }
        /**
         * @return {?}
         */

      }, {
        key: "label",
        get: function get() {
          return (this.elementRef.nativeElement.textContent || '').trim();
        }
      }]);

      return NgOptionComponent;
    }();

    NgOptionComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'ng-option',
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        template: "<ng-content></ng-content>"
      }]
    }];
    /** @nocollapse */

    NgOptionComponent.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }];
    };

    NgOptionComponent.propDecorators = {
      value: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      disabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var NgSelectConfig = function NgSelectConfig() {
      _classCallCheck(this, NgSelectConfig);

      this.notFoundText = 'No items found';
      this.typeToSearchText = 'Type to search';
      this.addTagText = 'Add item';
      this.loadingText = 'Loading...';
      this.clearAllText = 'Clear all';
      this.disableVirtualScroll = true;
      this.openOnEnter = true;
      this.appearance = 'underline';
    };

    NgSelectConfig.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    NgSelectConfig.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({
      factory: function NgSelectConfig_Factory() {
        return new NgSelectConfig();
      },
      token: NgSelectConfig,
      providedIn: "root"
    });

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    var SELECTION_MODEL_FACTORY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('ng-select-selection-model');

    var NgSelectComponent =
    /*#__PURE__*/
    function () {
      /**
       * @param {?} classes
       * @param {?} autoFocus
       * @param {?} config
       * @param {?} newSelectionModel
       * @param {?} _elementRef
       * @param {?} _cd
       * @param {?} _console
       */
      function NgSelectComponent(classes, autoFocus, config, newSelectionModel, _elementRef, _cd, _console) {
        var _this15 = this;

        _classCallCheck(this, NgSelectComponent);

        this.classes = classes;
        this.autoFocus = autoFocus;
        this._cd = _cd;
        this._console = _console;
        this.markFirst = true;
        this.dropdownPosition = 'auto';
        this.loading = false;
        this.closeOnSelect = true;
        this.hideSelected = false;
        this.selectOnTab = false;
        this.bufferAmount = 4;
        this.selectableGroup = false;
        this.selectableGroupAsModel = true;
        this.searchFn = null;
        this.trackByFn = null;
        this.clearOnBackspace = true;
        this.labelForId = null;
        this.inputAttrs = {};
        this.readonly = false;
        this.searchWhileComposing = true;
        this.minTermLength = 0;
        this.editableSearchTerm = false;

        this.keyDownFn =
        /**
        * @param {?} _
        * @return {?}
        */
        function (_) {
          return true;
        };

        this.multiple = false;
        this.addTag = false;
        this.searchable = true;
        this.clearable = true;
        this.isOpen = false; // output events

        this.blurEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.focusEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.changeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.openEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.closeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.searchEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clearEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.addEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.removeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.scroll = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.scrollToEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.viewPortItems = [];
        this.searchTerm = null;
        this.dropdownId = newId();
        this.escapeHTML = true;
        this.useDefaultClass = true;
        this._items = [];
        this._defaultLabel = 'label';
        this._pressedKeys = [];
        this._isComposing = false;
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._keyPress$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();

        this._onChange =
        /**
        * @param {?} _
        * @return {?}
        */
        function (_) {};

        this._onTouched =
        /**
        * @return {?}
        */
        function () {};

        this.clearItem =
        /**
        * @param {?} item
        * @return {?}
        */
        function (item) {
          /** @type {?} */
          var option = _this15.selectedItems.find(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.value === item;
          });

          _this15.unselect(option);
        };

        this.trackByOption =
        /**
        * @param {?} _
        * @param {?} item
        * @return {?}
        */
        function (_, item) {
          if (_this15.trackByFn) {
            return _this15.trackByFn(item.value);
          }

          return item;
        };

        this._mergeGlobalConfig(config);

        this.itemsList = new ItemsList(this, newSelectionModel());
        this.element = _elementRef.nativeElement;
      }
      /**
       * @return {?}
       */


      _createClass(NgSelectComponent, [{
        key: "ngOnInit",

        /**
         * @return {?}
         */
        value: function ngOnInit() {
          this._handleKeyPresses();

          this._setInputAttributes();
        }
        /**
         * @param {?} changes
         * @return {?}
         */

      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          if (changes.multiple) {
            this.itemsList.clearSelected();
          }

          if (changes.items) {
            this._setItems(changes.items.currentValue || []);
          }

          if (changes.isOpen) {
            this._manualOpen = isDefined(changes.isOpen.currentValue);
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          if (!this._itemsAreUsed) {
            this.escapeHTML = false;

            this._setItemsFromNgOptions();
          }

          if (isDefined(this.autoFocus)) {
            this.focus();
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this._destroy$.next();

          this._destroy$.complete();
        }
        /**
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "handleKeyDown",
        value: function handleKeyDown($event) {
          /** @type {?} */
          var keyCode = KeyCode[$event.which];

          if (keyCode) {
            if (this.keyDownFn($event) === false) {
              return;
            }

            this.handleKeyCode($event);
          } else if ($event.key && $event.key.length === 1) {
            this._keyPress$.next($event.key.toLocaleLowerCase());
          }
        }
        /**
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "handleKeyCode",
        value: function handleKeyCode($event) {
          switch ($event.which) {
            case KeyCode.ArrowDown:
              this._handleArrowDown($event);

              break;

            case KeyCode.ArrowUp:
              this._handleArrowUp($event);

              break;

            case KeyCode.Space:
              this._handleSpace($event);

              break;

            case KeyCode.Enter:
              this._handleEnter($event);

              break;

            case KeyCode.Tab:
              this._handleTab($event);

              break;

            case KeyCode.Esc:
              this.close();
              $event.preventDefault();
              break;

            case KeyCode.Backspace:
              this._handleBackspace();

              break;
          }
        }
        /**
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "handleMousedown",
        value: function handleMousedown($event) {
          /** @type {?} */
          var target =
          /** @type {?} */
          $event.target;

          if (target.tagName !== 'INPUT') {
            $event.preventDefault();
          }

          if (target.classList.contains('ng-clear-wrapper')) {
            this.handleClearClick();
            return;
          }

          if (target.classList.contains('ng-arrow-wrapper')) {
            this.handleArrowClick();
            return;
          }

          if (target.classList.contains('ng-value-icon')) {
            return;
          }

          if (!this.focused) {
            this.focus();
          }

          if (this.searchable) {
            this.open();
          } else {
            this.toggle();
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "handleArrowClick",
        value: function handleArrowClick() {
          if (this.isOpen) {
            this.close();
          } else {
            this.open();
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "handleClearClick",
        value: function handleClearClick() {
          if (this.hasValue) {
            this.itemsList.clearSelected(true);

            this._updateNgModel();
          }

          this._clearSearch();

          this.focus();
          this.clearEvent.emit();

          this._onSelectionChanged();
        }
        /**
         * @return {?}
         */

      }, {
        key: "clearModel",
        value: function clearModel() {
          if (!this.clearable) {
            return;
          }

          this.itemsList.clearSelected();

          this._updateNgModel();
        }
        /**
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "writeValue",
        value: function writeValue(value) {
          this.itemsList.clearSelected();

          this._handleWriteValue(value);

          this._cd.markForCheck();
        }
        /**
         * @param {?} fn
         * @return {?}
         */

      }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
          this._onChange = fn;
        }
        /**
         * @param {?} fn
         * @return {?}
         */

      }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
          this._onTouched = fn;
        }
        /**
         * @param {?} state
         * @return {?}
         */

      }, {
        key: "setDisabledState",
        value: function setDisabledState(state) {
          this._disabled = state;

          this._cd.markForCheck();
        }
        /**
         * @return {?}
         */

      }, {
        key: "toggle",
        value: function toggle() {
          if (!this.isOpen) {
            this.open();
          } else {
            this.close();
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "open",
        value: function open() {
          if (this.disabled || this.isOpen || this.itemsList.maxItemsSelected || this._manualOpen) {
            return;
          }

          if (!this._isTypeahead && !this.addTag && this.itemsList.noItemsToSelect) {
            return;
          }

          this.isOpen = true;
          this.itemsList.markSelectedOrDefault(this.markFirst);
          this.openEvent.emit();

          if (!this.searchTerm) {
            this.focus();
          }

          this.detectChanges();
        }
        /**
         * @return {?}
         */

      }, {
        key: "close",
        value: function close() {
          if (!this.isOpen || this._manualOpen) {
            return;
          }

          this.isOpen = false;

          if (!this._editableSearchTerm) {
            this._clearSearch();
          } else {
            this.itemsList.resetFilteredItems();
          }

          this.itemsList.unmarkItem();

          this._onTouched();

          this.closeEvent.emit();

          this._cd.markForCheck();
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "toggleItem",
        value: function toggleItem(item) {
          if (!item || item.disabled || this.disabled) {
            return;
          }

          if (this.multiple && item.selected) {
            this.unselect(item);
          } else {
            this.select(item);
          }

          if (this._editableSearchTerm) {
            this._setSearchTermFromItems();
          }

          this._onSelectionChanged();
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "select",
        value: function select(item) {
          if (!item.selected) {
            this.itemsList.select(item);

            if (this.clearSearchOnAdd && !this._editableSearchTerm) {
              this._clearSearch();
            }

            this._updateNgModel();

            if (this.multiple) {
              this.addEvent.emit(item.value);
            }
          }

          if (this.closeOnSelect || this.itemsList.noItemsToSelect) {
            this.close();
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "focus",
        value: function focus() {
          this.searchInput.nativeElement.focus();
        }
        /**
         * @return {?}
         */

      }, {
        key: "blur",
        value: function blur() {
          this.searchInput.nativeElement.blur();
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "unselect",
        value: function unselect(item) {
          if (!item) {
            return;
          }

          this.itemsList.unselect(item);
          this.focus();

          this._updateNgModel();

          this.removeEvent.emit(item);
        }
        /**
         * @return {?}
         */

      }, {
        key: "selectTag",
        value: function selectTag() {
          var _this16 = this;

          /** @type {?} */
          var tag;

          if (isFunction(this.addTag)) {
            tag =
            /** @type {?} */
            this.addTag(this.searchTerm);
          } else {
            tag = this._primitive ? this.searchTerm : _defineProperty({}, this.bindLabel, this.searchTerm);
          }
          /** @type {?} */


          var handleTag =
          /**
          * @param {?} item
          * @return {?}
          */
          function handleTag(item) {
            return _this16._isTypeahead || !_this16.isOpen ? _this16.itemsList.mapItem(item, null) : _this16.itemsList.addItem(item);
          };

          if (isPromise(tag)) {
            tag.then(
            /**
            * @param {?} item
            * @return {?}
            */
            function (item) {
              return _this16.select(handleTag(item));
            }).catch(
            /**
            * @return {?}
            */
            function () {});
          } else if (tag) {
            this.select(handleTag(tag));
          }
        }
        /**
         * @return {?}
         */

      }, {
        key: "showClear",
        value: function showClear() {
          return this.clearable && (this.hasValue || this.searchTerm) && !this.disabled;
        }
        /**
         * @return {?}
         */

      }, {
        key: "showNoItemsFound",

        /**
         * @return {?}
         */
        value: function showNoItemsFound() {
          /** @type {?} */
          var empty = this.itemsList.filteredItems.length === 0;
          return (empty && !this._isTypeahead && !this.loading || empty && this._isTypeahead && this._validTerm && !this.loading) && !this.showAddTag;
        }
        /**
         * @return {?}
         */

      }, {
        key: "showTypeToSearch",
        value: function showTypeToSearch() {
          /** @type {?} */
          var empty = this.itemsList.filteredItems.length === 0;
          return empty && this._isTypeahead && !this._validTerm && !this.loading;
        }
        /**
         * @return {?}
         */

      }, {
        key: "onCompositionStart",
        value: function onCompositionStart() {
          this._isComposing = true;
        }
        /**
         * @param {?} term
         * @return {?}
         */

      }, {
        key: "onCompositionEnd",
        value: function onCompositionEnd(term) {
          this._isComposing = false;

          if (this.searchWhileComposing) {
            return;
          }

          this.filter(term);
        }
        /**
         * @param {?} term
         * @return {?}
         */

      }, {
        key: "filter",
        value: function filter(term) {
          if (this._isComposing && !this.searchWhileComposing) {
            return;
          }

          this.searchTerm = term;

          if (this._isTypeahead && (this._validTerm || this.minTermLength === 0)) {
            this.typeahead.next(term);
          }

          if (!this._isTypeahead) {
            this.itemsList.filter(this.searchTerm);

            if (this.isOpen) {
              this.itemsList.markSelectedOrDefault(this.markFirst);
            }
          }

          this.searchEvent.emit({
            term: term,
            items: this.itemsList.filteredItems.map(
            /**
            * @param {?} x
            * @return {?}
            */
            function (x) {
              return x.value;
            })
          });
          this.open();
        }
        /**
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "onInputFocus",
        value: function onInputFocus($event) {
          if (this.focused) {
            return;
          }

          if (this._editableSearchTerm) {
            this._setSearchTermFromItems();
          }

          this.element.classList.add('ng-select-focused');
          this.focusEvent.emit($event);
          this.focused = true;
        }
        /**
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "onInputBlur",
        value: function onInputBlur($event) {
          this.element.classList.remove('ng-select-focused');
          this.blurEvent.emit($event);

          if (!this.isOpen && !this.disabled) {
            this._onTouched();
          }

          if (this._editableSearchTerm) {
            this._setSearchTermFromItems();
          }

          this.focused = false;
        }
        /**
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "onItemHover",
        value: function onItemHover(item) {
          if (item.disabled) {
            return;
          }

          this.itemsList.markItem(item);
        }
        /**
         * @return {?}
         */

      }, {
        key: "detectChanges",
        value: function detectChanges() {
          if (!
          /** @type {?} */
          this._cd.destroyed) {
            this._cd.detectChanges();
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_setSearchTermFromItems",
        value: function _setSearchTermFromItems() {
          /** @type {?} */
          var selected = this.selectedItems && this.selectedItems[0];
          this.searchTerm = selected && selected.label || null;
        }
        /**
         * @private
         * @param {?} items
         * @return {?}
         */

      }, {
        key: "_setItems",
        value: function _setItems(items) {
          /** @type {?} */
          var firstItem = items[0];
          this.bindLabel = this.bindLabel || this._defaultLabel;
          this._primitive = isDefined(firstItem) ? !isObject(firstItem) : this._primitive || this.bindLabel === this._defaultLabel;
          this.itemsList.setItems(items);

          if (items.length > 0 && this.hasValue) {
            this.itemsList.mapSelectedItems();
          }

          if (this.isOpen && isDefined(this.searchTerm) && !this._isTypeahead) {
            this.itemsList.filter(this.searchTerm);
          }

          if (this._isTypeahead || this.isOpen) {
            this.itemsList.markSelectedOrDefault(this.markFirst);
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_setItemsFromNgOptions",
        value: function _setItemsFromNgOptions() {
          var _this17 = this;

          /** @type {?} */
          var mapNgOptions =
          /**
          * @param {?} options
          * @return {?}
          */
          function mapNgOptions(options) {
            _this17.items = options.map(
            /**
            * @param {?} option
            * @return {?}
            */
            function (option) {
              return {
                $ngOptionValue: option.value,
                $ngOptionLabel: option.elementRef.nativeElement.innerHTML,
                disabled: option.disabled
              };
            });

            _this17.itemsList.setItems(_this17.items);

            if (_this17.hasValue) {
              _this17.itemsList.mapSelectedItems();
            }

            _this17.detectChanges();
          };
          /** @type {?} */


          var handleOptionChange =
          /**
          * @return {?}
          */
          function handleOptionChange() {
            /** @type {?} */
            var changedOrDestroyed = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(_this17.ngOptions.changes, _this17._destroy$);
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"]).apply(void 0, _toConsumableArray(_this17.ngOptions.map(
            /**
            * @param {?} option
            * @return {?}
            */
            function (option) {
              return option.stateChange$;
            }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(changedOrDestroyed)).subscribe(
            /**
            * @param {?} option
            * @return {?}
            */
            function (option) {
              /** @type {?} */
              var item = _this17.itemsList.findItem(option.value);

              item.disabled = option.disabled;
              item.label = option.label || item.label;

              _this17._cd.detectChanges();
            });
          };

          this.ngOptions.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(this.ngOptions), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this._destroy$)).subscribe(
          /**
          * @param {?} options
          * @return {?}
          */
          function (options) {
            _this17.bindLabel = _this17._defaultLabel;
            mapNgOptions(options);
            handleOptionChange();
          });
        }
        /**
         * @private
         * @param {?} value
         * @return {?}
         */

      }, {
        key: "_isValidWriteValue",
        value: function _isValidWriteValue(value) {
          var _this18 = this;

          if (!isDefined(value) || this.multiple && value === '' || Array.isArray(value) && value.length === 0) {
            return false;
          }
          /** @type {?} */


          var validateBinding =
          /**
          * @param {?} item
          * @return {?}
          */
          function validateBinding(item) {
            if (!isDefined(_this18.compareWith) && isObject(item) && _this18.bindValue) {
              _this18._console.warn("Binding object(".concat(JSON.stringify(item), ") with bindValue is not allowed."));

              return false;
            }

            return true;
          };

          if (this.multiple) {
            if (!Array.isArray(value)) {
              this._console.warn('Multiple select ngModel should be array.');

              return false;
            }

            return value.every(
            /**
            * @param {?} item
            * @return {?}
            */
            function (item) {
              return validateBinding(item);
            });
          } else {
            return validateBinding(value);
          }
        }
        /**
         * @private
         * @param {?} ngModel
         * @return {?}
         */

      }, {
        key: "_handleWriteValue",
        value: function _handleWriteValue(ngModel) {
          var _this19 = this;

          if (!this._isValidWriteValue(ngModel)) {
            return;
          }
          /** @type {?} */


          var select =
          /**
          * @param {?} val
          * @return {?}
          */
          function select(val) {
            /** @type {?} */
            var item = _this19.itemsList.findItem(val);

            if (item) {
              _this19.itemsList.select(item);
            } else {
              /** @type {?} */
              var isValObject = isObject(val);
              /** @type {?} */

              var isPrimitive = !isValObject && !_this19.bindValue;

              if (isValObject || isPrimitive) {
                _this19.itemsList.select(_this19.itemsList.mapItem(val, null));
              } else if (_this19.bindValue) {
                var _item2;

                item = (_item2 = {}, _defineProperty(_item2, _this19.bindLabel, null), _defineProperty(_item2, _this19.bindValue, val), _item2);

                _this19.itemsList.select(_this19.itemsList.mapItem(item, null));
              }
            }
          };

          if (this.multiple) {
            /** @type {?} */
            ngModel.forEach(
            /**
            * @param {?} item
            * @return {?}
            */
            function (item) {
              return select(item);
            });
          } else {
            select(ngModel);
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_handleKeyPresses",
        value: function _handleKeyPresses() {
          var _this20 = this;

          if (this.searchable) {
            return;
          }

          this._keyPress$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this._destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(
          /**
          * @param {?} letter
          * @return {?}
          */
          function (letter) {
            return _this20._pressedKeys.push(letter);
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(
          /**
          * @return {?}
          */
          function () {
            return _this20._pressedKeys.length > 0;
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(
          /**
          * @return {?}
          */
          function () {
            return _this20._pressedKeys.join('');
          })).subscribe(
          /**
          * @param {?} term
          * @return {?}
          */
          function (term) {
            /** @type {?} */
            var item = _this20.itemsList.findByLabel(term);

            if (item) {
              if (_this20.isOpen) {
                _this20.itemsList.markItem(item);

                _this20._cd.markForCheck();
              } else {
                _this20.select(item);
              }
            }

            _this20._pressedKeys = [];
          });
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_setInputAttributes",
        value: function _setInputAttributes() {
          /** @type {?} */
          var input = this.searchInput.nativeElement;
          /** @type {?} */

          var attributes = Object.assign({
            type: 'text',
            autocorrect: 'off',
            autocapitalize: 'off',
            autocomplete: this.labelForId ? 'off' : this.dropdownId
          }, this.inputAttrs);

          for (var _i3 = 0, _Object$keys = Object.keys(attributes); _i3 < _Object$keys.length; _i3++) {
            var key = _Object$keys[_i3];
            input.setAttribute(key, attributes[key]);
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_updateNgModel",
        value: function _updateNgModel() {
          /** @type {?} */
          var model = [];
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = this.selectedItems[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var item = _step6.value;

              if (this.bindValue) {
                /** @type {?} */
                var value = null;

                if (item.children) {
                  /** @type {?} */
                  var groupKey = this.groupValue ? this.bindValue :
                  /** @type {?} */
                  this.groupBy;
                  value = item.value[groupKey ||
                  /** @type {?} */
                  this.groupBy];
                } else {
                  value = this.itemsList.resolveNested(item.value, this.bindValue);
                }

                model.push(value);
              } else {
                model.push(item.value);
              }
            }
            /** @type {?} */

          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          var selected = this.selectedItems.map(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.value;
          });

          if (this.multiple) {
            this._onChange(model);

            this.changeEvent.emit(selected);
          } else {
            this._onChange(isDefined(model[0]) ? model[0] : null);

            this.changeEvent.emit(selected[0]);
          }

          this._cd.markForCheck();
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_clearSearch",
        value: function _clearSearch() {
          if (!this.searchTerm) {
            return;
          }

          this._changeSearch(null);

          this.itemsList.resetFilteredItems();
        }
        /**
         * @private
         * @param {?} searchTerm
         * @return {?}
         */

      }, {
        key: "_changeSearch",
        value: function _changeSearch(searchTerm) {
          this.searchTerm = searchTerm;

          if (this._isTypeahead) {
            this.typeahead.next(searchTerm);
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_scrollToMarked",
        value: function _scrollToMarked() {
          if (!this.isOpen || !this.dropdownPanel) {
            return;
          }

          this.dropdownPanel.scrollTo(this.itemsList.markedItem);
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_scrollToTag",
        value: function _scrollToTag() {
          if (!this.isOpen || !this.dropdownPanel) {
            return;
          }

          this.dropdownPanel.scrollToTag();
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_onSelectionChanged",
        value: function _onSelectionChanged() {
          if (this.isOpen && this.multiple && this.appendTo) {
            // Make sure items are rendered.
            this._cd.detectChanges();

            this.dropdownPanel.adjustPosition();
          }
        }
        /**
         * @private
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "_handleTab",
        value: function _handleTab($event) {
          if (this.isOpen === false && !this.addTag) {
            return;
          }

          if (this.selectOnTab) {
            if (this.itemsList.markedItem) {
              this.toggleItem(this.itemsList.markedItem);
              $event.preventDefault();
            } else if (this.showAddTag) {
              this.selectTag();
              $event.preventDefault();
            } else {
              this.close();
            }
          } else {
            this.close();
          }
        }
        /**
         * @private
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "_handleEnter",
        value: function _handleEnter($event) {
          if (this.isOpen || this._manualOpen) {
            if (this.itemsList.markedItem) {
              this.toggleItem(this.itemsList.markedItem);
            } else if (this.showAddTag) {
              this.selectTag();
            }
          } else if (this.openOnEnter) {
            this.open();
          } else {
            return;
          }

          $event.preventDefault();
        }
        /**
         * @private
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "_handleSpace",
        value: function _handleSpace($event) {
          if (this.isOpen || this._manualOpen) {
            return;
          }

          this.open();
          $event.preventDefault();
        }
        /**
         * @private
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "_handleArrowDown",
        value: function _handleArrowDown($event) {
          if (this._nextItemIsTag(+1)) {
            this.itemsList.unmarkItem();

            this._scrollToTag();
          } else {
            this.itemsList.markNextItem();

            this._scrollToMarked();
          }

          this.open();
          $event.preventDefault();
        }
        /**
         * @private
         * @param {?} $event
         * @return {?}
         */

      }, {
        key: "_handleArrowUp",
        value: function _handleArrowUp($event) {
          if (!this.isOpen) {
            return;
          }

          if (this._nextItemIsTag(-1)) {
            this.itemsList.unmarkItem();

            this._scrollToTag();
          } else {
            this.itemsList.markPreviousItem();

            this._scrollToMarked();
          }

          $event.preventDefault();
        }
        /**
         * @private
         * @param {?} nextStep
         * @return {?}
         */

      }, {
        key: "_nextItemIsTag",
        value: function _nextItemIsTag(nextStep) {
          /** @type {?} */
          var nextIndex = this.itemsList.markedIndex + nextStep;
          return this.addTag && this.searchTerm && this.itemsList.markedItem && (nextIndex < 0 || nextIndex === this.itemsList.filteredItems.length);
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_handleBackspace",
        value: function _handleBackspace() {
          if (this.searchTerm || !this.clearable || !this.clearOnBackspace || !this.hasValue) {
            return;
          }

          if (this.multiple) {
            this.unselect(this.itemsList.lastSelectedItem);
          } else {
            this.clearModel();
          }
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_mergeGlobalConfig",

        /**
         * @private
         * @param {?} config
         * @return {?}
         */
        value: function _mergeGlobalConfig(config) {
          this.placeholder = this.placeholder || config.placeholder;
          this.notFoundText = this.notFoundText || config.notFoundText;
          this.typeToSearchText = this.typeToSearchText || config.typeToSearchText;
          this.addTagText = this.addTagText || config.addTagText;
          this.loadingText = this.loadingText || config.loadingText;
          this.clearAllText = this.clearAllText || config.clearAllText;
          this.virtualScroll = isDefined(this.virtualScroll) ? this.virtualScroll : isDefined(config.disableVirtualScroll) ? !config.disableVirtualScroll : false;
          this.openOnEnter = isDefined(this.openOnEnter) ? this.openOnEnter : config.openOnEnter;
          this.appendTo = this.appendTo || config.appendTo;
          this.bindValue = this.bindValue || config.bindValue;
          this.appearance = this.appearance || config.appearance;
        }
      }, {
        key: "items",
        get: function get() {
          return this._items;
        },

        /**
         * @param {?} value
         * @return {?}
         */
        set: function set(value) {
          this._itemsAreUsed = true;
          this._items = value;
        }
      }, {
        key: "compareWith",

        /**
         * @return {?}
         */
        get: function get() {
          return this._compareWith;
        }
        /**
         * @param {?} fn
         * @return {?}
         */
        ,
        set: function set(fn) {
          if (!isFunction(fn)) {
            throw Error('`compareWith` must be a function.');
          }

          this._compareWith = fn;
        }
        /**
         * @return {?}
         */

      }, {
        key: "clearSearchOnAdd",
        get: function get() {
          return isDefined(this._clearSearchOnAdd) ? this._clearSearchOnAdd : this.closeOnSelect;
        },

        /**
         * @param {?} value
         * @return {?}
         */
        set: function set(value) {
          this._clearSearchOnAdd = value;
        }
      }, {
        key: "disabled",

        /**
         * @return {?}
         */
        get: function get() {
          return this.readonly || this._disabled;
        }
      }, {
        key: "filtered",

        /**
         * @return {?}
         */
        get: function get() {
          return !!this.searchTerm && this.searchable || this._isComposing;
        }
      }, {
        key: "_editableSearchTerm",

        /**
         * @private
         * @return {?}
         */
        get: function get() {
          return this.editableSearchTerm && !this.multiple;
        }
        /**
         * @return {?}
         */

      }, {
        key: "selectedItems",
        get: function get() {
          return this.itemsList.selectedItems;
        }
        /**
         * @return {?}
         */

      }, {
        key: "selectedValues",
        get: function get() {
          return this.selectedItems.map(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.value;
          });
        }
        /**
         * @return {?}
         */

      }, {
        key: "hasValue",
        get: function get() {
          return this.selectedItems.length > 0;
        }
        /**
         * @return {?}
         */

      }, {
        key: "currentPanelPosition",
        get: function get() {
          if (this.dropdownPanel) {
            return this.dropdownPanel.currentPosition;
          }

          return undefined;
        }
      }, {
        key: "showAddTag",
        get: function get() {
          if (!this._validTerm) {
            return false;
          }
          /** @type {?} */


          var term = this.searchTerm.toLowerCase().trim();
          return this.addTag && !this.itemsList.filteredItems.some(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.label.toLowerCase() === term;
          }) && (!this.hideSelected && this.isOpen || !this.selectedItems.some(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.label.toLowerCase() === term;
          })) && !this.loading;
        }
      }, {
        key: "_isTypeahead",
        get: function get() {
          return this.typeahead && this.typeahead.observers.length > 0;
        }
        /**
         * @private
         * @return {?}
         */

      }, {
        key: "_validTerm",
        get: function get() {
          /** @type {?} */
          var term = this.searchTerm && this.searchTerm.trim();
          return term && term.length >= this.minTermLength;
        }
      }]);

      return NgSelectComponent;
    }();

    NgSelectComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'ng-select',
        template: "<div\n    (mousedown)=\"handleMousedown($event)\"\n    [class.ng-appearance-outline]=\"appearance === 'outline'\"\n    [class.ng-has-value]=\"hasValue\"\n    class=\"ng-select-container\">\n\n    <div class=\"ng-value-container\">\n        <div class=\"ng-placeholder\">{{placeholder}}</div>\n\n        <ng-container *ngIf=\"!multiLabelTemplate && selectedItems.length > 0\">\n            <div [class.ng-value-disabled]=\"item.disabled\" class=\"ng-value\" *ngFor=\"let item of selectedItems; trackBy: trackByOption\">\n                <ng-template #defaultLabelTemplate>\n                    <span class=\"ng-value-icon left\" (click)=\"unselect(item);\" aria-hidden=\"true\">\xD7</span>\n                    <span class=\"ng-value-label\" [ngItemLabel]=\"item.label\" [escape]=\"escapeHTML\"></span>\n                </ng-template>\n\n                <ng-template\n                    [ngTemplateOutlet]=\"labelTemplate || defaultLabelTemplate\"\n                    [ngTemplateOutletContext]=\"{ item: item.value, clear: clearItem, label: item.label }\">\n                </ng-template>\n            </div>\n        </ng-container>\n\n        <ng-template *ngIf=\"multiLabelTemplate && selectedValues.length > 0\"\n                [ngTemplateOutlet]=\"multiLabelTemplate\"\n                [ngTemplateOutletContext]=\"{ items: selectedValues, clear: clearItem }\">\n        </ng-template>\n\n        <div class=\"ng-input\">\n            <input #searchInput\n                   [attr.id]=\"labelForId\"\n                   [attr.tabindex]=\"tabIndex\"\n                   [readOnly]=\"!searchable || itemsList.maxItemsSelected\"\n                   [disabled]=\"disabled\"\n                   [value]=\"searchTerm ? searchTerm : ''\"\n                   (input)=\"filter(searchInput.value)\"\n                   (compositionstart)=\"onCompositionStart()\"\n                   (compositionend)=\"onCompositionEnd(searchInput.value)\"\n                   (focus)=\"onInputFocus($event)\"\n                   (blur)=\"onInputBlur($event)\"\n                   (change)=\"$event.stopPropagation()\"\n                   role=\"combobox\"\n                   [attr.aria-expanded]=\"isOpen\"\n                   [attr.aria-owns]=\"isOpen ? dropdownId : null\"\n                   [attr.aria-activedescendant]=\"isOpen ? itemsList?.markedItem?.htmlId : null\">\n        </div>\n    </div>\n\n    <ng-container *ngIf=\"loading\">\n        <ng-template #defaultLoadingSpinnerTemplate>\n            <div class=\"ng-spinner-loader\"></div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"loadingSpinnerTemplate || defaultLoadingSpinnerTemplate\">\n        </ng-template>\n    </ng-container>\n\n    <span *ngIf=\"showClear()\" class=\"ng-clear-wrapper\" title=\"{{clearAllText}}\">\n        <span class=\"ng-clear\" aria-hidden=\"true\">\xD7</span>\n    </span>\n\n    <span class=\"ng-arrow-wrapper\">\n        <span class=\"ng-arrow\"></span>\n    </span>\n</div>\n\n<ng-dropdown-panel *ngIf=\"isOpen\"\n                   class=\"ng-dropdown-panel\"\n                   [virtualScroll]=\"virtualScroll\"\n                   [bufferAmount]=\"bufferAmount\"\n                   [appendTo]=\"appendTo\"\n                   [position]=\"dropdownPosition\"\n                   [headerTemplate]=\"headerTemplate\"\n                   [footerTemplate]=\"footerTemplate\"\n                   [filterValue]=\"searchTerm\"\n                   [items]=\"itemsList.filteredItems\"\n                   [markedItem]=\"itemsList.markedItem\"\n                   (update)=\"viewPortItems = $event\"\n                   (scroll)=\"scroll.emit($event)\"\n                   (scrollToEnd)=\"scrollToEnd.emit($event)\"\n                   (outsideClick)=\"close()\"\n                   [class.ng-select-multiple]=\"multiple\"\n                   [ngClass]=\"appendTo ? classes : null\"\n                   [id]=\"dropdownId\">\n\n    <ng-container>\n        <div class=\"ng-option\" [attr.role]=\"item.children ? 'group' : 'option'\" (click)=\"toggleItem(item)\" (mouseover)=\"onItemHover(item)\"\n                *ngFor=\"let item of viewPortItems; trackBy: trackByOption\"\n                [class.ng-option-disabled]=\"item.disabled\"\n                [class.ng-option-selected]=\"item.selected\"\n                [class.ng-optgroup]=\"item.children\"\n                [class.ng-option]=\"!item.children\"\n                [class.ng-option-child]=\"!!item.parent\"\n                [class.ng-option-marked]=\"item === itemsList.markedItem\"\n                [attr.aria-selected]=\"item.selected\"\n                [attr.id]=\"item?.htmlId\">\n\n            <ng-template #defaultOptionTemplate>\n                <span class=\"ng-option-label\" [ngItemLabel]=\"item.label\" [escape]=\"escapeHTML\"></span>\n            </ng-template>\n\n            <ng-template\n                [ngTemplateOutlet]=\"item.children ? (optgroupTemplate || defaultOptionTemplate) : (optionTemplate || defaultOptionTemplate)\"\n                [ngTemplateOutletContext]=\"{ item: item.value, item$:item, index: item.index, searchTerm: searchTerm }\">\n            </ng-template>\n        </div>\n\n        <div class=\"ng-option\" [class.ng-option-marked]=\"!itemsList.markedItem\" (mouseover)=\"itemsList.unmarkItem()\" role=\"option\" (click)=\"selectTag()\" *ngIf=\"showAddTag\">\n            <ng-template #defaultTagTemplate>\n                <span><span class=\"ng-tag-label\">{{addTagText}}</span>\"{{searchTerm}}\"</span>\n            </ng-template>\n\n            <ng-template\n                [ngTemplateOutlet]=\"tagTemplate || defaultTagTemplate\"\n                [ngTemplateOutletContext]=\"{ searchTerm: searchTerm }\">\n            </ng-template>\n        </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"showNoItemsFound()\">\n        <ng-template #defaultNotFoundTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{notFoundText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"notFoundTemplate || defaultNotFoundTemplate\"\n            [ngTemplateOutletContext]=\"{ searchTerm: searchTerm }\">\n        </ng-template>\n    </ng-container>\n\n    <ng-container *ngIf=\"showTypeToSearch()\">\n        <ng-template #defaultTypeToSearchTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{typeToSearchText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"typeToSearchTemplate || defaultTypeToSearchTemplate\">\n        </ng-template>\n    </ng-container>\n\n    <ng-container *ngIf=\"loading && itemsList.filteredItems.length === 0\">\n        <ng-template #defaultLoadingTextTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{loadingText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"loadingTextTemplate || defaultLoadingTextTemplate\"\n            [ngTemplateOutletContext]=\"{ searchTerm: searchTerm }\">\n        </ng-template>\n    </ng-container>\n\n</ng-dropdown-panel>\n",
        providers: [{
          provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
          useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
          /**
          * @return {?}
          */
          function () {
            return NgSelectComponent;
          }),
          multi: true
        }, NgDropdownPanelService],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        host: {
          'role': 'listbox',
          '[class.ng-select]': 'useDefaultClass',
          '[class.ng-select-single]': '!multiple'
        },
        styles: [".ng-select{position:relative;display:block;box-sizing:border-box}.ng-select div,.ng-select input,.ng-select span{box-sizing:border-box}.ng-select [hidden]{display:none}.ng-select.ng-select-searchable .ng-select-container .ng-value-container .ng-input{opacity:1}.ng-select.ng-select-opened .ng-select-container{z-index:1001}.ng-select.ng-select-disabled .ng-select-container .ng-value-container .ng-placeholder,.ng-select.ng-select-disabled .ng-select-container .ng-value-container .ng-value{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.ng-select.ng-select-disabled .ng-arrow-wrapper{cursor:default}.ng-select.ng-select-filtered .ng-placeholder{display:none}.ng-select .ng-select-container{cursor:default;display:-webkit-box;display:flex;outline:0;overflow:hidden;position:relative;width:100%}.ng-select .ng-select-container .ng-value-container{display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1}.ng-select .ng-select-container .ng-value-container .ng-input{opacity:0}.ng-select .ng-select-container .ng-value-container .ng-input>input{box-sizing:content-box;background:none;border:0;box-shadow:none;outline:0;cursor:default;width:100%}.ng-select .ng-select-container .ng-value-container .ng-input>input::-ms-clear{display:none}.ng-select .ng-select-container .ng-value-container .ng-input>input[readonly]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:0;padding:0}.ng-select.ng-select-single.ng-select-filtered .ng-select-container .ng-value-container .ng-value{visibility:hidden}.ng-select.ng-select-single .ng-select-container .ng-value-container,.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-value{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-value .ng-value-icon{display:none}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input{position:absolute;left:0;width:100%}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value .ng-value-icon{display:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container{flex-wrap:wrap}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{white-space:nowrap}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-icon{display:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon{cursor:pointer}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-input{-webkit-box-flex:1;flex:1;z-index:2}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{position:absolute;z-index:1}.ng-select .ng-clear-wrapper{cursor:pointer;position:relative;width:17px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ng-select .ng-clear-wrapper .ng-clear{display:inline-block;font-size:18px;line-height:1;pointer-events:none}.ng-select .ng-spinner-loader{border-radius:50%;width:17px;height:17px;margin-right:5px;font-size:10px;position:relative;text-indent:-9999em;border-top:2px solid rgba(66,66,66,.2);border-right:2px solid rgba(66,66,66,.2);border-bottom:2px solid rgba(66,66,66,.2);border-left:2px solid #424242;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-animation:.8s linear infinite load8;animation:.8s linear infinite load8}.ng-select .ng-spinner-loader:after{border-radius:50%;width:17px;height:17px}@-webkit-keyframes load8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes load8{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.ng-select .ng-arrow-wrapper{cursor:pointer;position:relative;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ng-select .ng-arrow-wrapper .ng-arrow{pointer-events:none;display:inline-block;height:0;width:0;position:relative}.ng-dropdown-panel{box-sizing:border-box;position:absolute;opacity:0;width:100%;z-index:1050;-webkit-overflow-scrolling:touch}.ng-dropdown-panel .ng-dropdown-panel-items{display:block;height:auto;box-sizing:border-box;max-height:240px;overflow-y:auto}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{box-sizing:border-box;cursor:pointer;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option .highlighted{font-weight:700;text-decoration:underline}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.disabled{cursor:default}.ng-dropdown-panel .scroll-host{overflow:hidden;overflow-y:auto;position:relative;display:block;-webkit-overflow-scrolling:touch}.ng-dropdown-panel .scrollable-content{top:0;left:0;width:100%;height:100%;position:absolute}.ng-dropdown-panel .total-padding{width:1px;opacity:0}"]
      }]
    }];
    /** @nocollapse */

    NgSelectComponent.ctorParameters = function () {
      return [{
        type: String,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Attribute"],
          args: ['class']
        }]
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Attribute"],
          args: ['autofocus']
        }]
      }, {
        type: NgSelectConfig
      }, {
        type: undefined,
        decorators: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
          args: [SELECTION_MODEL_FACTORY]
        }]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
      }, {
        type: ConsoleService
      }];
    };

    NgSelectComponent.propDecorators = {
      bindLabel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      bindValue: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      markFirst: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      placeholder: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      notFoundText: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      typeToSearchText: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      addTagText: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      loadingText: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      clearAllText: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      appearance: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      dropdownPosition: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      appendTo: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      loading: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      closeOnSelect: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      hideSelected: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      selectOnTab: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      openOnEnter: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      maxSelectedItems: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      groupBy: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      groupValue: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      bufferAmount: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      virtualScroll: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      selectableGroup: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      selectableGroupAsModel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      searchFn: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      trackByFn: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      clearOnBackspace: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      labelForId: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      inputAttrs: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      tabIndex: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      readonly: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      searchWhileComposing: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      minTermLength: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      editableSearchTerm: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      keyDownFn: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      typeahead: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-typeahead']
      }],
      multiple: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-multiple']
      }],
      addTag: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-taggable']
      }],
      searchable: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-searchable']
      }],
      clearable: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-clearable']
      }],
      isOpen: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-opened']
      }],
      items: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      compareWith: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      clearSearchOnAdd: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      blurEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['blur']
      }],
      focusEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['focus']
      }],
      changeEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['change']
      }],
      openEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['open']
      }],
      closeEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['close']
      }],
      searchEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['search']
      }],
      clearEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['clear']
      }],
      addEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['add']
      }],
      removeEvent: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['remove']
      }],
      scroll: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['scroll']
      }],
      scrollToEnd: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
        args: ['scrollToEnd']
      }],
      optionTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgOptionTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      optgroupTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgOptgroupTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      labelTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgLabelTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      multiLabelTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgMultiLabelTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      headerTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgHeaderTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      footerTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgFooterTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      notFoundTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgNotFoundTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      typeToSearchTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgTypeToSearchTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      loadingTextTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgLoadingTextTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      tagTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgTagTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      loadingSpinnerTemplate: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"],
        args: [NgLoadingSpinnerTemplateDirective, {
          read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
          static: false
        }]
      }],
      dropdownPanel: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(
        /**
        * @return {?}
        */
        function () {
          return NgDropdownPanelComponent;
        }), {
          static: false
        }]
      }],
      searchInput: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
        args: ['searchInput', {
          static: true
        }]
      }],
      ngOptions: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
        args: [NgOptionComponent, {
          descendants: true
        }]
      }],
      disabled: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-disabled']
      }],
      filtered: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"],
        args: ['class.ng-select-filtered']
      }],
      handleKeyDown: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
        args: ['keydown', ['$event']]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @return {?}
     */


    function DefaultSelectionModelFactory() {
      return new DefaultSelectionModel();
    }
    /**
     * @record
     */


    function SelectionModel() {}

    if (false) {}

    var DefaultSelectionModel =
    /*#__PURE__*/
    function () {
      function DefaultSelectionModel() {
        _classCallCheck(this, DefaultSelectionModel);

        this._selected = [];
      }
      /**
       * @return {?}
       */


      _createClass(DefaultSelectionModel, [{
        key: "select",

        /**
         * @param {?} item
         * @param {?} multiple
         * @param {?} groupAsModel
         * @return {?}
         */
        value: function select(item, multiple, groupAsModel) {
          item.selected = true;

          if (!item.children || !multiple && groupAsModel) {
            this._selected.push(item);
          }

          if (multiple) {
            if (item.parent) {
              /** @type {?} */
              var childrenCount = item.parent.children.length;
              /** @type {?} */

              var selectedCount = item.parent.children.filter(
              /**
              * @param {?} x
              * @return {?}
              */
              function (x) {
                return x.selected;
              }).length;
              item.parent.selected = childrenCount === selectedCount;
            } else if (item.children) {
              this._setChildrenSelectedState(item.children, true);

              this._removeChildren(item);

              if (groupAsModel && this._activeChildren(item)) {
                this._selected = [].concat(_toConsumableArray(this._selected.filter(
                /**
                * @param {?} x
                * @return {?}
                */
                function (x) {
                  return x.parent !== item;
                })), [item]);
              } else {
                this._selected = [].concat(_toConsumableArray(this._selected), _toConsumableArray(item.children.filter(
                /**
                * @param {?} x
                * @return {?}
                */
                function (x) {
                  return !x.disabled;
                })));
              }
            }
          }
        }
        /**
         * @param {?} item
         * @param {?} multiple
         * @return {?}
         */

      }, {
        key: "unselect",
        value: function unselect(item, multiple) {
          this._selected = this._selected.filter(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x !== item;
          });
          item.selected = false;

          if (multiple) {
            if (item.parent && item.parent.selected) {
              var _this$_selected;

              /** @type {?} */
              var children = item.parent.children;

              this._removeParent(item.parent);

              this._removeChildren(item.parent);

              (_this$_selected = this._selected).push.apply(_this$_selected, _toConsumableArray(children.filter(
              /**
              * @param {?} x
              * @return {?}
              */
              function (x) {
                return x !== item && !x.disabled;
              })));

              item.parent.selected = false;
            } else if (item.children) {
              this._setChildrenSelectedState(item.children, false);

              this._removeChildren(item);
            }
          }
        }
        /**
         * @param {?} keepDisabled
         * @return {?}
         */

      }, {
        key: "clear",
        value: function clear(keepDisabled) {
          this._selected = keepDisabled ? this._selected.filter(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.disabled;
          }) : [];
        }
        /**
         * @private
         * @param {?} children
         * @param {?} selected
         * @return {?}
         */

      }, {
        key: "_setChildrenSelectedState",
        value: function _setChildrenSelectedState(children, selected) {
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = children[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var child = _step7.value;

              if (child.disabled) {
                continue;
              }

              child.selected = selected;
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }

          ;
        }
        /**
         * @private
         * @param {?} parent
         * @return {?}
         */

      }, {
        key: "_removeChildren",
        value: function _removeChildren(parent) {
          this._selected = [].concat(_toConsumableArray(this._selected.filter(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.parent !== parent;
          })), _toConsumableArray(parent.children.filter(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x.parent === parent && x.disabled && x.selected;
          })));
        }
        /**
         * @private
         * @param {?} parent
         * @return {?}
         */

      }, {
        key: "_removeParent",
        value: function _removeParent(parent) {
          this._selected = this._selected.filter(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x !== parent;
          });
        }
        /**
         * @private
         * @param {?} item
         * @return {?}
         */

      }, {
        key: "_activeChildren",
        value: function _activeChildren(item) {
          return item.children.every(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return !x.disabled || x.selected;
          });
        }
      }, {
        key: "value",
        get: function get() {
          return this._selected;
        }
      }]);

      return DefaultSelectionModel;
    }();

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var ɵ0 = DefaultSelectionModelFactory;

    var NgSelectModule = function NgSelectModule() {
      _classCallCheck(this, NgSelectModule);
    };

    NgSelectModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        declarations: [NgDropdownPanelComponent, NgOptionComponent, NgSelectComponent, NgOptgroupTemplateDirective, NgOptionTemplateDirective, NgLabelTemplateDirective, NgMultiLabelTemplateDirective, NgHeaderTemplateDirective, NgFooterTemplateDirective, NgNotFoundTemplateDirective, NgTypeToSearchTemplateDirective, NgLoadingTextTemplateDirective, NgTagTemplateDirective, NgLoadingSpinnerTemplateDirective, NgItemLabelDirective],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
        exports: [NgSelectComponent, NgOptionComponent, NgOptgroupTemplateDirective, NgOptionTemplateDirective, NgLabelTemplateDirective, NgMultiLabelTemplateDirective, NgHeaderTemplateDirective, NgFooterTemplateDirective, NgNotFoundTemplateDirective, NgTypeToSearchTemplateDirective, NgLoadingTextTemplateDirective, NgTagTemplateDirective, NgLoadingSpinnerTemplateDirective],
        providers: [{
          provide: SELECTION_MODEL_FACTORY,
          useValue: ɵ0
        }]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=ng-select-ng-select.js.map

    /***/
  },

  /***/
  "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js":
  /*!**********************************************************!*\
    !*** ./node_modules/ngx-spinner/fesm2015/ngx-spinner.js ***!
    \**********************************************************/

  /*! exports provided: NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService */

  /***/
  function node_modulesNgxSpinnerFesm2015NgxSpinnerJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgxSpinnerComponent", function () {
      return NgxSpinnerComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgxSpinnerModule", function () {
      return NgxSpinnerModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NgxSpinnerService", function () {
      return NgxSpinnerService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs/operators */
    "./node_modules/rxjs/_esm2015/operators/index.js");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/fesm2015/animations.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-spinner.enum.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */


    var LOADERS = {
      'ball-8bits': 16,
      'ball-atom': 4,
      'ball-beat': 3,
      'ball-circus': 5,
      'ball-climbing-dot': 4,
      'ball-clip-rotate': 1,
      'ball-clip-rotate-multiple': 2,
      'ball-clip-rotate-pulse': 2,
      'ball-elastic-dots': 5,
      'ball-fall': 3,
      'ball-fussion': 4,
      'ball-grid-beat': 9,
      'ball-grid-pulse': 9,
      'ball-newton-cradle': 4,
      'ball-pulse': 3,
      'ball-pulse-rise': 5,
      'ball-pulse-sync': 3,
      'ball-rotate': 1,
      'ball-running-dots': 5,
      'ball-scale': 1,
      'ball-scale-multiple': 3,
      'ball-scale-pulse': 2,
      'ball-scale-ripple': 1,
      'ball-scale-ripple-multiple': 3,
      'ball-spin': 8,
      'ball-spin-clockwise': 8,
      'ball-spin-clockwise-fade': 8,
      'ball-spin-clockwise-fade-rotating': 8,
      'ball-spin-fade': 8,
      'ball-spin-fade-rotating': 8,
      'ball-spin-rotate': 2,
      'ball-square-clockwise-spin': 8,
      'ball-square-spin': 8,
      'ball-triangle-path': 3,
      'ball-zig-zag': 2,
      'ball-zig-zag-deflect': 2,
      'cog': 1,
      'cube-transition': 2,
      'fire': 3,
      'line-scale': 5,
      'line-scale-party': 5,
      'line-scale-pulse-out': 5,
      'line-scale-pulse-out-rapid': 5,
      'line-spin-clockwise-fade': 8,
      'line-spin-clockwise-fade-rotating': 8,
      'line-spin-fade': 8,
      'line-spin-fade-rotating': 8,
      'pacman': 6,
      'square-jelly-box': 2,
      'square-loader': 1,
      'square-spin': 1,
      'timer': 1,
      'triangle-skew-spin': 1
    };
    /** @type {?} */

    var DEFAULTS = {
      BD_COLOR: 'rgba(51,51,51,0.8)',
      SPINNER_COLOR: '#fff',
      SPINNER_TYPE: 'ball-scale-multiple',
      Z_INDEX: 99999
    };
    /** @type {?} */

    var PRIMARY_SPINNER = 'primary';
    /**
     * @record
     */

    function Spinner() {}

    if (false) {}

    var NgxSpinner =
    /**
     * @param {?=} init
     */
    function NgxSpinner(init) {
      _classCallCheck(this, NgxSpinner);

      Object.assign(this, init);
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-spinner.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var NgxSpinnerService =
    /*#__PURE__*/
    function () {
      /**
       * Creates an instance of NgxSpinnerService.
       * \@memberof NgxSpinnerService
       */
      function NgxSpinnerService() {
        _classCallCheck(this, NgxSpinnerService);

        /**
         * Spinner observable
         *
         * \@memberof NgxSpinnerService
         */
        this.spinnerObservable = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
      }
      /**
       * Get subscription of desired spinner
       * \@memberof NgxSpinnerService
       *
       * @param {?} name
       * @return {?}
       */


      _createClass(NgxSpinnerService, [{
        key: "getSpinner",
        value: function getSpinner(name) {
          return this.spinnerObservable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(
          /**
          * @param {?} x
          * @return {?}
          */
          function (x) {
            return x && x.name === name;
          }));
        }
        /**
         * To show spinner
         *
         * \@memberof NgxSpinnerService
         * @param {?=} name
         * @param {?=} spinner
         * @return {?}
         */

      }, {
        key: "show",
        value: function show() {
          var _this21 = this;

          var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PRIMARY_SPINNER;
          var spinner = arguments.length > 1 ? arguments[1] : undefined;

          /** @type {?} */
          var showPromise = new Promise(
          /**
          * @param {?} resolve
          * @param {?} _reject
          * @return {?}
          */
          function (resolve, _reject) {
            if (spinner && Object.keys(spinner).length) {
              spinner['name'] = name;

              _this21.spinnerObservable.next(new NgxSpinner(Object.assign({}, spinner, {
                show: true
              })));

              resolve(true);
            } else {
              _this21.spinnerObservable.next(new NgxSpinner({
                name: name,
                show: true
              }));

              resolve(true);
            }
          });
          return showPromise;
        }
        /**
         * To hide spinner
         *
         * \@memberof NgxSpinnerService
         * @param {?=} name
         * @param {?=} debounce
         * @return {?}
         */

      }, {
        key: "hide",
        value: function hide() {
          var _this22 = this;

          var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PRIMARY_SPINNER;
          var debounce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          /** @type {?} */
          var hidePromise = new Promise(
          /**
          * @param {?} resolve
          * @param {?} _reject
          * @return {?}
          */
          function (resolve, _reject) {
            setTimeout(
            /**
            * @return {?}
            */
            function () {
              _this22.spinnerObservable.next(new NgxSpinner({
                name: name,
                show: false
              }));

              resolve(true);
            }, debounce);
          });
          return hidePromise;
        }
      }]);

      return NgxSpinnerService;
    }();

    NgxSpinnerService.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
      args: [{
        providedIn: 'root'
      }]
    }];
    /** @nocollapse */

    NgxSpinnerService.ctorParameters = function () {
      return [];
    };
    /** @nocollapse */


    NgxSpinnerService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({
      factory: function NgxSpinnerService_Factory() {
        return new NgxSpinnerService();
      },
      token: NgxSpinnerService,
      providedIn: "root"
    });

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-spinner.component.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var NgxSpinnerComponent =
    /*#__PURE__*/
    function () {
      /**
       * Creates an instance of NgxSpinnerComponent.
       *
       * \@memberof NgxSpinnerComponent
       * @param {?} spinnerService
       * @param {?} changeDetector
       */
      function NgxSpinnerComponent(spinnerService, changeDetector) {
        var _this23 = this;

        _classCallCheck(this, NgxSpinnerComponent);

        this.spinnerService = spinnerService;
        this.changeDetector = changeDetector;
        /**
         * Spinner Object
         *
         * \@memberof NgxSpinnerComponent
         */

        this.spinner = new NgxSpinner();
        /**
         * Unsubscribe from spinner's observable
         *
         * \@memberof NgxSpinnerComponent
         *
         */

        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        /**
         * To set default ngx-spinner options
         *
         * \@memberof NgxSpinnerComponent
         */

        this.setDefaultOptions =
        /**
        * @return {?}
        */
        function () {
          _this23.spinner = new NgxSpinner({
            name: _this23.name,
            bdColor: _this23.bdColor,
            size: _this23.size,
            color: _this23.color,
            type: _this23.type,
            fullScreen: _this23.fullScreen,
            divArray: _this23.divArray,
            divCount: _this23.divCount,
            show: _this23.show,
            zIndex: _this23.zIndex
          });
        };

        this.bdColor = DEFAULTS.BD_COLOR;
        this.zIndex = DEFAULTS.Z_INDEX;
        this.color = DEFAULTS.SPINNER_COLOR;
        this.type = DEFAULTS.SPINNER_TYPE;
        this.size = 'large';
        this.fullScreen = true;
        this.name = PRIMARY_SPINNER;
        this.divArray = [];
        this.divCount = 0;
        this.show = false;
      }
      /**
       * Initialization method
       *
       * \@memberof NgxSpinnerComponent
       * @return {?}
       */


      _createClass(NgxSpinnerComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this24 = this;

          this.setDefaultOptions();
          this.spinnerService.getSpinner(this.name).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.ngUnsubscribe)).subscribe(
          /**
          * @param {?} spinner
          * @return {?}
          */
          function (spinner) {
            _this24.setDefaultOptions();

            Object.assign(_this24.spinner, spinner);

            if (spinner.show) {
              _this24.onInputChange();
            }

            _this24.changeDetector.markForCheck();
          });
        }
        /**
         * On changes event for input variables
         *
         * \@memberof NgxSpinnerComponent
         * @param {?} changes
         * @return {?}
         */

      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          for (var propName in changes) {
            if (propName) {
              /** @type {?} */
              var changedProp = changes[propName];

              if (changedProp.isFirstChange()) {
                return;
              } else if (typeof changedProp.currentValue !== 'undefined' && changedProp.currentValue !== changedProp.previousValue) {
                if (changedProp.currentValue !== '') {
                  this.spinner[propName] = changedProp.currentValue;
                }
              }
            }
          }
        }
        /**
         * To get class for spinner
         *
         * \@memberof NgxSpinnerComponent
         * @param {?} type
         * @param {?} size
         * @return {?}
         */

      }, {
        key: "getClass",
        value: function getClass(type, size) {
          this.spinner.divCount = LOADERS[type];
          this.spinner.divArray = Array(this.spinner.divCount).fill(0).map(
          /**
          * @param {?} x
          * @param {?} i
          * @return {?}
          */
          function (x, i) {
            return i;
          });
          /** @type {?} */

          var sizeClass = '';

          switch (size.toLowerCase()) {
            case 'small':
              sizeClass = 'la-sm';
              break;

            case 'medium':
              sizeClass = 'la-2x';
              break;

            case 'large':
              sizeClass = 'la-3x';
              break;

            default:
              break;
          }

          return 'la-' + type + ' ' + sizeClass;
        }
        /**
         * Check if input variables have changed
         *
         * \@memberof NgxSpinnerComponent
         * @return {?}
         */

      }, {
        key: "onInputChange",
        value: function onInputChange() {
          this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
        }
        /**
         * Component destroy event
         *
         * \@memberof NgxSpinnerComponent
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.ngUnsubscribe.next();
          this.ngUnsubscribe.complete();
        }
      }]);

      return NgxSpinnerComponent;
    }();

    NgxSpinnerComponent.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
      args: [{
        selector: 'ngx-spinner',
        template: "<div [@fadeIn]=\"'in'\" *ngIf=\"spinner.show\" class=\"overlay\" [style.background-color]=\"spinner.bdColor\" [style.z-index]=\"spinner.zIndex\"\n  [style.position]=\"spinner.fullScreen ? 'fixed' : 'absolute'\">\n  <div [class]=\"spinner.class\" [style.color]=\"spinner.color\">\n    <div *ngFor=\"let index of spinner.divArray\"></div>\n  </div>\n  <div class=\"loading-text\" [style.z-index]=\"spinner.zIndex\">\n    <ng-content></ng-content>\n  </div>\n</div>",
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
        animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('fadeIn', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
          opacity: 1
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
          opacity: 0
        }), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(300)]), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':leave', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(200, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({
          opacity: 0
        })))])],
        styles: ["/*!\n * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)\n * Copyright 2015 Daniel Cardoso <@DanielCardoso>\n * Licensed under MIT\n */.la-ball-8bits,.la-ball-8bits>div{position:relative;box-sizing:border-box}.la-ball-8bits{display:block;font-size:0;color:#fff;width:12px;height:12px}.la-ball-8bits.la-dark{color:#333}.la-ball-8bits>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:4px;height:4px;border-radius:0;opacity:0;transform:translate(100%,100%);-webkit-animation:1s infinite ball-8bits;animation:1s infinite ball-8bits}.la-ball-8bits>div:nth-child(1){-webkit-animation-delay:-.9375s;animation-delay:-.9375s;top:-100%;left:0}.la-ball-8bits>div:nth-child(2){-webkit-animation-delay:-.875s;animation-delay:-.875s;top:-100%;left:33.3333333333%}.la-ball-8bits>div:nth-child(3){-webkit-animation-delay:-.8125s;animation-delay:-.8125s;top:-66.6666666667%;left:66.6666666667%}.la-ball-8bits>div:nth-child(4){-webkit-animation-delay:-.75s;animation-delay:-.75s;top:-33.3333333333%;left:100%}.la-ball-8bits>div:nth-child(5){-webkit-animation-delay:-.6875s;animation-delay:-.6875s;top:0;left:100%}.la-ball-8bits>div:nth-child(6){-webkit-animation-delay:-.625s;animation-delay:-.625s;top:33.3333333333%;left:100%}.la-ball-8bits>div:nth-child(7){-webkit-animation-delay:-.5625s;animation-delay:-.5625s;top:66.6666666667%;left:66.6666666667%}.la-ball-8bits>div:nth-child(8){-webkit-animation-delay:-.5s;animation-delay:-.5s;top:100%;left:33.3333333333%}.la-ball-8bits>div:nth-child(9){-webkit-animation-delay:-.4375s;animation-delay:-.4375s;top:100%;left:0}.la-ball-8bits>div:nth-child(10){-webkit-animation-delay:-.375s;animation-delay:-.375s;top:100%;left:-33.3333333333%}.la-ball-8bits>div:nth-child(11){-webkit-animation-delay:-.3125s;animation-delay:-.3125s;top:66.6666666667%;left:-66.6666666667%}.la-ball-8bits>div:nth-child(12){-webkit-animation-delay:-.25s;animation-delay:-.25s;top:33.3333333333%;left:-100%}.la-ball-8bits>div:nth-child(13){-webkit-animation-delay:-.1875s;animation-delay:-.1875s;top:0;left:-100%}.la-ball-8bits>div:nth-child(14){-webkit-animation-delay:-.125s;animation-delay:-.125s;top:-33.3333333333%;left:-100%}.la-ball-8bits>div:nth-child(15){-webkit-animation-delay:-.0625s;animation-delay:-.0625s;top:-66.6666666667%;left:-66.6666666667%}.la-ball-8bits>div:nth-child(16){-webkit-animation-delay:0s;animation-delay:0s;top:-100%;left:-33.3333333333%}.la-ball-8bits.la-sm{width:6px;height:6px}.la-ball-8bits.la-sm>div{width:2px;height:2px}.la-ball-8bits.la-2x{width:24px;height:24px}.la-ball-8bits.la-2x>div{width:8px;height:8px}.la-ball-8bits.la-3x{width:36px;height:36px}.la-ball-8bits.la-3x>div{width:12px;height:12px}@-webkit-keyframes ball-8bits{0%,50%{opacity:1}51%{opacity:0}}@keyframes ball-8bits{0%,50%{opacity:1}51%{opacity:0}}.la-ball-atom,.la-ball-atom>div{position:relative;box-sizing:border-box}.la-ball-atom{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-atom.la-dark{color:#333}.la-ball-atom>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-atom>div:nth-child(1){position:absolute;top:50%;left:50%;z-index:1;width:60%;height:60%;background:#aaa;border-radius:100%;transform:translate(-50%,-50%);-webkit-animation:4.5s linear infinite ball-atom-shrink;animation:4.5s linear infinite ball-atom-shrink}.la-ball-atom>div:not(:nth-child(1)){position:absolute;left:0;z-index:0;width:100%;height:100%;background:0 0;-webkit-animation:1.5s steps(2,end) infinite ball-atom-zindex;animation:1.5s steps(2,end) infinite ball-atom-zindex}.la-ball-atom>div:not(:nth-child(1)):before{position:absolute;top:0;left:0;width:10px;height:10px;margin-top:-5px;margin-left:-5px;content:\"\";background:currentColor;border-radius:50%;opacity:.75;-webkit-animation:1.5s infinite ball-atom-position,1.5s infinite ball-atom-size;animation:1.5s infinite ball-atom-position,1.5s infinite ball-atom-size}.la-ball-atom>div:nth-child(2){-webkit-animation-delay:.75s;animation-delay:.75s}.la-ball-atom>div:nth-child(2):before{-webkit-animation-delay:0s,-1.125s;animation-delay:0s,-1.125s}.la-ball-atom>div:nth-child(3){transform:rotate(120deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-atom>div:nth-child(3):before{-webkit-animation-delay:-1s,-.75s;animation-delay:-1s,-.75s}.la-ball-atom>div:nth-child(4){transform:rotate(240deg);-webkit-animation-delay:.25s;animation-delay:.25s}.la-ball-atom>div:nth-child(4):before{-webkit-animation-delay:-.5s,-125ms;animation-delay:-.5s,-125ms}.la-ball-atom.la-sm{width:16px;height:16px}.la-ball-atom.la-sm>div:not(:nth-child(1)):before{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-atom.la-2x{width:64px;height:64px}.la-ball-atom.la-2x>div:not(:nth-child(1)):before{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-atom.la-3x{width:96px;height:96px}.la-ball-atom.la-3x>div:not(:nth-child(1)):before{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-atom-position{50%{top:100%;left:100%}}@keyframes ball-atom-position{50%{top:100%;left:100%}}@-webkit-keyframes ball-atom-size{50%{transform:scale(.5,.5)}}@keyframes ball-atom-size{50%{transform:scale(.5,.5)}}@-webkit-keyframes ball-atom-zindex{50%{z-index:10}}@keyframes ball-atom-zindex{50%{z-index:10}}@-webkit-keyframes ball-atom-shrink{50%{transform:translate(-50%,-50%) scale(.8,.8)}}@keyframes ball-atom-shrink{50%{transform:translate(-50%,-50%) scale(.8,.8)}}.la-ball-beat,.la-ball-beat>div{position:relative;box-sizing:border-box}.la-ball-beat{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-beat.la-dark{color:#333}.la-ball-beat>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:.7s linear -.15s infinite ball-beat;animation:.7s linear -.15s infinite ball-beat}.la-ball-beat>div:nth-child(2n-1){-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-beat.la-sm{width:26px;height:8px}.la-ball-beat.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-beat.la-2x{width:108px;height:36px}.la-ball-beat.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-beat.la-3x{width:162px;height:54px}.la-ball-beat.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-beat{50%{opacity:.2;transform:scale(.75)}100%{opacity:1;transform:scale(1)}}@keyframes ball-beat{50%{opacity:.2;transform:scale(.75)}100%{opacity:1;transform:scale(1)}}.la-ball-circus,.la-ball-circus>div{position:relative;box-sizing:border-box}.la-ball-circus{display:block;font-size:0;color:#fff;width:16px;height:16px}.la-ball-circus.la-dark{color:#333}.la-ball-circus>div{float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:-100%;display:block;width:100%;height:100%;border-radius:100%;opacity:.5;-webkit-animation:2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-position,2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-size;animation:2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-position,2.5s cubic-bezier(.25,0,.75,1) infinite ball-circus-size}.la-ball-circus>div:nth-child(1){-webkit-animation-delay:0s,-.5s;animation-delay:0s,-.5s}.la-ball-circus>div:nth-child(2){-webkit-animation-delay:-.5s,-1s;animation-delay:-.5s,-1s}.la-ball-circus>div:nth-child(3){-webkit-animation-delay:-1s,-1.5s;animation-delay:-1s,-1.5s}.la-ball-circus>div:nth-child(4){-webkit-animation-delay:-1.5s,-2s;animation-delay:-1.5s,-2s}.la-ball-circus>div:nth-child(5){-webkit-animation-delay:-2s,-2.5s;animation-delay:-2s,-2.5s}.la-ball-circus.la-sm,.la-ball-circus.la-sm>div{width:8px;height:8px}.la-ball-circus.la-2x,.la-ball-circus.la-2x>div{width:32px;height:32px}.la-ball-circus.la-3x,.la-ball-circus.la-3x>div{width:48px;height:48px}@-webkit-keyframes ball-circus-position{50%{left:100%}}@keyframes ball-circus-position{50%{left:100%}}@-webkit-keyframes ball-circus-size{50%{transform:scale(.3,.3)}}@keyframes ball-circus-size{50%{transform:scale(.3,.3)}}.la-ball-climbing-dot,.la-ball-climbing-dot>div{position:relative;box-sizing:border-box}.la-ball-climbing-dot{display:block;font-size:0;color:#fff;width:42px;height:32px}.la-ball-climbing-dot.la-dark{color:#333}.la-ball-climbing-dot>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-ball-climbing-dot>div:nth-child(1){position:absolute;bottom:32%;left:18%;width:14px;height:14px;border-radius:100%;transform-origin:center bottom;-webkit-animation:.6s ease-in-out infinite ball-climbing-dot-jump;animation:.6s ease-in-out infinite ball-climbing-dot-jump}.la-ball-climbing-dot>div:not(:nth-child(1)){position:absolute;top:0;right:0;width:14px;height:2px;border-radius:0;transform:translate(60%,0);-webkit-animation:1.8s linear infinite ball-climbing-dot-steps;animation:1.8s linear infinite ball-climbing-dot-steps}.la-ball-climbing-dot>div:not(:nth-child(1)):nth-child(2){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-climbing-dot>div:not(:nth-child(1)):nth-child(3){-webkit-animation-delay:-.6s;animation-delay:-.6s}.la-ball-climbing-dot>div:not(:nth-child(1)):nth-child(4){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-ball-climbing-dot.la-sm{width:20px;height:16px}.la-ball-climbing-dot.la-sm>div:nth-child(1){width:6px;height:6px}.la-ball-climbing-dot.la-sm>div:not(:nth-child(1)){width:6px;height:1px}.la-ball-climbing-dot.la-2x{width:84px;height:64px}.la-ball-climbing-dot.la-2x>div:nth-child(1){width:28px;height:28px}.la-ball-climbing-dot.la-2x>div:not(:nth-child(1)){width:28px;height:4px}.la-ball-climbing-dot.la-3x{width:126px;height:96px}.la-ball-climbing-dot.la-3x>div:nth-child(1){width:42px;height:42px}.la-ball-climbing-dot.la-3x>div:not(:nth-child(1)){width:42px;height:6px}@-webkit-keyframes ball-climbing-dot-jump{0%,100%{transform:scale(1,.7)}20%,80%,90%{transform:scale(.7,1.2)}40%,46%{transform:scale(1,1)}50%{bottom:125%}}@keyframes ball-climbing-dot-jump{0%,100%{transform:scale(1,.7)}20%,80%,90%{transform:scale(.7,1.2)}40%,46%{transform:scale(1,1)}50%{bottom:125%}}@-webkit-keyframes ball-climbing-dot-steps{0%{top:0;right:0;opacity:0}50%{opacity:1}100%{top:100%;right:100%;opacity:0}}@keyframes ball-climbing-dot-steps{0%{top:0;right:0;opacity:0}50%{opacity:1}100%{top:100%;right:100%;opacity:0}}.la-ball-clip-rotate-multiple,.la-ball-clip-rotate-multiple>div{position:relative;box-sizing:border-box}.la-ball-clip-rotate-multiple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate-multiple.la-dark{color:#333}.la-ball-clip-rotate-multiple>div{display:inline-block;float:none;border:2px solid currentColor;position:absolute;top:50%;left:50%;background:0 0;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-clip-rotate-multiple-rotate;animation:1s ease-in-out infinite ball-clip-rotate-multiple-rotate}.la-ball-clip-rotate-multiple>div:first-child{position:absolute;width:32px;height:32px;border-right-color:transparent;border-left-color:transparent}.la-ball-clip-rotate-multiple>div:last-child{width:16px;height:16px;border-top-color:transparent;border-bottom-color:transparent;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-direction:reverse;animation-direction:reverse}.la-ball-clip-rotate-multiple.la-sm{width:16px;height:16px}.la-ball-clip-rotate-multiple.la-sm>div{border-width:1px}.la-ball-clip-rotate-multiple.la-sm>div:first-child{width:16px;height:16px}.la-ball-clip-rotate-multiple.la-sm>div:last-child{width:8px;height:8px}.la-ball-clip-rotate-multiple.la-2x{width:64px;height:64px}.la-ball-clip-rotate-multiple.la-2x>div{border-width:4px}.la-ball-clip-rotate-multiple.la-2x>div:first-child{width:64px;height:64px}.la-ball-clip-rotate-multiple.la-2x>div:last-child{width:32px;height:32px}.la-ball-clip-rotate-multiple.la-3x{width:96px;height:96px}.la-ball-clip-rotate-multiple.la-3x>div{border-width:6px}.la-ball-clip-rotate-multiple.la-3x>div:first-child{width:96px;height:96px}.la-ball-clip-rotate-multiple.la-3x>div:last-child{width:48px;height:48px}@-webkit-keyframes ball-clip-rotate-multiple-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ball-clip-rotate-multiple-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}.la-ball-clip-rotate-pulse,.la-ball-clip-rotate-pulse>div{position:relative;box-sizing:border-box}.la-ball-clip-rotate-pulse{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate-pulse.la-dark{color:#333}.la-ball-clip-rotate-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;border-radius:100%}.la-ball-clip-rotate-pulse>div:first-child{position:absolute;width:32px;height:32px;background:0 0;border-style:solid;border-width:2px;border-right-color:transparent;border-left-color:transparent;-webkit-animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-rotate;animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-rotate}.la-ball-clip-rotate-pulse>div:last-child{width:16px;height:16px;-webkit-animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-scale;animation:1s cubic-bezier(.09,.57,.49,.9) infinite ball-clip-rotate-pulse-scale}.la-ball-clip-rotate-pulse.la-sm{width:16px;height:16px}.la-ball-clip-rotate-pulse.la-sm>div:first-child{width:16px;height:16px;border-width:1px}.la-ball-clip-rotate-pulse.la-sm>div:last-child{width:8px;height:8px}.la-ball-clip-rotate-pulse.la-2x{width:64px;height:64px}.la-ball-clip-rotate-pulse.la-2x>div:first-child{width:64px;height:64px;border-width:4px}.la-ball-clip-rotate-pulse.la-2x>div:last-child{width:32px;height:32px}.la-ball-clip-rotate-pulse.la-3x{width:96px;height:96px}.la-ball-clip-rotate-pulse.la-3x>div:first-child{width:96px;height:96px;border-width:6px}.la-ball-clip-rotate-pulse.la-3x>div:last-child{width:48px;height:48px}@-webkit-keyframes ball-clip-rotate-pulse-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ball-clip-rotate-pulse-rotate{0%{transform:translate(-50%,-50%) rotate(0)}50%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes ball-clip-rotate-pulse-scale{0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}30%{opacity:.3;transform:translate(-50%,-50%) scale(.15)}}@keyframes ball-clip-rotate-pulse-scale{0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)}30%{opacity:.3;transform:translate(-50%,-50%) scale(.15)}}.la-ball-clip-rotate,.la-ball-clip-rotate>div{position:relative;box-sizing:border-box}.la-ball-clip-rotate{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-clip-rotate.la-dark{color:#333}.la-ball-clip-rotate>div{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-bottom-color:transparent;border-radius:100%;-webkit-animation:.75s linear infinite ball-clip-rotate;animation:.75s linear infinite ball-clip-rotate}.la-ball-clip-rotate.la-sm{width:16px;height:16px}.la-ball-clip-rotate.la-sm>div{width:16px;height:16px;border-width:1px}.la-ball-clip-rotate.la-2x{width:64px;height:64px}.la-ball-clip-rotate.la-2x>div{width:64px;height:64px;border-width:4px}.la-ball-clip-rotate.la-3x{width:96px;height:96px}.la-ball-clip-rotate.la-3x>div{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-clip-rotate{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}@keyframes ball-clip-rotate{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.la-ball-elastic-dots,.la-ball-elastic-dots>div{position:relative;box-sizing:border-box}.la-ball-elastic-dots{display:block;color:#fff;width:120px;height:10px;font-size:0;text-align:center}.la-ball-elastic-dots.la-dark{color:#333}.la-ball-elastic-dots>div{float:none;background-color:currentColor;border:0 solid currentColor;display:inline-block;width:10px;height:10px;white-space:nowrap;border-radius:100%;-webkit-animation:1s infinite ball-elastic-dots-anim;animation:1s infinite ball-elastic-dots-anim}.la-ball-elastic-dots.la-sm{width:60px;height:4px}.la-ball-elastic-dots.la-sm>div{width:4px;height:4px}.la-ball-elastic-dots.la-2x{width:240px;height:20px}.la-ball-elastic-dots.la-2x>div{width:20px;height:20px}.la-ball-elastic-dots.la-3x{width:360px;height:30px}.la-ball-elastic-dots.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-elastic-dots-anim{0%,100%{margin:0;transform:scale(1)}50%{margin:0 5%;transform:scale(.65)}}@keyframes ball-elastic-dots-anim{0%,100%{margin:0;transform:scale(1)}50%{margin:0 5%;transform:scale(.65)}}.la-ball-fall,.la-ball-fall>div{position:relative;box-sizing:border-box}.la-ball-fall{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-fall.la-dark{color:#333}.la-ball-fall>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;opacity:0;-webkit-animation:1s ease-in-out infinite ball-fall;animation:1s ease-in-out infinite ball-fall}.la-ball-fall>div:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}.la-ball-fall>div:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}.la-ball-fall>div:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-fall.la-sm{width:26px;height:8px}.la-ball-fall.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-fall.la-2x{width:108px;height:36px}.la-ball-fall.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-fall.la-3x{width:162px;height:54px}.la-ball-fall.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-fall{0%{opacity:0;transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(145%)}}@keyframes ball-fall{0%{opacity:0;transform:translateY(-145%)}10%,90%{opacity:.5}20%,80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(145%)}}.la-ball-fussion,.la-ball-fussion>div{position:relative;box-sizing:border-box}.la-ball-fussion{display:block;font-size:0;color:#fff;width:8px;height:8px}.la-ball-fussion.la-dark{color:#333}.la-ball-fussion>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:12px;height:12px;border-radius:100%;transform:translate(-50%,-50%);-webkit-animation:1s infinite ball-fussion-ball1;animation:1s infinite ball-fussion-ball1}.la-ball-fussion>div:nth-child(1){top:0;left:50%;z-index:1}.la-ball-fussion>div:nth-child(2){top:50%;left:100%;z-index:2;-webkit-animation-name:ball-fussion-ball2;animation-name:ball-fussion-ball2}.la-ball-fussion>div:nth-child(3){top:100%;left:50%;z-index:1;-webkit-animation-name:ball-fussion-ball3;animation-name:ball-fussion-ball3}.la-ball-fussion>div:nth-child(4){top:50%;left:0;z-index:2;-webkit-animation-name:ball-fussion-ball4;animation-name:ball-fussion-ball4}.la-ball-fussion.la-sm{width:4px;height:4px}.la-ball-fussion.la-sm>div{width:6px;height:6px}.la-ball-fussion.la-2x{width:16px;height:16px}.la-ball-fussion.la-2x>div,.la-ball-fussion.la-3x{width:24px;height:24px}.la-ball-fussion.la-3x>div{width:36px;height:36px}@-webkit-keyframes ball-fussion-ball1{0%{opacity:.35}50%{top:-100%;left:200%;opacity:1}100%{top:50%;left:100%;z-index:2;opacity:.35}}@keyframes ball-fussion-ball1{0%{opacity:.35}50%{top:-100%;left:200%;opacity:1}100%{top:50%;left:100%;z-index:2;opacity:.35}}@-webkit-keyframes ball-fussion-ball2{0%{opacity:.35}50%{top:200%;left:200%;opacity:1}100%{top:100%;left:50%;z-index:1;opacity:.35}}@keyframes ball-fussion-ball2{0%{opacity:.35}50%{top:200%;left:200%;opacity:1}100%{top:100%;left:50%;z-index:1;opacity:.35}}@-webkit-keyframes ball-fussion-ball3{0%{opacity:.35}50%{top:200%;left:-100%;opacity:1}100%{top:50%;left:0;z-index:2;opacity:.35}}@keyframes ball-fussion-ball3{0%{opacity:.35}50%{top:200%;left:-100%;opacity:1}100%{top:50%;left:0;z-index:2;opacity:.35}}@-webkit-keyframes ball-fussion-ball4{0%{opacity:.35}50%{top:-100%;left:-100%;opacity:1}100%{top:0;left:50%;z-index:1;opacity:.35}}@keyframes ball-fussion-ball4{0%{opacity:.35}50%{top:-100%;left:-100%;opacity:1}100%{top:0;left:50%;z-index:1;opacity:.35}}.la-ball-grid-beat,.la-ball-grid-beat>div{position:relative;box-sizing:border-box}.la-ball-grid-beat{display:block;font-size:0;color:#fff;width:36px;height:36px}.la-ball-grid-beat.la-dark{color:#333}.la-ball-grid-beat>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:8px;height:8px;margin:2px;border-radius:100%;-webkit-animation-name:ball-grid-beat;animation-name:ball-grid-beat;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-ball-grid-beat>div:nth-child(1){-webkit-animation-duration:.65s;animation-duration:.65s;-webkit-animation-delay:.03s;animation-delay:.03s}.la-ball-grid-beat>div:nth-child(2){-webkit-animation-duration:1.02s;animation-duration:1.02s;-webkit-animation-delay:.09s;animation-delay:.09s}.la-ball-grid-beat>div:nth-child(3){-webkit-animation-duration:1.06s;animation-duration:1.06s;-webkit-animation-delay:-.69s;animation-delay:-.69s}.la-ball-grid-beat>div:nth-child(4){-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-delay:-.41s;animation-delay:-.41s}.la-ball-grid-beat>div:nth-child(5){-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-delay:.04s;animation-delay:.04s}.la-ball-grid-beat>div:nth-child(6){-webkit-animation-duration:.84s;animation-duration:.84s;-webkit-animation-delay:.07s;animation-delay:.07s}.la-ball-grid-beat>div:nth-child(7){-webkit-animation-duration:.68s;animation-duration:.68s;-webkit-animation-delay:-.66s;animation-delay:-.66s}.la-ball-grid-beat>div:nth-child(8){-webkit-animation-duration:.93s;animation-duration:.93s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-beat>div:nth-child(9){-webkit-animation-duration:1.24s;animation-duration:1.24s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-beat.la-sm{width:18px;height:18px}.la-ball-grid-beat.la-sm>div{width:4px;height:4px;margin:1px}.la-ball-grid-beat.la-2x{width:72px;height:72px}.la-ball-grid-beat.la-2x>div{width:16px;height:16px;margin:4px}.la-ball-grid-beat.la-3x{width:108px;height:108px}.la-ball-grid-beat.la-3x>div{width:24px;height:24px;margin:6px}@-webkit-keyframes ball-grid-beat{0%,100%{opacity:1}50%{opacity:.35}}@keyframes ball-grid-beat{0%,100%{opacity:1}50%{opacity:.35}}.la-ball-grid-pulse,.la-ball-grid-pulse>div{position:relative;box-sizing:border-box}.la-ball-grid-pulse{display:block;font-size:0;color:#fff;width:36px;height:36px}.la-ball-grid-pulse.la-dark{color:#333}.la-ball-grid-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:8px;height:8px;margin:2px;border-radius:100%;-webkit-animation-name:ball-grid-pulse;animation-name:ball-grid-pulse;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-ball-grid-pulse>div:nth-child(1){-webkit-animation-duration:.65s;animation-duration:.65s;-webkit-animation-delay:.03s;animation-delay:.03s}.la-ball-grid-pulse>div:nth-child(2){-webkit-animation-duration:1.02s;animation-duration:1.02s;-webkit-animation-delay:.09s;animation-delay:.09s}.la-ball-grid-pulse>div:nth-child(3){-webkit-animation-duration:1.06s;animation-duration:1.06s;-webkit-animation-delay:-.69s;animation-delay:-.69s}.la-ball-grid-pulse>div:nth-child(4){-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-delay:-.41s;animation-delay:-.41s}.la-ball-grid-pulse>div:nth-child(5){-webkit-animation-duration:1.6s;animation-duration:1.6s;-webkit-animation-delay:.04s;animation-delay:.04s}.la-ball-grid-pulse>div:nth-child(6){-webkit-animation-duration:.84s;animation-duration:.84s;-webkit-animation-delay:.07s;animation-delay:.07s}.la-ball-grid-pulse>div:nth-child(7){-webkit-animation-duration:.68s;animation-duration:.68s;-webkit-animation-delay:-.66s;animation-delay:-.66s}.la-ball-grid-pulse>div:nth-child(8){-webkit-animation-duration:.93s;animation-duration:.93s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-pulse>div:nth-child(9){-webkit-animation-duration:1.24s;animation-duration:1.24s;-webkit-animation-delay:-.76s;animation-delay:-.76s}.la-ball-grid-pulse.la-sm{width:18px;height:18px}.la-ball-grid-pulse.la-sm>div{width:4px;height:4px;margin:1px}.la-ball-grid-pulse.la-2x{width:72px;height:72px}.la-ball-grid-pulse.la-2x>div{width:16px;height:16px;margin:4px}.la-ball-grid-pulse.la-3x{width:108px;height:108px}.la-ball-grid-pulse.la-3x>div{width:24px;height:24px;margin:6px}@-webkit-keyframes ball-grid-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.45)}}@keyframes ball-grid-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.45)}}.la-ball-newton-cradle,.la-ball-newton-cradle>div{position:relative;box-sizing:border-box}.la-ball-newton-cradle{display:block;font-size:0;color:#fff;width:40px;height:10px}.la-ball-newton-cradle.la-dark{color:#333}.la-ball-newton-cradle>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;border-radius:100%}.la-ball-newton-cradle>div:first-child{transform:translateX(0);-webkit-animation:1s ease-out infinite ball-newton-cradle-left;animation:1s ease-out infinite ball-newton-cradle-left}.la-ball-newton-cradle>div:last-child{transform:translateX(0);-webkit-animation:1s ease-out infinite ball-newton-cradle-right;animation:1s ease-out infinite ball-newton-cradle-right}.la-ball-newton-cradle.la-sm{width:20px;height:4px}.la-ball-newton-cradle.la-sm>div{width:4px;height:4px}.la-ball-newton-cradle.la-2x{width:80px;height:20px}.la-ball-newton-cradle.la-2x>div{width:20px;height:20px}.la-ball-newton-cradle.la-3x{width:120px;height:30px}.la-ball-newton-cradle.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-newton-cradle-left{25%{transform:translateX(-100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{transform:translateX(0)}}@keyframes ball-newton-cradle-left{25%{transform:translateX(-100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{transform:translateX(0)}}@-webkit-keyframes ball-newton-cradle-right{100%,50%{transform:translateX(0)}75%{transform:translateX(100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes ball-newton-cradle-right{100%,50%{transform:translateX(0)}75%{transform:translateX(100%);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.la-ball-pulse-rise,.la-ball-pulse-rise>div{position:relative;box-sizing:border-box}.la-ball-pulse-rise{display:block;font-size:0;color:#fff;width:70px;height:14px}.la-ball-pulse-rise.la-dark{color:#333}.la-ball-pulse-rise>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:2px;border-radius:100%;-webkit-animation:1s cubic-bezier(.15,.36,.9,.6) infinite ball-pulse-rise-even;animation:1s cubic-bezier(.15,.36,.9,.6) infinite ball-pulse-rise-even}.la-ball-pulse-rise>div:nth-child(2n-1){-webkit-animation-name:ball-pulse-rise-odd;animation-name:ball-pulse-rise-odd}.la-ball-pulse-rise.la-sm{width:34px;height:6px}.la-ball-pulse-rise.la-sm>div{width:4px;height:4px;margin:1px}.la-ball-pulse-rise.la-2x{width:140px;height:28px}.la-ball-pulse-rise.la-2x>div{width:20px;height:20px;margin:4px}.la-ball-pulse-rise.la-3x{width:210px;height:42px}.la-ball-pulse-rise.la-3x>div{width:30px;height:30px;margin:6px}@-webkit-keyframes ball-pulse-rise-even{0%{opacity:1;transform:scale(1.1)}25%{transform:translateY(-200%)}50%{opacity:.35;transform:scale(.3)}75%{transform:translateY(200%)}100%{opacity:1;transform:translateY(0);transform:scale(1)}}@keyframes ball-pulse-rise-even{0%{opacity:1;transform:scale(1.1)}25%{transform:translateY(-200%)}50%{opacity:.35;transform:scale(.3)}75%{transform:translateY(200%)}100%{opacity:1;transform:translateY(0);transform:scale(1)}}@-webkit-keyframes ball-pulse-rise-odd{0%{opacity:.35;transform:scale(.4)}25%{transform:translateY(200%)}50%{opacity:1;transform:scale(1.1)}75%{transform:translateY(-200%)}100%{opacity:.35;transform:translateY(0);transform:scale(.75)}}@keyframes ball-pulse-rise-odd{0%{opacity:.35;transform:scale(.4)}25%{transform:translateY(200%)}50%{opacity:1;transform:scale(1.1)}75%{transform:translateY(-200%)}100%{opacity:.35;transform:translateY(0);transform:scale(.75)}}.la-ball-pulse-sync,.la-ball-pulse-sync>div{position:relative;box-sizing:border-box}.la-ball-pulse-sync{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-pulse-sync.la-dark{color:#333}.la-ball-pulse-sync>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:.6s ease-in-out infinite ball-pulse-sync;animation:.6s ease-in-out infinite ball-pulse-sync}.la-ball-pulse-sync>div:nth-child(1){-webkit-animation-delay:-.14s;animation-delay:-.14s}.la-ball-pulse-sync>div:nth-child(2){-webkit-animation-delay:-.07s;animation-delay:-.07s}.la-ball-pulse-sync>div:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-pulse-sync.la-sm{width:26px;height:8px}.la-ball-pulse-sync.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-pulse-sync.la-2x{width:108px;height:36px}.la-ball-pulse-sync.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-pulse-sync.la-3x{width:162px;height:54px}.la-ball-pulse-sync.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-pulse-sync{33%{transform:translateY(100%)}66%{transform:translateY(-100%)}100%{transform:translateY(0)}}@keyframes ball-pulse-sync{33%{transform:translateY(100%)}66%{transform:translateY(-100%)}100%{transform:translateY(0)}}.la-ball-pulse,.la-ball-pulse>div{position:relative;box-sizing:border-box}.la-ball-pulse{display:block;font-size:0;color:#fff;width:54px;height:18px}.la-ball-pulse.la-dark{color:#333}.la-ball-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;margin:4px;border-radius:100%;-webkit-animation:1s infinite ball-pulse;animation:1s infinite ball-pulse}.la-ball-pulse>div:nth-child(1){-webkit-animation-delay:-.2s;animation-delay:-.2s}.la-ball-pulse>div:nth-child(2){-webkit-animation-delay:-.1s;animation-delay:-.1s}.la-ball-pulse>div:nth-child(3){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-pulse.la-sm{width:26px;height:8px}.la-ball-pulse.la-sm>div{width:4px;height:4px;margin:2px}.la-ball-pulse.la-2x{width:108px;height:36px}.la-ball-pulse.la-2x>div{width:20px;height:20px;margin:8px}.la-ball-pulse.la-3x{width:162px;height:54px}.la-ball-pulse.la-3x>div{width:30px;height:30px;margin:12px}@-webkit-keyframes ball-pulse{0%,100%,60%{opacity:1;transform:scale(1)}30%{opacity:.1;transform:scale(.01)}}@keyframes ball-pulse{0%,100%,60%{opacity:1;transform:scale(1)}30%{opacity:.1;transform:scale(.01)}}.la-ball-rotate,.la-ball-rotate>div{position:relative;box-sizing:border-box}.la-ball-rotate{display:block;font-size:0;color:#fff;width:10px;height:10px}.la-ball-rotate.la-dark{color:#333}.la-ball-rotate>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10px;height:10px;border-radius:100%;-webkit-animation:1s cubic-bezier(.7,-.13,.22,.86) infinite ball-rotate-animation;animation:1s cubic-bezier(.7,-.13,.22,.86) infinite ball-rotate-animation}.la-ball-rotate>div:after,.la-ball-rotate>div:before{position:absolute;width:inherit;height:inherit;margin:inherit;content:\"\";background:currentColor;border-radius:inherit;opacity:.8}.la-ball-rotate>div:before{top:0;left:-150%}.la-ball-rotate>div:after{top:0;left:150%}.la-ball-rotate.la-sm,.la-ball-rotate.la-sm>div{width:4px;height:4px}.la-ball-rotate.la-2x,.la-ball-rotate.la-2x>div{width:20px;height:20px}.la-ball-rotate.la-3x,.la-ball-rotate.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-rotate-animation{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}@keyframes ball-rotate-animation{0%{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.la-ball-running-dots,.la-ball-running-dots>div{position:relative;box-sizing:border-box}.la-ball-running-dots{display:block;font-size:0;color:#fff;width:10px;height:10px}.la-ball-running-dots.la-dark{color:#333}.la-ball-running-dots>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:10px;height:10px;margin-left:-25px;border-radius:100%;-webkit-animation:2s linear infinite ball-running-dots-animate;animation:2s linear infinite ball-running-dots-animate}.la-ball-running-dots>div:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-running-dots>div:nth-child(2){-webkit-animation-delay:-.4s;animation-delay:-.4s}.la-ball-running-dots>div:nth-child(3){-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-ball-running-dots>div:nth-child(4){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-ball-running-dots>div:nth-child(5){-webkit-animation-delay:-1.6s;animation-delay:-1.6s}.la-ball-running-dots>div:nth-child(6){-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-running-dots>div:nth-child(7){-webkit-animation-delay:-2.4s;animation-delay:-2.4s}.la-ball-running-dots>div:nth-child(8){-webkit-animation-delay:-2.8s;animation-delay:-2.8s}.la-ball-running-dots>div:nth-child(9){-webkit-animation-delay:-3.2s;animation-delay:-3.2s}.la-ball-running-dots>div:nth-child(10){-webkit-animation-delay:-3.6s;animation-delay:-3.6s}.la-ball-running-dots.la-sm{width:4px;height:4px}.la-ball-running-dots.la-sm>div{width:4px;height:4px;margin-left:-12px}.la-ball-running-dots.la-2x{width:20px;height:20px}.la-ball-running-dots.la-2x>div{width:20px;height:20px;margin-left:-50px}.la-ball-running-dots.la-3x{width:30px;height:30px}.la-ball-running-dots.la-3x>div{width:30px;height:30px;margin-left:-75px}@-webkit-keyframes ball-running-dots-animate{0%,100%{width:100%;height:100%;transform:translateY(0) translateX(500%)}80%{transform:translateY(0) translateX(0)}85%{width:100%;height:100%;transform:translateY(-125%) translateX(0)}90%{width:200%;height:75%}95%{width:100%;height:100%;transform:translateY(-100%) translateX(500%)}}@keyframes ball-running-dots-animate{0%,100%{width:100%;height:100%;transform:translateY(0) translateX(500%)}80%{transform:translateY(0) translateX(0)}85%{width:100%;height:100%;transform:translateY(-125%) translateX(0)}90%{width:200%;height:75%}95%{width:100%;height:100%;transform:translateY(-100%) translateX(500%)}}.la-ball-scale-multiple,.la-ball-scale-multiple>div{position:relative;box-sizing:border-box}.la-ball-scale-multiple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-multiple.la-dark{color:#333}.la-ball-scale-multiple>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;border-radius:100%;opacity:0;-webkit-animation:1s linear infinite ball-scale-multiple;animation:1s linear infinite ball-scale-multiple}.la-ball-scale-multiple>div:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.la-ball-scale-multiple>div:nth-child(3){-webkit-animation-delay:.4s;animation-delay:.4s}.la-ball-scale-multiple.la-sm,.la-ball-scale-multiple.la-sm>div{width:16px;height:16px}.la-ball-scale-multiple.la-2x,.la-ball-scale-multiple.la-2x>div{width:64px;height:64px}.la-ball-scale-multiple.la-3x,.la-ball-scale-multiple.la-3x>div{width:96px;height:96px}@-webkit-keyframes ball-scale-multiple{0%{opacity:0;transform:scale(0)}5%{opacity:.75}100%{opacity:0;transform:scale(1)}}@keyframes ball-scale-multiple{0%{opacity:0;transform:scale(0)}5%{opacity:.75}100%{opacity:0;transform:scale(1)}}.la-ball-scale-pulse,.la-ball-scale-pulse>div{position:relative;box-sizing:border-box}.la-ball-scale-pulse{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-pulse.la-dark{color:#333}.la-ball-scale-pulse>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;border-radius:100%;opacity:.5;-webkit-animation:2s ease-in-out infinite ball-scale-pulse;animation:2s ease-in-out infinite ball-scale-pulse}.la-ball-scale-pulse>div:last-child{-webkit-animation-delay:-1s;animation-delay:-1s}.la-ball-scale-pulse.la-sm,.la-ball-scale-pulse.la-sm>div{width:16px;height:16px}.la-ball-scale-pulse.la-2x,.la-ball-scale-pulse.la-2x>div{width:64px;height:64px}.la-ball-scale-pulse.la-3x,.la-ball-scale-pulse.la-3x>div{width:96px;height:96px}@-webkit-keyframes ball-scale-pulse{0%,100%{transform:scale(0)}50%{transform:scale(1)}}@keyframes ball-scale-pulse{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.la-ball-scale-ripple-multiple,.la-ball-scale-ripple-multiple>div{position:relative;box-sizing:border-box}.la-ball-scale-ripple-multiple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-ripple-multiple.la-dark{color:#333}.la-ball-scale-ripple-multiple>div{display:inline-block;float:none;border:2px solid currentColor;position:absolute;top:0;left:0;width:32px;height:32px;background:0 0;border-radius:100%;opacity:0;-webkit-animation:1.25s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple-multiple;animation:1.25s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple-multiple}.la-ball-scale-ripple-multiple>div:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.la-ball-scale-ripple-multiple>div:nth-child(2){-webkit-animation-delay:.25s;animation-delay:.25s}.la-ball-scale-ripple-multiple>div:nth-child(3){-webkit-animation-delay:.5s;animation-delay:.5s}.la-ball-scale-ripple-multiple.la-sm{width:16px;height:16px}.la-ball-scale-ripple-multiple.la-sm>div{width:16px;height:16px;border-width:1px}.la-ball-scale-ripple-multiple.la-2x{width:64px;height:64px}.la-ball-scale-ripple-multiple.la-2x>div{width:64px;height:64px;border-width:4px}.la-ball-scale-ripple-multiple.la-3x{width:96px;height:96px}.la-ball-scale-ripple-multiple.la-3x>div{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-scale-ripple-multiple{0%{opacity:1;transform:scale(.1)}70%{opacity:.5;transform:scale(1)}95%{opacity:0}}@keyframes ball-scale-ripple-multiple{0%{opacity:1;transform:scale(.1)}70%{opacity:.5;transform:scale(1)}95%{opacity:0}}.la-ball-scale-ripple,.la-ball-scale-ripple>div{position:relative;box-sizing:border-box}.la-ball-scale-ripple{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale-ripple.la-dark{color:#333}.la-ball-scale-ripple>div{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-radius:100%;opacity:0;-webkit-animation:1s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple;animation:1s cubic-bezier(.21,.53,.56,.8) infinite ball-scale-ripple}.la-ball-scale-ripple.la-sm{width:16px;height:16px}.la-ball-scale-ripple.la-sm>div{width:16px;height:16px;border-width:1px}.la-ball-scale-ripple.la-2x{width:64px;height:64px}.la-ball-scale-ripple.la-2x>div{width:64px;height:64px;border-width:4px}.la-ball-scale-ripple.la-3x{width:96px;height:96px}.la-ball-scale-ripple.la-3x>div{width:96px;height:96px;border-width:6px}@-webkit-keyframes ball-scale-ripple{0%{opacity:1;transform:scale(.1)}70%{opacity:.65;transform:scale(1)}100%{opacity:0}}@keyframes ball-scale-ripple{0%{opacity:1;transform:scale(.1)}70%{opacity:.65;transform:scale(1)}100%{opacity:0}}.la-ball-scale,.la-ball-scale>div{position:relative;box-sizing:border-box}.la-ball-scale{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-scale.la-dark{color:#333}.la-ball-scale>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:32px;height:32px;border-radius:100%;opacity:0;-webkit-animation:1s ease-in-out infinite ball-scale;animation:1s ease-in-out infinite ball-scale}.la-ball-scale.la-sm,.la-ball-scale.la-sm>div{width:16px;height:16px}.la-ball-scale.la-2x,.la-ball-scale.la-2x>div{width:64px;height:64px}.la-ball-scale.la-3x,.la-ball-scale.la-3x>div{width:96px;height:96px}@-webkit-keyframes ball-scale{0%{opacity:1;transform:scale(0)}100%{opacity:0;transform:scale(1)}}@keyframes ball-scale{0%{opacity:1;transform:scale(0)}100%{opacity:0;transform:scale(1)}}.la-ball-spin-clockwise-fade-rotating,.la-ball-spin-clockwise-fade-rotating>div{position:relative;box-sizing:border-box}.la-ball-spin-clockwise-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate}.la-ball-spin-clockwise-fade-rotating.la-dark{color:#333}.la-ball-spin-clockwise-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade-rotating;animation:1s linear infinite ball-spin-clockwise-fade-rotating}.la-ball-spin-clockwise-fade-rotating>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise-fade-rotating>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise-fade-rotating.la-sm{width:16px;height:16px}.la-ball-spin-clockwise-fade-rotating.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise-fade-rotating.la-2x{width:64px;height:64px}.la-ball-spin-clockwise-fade-rotating.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise-fade-rotating.la-3x{width:96px;height:96px}.la-ball-spin-clockwise-fade-rotating.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@keyframes ball-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@-webkit-keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}.la-ball-spin-clockwise-fade,.la-ball-spin-clockwise-fade>div{position:relative;box-sizing:border-box}.la-ball-spin-clockwise-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-clockwise-fade.la-dark{color:#333}.la-ball-spin-clockwise-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade;animation:1s linear infinite ball-spin-clockwise-fade}.la-ball-spin-clockwise-fade>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise-fade>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise-fade>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise-fade>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise-fade>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise-fade>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise-fade>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise-fade>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise-fade.la-sm{width:16px;height:16px}.la-ball-spin-clockwise-fade.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise-fade.la-2x{width:64px;height:64px}.la-ball-spin-clockwise-fade.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise-fade.la-3x{width:96px;height:96px}.la-ball-spin-clockwise-fade.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise-fade{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}@keyframes ball-spin-clockwise-fade{50%{opacity:.25;transform:scale(.5)}100%{opacity:1;transform:scale(1)}}.la-ball-spin-clockwise,.la-ball-spin-clockwise>div{position:relative;box-sizing:border-box}.la-ball-spin-clockwise{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-clockwise.la-dark{color:#333}.la-ball-spin-clockwise>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin-clockwise;animation:1s ease-in-out infinite ball-spin-clockwise}.la-ball-spin-clockwise>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-spin-clockwise>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-spin-clockwise>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-spin-clockwise>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-spin-clockwise>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-spin-clockwise>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-spin-clockwise>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-spin-clockwise>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-spin-clockwise.la-sm{width:16px;height:16px}.la-ball-spin-clockwise.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-clockwise.la-2x{width:64px;height:64px}.la-ball-spin-clockwise.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-clockwise.la-3x{width:96px;height:96px}.la-ball-spin-clockwise.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-clockwise{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}@keyframes ball-spin-clockwise{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}.la-ball-spin-fade-rotating,.la-ball-spin-fade-rotating>div{position:relative;box-sizing:border-box}.la-ball-spin-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-fade-rotate;animation:6s linear infinite ball-spin-fade-rotate}.la-ball-spin-fade-rotating.la-dark{color:#333}.la-ball-spin-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.la-ball-spin-fade-rotating>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin-fade-rotating>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin-fade-rotating>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin-fade-rotating>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin-fade-rotating>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin-fade-rotating>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin-fade-rotating>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin-fade-rotating>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin-fade-rotating.la-sm{width:16px;height:16px}.la-ball-spin-fade-rotating.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-fade-rotating.la-2x{width:64px;height:64px}.la-ball-spin-fade-rotating.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-fade-rotating.la-3x{width:96px;height:96px}.la-ball-spin-fade-rotating.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-fade-rotate{100%{transform:rotate(360deg)}}@keyframes ball-spin-fade-rotate{100%{transform:rotate(360deg)}}.la-ball-spin-fade,.la-ball-spin-fade>div{position:relative;box-sizing:border-box}.la-ball-spin-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin-fade.la-dark{color:#333}.la-ball-spin-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.la-ball-spin-fade>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin-fade>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin-fade>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin-fade>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin-fade>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin-fade>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin-fade>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin-fade>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin-fade.la-sm{width:16px;height:16px}.la-ball-spin-fade.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin-fade.la-2x{width:64px;height:64px}.la-ball-spin-fade.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin-fade.la-3x{width:96px;height:96px}.la-ball-spin-fade.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin-fade{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.5)}}@keyframes ball-spin-fade{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(.5)}}.la-ball-spin-rotate,.la-ball-spin-rotate>div{position:relative;box-sizing:border-box}.la-ball-spin-rotate{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:2s linear infinite ball-spin-rotate;animation:2s linear infinite ball-spin-rotate}.la-ball-spin-rotate.la-dark{color:#333}.la-ball-spin-rotate>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;width:60%;height:60%;border-radius:100%;-webkit-animation:2s ease-in-out infinite ball-spin-bounce;animation:2s ease-in-out infinite ball-spin-bounce}.la-ball-spin-rotate>div:last-child{top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}.la-ball-spin-rotate.la-sm{width:16px;height:16px}.la-ball-spin-rotate.la-2x{width:64px;height:64px}.la-ball-spin-rotate.la-3x{width:96px;height:96px}@-webkit-keyframes ball-spin-rotate{100%{transform:rotate(360deg)}}@keyframes ball-spin-rotate{100%{transform:rotate(360deg)}}@-webkit-keyframes ball-spin-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}@keyframes ball-spin-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.la-ball-spin,.la-ball-spin>div{position:relative;box-sizing:border-box}.la-ball-spin{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-spin.la-dark{color:#333}.la-ball-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:8px;height:8px;margin-top:-4px;margin-left:-4px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin;animation:1s ease-in-out infinite ball-spin}.la-ball-spin>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-spin>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-spin>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-spin>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-spin>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-spin>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-spin>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-spin>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-spin.la-sm{width:16px;height:16px}.la-ball-spin.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-spin.la-2x{width:64px;height:64px}.la-ball-spin.la-2x>div{width:16px;height:16px;margin-top:-8px;margin-left:-8px}.la-ball-spin.la-3x{width:96px;height:96px}.la-ball-spin.la-3x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}@-webkit-keyframes ball-spin{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}@keyframes ball-spin{0%,100%{opacity:1;transform:scale(1)}20%{opacity:1}80%{opacity:0;transform:scale(0)}}.la-ball-square-clockwise-spin,.la-ball-square-clockwise-spin>div{position:relative;box-sizing:border-box}.la-ball-square-clockwise-spin{display:block;font-size:0;color:#fff;width:26px;height:26px}.la-ball-square-clockwise-spin.la-dark{color:#333}.la-ball-square-clockwise-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:12px;height:12px;margin-top:-6px;margin-left:-6px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-square-clockwise-spin;animation:1s ease-in-out infinite ball-square-clockwise-spin}.la-ball-square-clockwise-spin>div:nth-child(1){top:0;left:0;-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-ball-square-clockwise-spin>div:nth-child(2){top:0;left:50%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-ball-square-clockwise-spin>div:nth-child(3){top:0;left:100%;-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-ball-square-clockwise-spin>div:nth-child(4){top:50%;left:100%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-ball-square-clockwise-spin>div:nth-child(5){top:100%;left:100%;-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-ball-square-clockwise-spin>div:nth-child(6){top:100%;left:50%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-ball-square-clockwise-spin>div:nth-child(7){top:100%;left:0;-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-ball-square-clockwise-spin>div:nth-child(8){top:50%;left:0;-webkit-animation-delay:0s;animation-delay:0s}.la-ball-square-clockwise-spin.la-sm{width:12px;height:12px}.la-ball-square-clockwise-spin.la-sm>div{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-ball-square-clockwise-spin.la-2x{width:52px;height:52px}.la-ball-square-clockwise-spin.la-2x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}.la-ball-square-clockwise-spin.la-3x{width:78px;height:78px}.la-ball-square-clockwise-spin.la-3x>div{width:36px;height:36px;margin-top:-18px;margin-left:-18px}@-webkit-keyframes ball-square-clockwise-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}@keyframes ball-square-clockwise-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}.la-ball-square-spin,.la-ball-square-spin>div{position:relative;box-sizing:border-box}.la-ball-square-spin{display:block;font-size:0;color:#fff;width:26px;height:26px}.la-ball-square-spin.la-dark{color:#333}.la-ball-square-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:12px;height:12px;margin-top:-6px;margin-left:-6px;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-square-spin;animation:1s ease-in-out infinite ball-square-spin}.la-ball-square-spin>div:nth-child(1){top:0;left:0;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-ball-square-spin>div:nth-child(2){top:0;left:50%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-ball-square-spin>div:nth-child(3){top:0;left:100%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-ball-square-spin>div:nth-child(4){top:50%;left:100%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-ball-square-spin>div:nth-child(5){top:100%;left:100%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-ball-square-spin>div:nth-child(6){top:100%;left:50%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-ball-square-spin>div:nth-child(7){top:100%;left:0;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-ball-square-spin>div:nth-child(8){top:50%;left:0;-webkit-animation-delay:-2s;animation-delay:-2s}.la-ball-square-spin.la-sm{width:12px;height:12px}.la-ball-square-spin.la-sm>div{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-ball-square-spin.la-2x{width:52px;height:52px}.la-ball-square-spin.la-2x>div{width:24px;height:24px;margin-top:-12px;margin-left:-12px}.la-ball-square-spin.la-3x{width:78px;height:78px}.la-ball-square-spin.la-3x>div{width:36px;height:36px;margin-top:-18px;margin-left:-18px}@-webkit-keyframes ball-square-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}@keyframes ball-square-spin{0%,100%,40%{transform:scale(.4)}70%{transform:scale(1)}}.la-ball-triangle-path,.la-ball-triangle-path>div{position:relative;box-sizing:border-box}.la-ball-triangle-path{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-ball-triangle-path.la-dark{color:#333}.la-ball-triangle-path>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:10px;height:10px;border-radius:100%}.la-ball-triangle-path>div:nth-child(1){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-one;animation:2s ease-in-out infinite ball-triangle-path-ball-one}.la-ball-triangle-path>div:nth-child(2){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-two;animation:2s ease-in-out infinite ball-triangle-path-ball-two}.la-ball-triangle-path>div:nth-child(3){-webkit-animation:2s ease-in-out infinite ball-triangle-path-ball-tree;animation:2s ease-in-out infinite ball-triangle-path-ball-tree}.la-ball-triangle-path.la-sm{width:16px;height:16px}.la-ball-triangle-path.la-sm>div{width:4px;height:4px}.la-ball-triangle-path.la-2x{width:64px;height:64px}.la-ball-triangle-path.la-2x>div{width:20px;height:20px}.la-ball-triangle-path.la-3x{width:96px;height:96px}.la-ball-triangle-path.la-3x>div{width:30px;height:30px}@-webkit-keyframes ball-triangle-path-ball-one{0%{transform:translate(0,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(110%,0)}66%{opacity:1;transform:translate(220%,220%)}100%{opacity:1;transform:translate(0,220%)}}@keyframes ball-triangle-path-ball-one{0%{transform:translate(0,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(110%,0)}66%{opacity:1;transform:translate(220%,220%)}100%{opacity:1;transform:translate(0,220%)}}@-webkit-keyframes ball-triangle-path-ball-two{0%{transform:translate(110%,0)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(220%,220%)}66%{opacity:1;transform:translate(0,220%)}100%{opacity:1;transform:translate(110%,0)}}@keyframes ball-triangle-path-ball-two{0%{transform:translate(110%,0)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(220%,220%)}66%{opacity:1;transform:translate(0,220%)}100%{opacity:1;transform:translate(110%,0)}}@-webkit-keyframes ball-triangle-path-ball-tree{0%{transform:translate(220%,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(0,220%)}66%{opacity:1;transform:translate(110%,0)}100%{opacity:1;transform:translate(220%,220%)}}@keyframes ball-triangle-path-ball-tree{0%{transform:translate(220%,220%)}17%,50%,83%{opacity:.25}33%{opacity:1;transform:translate(0,220%)}66%{opacity:1;transform:translate(110%,0)}100%{opacity:1;transform:translate(220%,220%)}}.la-ball-zig-zag-deflect,.la-ball-zig-zag-deflect>div{box-sizing:border-box}.la-ball-zig-zag-deflect{display:block;font-size:0;color:#fff;position:relative;width:32px;height:32px}.la-ball-zig-zag-deflect.la-dark{color:#333}.la-ball-zig-zag-deflect>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:10px;height:10px;margin-top:-5px;margin-left:-5px;border-radius:100%}.la-ball-zig-zag-deflect>div:first-child{-webkit-animation:1.5s linear infinite ball-zig-deflect;animation:1.5s linear infinite ball-zig-deflect}.la-ball-zig-zag-deflect>div:last-child{-webkit-animation:1.5s linear infinite ball-zag-deflect;animation:1.5s linear infinite ball-zag-deflect}.la-ball-zig-zag-deflect.la-sm{width:16px;height:16px}.la-ball-zig-zag-deflect.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-zig-zag-deflect.la-2x{width:64px;height:64px}.la-ball-zig-zag-deflect.la-2x>div{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-zig-zag-deflect.la-3x{width:96px;height:96px}.la-ball-zig-zag-deflect.la-3x>div{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-zig-deflect{17%,84%{transform:translate(-80%,-160%)}34%,67%{transform:translate(80%,-160%)}100%,50%{transform:translate(0,0)}}@keyframes ball-zig-deflect{17%,84%{transform:translate(-80%,-160%)}34%,67%{transform:translate(80%,-160%)}100%,50%{transform:translate(0,0)}}@-webkit-keyframes ball-zag-deflect{17%,84%{transform:translate(80%,160%)}34%,67%{transform:translate(-80%,160%)}100%,50%{transform:translate(0,0)}}@keyframes ball-zag-deflect{17%,84%{transform:translate(80%,160%)}34%,67%{transform:translate(-80%,160%)}100%,50%{transform:translate(0,0)}}.la-ball-zig-zag,.la-ball-zig-zag>div{box-sizing:border-box}.la-ball-zig-zag{display:block;font-size:0;color:#fff;position:relative;width:32px;height:32px}.la-ball-zig-zag.la-dark{color:#333}.la-ball-zig-zag>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:10px;height:10px;margin-top:-5px;margin-left:-5px;border-radius:100%}.la-ball-zig-zag>div:first-child{-webkit-animation:.7s linear infinite ball-zig-effect;animation:.7s linear infinite ball-zig-effect}.la-ball-zig-zag>div:last-child{-webkit-animation:.7s linear infinite ball-zag-effect;animation:.7s linear infinite ball-zag-effect}.la-ball-zig-zag.la-sm{width:16px;height:16px}.la-ball-zig-zag.la-sm>div{width:4px;height:4px;margin-top:-2px;margin-left:-2px}.la-ball-zig-zag.la-2x{width:64px;height:64px}.la-ball-zig-zag.la-2x>div{width:20px;height:20px;margin-top:-10px;margin-left:-10px}.la-ball-zig-zag.la-3x{width:96px;height:96px}.la-ball-zig-zag.la-3x>div{width:30px;height:30px;margin-top:-15px;margin-left:-15px}@-webkit-keyframes ball-zig-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(-75%,-150%)}66%{transform:translate(75%,-150%)}}@keyframes ball-zig-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(-75%,-150%)}66%{transform:translate(75%,-150%)}}@-webkit-keyframes ball-zag-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(75%,150%)}66%{transform:translate(-75%,150%)}}@keyframes ball-zag-effect{0%,100%{transform:translate(0,0)}33%{transform:translate(75%,150%)}66%{transform:translate(-75%,150%)}}.la-cog,.la-cog>div{position:relative;box-sizing:border-box}.la-cog{display:block;font-size:0;color:#fff;width:31px;height:31px}.la-cog.la-dark{color:#333}.la-cog>div{display:inline-block;float:none;border:2px dashed currentColor;width:100%;height:100%;background-color:transparent;border-radius:100%;-webkit-animation:4s linear infinite cog-rotate;animation:4s linear infinite cog-rotate}.la-cog>div:after{position:absolute;top:0;left:0;width:100%;height:100%;content:\"\";border:2px solid currentColor;border-radius:100%}.la-cog.la-sm{width:15px;height:15px}.la-cog.la-sm>div,.la-cog.la-sm>div:after{border-width:1px}.la-cog.la-2x{width:61px;height:61px}.la-cog.la-2x>div,.la-cog.la-2x>div:after{border-width:4px}.la-cog.la-3x{width:91px;height:91px}.la-cog.la-3x>div,.la-cog.la-3x>div:after{border-width:6px}@-webkit-keyframes cog-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes cog-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.la-cube-transition,.la-cube-transition>div{position:relative;box-sizing:border-box}.la-cube-transition{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-cube-transition.la-dark{color:#333}.la-cube-transition>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:14px;height:14px;margin-top:-7px;margin-left:-7px;border-radius:0;-webkit-animation:1.6s ease-in-out infinite cube-transition;animation:1.6s ease-in-out infinite cube-transition}.la-cube-transition>div:last-child{-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-cube-transition.la-sm{width:16px;height:16px}.la-cube-transition.la-sm>div{width:6px;height:6px;margin-top:-3px;margin-left:-3px}.la-cube-transition.la-2x{width:64px;height:64px}.la-cube-transition.la-2x>div{width:28px;height:28px;margin-top:-14px;margin-left:-14px}.la-cube-transition.la-3x{width:96px;height:96px}.la-cube-transition.la-3x>div{width:42px;height:42px;margin-top:-21px;margin-left:-21px}@-webkit-keyframes cube-transition{25%{top:0;left:100%;transform:scale(.5) rotate(-90deg)}50%{top:100%;left:100%;transform:scale(1) rotate(-180deg)}75%{top:100%;left:0;transform:scale(.5) rotate(-270deg)}100%{top:0;left:0;transform:scale(1) rotate(-360deg)}}@keyframes cube-transition{25%{top:0;left:100%;transform:scale(.5) rotate(-90deg)}50%{top:100%;left:100%;transform:scale(1) rotate(-180deg)}75%{top:100%;left:0;transform:scale(.5) rotate(-270deg)}100%{top:0;left:0;transform:scale(1) rotate(-360deg)}}.la-fire,.la-fire>div{position:relative;box-sizing:border-box}.la-fire{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-fire.la-dark{color:#333}.la-fire>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;bottom:0;left:50%;width:12px;height:12px;border-radius:2px;transform:translateY(0) translateX(-50%) rotate(45deg) scale(0);-webkit-animation:1.5s linear infinite fire-diamonds;animation:1.5s linear infinite fire-diamonds}.la-fire>div:nth-child(1){-webkit-animation-delay:-.85s;animation-delay:-.85s}.la-fire>div:nth-child(2){-webkit-animation-delay:-1.85s;animation-delay:-1.85s}.la-fire>div:nth-child(3){-webkit-animation-delay:-2.85s;animation-delay:-2.85s}.la-fire.la-sm{width:16px;height:16px}.la-fire.la-sm>div{width:6px;height:6px}.la-fire.la-2x{width:64px;height:64px}.la-fire.la-2x>div{width:24px;height:24px}.la-fire.la-3x{width:96px;height:96px}.la-fire.la-3x>div{width:36px;height:36px}@-webkit-keyframes fire-diamonds{0%{transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0)}50%{transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1)}100%{transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0)}}@keyframes fire-diamonds{0%{transform:translateY(75%) translateX(-50%) rotate(45deg) scale(0)}50%{transform:translateY(-87.5%) translateX(-50%) rotate(45deg) scale(1)}100%{transform:translateY(-212.5%) translateX(-50%) rotate(45deg) scale(0)}}.la-line-scale-party,.la-line-scale-party>div{position:relative;box-sizing:border-box}.la-line-scale-party{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-party.la-dark{color:#333}.la-line-scale-party>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation-name:line-scale-party;animation-name:line-scale-party;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.la-line-scale-party>div:nth-child(1){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.23s;animation-delay:-.23s}.la-line-scale-party>div:nth-child(2){-webkit-animation-duration:.62s;animation-duration:.62s;-webkit-animation-delay:-.32s;animation-delay:-.32s}.la-line-scale-party>div:nth-child(3){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.44s;animation-delay:-.44s}.la-line-scale-party>div:nth-child(4){-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-delay:-.31s;animation-delay:-.31s}.la-line-scale-party>div:nth-child(5){-webkit-animation-duration:.74s;animation-duration:.74s;-webkit-animation-delay:-.24s;animation-delay:-.24s}.la-line-scale-party.la-sm{width:20px;height:16px}.la-line-scale-party.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale-party.la-2x{width:80px;height:64px}.la-line-scale-party.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale-party.la-3x{width:120px;height:96px}.la-line-scale-party.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-party{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}@keyframes line-scale-party{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.3)}}.la-line-scale-pulse-out-rapid,.la-line-scale-pulse-out-rapid>div{position:relative;box-sizing:border-box}.la-line-scale-pulse-out-rapid{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-pulse-out-rapid.la-dark{color:#333}.la-line-scale-pulse-out-rapid>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:.9s cubic-bezier(.11,.49,.38,.78) infinite line-scale-pulse-out-rapid;animation:.9s cubic-bezier(.11,.49,.38,.78) infinite line-scale-pulse-out-rapid}.la-line-scale-pulse-out-rapid>div:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out-rapid>div:nth-child(2),.la-line-scale-pulse-out-rapid>div:nth-child(4){-webkit-animation-delay:-.65s;animation-delay:-.65s}.la-line-scale-pulse-out-rapid>div:nth-child(1),.la-line-scale-pulse-out-rapid>div:nth-child(5){-webkit-animation-delay:-.4s;animation-delay:-.4s}.la-line-scale-pulse-out-rapid.la-sm{width:20px;height:16px}.la-line-scale-pulse-out-rapid.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale-pulse-out-rapid.la-2x{width:80px;height:64px}.la-line-scale-pulse-out-rapid.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale-pulse-out-rapid.la-3x{width:120px;height:96px}.la-line-scale-pulse-out-rapid.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-pulse-out-rapid{0%,90%{transform:scaley(1)}80%{transform:scaley(.3)}}@keyframes line-scale-pulse-out-rapid{0%,90%{transform:scaley(1)}80%{transform:scaley(.3)}}.la-line-scale-pulse-out,.la-line-scale-pulse-out>div{position:relative;box-sizing:border-box}.la-line-scale-pulse-out{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale-pulse-out.la-dark{color:#333}.la-line-scale-pulse-out>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:.9s cubic-bezier(.85,.25,.37,.85) infinite line-scale-pulse-out;animation:.9s cubic-bezier(.85,.25,.37,.85) infinite line-scale-pulse-out}.la-line-scale-pulse-out>div:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out>div:nth-child(2),.la-line-scale-pulse-out>div:nth-child(4){-webkit-animation-delay:-.7s;animation-delay:-.7s}.la-line-scale-pulse-out>div:nth-child(1),.la-line-scale-pulse-out>div:nth-child(5){-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-scale-pulse-out.la-sm{width:20px;height:16px}.la-line-scale-pulse-out.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale-pulse-out.la-2x{width:80px;height:64px}.la-line-scale-pulse-out.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale-pulse-out.la-3x{width:120px;height:96px}.la-line-scale-pulse-out.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale-pulse-out{0%,100%{transform:scaley(1)}50%{transform:scaley(.3)}}@keyframes line-scale-pulse-out{0%,100%{transform:scaley(1)}50%{transform:scaley(.3)}}.la-line-scale,.la-line-scale>div{position:relative;box-sizing:border-box}.la-line-scale{display:block;font-size:0;color:#fff;width:40px;height:32px}.la-line-scale.la-dark{color:#333}.la-line-scale>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:4px;height:32px;margin:0 2px;border-radius:0;-webkit-animation:1.2s infinite line-scale;animation:1.2s infinite line-scale}.la-line-scale>div:nth-child(1){-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.la-line-scale>div:nth-child(2){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.la-line-scale>div:nth-child(3){-webkit-animation-delay:-1s;animation-delay:-1s}.la-line-scale>div:nth-child(4){-webkit-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale>div:nth-child(5){-webkit-animation-delay:-.8s;animation-delay:-.8s}.la-line-scale.la-sm{width:20px;height:16px}.la-line-scale.la-sm>div{width:2px;height:16px;margin:0 1px}.la-line-scale.la-2x{width:80px;height:64px}.la-line-scale.la-2x>div{width:8px;height:64px;margin:0 4px}.la-line-scale.la-3x{width:120px;height:96px}.la-line-scale.la-3x>div{width:12px;height:96px;margin:0 6px}@-webkit-keyframes line-scale{0%,100%,40%{transform:scaleY(.4)}20%{transform:scaleY(1)}}@keyframes line-scale{0%,100%,40%{transform:scaleY(.4)}20%{transform:scaleY(1)}}.la-line-spin-clockwise-fade-rotating,.la-line-spin-clockwise-fade-rotating>div{position:relative;box-sizing:border-box}.la-line-spin-clockwise-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite line-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite line-spin-clockwise-fade-rotating-rotate}.la-line-spin-clockwise-fade-rotating.la-dark{color:#333}.la-line-spin-clockwise-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-clockwise-fade-rotating;animation:1s ease-in-out infinite line-spin-clockwise-fade-rotating}.la-line-spin-clockwise-fade-rotating>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-line-spin-clockwise-fade-rotating>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-line-spin-clockwise-fade-rotating>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-line-spin-clockwise-fade-rotating>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-spin-clockwise-fade-rotating>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-line-spin-clockwise-fade-rotating>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-line-spin-clockwise-fade-rotating>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-line-spin-clockwise-fade-rotating>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:0s;animation-delay:0s}.la-line-spin-clockwise-fade-rotating.la-sm{width:16px;height:16px}.la-line-spin-clockwise-fade-rotating.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-clockwise-fade-rotating.la-2x{width:64px;height:64px}.la-line-spin-clockwise-fade-rotating.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-clockwise-fade-rotating.la-3x{width:96px;height:96px}.la-line-spin-clockwise-fade-rotating.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@keyframes line-spin-clockwise-fade-rotating-rotate{100%{transform:rotate(-360deg)}}@-webkit-keyframes line-spin-clockwise-fade-rotating{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-clockwise-fade-rotating{50%{opacity:.2}100%{opacity:1}}.la-line-spin-clockwise-fade,.la-line-spin-clockwise-fade>div{position:relative;box-sizing:border-box}.la-line-spin-clockwise-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-line-spin-clockwise-fade.la-dark{color:#333}.la-line-spin-clockwise-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-clockwise-fade;animation:1s ease-in-out infinite line-spin-clockwise-fade}.la-line-spin-clockwise-fade>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-.875s;animation-delay:-.875s}.la-line-spin-clockwise-fade>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-.75s;animation-delay:-.75s}.la-line-spin-clockwise-fade>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-.625s;animation-delay:-.625s}.la-line-spin-clockwise-fade>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.la-line-spin-clockwise-fade>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-.375s;animation-delay:-.375s}.la-line-spin-clockwise-fade>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-.25s;animation-delay:-.25s}.la-line-spin-clockwise-fade>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-.125s;animation-delay:-.125s}.la-line-spin-clockwise-fade>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:0s;animation-delay:0s}.la-line-spin-clockwise-fade.la-sm{width:16px;height:16px}.la-line-spin-clockwise-fade.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-clockwise-fade.la-2x{width:64px;height:64px}.la-line-spin-clockwise-fade.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-clockwise-fade.la-3x{width:96px;height:96px}.la-line-spin-clockwise-fade.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-clockwise-fade{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-clockwise-fade{50%{opacity:.2}100%{opacity:1}}.la-line-spin-fade-rotating,.la-line-spin-fade-rotating>div{position:relative;box-sizing:border-box}.la-line-spin-fade-rotating{display:block;font-size:0;color:#fff;width:32px;height:32px;-webkit-animation:6s linear infinite ball-spin-fade-rotating-rotate;animation:6s linear infinite ball-spin-fade-rotating-rotate}.la-line-spin-fade-rotating.la-dark{color:#333}.la-line-spin-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-fade-rotating;animation:1s ease-in-out infinite line-spin-fade-rotating}.la-line-spin-fade-rotating>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-line-spin-fade-rotating>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-line-spin-fade-rotating>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-line-spin-fade-rotating>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-line-spin-fade-rotating>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-line-spin-fade-rotating>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-line-spin-fade-rotating>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-line-spin-fade-rotating>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:-2s;animation-delay:-2s}.la-line-spin-fade-rotating.la-sm{width:16px;height:16px}.la-line-spin-fade-rotating.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-fade-rotating.la-2x{width:64px;height:64px}.la-line-spin-fade-rotating.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-fade-rotating.la-3x{width:96px;height:96px}.la-line-spin-fade-rotating.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes ball-spin-fade-rotating-rotate{100%{transform:rotate(360deg)}}@keyframes ball-spin-fade-rotating-rotate{100%{transform:rotate(360deg)}}@-webkit-keyframes line-spin-fade-rotating{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-fade-rotating{50%{opacity:.2}100%{opacity:1}}.la-line-spin-fade,.la-line-spin-fade>div{position:relative;box-sizing:border-box}.la-line-spin-fade{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-line-spin-fade.la-dark{color:#333}.la-line-spin-fade>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;width:2px;height:10px;margin:-5px 2px 2px -1px;border-radius:0;-webkit-animation:1s ease-in-out infinite line-spin-fade;animation:1s ease-in-out infinite line-spin-fade}.la-line-spin-fade>div:nth-child(1){top:15%;left:50%;transform:rotate(0);-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.la-line-spin-fade>div:nth-child(2){top:25.2512626585%;left:74.7487373415%;transform:rotate(45deg);-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.la-line-spin-fade>div:nth-child(3){top:50%;left:85%;transform:rotate(90deg);-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.la-line-spin-fade>div:nth-child(4){top:74.7487373415%;left:74.7487373415%;transform:rotate(135deg);-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.la-line-spin-fade>div:nth-child(5){top:84.9999999974%;left:50.0000000004%;transform:rotate(180deg);-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.la-line-spin-fade>div:nth-child(6){top:74.7487369862%;left:25.2512627193%;transform:rotate(225deg);-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.la-line-spin-fade>div:nth-child(7){top:49.9999806189%;left:15.0000039834%;transform:rotate(270deg);-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.la-line-spin-fade>div:nth-child(8){top:25.2506949798%;left:25.2513989292%;transform:rotate(315deg);-webkit-animation-delay:-2s;animation-delay:-2s}.la-line-spin-fade.la-sm{width:16px;height:16px}.la-line-spin-fade.la-sm>div{width:1px;height:4px;margin-top:-2px;margin-left:0}.la-line-spin-fade.la-2x{width:64px;height:64px}.la-line-spin-fade.la-2x>div{width:4px;height:20px;margin-top:-10px;margin-left:-2px}.la-line-spin-fade.la-3x{width:96px;height:96px}.la-line-spin-fade.la-3x>div{width:6px;height:30px;margin-top:-15px;margin-left:-3px}@-webkit-keyframes line-spin-fade{50%{opacity:.2}100%{opacity:1}}@keyframes line-spin-fade{50%{opacity:.2}100%{opacity:1}}.la-pacman,.la-pacman>div{position:relative;box-sizing:border-box}.la-pacman{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-pacman.la-dark{color:#333}.la-pacman>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-pacman>div:nth-child(1),.la-pacman>div:nth-child(2){width:0;height:0;background:0 0;border-style:solid;border-width:16px;border-right-color:transparent;border-radius:100%;-webkit-animation:.5s infinite pacman-rotate-half-up;animation:.5s infinite pacman-rotate-half-up}.la-pacman>div:nth-child(2){margin-top:-32px;-webkit-animation-name:pacman-rotate-half-down;animation-name:pacman-rotate-half-down}.la-pacman>div:nth-child(3),.la-pacman>div:nth-child(4),.la-pacman>div:nth-child(5),.la-pacman>div:nth-child(6){position:absolute;top:50%;left:200%;width:8px;height:8px;border-radius:100%;opacity:0;-webkit-animation:2s linear infinite pacman-balls;animation:2s linear infinite pacman-balls}.la-pacman>div:nth-child(3){-webkit-animation-delay:-1.44s;animation-delay:-1.44s}.la-pacman>div:nth-child(4){-webkit-animation-delay:-1.94s;animation-delay:-1.94s}.la-pacman>div:nth-child(5){-webkit-animation-delay:-2.44s;animation-delay:-2.44s}.la-pacman>div:nth-child(6){-webkit-animation-delay:-2.94s;animation-delay:-2.94s}.la-pacman.la-sm{width:16px;height:16px}.la-pacman.la-sm>div:nth-child(1),.la-pacman.la-sm>div:nth-child(2){border-width:8px}.la-pacman.la-sm>div:nth-child(2){margin-top:-16px}.la-pacman.la-sm>div:nth-child(3),.la-pacman.la-sm>div:nth-child(4),.la-pacman.la-sm>div:nth-child(5),.la-pacman.la-sm>div:nth-child(6){width:4px;height:4px}.la-pacman.la-2x{width:64px;height:64px}.la-pacman.la-2x>div:nth-child(1),.la-pacman.la-2x>div:nth-child(2){border-width:32px}.la-pacman.la-2x>div:nth-child(2){margin-top:-64px}.la-pacman.la-2x>div:nth-child(3),.la-pacman.la-2x>div:nth-child(4),.la-pacman.la-2x>div:nth-child(5),.la-pacman.la-2x>div:nth-child(6){width:16px;height:16px}.la-pacman.la-3x{width:96px;height:96px}.la-pacman.la-3x>div:nth-child(1),.la-pacman.la-3x>div:nth-child(2){border-width:48px}.la-pacman.la-3x>div:nth-child(2){margin-top:-96px}.la-pacman.la-3x>div:nth-child(3),.la-pacman.la-3x>div:nth-child(4),.la-pacman.la-3x>div:nth-child(5),.la-pacman.la-3x>div:nth-child(6){width:24px;height:24px}@-webkit-keyframes pacman-rotate-half-up{0%,100%{transform:rotate(270deg)}50%{transform:rotate(360deg)}}@keyframes pacman-rotate-half-up{0%,100%{transform:rotate(270deg)}50%{transform:rotate(360deg)}}@-webkit-keyframes pacman-rotate-half-down{0%,100%{transform:rotate(90deg)}50%{transform:rotate(0)}}@keyframes pacman-rotate-half-down{0%,100%{transform:rotate(90deg)}50%{transform:rotate(0)}}@-webkit-keyframes pacman-balls{0%{left:200%;opacity:0;transform:translateY(-50%)}5%{opacity:.5}66%{opacity:1}67%{opacity:0}100%{left:0;transform:translateY(-50%)}}@keyframes pacman-balls{0%{left:200%;opacity:0;transform:translateY(-50%)}5%{opacity:.5}66%{opacity:1}67%{opacity:0}100%{left:0;transform:translateY(-50%)}}.la-square-jelly-box,.la-square-jelly-box>div{position:relative;box-sizing:border-box}.la-square-jelly-box{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-jelly-box.la-dark{color:#333}.la-square-jelly-box>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-square-jelly-box>div:nth-child(1),.la-square-jelly-box>div:nth-child(2){position:absolute;left:0;width:100%}.la-square-jelly-box>div:nth-child(1){top:-25%;z-index:1;height:100%;border-radius:10%;-webkit-animation:.6s linear -.1s infinite square-jelly-box-animate;animation:.6s linear -.1s infinite square-jelly-box-animate}.la-square-jelly-box>div:nth-child(2){bottom:-9%;height:10%;background:#000;border-radius:50%;opacity:.2;-webkit-animation:.6s linear -.1s infinite square-jelly-box-shadow;animation:.6s linear -.1s infinite square-jelly-box-shadow}.la-square-jelly-box.la-sm{width:16px;height:16px}.la-square-jelly-box.la-2x{width:64px;height:64px}.la-square-jelly-box.la-3x{width:96px;height:96px}@-webkit-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{transform:translateY(25%) rotate(67.5deg)}100%{transform:translateY(0) rotate(90deg)}}@keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{transform:translateY(25%) rotate(67.5deg)}100%{transform:translateY(0) rotate(90deg)}}@-webkit-keyframes square-jelly-box-shadow{50%{transform:scale(1.25,1)}}@keyframes square-jelly-box-shadow{50%{transform:scale(1.25,1)}}.la-square-loader,.la-square-loader>div{position:relative;box-sizing:border-box}.la-square-loader{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-loader.la-dark{color:#333}.la-square-loader>div{display:inline-block;float:none;border:2px solid currentColor;width:100%;height:100%;background:0 0;border-radius:0;-webkit-animation:2s infinite square-loader;animation:2s infinite square-loader}.la-square-loader>div:after{display:inline-block;width:100%;vertical-align:top;content:\"\";background-color:currentColor;-webkit-animation:2s ease-in infinite square-loader-inner;animation:2s ease-in infinite square-loader-inner}.la-square-loader.la-sm{width:16px;height:16px}.la-square-loader.la-sm>div{border-width:1px}.la-square-loader.la-2x{width:64px;height:64px}.la-square-loader.la-2x>div{border-width:4px}.la-square-loader.la-3x{width:96px;height:96px}.la-square-loader.la-3x>div{border-width:6px}@-webkit-keyframes square-loader{0%{transform:rotate(0)}25%,50%{transform:rotate(180deg)}100%,75%{transform:rotate(360deg)}}@keyframes square-loader{0%{transform:rotate(0)}25%,50%{transform:rotate(180deg)}100%,75%{transform:rotate(360deg)}}@-webkit-keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}@keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}.la-square-spin,.la-square-spin>div{position:relative;box-sizing:border-box}.la-square-spin{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-square-spin.la-dark{color:#333}.la-square-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:100%;height:100%;border-radius:0;-webkit-animation:3s cubic-bezier(.09,.57,.49,.9) infinite square-spin;animation:3s cubic-bezier(.09,.57,.49,.9) infinite square-spin}.la-square-spin.la-sm{width:16px;height:16px}.la-square-spin.la-2x{width:64px;height:64px}.la-square-spin.la-3x{width:96px;height:96px}@-webkit-keyframes square-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}@keyframes square-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}.la-timer,.la-timer>div{position:relative;box-sizing:border-box}.la-timer{display:block;font-size:0;color:#fff;width:32px;height:32px}.la-timer.la-dark{color:#333}.la-timer>div{display:inline-block;float:none;border:2px solid currentColor;width:32px;height:32px;background:0 0;border-radius:100%}.la-timer>div:after,.la-timer>div:before{position:absolute;top:14px;left:14px;display:block;width:2px;margin-top:-1px;margin-left:-1px;content:\"\";background:currentColor;border-radius:2px;transform-origin:1px 1px 0;-webkit-animation:1.25s linear -625ms infinite timer-loader;animation:1.25s linear -625ms infinite timer-loader}.la-timer>div:before{height:12px}.la-timer>div:after{height:8px;-webkit-animation-duration:15s;animation-duration:15s;-webkit-animation-delay:-7.5s;animation-delay:-7.5s}.la-timer.la-sm{width:16px;height:16px}.la-timer.la-sm>div{width:16px;height:16px;border-width:1px}.la-timer.la-sm>div:after,.la-timer.la-sm>div:before{top:7px;left:7px;width:1px;margin-top:-.5px;margin-left:-.5px;border-radius:1px;transform-origin:.5px .5px 0}.la-timer.la-sm>div:before{height:6px}.la-timer.la-sm>div:after{height:4px}.la-timer.la-2x{width:64px;height:64px}.la-timer.la-2x>div{width:64px;height:64px;border-width:4px}.la-timer.la-2x>div:after,.la-timer.la-2x>div:before{top:28px;left:28px;width:4px;margin-top:-2px;margin-left:-2px;border-radius:4px;transform-origin:2px 2px 0}.la-timer.la-2x>div:before{height:24px}.la-timer.la-2x>div:after{height:16px}.la-timer.la-3x{width:96px;height:96px}.la-timer.la-3x>div{width:96px;height:96px;border-width:6px}.la-timer.la-3x>div:after,.la-timer.la-3x>div:before{top:42px;left:42px;width:6px;margin-top:-3px;margin-left:-3px;border-radius:6px;transform-origin:3px 3px 0}.la-timer.la-3x>div:before{height:36px}.la-timer.la-3x>div:after{height:24px}@-webkit-keyframes timer-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes timer-loader{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.la-triangle-skew-spin,.la-triangle-skew-spin>div{position:relative;box-sizing:border-box}.la-triangle-skew-spin{display:block;font-size:0;color:#fff;width:32px;height:16px}.la-triangle-skew-spin.la-dark{color:#333}.la-triangle-skew-spin>div{display:inline-block;float:none;border:0 solid currentColor;width:0;height:0;background:0 0;border:solid;border-width:0 16px 16px;border-right-color:transparent;border-left-color:transparent;-webkit-animation:3s cubic-bezier(.09,.57,.49,.9) infinite triangle-skew-spin;animation:3s cubic-bezier(.09,.57,.49,.9) infinite triangle-skew-spin}.la-triangle-skew-spin.la-sm{width:16px;height:8px}.la-triangle-skew-spin.la-sm>div{border-width:0 8px 8px}.la-triangle-skew-spin.la-2x{width:64px;height:32px}.la-triangle-skew-spin.la-2x>div{border-width:0 32px 32px}.la-triangle-skew-spin.la-3x{width:96px;height:48px}.la-triangle-skew-spin.la-3x>div{border-width:0 48px 48px}@-webkit-keyframes triangle-skew-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}@keyframes triangle-skew-spin{0%{transform:perspective(100px) rotateX(0) rotateY(0)}25%{transform:perspective(100px) rotateX(180deg) rotateY(0)}50%{transform:perspective(100px) rotateX(180deg) rotateY(180deg)}75%{transform:perspective(100px) rotateX(0) rotateY(180deg)}100%{transform:perspective(100px) rotateX(0) rotateY(360deg)}}.overlay{position:fixed;top:0;left:0;width:100%;height:100%}.overlay>div:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}"]
      }]
    }];
    /** @nocollapse */

    NgxSpinnerComponent.ctorParameters = function () {
      return [{
        type: NgxSpinnerService
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
      }];
    };

    NgxSpinnerComponent.propDecorators = {
      bdColor: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      size: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      color: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      type: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      fullScreen: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      name: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }],
      zIndex: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
      }]
    };

    if (false) {}
    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-spinner.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var NgxSpinnerModule = function NgxSpinnerModule() {
      _classCallCheck(this, NgxSpinnerModule);
    };

    NgxSpinnerModule.decorators = [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
      args: [{
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]],
        declarations: [NgxSpinnerComponent],
        exports: [NgxSpinnerComponent]
      }]
    }];
    /**
     * @fileoverview added by tsickle
     * Generated from: public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ngx-spinner.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=ngx-spinner.js.map

    /***/
  },

  /***/
  "./src/app/auth/authguardservice.service.ts":
  /*!**************************************************!*\
    !*** ./src/app/auth/authguardservice.service.ts ***!
    \**************************************************/

  /*! exports provided: AuthguardserviceService */

  /***/
  function srcAppAuthAuthguardserviceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthguardserviceService", function () {
      return AuthguardserviceService;
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


    var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../sharedservices/persitence.service */
    "./src/app/sharedservices/persitence.service.ts");
    /* harmony import */


    var _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../sharedservices/notification.service */
    "./src/app/sharedservices/notification.service.ts");
    /* harmony import */


    var _services_common_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../services/common/user/user.service */
    "./src/app/services/common/user/user.service.ts");
    /* harmony import */


    var _services_candidate_candidate_candidate_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../services/candidate/candidate/candidate.service */
    "./src/app/services/candidate/candidate/candidate.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
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
    }; // import { CandidateService } from '../..../../services/candidate/candidate/candidate.service';


    var AuthguardserviceService =
    /*#__PURE__*/
    function () {
      function AuthguardserviceService(router, userService, persister, notificationService, SpinnerService, candidateService) {
        _classCallCheck(this, AuthguardserviceService);

        this.router = router;
        this.userService = userService;
        this.persister = persister;
        this.notificationService = notificationService;
        this.SpinnerService = SpinnerService;
        this.candidateService = candidateService;
        this.userMenus = [];
        this.searchMenu = {
          autoUserId: null
        };
        this.loggedIn = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false); // Added by Anif on 20-07-2022

        this.edmsMenuAuthorization = [];
      }

      _createClass(AuthguardserviceService, [{
        key: "login",
        value: function login(user) {
          var _this25 = this;

          if (user.userId !== '' && user.password !== '') {
            this.SpinnerService.show();
            this.userService.getUserByUserId(user).subscribe(function (result) {
              if (result) {
                if (result.status == 1) {
                  _this25.persister.set('timeslogin', "0");

                  _this25.persister.set('loggedinuser', result.loginUser);

                  _this25.loggedIn.next(true);

                  _this25.getUserMenu(result.loginUser.autoUserId, result);

                  _this25.getEDMSAuthorization(result.loginUser.autoUserId); // Added by ANif on 20-07-2022 for EDMS Link Authoriation


                  setTimeout(function () {
                    _this25.SpinnerService.hide();
                  }, 12000);
                } else {
                  _this25.notificationService.showError("Invalid Username or Password !!", "Error");

                  console.log("Error");

                  _this25.SpinnerService.hide();
                }
              } else {
                _this25.SpinnerService.hide();
              }
            }, function (error) {
              console.log(error);
            }, function () {});
          }
        }
      }, {
        key: "loginByCosmos",
        value: function loginByCosmos(user) {
          var _this26 = this;

          if (user.userId !== '' && user.password !== '') {
            this.SpinnerService.show();
            this.userService.getUserByUserIdByCosmos(user).subscribe(function (result) {
              if (result) {
                if (result.status == 1) {
                  _this26.persister.set('timeslogin', "0");

                  _this26.persister.set('loggedinuser', result.loginUser);

                  _this26.loggedIn.next(true);

                  _this26.getUserMenu(result.loginUser.autoUserId, result);

                  _this26.getEDMSAuthorization(result.loginUser.autoUserId); // Added by ANif on 20-07-2022 for EDMS Link Authoriation


                  setTimeout(function () {
                    _this26.SpinnerService.hide();
                  }, 12000);
                } else {
                  _this26.notificationService.showError("Invalid Username or Password !!", "Error");

                  console.log("Error");

                  _this26.SpinnerService.hide();
                }
              } else {
                _this26.SpinnerService.hide();
              }
            }, function (error) {
              console.log(error);
            }, function () {});
          }
        }
      }, {
        key: "forgotPassword",
        value: function forgotPassword(user) {
          var _this27 = this;

          if (user.userId !== '') {
            this.SpinnerService.show();
            this.userService.getForgotUserByUserId(user).subscribe(function (result) {
              if (result) {
                if (result.status == 1) {
                  _this27.SpinnerService.hide();

                  _this27.notificationService.showSuccess("A mail has been sent to register email adreess with new password !!", "Success");
                } else {
                  _this27.notificationService.showError("Invalid Username !!", "Error");

                  console.log("Error");

                  _this27.SpinnerService.hide();
                }
              } else {
                _this27.SpinnerService.hide();
              }
            }, function (error) {
              console.log(error);
            }, function () {});
          }
        }
      }, {
        key: "logout",
        value: function logout() {
          //added on 19-12-2023 for Azure table Call On LogInout
          var values = {
            UserName: this.persister.get('loggedinuser').userName + " ( AutoUserId- " + this.persister.get('loggedinuser').autoUserId.toString() + ")"
          };
          this.userService.AzuretableCallOnLogInout(values).subscribe(function (result) {});
          this.persister.set('loggedinuser', null);
          this.persister.set('menudata', null);
          this.loggedIn.next(false);
          this.router.navigate(['/auth/login']);
        }
      }, {
        key: "getUserMenu",
        value: function getUserMenu(autouserid, loginResult) {
          var _this28 = this;

          this.userMenus = [];
          this.searchMenu.autoUserId = autouserid;
          this.userService.getUserMenu(this.searchMenu).subscribe(function (result) {
            if (result) {
              _this28.userMenus = result;

              _this28.persister.set('menudata', result); //this.router.navigate(['/']);


              _this28.router.navigate(['/app/']); // Anif


              if (loginResult.loginUser.userId != "") {
                var isCandidate = loginResult.loginUser.userId.includes("C-MRF");

                if (isCandidate) {
                  var obj = {
                    CandidateId: loginResult.loginUser.candidateId,
                    RequisitionDetailId: 0,
                    CreatedBy: 0
                  };

                  _this28.candidateService.candidateCheckUpdateProfile(obj).subscribe(function (result1) {
                    if (result1) {
                      if (result1.successFlag == 0) {
                        //this.notificationService.showError(result1.msg, "Error");
                        _this28.router.navigate(['/app/career/update-profile']); //this.router.navigate(['/login']);

                      } else {
                        _this28.router.navigate(['/app/career/current-jobs']);
                      }
                    } else {
                      _this28.notificationService.showError("Something went wrong.", "Error");
                    }
                  }, function (error) {
                    console.log(error);
                  }, function () {});
                }
              } // Till this

            } else {
              _this28.userMenus = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        } // Added By Anif on 20-07-2022 for checking EDMS Link Authorization

      }, {
        key: "getEDMSAuthorization",
        value: function getEDMSAuthorization(autoUserId) {
          var _this29 = this;

          var edmsAuthAutoUserId = {
            AutoUserId: autoUserId
          };
          this.userService.getEDMSLinkAuthorization(edmsAuthAutoUserId).subscribe(function (result) {
            if (result) {
              _this29.edmsMenuAuthorization = result;

              _this29.persister.set('EDMSLinkAuthorization', _this29.edmsMenuAuthorization);
            } else {
              _this29.userMenus = [];
            }
          }, function (error) {
            console.log(error);
          }, function () {});
        }
      }, {
        key: "isLoggedIn",
        get: function get() {
          return this.loggedIn.asObservable();
        },
        set: function set(status) {
          this.loggedIn.next(status);
        }
      }]);

      return AuthguardserviceService;
    }();

    AuthguardserviceService.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _services_common_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]
      }, {
        type: _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_3__["PersistanceService"]
      }, {
        type: _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"]
      }, {
        type: _services_candidate_candidate_candidate_service__WEBPACK_IMPORTED_MODULE_6__["CandidateService"]
      }];
    };

    AuthguardserviceService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_common_user_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"], _sharedservices_persitence_service__WEBPACK_IMPORTED_MODULE_3__["PersistanceService"], _sharedservices_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"], ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"], _services_candidate_candidate_candidate_service__WEBPACK_IMPORTED_MODULE_6__["CandidateService"]])], AuthguardserviceService);
    /***/
  },

  /***/
  "./src/app/services/candidate/candidate/candidate.service.ts":
  /*!*******************************************************************!*\
    !*** ./src/app/services/candidate/candidate/candidate.service.ts ***!
    \*******************************************************************/

  /*! exports provided: CandidateService */

  /***/
  function srcAppServicesCandidateCandidateCandidateServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CandidateService", function () {
      return CandidateService;
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

    var CandidateService =
    /*#__PURE__*/
    function () {
      function CandidateService(httpClient) {
        _classCallCheck(this, CandidateService);

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
      } //comment by kuntal


      _createClass(CandidateService, [{
        key: "createAccount",
        value: function createAccount(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/createaccount', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateOnlyCandidateProfile",
        value: function updateOnlyCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/Updateonlycandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateOnlyCampusCandidateProfile",
        value: function updateOnlyCampusCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/Updateonlycampuscandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "CreateOnlyCandidateProfile",
        value: function CreateOnlyCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/createnewcandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCandidateProfile",
        value: function updateCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/updatecandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCandidateData",
        value: function getCandidateData(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/getcandidatedata', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCandidateDataUpdate",
        value: function getCampusCandidateDataUpdate(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/getcampuscandidateupdatedata', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "createCandidateProfile",
        value: function createCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/createcandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateCMDApproval",
        value: function updateCMDApproval(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/savecandidatecmdstatus', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "candidateApplyJob",
        value: function candidateApplyJob(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/candidateapplyjob', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getInternalCandidate",
        value: function getInternalCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/getinternalcandidate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCandidateProfile",
        value: function getCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/getallcandidateprofile', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCandidateProfile",
        value: function getCampusCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/getallcampuscandidateprofile', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCandidateProfileApplication",
        value: function getCandidateProfileApplication(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/getallcandidateprofileapplication', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCampusCandidateProfileApplication",
        value: function getCampusCandidateProfileApplication(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/getallcampuscandidateprofileapplication', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "enableDisableCandidateProfileStatus",
        value: function enableDisableCandidateProfileStatus(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/enabledisablecandidateprofile', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveCandidateProfile",
        value: function saveCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/insertcandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveCampusCandidateProfile",
        value: function saveCampusCandidateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/insertcampuscandidateprofile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "CandidateProfileMrfPpf",
        value: function CandidateProfileMrfPpf(formData) {
          return this.httpClient.post(this.apiURL + '/candidateprofile/candidateprofileupdateppf', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllModeOfJoining",
        value: function getAllModeOfJoining(formData) {
          return this.httpClient.post(this.apiURL + '/ModeOfJoining/GetAllModeOfJoining', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllOnboardingManager",
        value: function getAllOnboardingManager(formData) {
          return this.httpClient.post(this.apiURL + '/common/GetAllOnBoardingManager', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveJoiningConfirmationDate",
        value: function saveJoiningConfirmationDate(formData) {
          return this.httpClient.post(this.apiURL + '/prejoiningdetails/CandidateJoiningDateInsert', formData, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "sendToOnboardingTeam",
        value: function sendToOnboardingTeam(formData) {
          return this.httpClient.post(this.apiURL + '/prejoiningdetails/CandidateOnBoardingAssignInsert', formData, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "candidateCheckUpdateProfile",
        value: function candidateCheckUpdateProfile(formData) {
          return this.httpClient.post(this.apiURL + '/candidate/candidatecheckProfileUpdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return CandidateService;
    }();

    CandidateService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    CandidateService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], CandidateService);
    /***/
  },

  /***/
  "./src/app/services/common/common/common.service.ts":
  /*!**********************************************************!*\
    !*** ./src/app/services/common/common/common.service.ts ***!
    \**********************************************************/

  /*! exports provided: CommonService */

  /***/
  function srcAppServicesCommonCommonCommonServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CommonService", function () {
      return CommonService;
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

    var CommonService =
    /*#__PURE__*/
    function () {
      function CommonService(httpClient) {
        _classCallCheck(this, CommonService);

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

      _createClass(CommonService, [{
        key: "getAllStatus",
        value: function getAllStatus() {
          return this.httpClient.get(this.apiURL + '/common/getallstatus').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllStatusForROResignation",
        value: function getAllStatusForROResignation() {
          return this.httpClient.get(this.apiURL + '/common/getallstatusROResignation').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllAge",
        value: function getAllAge() {
          return this.httpClient.get(this.apiURL + '/common/getallage').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllExperience",
        value: function getAllExperience() {
          return this.httpClient.get(this.apiURL + '/common/getallexperience').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllGender",
        value: function getAllGender(formData) {
          return this.httpClient.post(this.apiURL + '/gender/getallgender', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllPrefix",
        value: function getAllPrefix(formData) {
          return this.httpClient.post(this.apiURL + '/prefix/getallprefix', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllState",
        value: function getAllState() {
          return this.httpClient.get(this.apiURL + '/common/getallstate', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllYears",
        value: function getAllYears() {
          return this.httpClient.get(this.apiURL + '/common/getallyears', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllMonths",
        value: function getAllMonths() {
          return this.httpClient.get(this.apiURL + '/common/getallmonths', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllBloodGroup",
        value: function getAllBloodGroup(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallbloodgroup', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllReligion",
        value: function getAllReligion(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallreligion', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addReligion",
        value: function addReligion(formData) {
          return this.httpClient.post(this.apiURL + '/common/religioninsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCaste",
        value: function getAllCaste(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallcaste', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addCaste",
        value: function addCaste(formData) {
          return this.httpClient.post(this.apiURL + '/common/casteinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllExternalTrainer",
        value: function getAllExternalTrainer(formData) {
          return this.httpClient.post(this.apiURL + '/common/getAllExternalTrainer', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addExternalTrainers",
        value: function addExternalTrainers(formData) {
          return this.httpClient.post(this.apiURL + '/common/externaltrainersinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCountryList",
        value: function getAllCountryList(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallcountrylist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addCountryList",
        value: function addCountryList(formData) {
          return this.httpClient.post(this.apiURL + '/common/countrylistinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllRelationship",
        value: function getAllRelationship(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallrelationship', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllFamilyRelationship",
        value: function getAllFamilyRelationship(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallfamilyrelationship', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addRelationship",
        value: function addRelationship(formData) {
          return this.httpClient.post(this.apiURL + '/common/relationshipinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addFamilyRelationship",
        value: function addFamilyRelationship(formData) {
          return this.httpClient.post(this.apiURL + '/common/familyrelationshipinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllNationality",
        value: function getAllNationality(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallnationality', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addNationality",
        value: function addNationality(formData) {
          return this.httpClient.post(this.apiURL + '/common/natioanalityinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationUniversityBoard",
        value: function getAllQualificationUniversityBoard(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallqulificationuniversityboard', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addUniversityBoard",
        value: function addUniversityBoard(formData) {
          return this.httpClient.post(this.apiURL + '/common/qulificationuniversityboardinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationClassGradeDivision",
        value: function getAllQualificationClassGradeDivision(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallqulificationclassgaradedivision', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllPreviousSalsryAccounthead",
        value: function getAllPreviousSalsryAccounthead(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallsalaryaccountheadprevious', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllOccupationList",
        value: function getAllOccupationList(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalloccupationlist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addOccupation",
        value: function addOccupation(formData) {
          return this.httpClient.post(this.apiURL + '/common/occupationinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllAttachmentDocumentType",
        value: function getAllAttachmentDocumentType(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallattachmentdocumenttype', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getRoleWiseDocument",
        value: function getRoleWiseDocument(formData) {
          return this.httpClient.post(this.apiURL + '/common/getrolewisedocument', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addAttachmentDocType",
        value: function addAttachmentDocType(formData) {
          return this.httpClient.post(this.apiURL + '/common/attachmentdocumentTypeinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "GetAllAttachmentDocumentParticular",
        value: function GetAllAttachmentDocumentParticular(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallattachmentdocumentparticular', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addAttachmentDocParticular",
        value: function addAttachmentDocParticular(formData) {
          return this.httpClient.post(this.apiURL + '/common/attachmentdocumentparticularinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllAttachmentDocumentName",
        value: function getAllAttachmentDocumentName(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallattachmentdocumentname', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getFilteredAttachmentDocumentName",
        value: function getFilteredAttachmentDocumentName(formData) {
          return this.httpClient.post(this.apiURL + '/common/getfilteredattachmentdocumentname', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addAttachmentDocName",
        value: function addAttachmentDocName(formData) {
          return this.httpClient.post(this.apiURL + '/common/attachmentdocumentnameinsertupdate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllDownloadPDFHandBook",
        value: function getAllDownloadPDFHandBook(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalldownloadpdfhandbook', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //arg

      }, {
        key: "getAllAttachmentPDF",
        value: function getAllAttachmentPDF(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallpdfattachment', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addAttachmentPDF",
        value: function addAttachmentPDF(formData) {
          return this.httpClient.post(this.apiURL + '/common/attachmentpdfinsertupdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllDocumentStatus",
        value: function getAllDocumentStatus(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallapprovallist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addUserRole",
        value: function addUserRole(formData) {
          return this.httpClient.post(this.apiURL + '/common/userroleinsert', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllUserRole",
        value: function getAllUserRole(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalluserrole', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getuserrolehandholding",
        value: function getuserrolehandholding(formData) {
          return this.httpClient.post(this.apiURL + '/common/getuserrolehandholding', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getRoleWiseUser",
        value: function getRoleWiseUser(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallrolewiseuser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllEmployeeForSignature",
        value: function getAllEmployeeForSignature(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallemployeeforsignature', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "insertUpdateSignature",
        value: function insertUpdateSignature(formData) {
          return this.httpClient.post(this.apiURL + '/common/insertupdatesignature', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllSignature",
        value: function getAllSignature(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallsignature', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getRoleWiseUserhandhold",
        value: function getRoleWiseUserhandhold(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallrolewiseuserhandhold', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getRoleLocationWiseUser",
        value: function getRoleLocationWiseUser(formData) {
          return this.httpClient.post(this.apiURL + '/common/getrolelocationwiseuser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getRoleWiseUserReassignCandidate",
        value: function getRoleWiseUserReassignCandidate(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallrolewiseuserreassigncandidate', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllTicByLocation",
        value: function getAllTicByLocation(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallticbylocation', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getalllocationwisearea",
        value: function getalllocationwisearea(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalllocationwisearea', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getallfunctionwiselocation",
        value: function getallfunctionwiselocation(formData) {
          return this.httpClient.post(this.apiURL + '/common/getfunctionwiselocation', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllBatch",
        value: function getAllBatch(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallBatch', JSON.stringify(formData), this.httpOptions) // return this.httpClient.post<any>(this.apiURL + '/prejoiningdetails/GetAllBatchesPendingReportingVenue', JSON.stringify(formData), this.httpOptions)
          .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllVerticalrm",
        value: function getAllVerticalrm(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallverticalrm', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllMenuAccess",
        value: function getAllMenuAccess(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallmenuaccess', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addMenuAccess",
        value: function addMenuAccess(formData) {
          return this.httpClient.post(this.apiURL + '/common/menuaccessinsert', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllTrainingTittle",
        value: function getAllTrainingTittle(formData) {
          return this.httpClient.post(this.apiURL + '/assessment/getindusctiontraninglist', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllUserBasedonRole",
        value: function getAllUserBasedonRole(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallrolewiseuser', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getDownloadFile",
        value: function getDownloadFile(formData) {
          return this.httpClient.post(this.apiURL + '/common/downloadhtmlfile', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllHiringStatus",
        value: function getAllHiringStatus() {
          return this.httpClient.get(this.apiURL + '/common/getallhiringstatus').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllRoleMenuAccess",
        value: function getAllRoleMenuAccess(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalluserrolemenuaccess', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getuserrolefunction",
        value: function getuserrolefunction(formData) {
          return this.httpClient.post(this.apiURL + '/common/GetRoleWiseUsrVertFunc', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getuserrolelocationfunction",
        value: function getuserrolelocationfunction(formData) {
          return this.httpClient.post(this.apiURL + '/common/GetRoleWiseUsrLocaFunc', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllModeOfjoining",
        value: function getAllModeOfjoining(formData) {
          return this.httpClient.post(this.apiURL + '/ModeOfJoining/GetAllModeOfJoining', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addModeOfJoining",
        value: function addModeOfJoining(formData) {
          return this.httpClient.post(this.apiURL + '/ModeOfJoining/ModeofJoiningInsertUpdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllInductionVenue",
        value: function getAllInductionVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/getallinductionvenue', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addInductionVenue",
        value: function addInductionVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/InductionVenueInsertUpdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllReportingVenue",
        value: function getAllReportingVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/GetAllReportingVenue', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllInterviewVenue",
        value: function getAllInterviewVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/GetAllInterviewVenue', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllTestVenue",
        value: function getAllTestVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/GetAllTestVenue', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addReportingVenue",
        value: function addReportingVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/ReportingVenueInsertUpdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addInterviewVenue",
        value: function addInterviewVenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/InterviewVenueInsertUpdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addtestvenue",
        value: function addtestvenue(formData) {
          return this.httpClient.post(this.apiURL + '/venue/TestVenueInsertUpdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addInsertUpdateRoleWiseUsrVertFunc",
        value: function addInsertUpdateRoleWiseUsrVertFunc(formData) {
          return this.httpClient.post(this.apiURL + '/common/InsertupdateRoleWiseUsrVertFunc', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addInsertUpdateRoleWiseUsrLoctFunc",
        value: function addInsertUpdateRoleWiseUsrLoctFunc(formData) {
          return this.httpClient.post(this.apiURL + '/common/InsertupdateRoleWiseUsrLoctFunc', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //   //External Induction venue-
        //   getAllExternalInductionVenue(formData: any): Observable<any> {
        //     return this.httpClient.post<any>(this.apiURL + '/venue/GetAllExternalInductionVenue', formData, this.httpOptionsFile)
        //       .pipe(
        //         catchError(this.errorHandler)
        //       )
        //   }
        // addExternalInductionVenue(formData: any): Observable<any>
        // {
        //   return this.httpClient.post<any>(this.apiURL + '/venue/ExternalInductionVenueInsertUpdate', formData, this.httpOptionsFile)
        //   .pipe(
        //     catchError(this.errorHandler)
        //   )
        // }

      }, {
        key: "getAllInductionMode",
        value: function getAllInductionMode(formData) {
          return this.httpClient.post(this.apiURL + '/common/GetAllInductionMode', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addInductionMode",
        value: function addInductionMode(formData) {
          return this.httpClient.post(this.apiURL + '/common/InsertUpdateInductionMode', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllLocationWiseTrainingIncharge",
        value: function getAllLocationWiseTrainingIncharge(formData) {
          return this.httpClient.post(this.apiURL + '/venue/GetAllLocationWiseTrainingInCharge', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addLocationWiseTrainingIncharge",
        value: function addLocationWiseTrainingIncharge(formData) {
          return this.httpClient.post(this.apiURL + '/venue/LocationWiseTrainingInChargeInsertUpdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllMasterState",
        value: function getAllMasterState(formData) {
          return this.httpClient.post(this.apiURL + '/common/getstatelist', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllStateByCountry",
        value: function getAllStateByCountry(formData) {
          return this.httpClient.post(this.apiURL + '/common/getstatelistbycountry', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addState",
        value: function addState(formData) {
          return this.httpClient.post(this.apiURL + '/common/addstate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addCountryStateLocationMapping",
        value: function addCountryStateLocationMapping(formData) {
          return this.httpClient.post(this.apiURL + '/common/addcountrystatelocationmap', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getCountryStateLocationMapping",
        value: function getCountryStateLocationMapping(formData) {
          return this.httpClient.post(this.apiURL + '/common/getcountrystatelocationmap', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllSelectionGuide",
        value: function getAllSelectionGuide(formData) {
          return this.httpClient.post(this.apiURL + '/selectionguide/getallselectionGuide', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllSelectionGuideInterview",
        value: function getAllSelectionGuideInterview(formData) {
          return this.httpClient.post(this.apiURL + '/interview/getallinterview', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addSelectionGuide",
        value: function addSelectionGuide(formData) {
          return this.httpClient.post(this.apiURL + '/selectionguide/addselectionguide', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllVendor",
        value: function getAllVendor(formData) {
          return this.httpClient.post(this.apiURL + '/vendor/getallvendor', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addVendor",
        value: function addVendor(formData) {
          return this.httpClient.post(this.apiURL + '/vendor/addvendor', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllEmailTemplateType",
        value: function getAllEmailTemplateType(formData) {
          return this.httpClient.post(this.apiURL + '/emailtemplate/getallemailtemplatetype', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllEmailTemplate",
        value: function getAllEmailTemplate(formData) {
          return this.httpClient.post(this.apiURL + '/emailtemplate/getallemailtemplate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveEmailTemplate",
        value: function saveEmailTemplate(formData) {
          return this.httpClient.post(this.apiURL + '/emailtemplate/addemailtemplate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "GetHiringStatus",
        value: function GetHiringStatus(formData) {
          return this.httpClient.post(this.apiURL + '/common/gethiringstatus', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllClaimStatusList",
        value: function getAllClaimStatusList(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallclaimstatus', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } // Added By anifur pon 23-06-2022

      }, {
        key: "getAllOccupation",
        value: function getAllOccupation(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalloccupationlist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "updateDocumentRole",
        value: function updateDocumentRole(formData) {
          debugger;
          return this.httpClient.post(this.apiURL + '/common/updateDocumentRole', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } // Anif on 25-11-2022

      }, {
        key: "getAllTrainingTittleList",
        value: function getAllTrainingTittleList(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalltrainingtittle', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "insertUpdateTrainingTittle",
        value: function insertUpdateTrainingTittle(formData) {
          return this.httpClient.post(this.apiURL + '/common/trainingtittleinsertupdate', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //added by Amartya on 22-12-2022

      }, {
        key: "getAllCostCenterList",
        value: function getAllCostCenterList(formData) {
          return this.httpClient.post(this.apiURL + '/common/getcostcenterdata', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "insertUpdateCostCenter",
        value: function insertUpdateCostCenter(formData) {
          return this.httpClient.post(this.apiURL + '/common/insertupdatecostcentermap', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllFatherOccupation",
        value: function getAllFatherOccupation(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallfatheroccupation', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getDashBoardValues",
        value: function getDashBoardValues(formData) {
          return this.httpClient.post(this.apiURL + '/common/getdashboardValuesOfRm', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllFlexiReportHeader",
        value: function getAllFlexiReportHeader(formData) {
          return this.httpClient.post(this.apiURL + '/common/getallflexireportheader', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addFlexiReportHeader",
        value: function addFlexiReportHeader(formData) {
          return this.httpClient.post(this.apiURL + '/common/addflexireportheader', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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
        } //Ankita

      }, {
        key: "OnboardingEmailStatus",
        value: function OnboardingEmailStatus(formData) {
          return this.httpClient.post(this.apiURL + '/common/CandidateOnboardingEmailStatus', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "GetAllEmailTypeToSendMail",
        value: function GetAllEmailTypeToSendMail() {
          return this.httpClient.get(this.apiURL + '/common/GetAllEmailTypeToSendMail', this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "GetAllEmailsByTypeID",
        value: function GetAllEmailsByTypeID(data) {
          return this.httpClient.post(this.apiURL + '/common/GetAllEmailsByTypeID', data, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "SendMailForSelectedItems",
        value: function SendMailForSelectedItems(data) {
          return this.httpClient.post(this.apiURL + '/common/SendMailForSelectedItems', data, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "SendMailForUpdatedSchedule",
        value: function SendMailForUpdatedSchedule(data) {
          return this.httpClient.post(this.apiURL + '/common/SendMailForUpdatedSchedule', data, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "SharewithCandidateWelcomeMail",
        value: function SharewithCandidateWelcomeMail(data) {
          return this.httpClient.post(this.apiURL + '/common/ShareWithCandidateSendMail', data, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "SendBookAccommodationMail",
        value: function SendBookAccommodationMail(data) {
          return this.httpClient.post(this.apiURL + '/common/BookAccommodationEmail', data, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "SendEmailNaukriCandidates",
        value: function SendEmailNaukriCandidates(data) {
          return this.httpClient.post(this.apiURL + '/common/SendEmailNaukriCandidates', data, this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }]);

      return CommonService;
    }();

    CommonService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    CommonService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], CommonService);
    /***/
  },

  /***/
  "./src/app/services/common/course/course.service.ts":
  /*!**********************************************************!*\
    !*** ./src/app/services/common/course/course.service.ts ***!
    \**********************************************************/

  /*! exports provided: CourseService */

  /***/
  function srcAppServicesCommonCourseCourseServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CourseService", function () {
      return CourseService;
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

    var CourseService =
    /*#__PURE__*/
    function () {
      function CourseService(httpClient) {
        _classCallCheck(this, CourseService);

        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
          headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
          })
        };
      }

      _createClass(CourseService, [{
        key: "getAllCourse",
        value: function getAllCourse(formData) {
          return this.httpClient.post(this.apiURL + '/course/getallcourse', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllCourseList",
        value: function getAllCourseList(formData) {
          return this.httpClient.post(this.apiURL + '/course/getallcourselist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addCourse",
        value: function addCourse(formData) {
          return this.httpClient.post(this.apiURL + '/course/addcourse', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addQualificationCourse",
        value: function addQualificationCourse(formData) {
          return this.httpClient.post(this.apiURL + '/course/addqualificationcourse', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationCourse",
        value: function getAllQualificationCourse(formData) {
          return this.httpClient.post(this.apiURL + '/course/getallqualificationcourse', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return CourseService;
    }();

    CourseService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    CourseService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], CourseService);
    /***/
  },

  /***/
  "./src/app/services/common/domain/domain.service.ts":
  /*!**********************************************************!*\
    !*** ./src/app/services/common/domain/domain.service.ts ***!
    \**********************************************************/

  /*! exports provided: DomainService */

  /***/
  function srcAppServicesCommonDomainDomainServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DomainService", function () {
      return DomainService;
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

    var DomainService =
    /*#__PURE__*/
    function () {
      function DomainService(httpClient) {
        _classCallCheck(this, DomainService);

        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
          headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
          })
        };
      }

      _createClass(DomainService, [{
        key: "getAllDomain",
        value: function getAllDomain(formData) {
          return this.httpClient.post(this.apiURL + '/domain/getalldomain', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addDomain",
        value: function addDomain(formData) {
          return this.httpClient.post(this.apiURL + '/domain/adddomain', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllSubDomain",
        value: function getAllSubDomain(formData) {
          return this.httpClient.post(this.apiURL + '/domain/getallsubdomain', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllSubDomainNew",
        value: function getAllSubDomainNew(formData) {
          return this.httpClient.post(this.apiURL + '/domain/getallsubdomainnew', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addSubDomain",
        value: function addSubDomain(formData) {
          return this.httpClient.post(this.apiURL + '/domain/addsubdomain', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return DomainService;
    }();

    DomainService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    DomainService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], DomainService);
    /***/
  },

  /***/
  "./src/app/services/common/language/language.service.ts":
  /*!**************************************************************!*\
    !*** ./src/app/services/common/language/language.service.ts ***!
    \**************************************************************/

  /*! exports provided: LanguageService */

  /***/
  function srcAppServicesCommonLanguageLanguageServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LanguageService", function () {
      return LanguageService;
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

    var LanguageService =
    /*#__PURE__*/
    function () {
      function LanguageService(httpClient) {
        _classCallCheck(this, LanguageService);

        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
          headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
          })
        };
      }

      _createClass(LanguageService, [{
        key: "getAllLanguage",
        value: function getAllLanguage(formData) {
          return this.httpClient.post(this.apiURL + '/language/getalllanguage', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addLanguage",
        value: function addLanguage(formData) {
          return this.httpClient.post(this.apiURL + '/language/addlanguage', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return LanguageService;
    }();

    LanguageService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    LanguageService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], LanguageService);
    /***/
  },

  /***/
  "./src/app/services/common/qualification/qualification.service.ts":
  /*!************************************************************************!*\
    !*** ./src/app/services/common/qualification/qualification.service.ts ***!
    \************************************************************************/

  /*! exports provided: QualificationService */

  /***/
  function srcAppServicesCommonQualificationQualificationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "QualificationService", function () {
      return QualificationService;
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

    var QualificationService =
    /*#__PURE__*/
    function () {
      function QualificationService(httpClient) {
        _classCallCheck(this, QualificationService);

        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
          headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
          })
        };
      }

      _createClass(QualificationService, [{
        key: "getAllQualification",
        value: function getAllQualification(formData) {
          return this.httpClient.post(this.apiURL + '/qualification/getallqualification', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationAllType",
        value: function getAllQualificationAllType(formData) {
          return this.httpClient.post(this.apiURL + '/qualification/getaqualificationall', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationActive",
        value: function getAllQualificationActive(formData) {
          return this.httpClient.post(this.apiURL + '/qualification/getallqualificationActive', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addQualification",
        value: function addQualification(formData) {
          return this.httpClient.post(this.apiURL + '/qualification/addqualification', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationType",
        value: function getAllQualificationType(formData) {
          return this.httpClient.post(this.apiURL + '/qualification/getallqualificationType', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return QualificationService;
    }();

    QualificationService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    QualificationService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], QualificationService);
    /***/
  },

  /***/
  "./src/app/services/common/stream/stream.service.ts":
  /*!**********************************************************!*\
    !*** ./src/app/services/common/stream/stream.service.ts ***!
    \**********************************************************/

  /*! exports provided: StreamService */

  /***/
  function srcAppServicesCommonStreamStreamServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StreamService", function () {
      return StreamService;
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

    var StreamService =
    /*#__PURE__*/
    function () {
      function StreamService(httpClient) {
        _classCallCheck(this, StreamService);

        this.httpClient = httpClient;
        this.apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiurl;
        this.httpOptions = {
          headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
          })
        };
      }

      _createClass(StreamService, [{
        key: "getAllStream",
        value: function getAllStream(formData) {
          return this.httpClient.post(this.apiURL + '/stream/getallstream', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllStreamList",
        value: function getAllStreamList(formData) {
          return this.httpClient.post(this.apiURL + '/stream/getallstreamlist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addStream",
        value: function addStream(formData) {
          return this.httpClient.post(this.apiURL + '/stream/addstream', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addQualificationCourseStream",
        value: function addQualificationCourseStream(formData) {
          return this.httpClient.post(this.apiURL + '/stream/addqualificationcoursestream', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllQualificationCourseStream",
        value: function getAllQualificationCourseStream(formData) {
          return this.httpClient.post(this.apiURL + '/stream/getallqualificationcoursestream', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return StreamService;
    }();

    StreamService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    StreamService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], StreamService);
    /***/
  },

  /***/
  "./src/app/services/common/user/user.service.ts":
  /*!******************************************************!*\
    !*** ./src/app/services/common/user/user.service.ts ***!
    \******************************************************/

  /*! exports provided: UserService */

  /***/
  function srcAppServicesCommonUserUserServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserService", function () {
      return UserService;
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

    var UserService =
    /*#__PURE__*/
    function () {
      function UserService(httpClient) {
        _classCallCheck(this, UserService);

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

      _createClass(UserService, [{
        key: "AzuretableCallOnLogInout",
        value: function AzuretableCallOnLogInout(formData) {
          return this.httpClient.post(this.apiURL + '/user/azuretableCallOnLogInout', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveUserMaster",
        value: function saveUserMaster(formData) {
          return this.httpClient.post(this.apiURL + '/user/save', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "saveRoleWiseUser",
        value: function saveRoleWiseUser(formData) {
          return this.httpClient.post(this.apiURL + '/user/addroleiseuser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllUser",
        value: function getAllUser(formData) {
          return this.httpClient.post(this.apiURL + '/user/getalluser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getLocationwiseAllUser",
        value: function getLocationwiseAllUser(formData) {
          return this.httpClient.post(this.apiURL + '/user/getlocationwisealluser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getUserByUserId",
        value: function getUserByUserId(formData) {
          return this.httpClient.post(this.apiURL + '/user/getloginuser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "validateUserToSendOTP",
        value: function validateUserToSendOTP(formData) {
          return this.httpClient.post(this.apiURL + '/user/validateusertosendotp', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getUserByUserIdByCosmos",
        value: function getUserByUserIdByCosmos(formData) {
          return this.httpClient.post(this.apiURL + '/user/getloginuserbycosmos', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //by kuntal

      }, {
        key: "getForgotUserByUserId",
        value: function getForgotUserByUserId(formData) {
          return this.httpClient.post(this.apiURL + '/user/getforgotloginuser', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //updatePassword(formData: any): Observable<any> {
        //  return this.httpClient.post<any>(this.apiURL + '/user/updatePassword', JSON.stringify(formData), this.httpOptions)
        //    .pipe(
        //      catchError(this.errorHandler)
        //    )
        //}

      }, {
        key: "getUserMenu",
        value: function getUserMenu(formData) {
          return this.httpClient.post(this.apiURL + '/user/getusermenu', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getVerticalRM",
        value: function getVerticalRM(formData) {
          return this.httpClient.post(this.apiURL + '/vertical/getallverticalrm', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getVerticalHiringManager",
        value: function getVerticalHiringManager(formData) {
          return this.httpClient.post(this.apiURL + '/vertical/getallverticalhiringmanager', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getVerticalFunctionHiringManager",
        value: function getVerticalFunctionHiringManager(formData) {
          return this.httpClient.post(this.apiURL + '/vertical/getallverticalfunctionhiringmanager', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getallDoctorList",
        value: function getallDoctorList(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalldoctorslist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "addDoctorList",
        value: function addDoctorList(formData) {
          return this.httpClient.post(this.apiURL + '/user/adddoctor', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllUserWiseRole",
        value: function getAllUserWiseRole(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalluserwiserole', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } //Anif

      }, {
        key: "getAllUserWiseRoleWithAutoUserId",
        value: function getAllUserWiseRoleWithAutoUserId(formData) {
          return this.httpClient.post(this.apiURL + '/common/getalluserwiserolewithautouserid', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } // Added By Anif on 20-07-2022 for EDMS Link Authorization

      }, {
        key: "getEDMSLinkAuthorization",
        value: function getEDMSLinkAuthorization(formData) {
          return this.httpClient.post(this.apiURL + '/user/getedmslinkauthorization', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "getAllUserCanAccessEDMS",
        value: function getAllUserCanAccessEDMS(formData) {
          return this.httpClient.post(this.apiURL + '/user/getalledmsaccessuserslist', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        } // addEDMSUsersAccess(formData: any): Observable<any> {
        //   return this.httpClient.post<any>(this.apiURL + '/user/addedmsaccessforusers', JSON.stringify(formData), this.httpOptions)
        //     .pipe(
        //       catchError(this.errorHandler)
        //     )
        // }

      }, {
        key: "addEDMSUsersAccess",
        value: function addEDMSUsersAccess(formData) {
          return this.httpClient.post(this.apiURL + '/user/addedmsaccessforusers', formData, this.httpOptionsFile).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
        }
      }, {
        key: "changePassword",
        value: function changePassword(formData) {
          return this.httpClient.post(this.apiURL + '/user/changepassword', JSON.stringify(formData), this.httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.errorHandler));
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

      return UserService;
    }();

    UserService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
      }];
    };

    UserService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])], UserService);
    /***/
  },

  /***/
  "./src/app/sharedservices/notification.service.ts":
  /*!********************************************************!*\
    !*** ./src/app/sharedservices/notification.service.ts ***!
    \********************************************************/

  /*! exports provided: NotificationService */

  /***/
  function srcAppSharedservicesNotificationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NotificationService", function () {
      return NotificationService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");

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

    var NotificationService =
    /*#__PURE__*/
    function () {
      function NotificationService(toastr) {
        _classCallCheck(this, NotificationService);

        this.toastr = toastr;
      }

      _createClass(NotificationService, [{
        key: "showSuccess",
        value: function showSuccess(message, title) {
          this.toastr.success(message, title);
        }
      }, {
        key: "showError",
        value: function showError(message, title) {
          this.toastr.error(message, title);
        }
      }, {
        key: "showInfo",
        value: function showInfo(message, title) {
          this.toastr.info(message, title);
        }
      }, {
        key: "showWarning",
        value: function showWarning(message, title) {
          this.toastr.warning(message, title);
        }
      }]);

      return NotificationService;
    }();

    NotificationService.ctorParameters = function () {
      return [{
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]
      }];
    };

    NotificationService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
      providedIn: 'root'
    }), __metadata("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]])], NotificationService);
    /***/
  },

  /***/
  "./src/app/sharedservices/persitence.service.ts":
  /*!******************************************************!*\
    !*** ./src/app/sharedservices/persitence.service.ts ***!
    \******************************************************/

  /*! exports provided: PersistanceService */

  /***/
  function srcAppSharedservicesPersitenceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PersistanceService", function () {
      return PersistanceService;
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

    var PersistanceService =
    /*#__PURE__*/
    function () {
      function PersistanceService() {
        _classCallCheck(this, PersistanceService);
      }

      _createClass(PersistanceService, [{
        key: "set",
        value: function set(key, data) {
          try {
            localStorage.setItem(key, JSON.stringify(data));
          } catch (e) {
            console.error('Error saving to localStorage', e);
          }
        }
      }, {
        key: "get",
        value: function get(key) {
          try {
            return JSON.parse(localStorage.getItem(key));
          } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
          }
        }
      }]);

      return PersistanceService;
    }();

    PersistanceService = __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(), __metadata("design:paramtypes", [])], PersistanceService);
    /***/
  }
}]);
//# sourceMappingURL=default~application-application-module~authentication-authentication-module~campus-offcampus-registr~44d357a9-es5.js.map