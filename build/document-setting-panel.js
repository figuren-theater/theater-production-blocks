/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALLOWED_PRE_SUF_FIX_FORMATS: function() { return /* binding */ ALLOWED_PRE_SUF_FIX_FORMATS; },
/* harmony export */   DURATION_META: function() { return /* binding */ DURATION_META; },
/* harmony export */   PREMIERE_META: function() { return /* binding */ PREMIERE_META; },
/* harmony export */   PT_PRODUCTION: function() { return /* binding */ PT_PRODUCTION; },
/* harmony export */   TARGETGROUP_META: function() { return /* binding */ TARGETGROUP_META; }
/* harmony export */ });
//
// export const DURATION_META    = '_theatre_base_prod_and_event__duration';
const DURATION_META = window.Theater.ProductionBlocks.duration.PostMetaKey;

//
const PREMIERE_META = '_theatre_base_prod_and_event__premiere';

//
const TARGETGROUP_META = '_theatre_base_prod_and_event__targetgroup';
const PT_PRODUCTION = 'ft_production';

// Allowed formats for the prefix and suffix fields.
const ALLOWED_PRE_SUF_FIX_FORMATS = ['core/bold', 'core/image', 'core/italic',
// 'core/link',
// 'core/strikethrough',
'core/text-color'];

/***/ }),

/***/ "./src/utils/date-select.js":
/*!**********************************!*\
  !*** ./src/utils/date-select.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__);

/**
 * STOLEN from
 * https://github.com/Automattic/block-experiments/blob/master/blocks/event/src/date-select.js
 */

/**
 * WordPress dependencies
 */


const DateSelect = _ref => {
  let {
    placeholder,
    value,
    dateFormat,
    onChange,
    className
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    className: className,
    position: "bottom left",
    renderToggle: _ref2 => {
      let {
        onToggle,
        isOpen
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "tertiary",
        onClick: onToggle,
        "aria-expanded": isOpen,
        "aria-live": "polite"
      }, value ? (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)(dateFormat, value) : placeholder);
    },
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DatePicker, {
      currentDate: value,
      onChange: onChange
    })
  });
};
DateSelect.Content = _ref3 => {
  let {
    value,
    dateFormat,
    className
  } = _ref3;
  return value && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("time", {
    className: className,
    dateTime: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)('c', value)
  }, (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)(dateFormat, value));
};
/* harmony default export */ __webpack_exports__["default"] = (DateSelect);

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["plugins"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************************************************!*\
  !*** ./src/block-editor/plugins/document-setting-panel/index.js ***!
  \******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_date_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../utils/date-select */ "./src/utils/date-select.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/constants.js */ "./src/utils/constants.js");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * WordPress dependencies.
 */







/**
 * Internal dependencies
 */




// import { getPostMeta, setPostMeta } from '../../../utils/helper.js'

const ProductionDocumentSettingPanel = () => {
  // Get post type.
  const post = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => select('core/editor').getCurrentPost(), []);
  if (_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.PT_PRODUCTION !== post.type) return '';
  const settings = (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_8__.__experimentalGetSettings)();

  // Get the value of meta and a function for updating meta from useEntityProp.
  const [meta, setMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', post.type, 'meta', post.id);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_5__.PluginDocumentSettingPanel, {
    name: "production-document-setting-panel",
    icon: "art",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Production Meta', 'theater-production-blocks'),
    className: "t7b4-production-document-setting-panel"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "plugin-sidebar-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.RichText, {
    tagName: "p",
    value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Premiere Date', 'theater-production-blocks')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_utils_date_select__WEBPACK_IMPORTED_MODULE_9__["default"], {
    className: "event__date-select",
    dateFormat: settings.formats.date,
    value: meta[_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.PREMIERE_META],
    onChange: newValue => {
      setMeta({
        ...meta,
        [_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.PREMIERE_META]: newValue
      });
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose a Date', 'theater-production-blocks')
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Targetgroup', 'theater-production-blocks'),
    value: meta[_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.TARGETGROUP_META],
    onChange: newValue => {
      setMeta({
        ...meta,
        [_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.TARGETGROUP_META]: newValue
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Duration', 'theater-production-blocks'),
    isShiftStepEnabled: true,
    shiftStep: "5",
    step: "5",
    min: 0,
    placeholder: "80",
    value: meta[_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.DURATION_META],
    onChange: newValue => {
      setMeta({
        ...meta,
        [_utils_constants_js__WEBPACK_IMPORTED_MODULE_10__.DURATION_META]: newValue
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_7__.RichText, {
    tagName: "p",
    className: "howto",
    value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add the duration in Minutes.', 'theater-production-blocks')
  })));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_6__.registerPlugin)('production-document-setting-panel', {
  render: ProductionDocumentSettingPanel
});
}();
/******/ })()
;
//# sourceMappingURL=document-setting-panel.js.map